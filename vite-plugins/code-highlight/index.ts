import fs from 'fs/promises'
import {bundledLanguagesBase, bundledThemes, createHighlighter, createCssVariablesTheme} from 'shiki'
import type {Plugin} from 'vite'

export const codeHighlight: () => Plugin = () => ({
  name: 'code-highlight',
  enforce: 'pre',

  async load(id) {
    const url = new URL(id, 'file://')

    if (url.searchParams.has('code')) {
      const pathname = decodeURIComponent(url.pathname)
      const theme = url.searchParams.get('theme')
      const language = url.searchParams.get('language')

      if (!theme) {
        throw new Error('"theme" is not defined.')
      }

      const themeData = theme.split(',')
      const isDoubleTheme = themeData.length === 2

      if (!isDoubleTheme && !(theme in bundledThemes) && theme !== 'custom') {
        throw new Error(`The "${theme}" theme is not supported.`)
      } else if (isDoubleTheme && !(themeData[0] in bundledThemes) && themeData[0] !== 'custom') {
        throw new Error(`The "${themeData[0]}" theme is not supported.`)
      } else if (isDoubleTheme && !(themeData[1] in bundledThemes) && themeData[1] !== 'custom') {
        throw new Error(`The "${themeData[1]}" theme is not supported.`)
      } else if (!language) {
        throw new Error('"language" is not defined.')
      } else if (!(language in bundledLanguagesBase) && language !== 'ansi') {
        throw new Error(`The "${language}" language is not supported.`)
      } else if (!pathname) {
        throw new Error('"importer" is not defined.')
      }

      const source = await fs.readFile(pathname, 'utf8')

      const themes = isDoubleTheme
        ? {
            light: themeData[0] === 'custom' ? 'custom-light' : themeData[0],
            dark: themeData[1] === 'custom' ? 'custom-dark' : themeData[1],
          }
        : {light: theme}

      const highlighter = await createHighlighter({
        langs: [language],

        themes: isDoubleTheme
          ? [
              themeData[0] === 'custom'
                ? createCssVariablesTheme({name: 'custom-light', fontStyle: false, variablePrefix: '--code-light-'})
                : theme,

              themeData[1] === 'custom'
                ? createCssVariablesTheme({name: 'custom-dark', fontStyle: false, variablePrefix: '--code-dark-'})
                : theme,
            ]
          : [
              theme === 'custom'
                ? createCssVariablesTheme({name: 'custom', fontStyle: false, variablePrefix: '--code-'})
                : theme,
            ],
      })

      const ranges = highlighter
        .codeToTokens(source.trim(), {
          defaultColor: 'light-dark()',

          // @ts-expect-error -- the checks above the code ensure that the "language" is correct.
          lang: language,

          themes,
          colorsRendering: 'none',
        })
        .tokens.map((line) =>
          line.map((token) => ({
            color: token.htmlStyle?.color ?? '',
            offset: [token.offset, token.offset + token.content.length],
          })),
        )

      const html = highlighter.codeToHtml(source.trim(), {
        defaultColor: 'light-dark()',
        lang: language,
        mergeSameStyleTokens: true,
        themes,
        colorsRendering: 'none',

        // Remove the <pre> and <code> wrappers.
        transformers: [
          {
            pre: (hast) => {
              const code = hast.children?.[0]

              if (code.type === 'element' && code.tagName === 'code') {
                Object.assign(hast, {type: 'root', children: code.children})
              }
            },
          },
        ],
      })

      highlighter.dispose()
      return `export default ${JSON.stringify({html, language, ranges, source})}`
    }
  },
})
