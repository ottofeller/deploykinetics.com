import {createHash} from 'node:crypto'
import {mkdirSync, rmSync, readdirSync, readFileSync, writeFileSync, existsSync} from 'node:fs'
import {extname, basename} from 'node:path'
import {create} from 'fontkit'
import subsetFont from 'subset-font'
import type {Plugin, ResolvedConfig} from 'vite'
import GOOGLE_FONTS_SETS from './google-fonts-sets.json' with {type: 'json'}

/**
 * Generates a SHA-256 hash from the given key parts.
 * @param keyParts - An array of strings or buffers to hash.
 * @returns The hex string representation of the hash.
 */
const hash = (keyParts: Array<string | NodeJS.ArrayBufferView>) => {
  let result = createHash('sha256')
  keyParts.forEach((keyPart) => (result = result.update(keyPart)))
  return result.digest('hex')
}

declare global {
  var __cachedIds: Set<string> | undefined
}

const FONT_FORMAT = 'woff2' as const
const CACHE_DIRECTORY = './node_modules/.cache/font-optimizer'
const MIN_CHUNK_SIZE = 100
const FONT_FILE_REGEX = /[?&]font$/

export const fontOptimizer: () => Plugin = () => {
  let viteConfig: ResolvedConfig

  return {
    name: 'font-optimizer',
    enforce: 'pre',

    configResolved(config) {
      viteConfig = config

      if (viteConfig.command === 'build') {
        mkdirSync(CACHE_DIRECTORY, {recursive: true})
        globalThis.__cachedIds ??= new Set()
      }
    },

    load: {
      filter: {
        id: FONT_FILE_REGEX,
      },

      async handler(id) {
        const url = new URL(id, 'file://')
        const pathname = decodeURIComponent(url.pathname)
        const family = url.searchParams.get('family')
        const style = url.searchParams.get('style')
        const weight = url.searchParams.get('weight')

        if (!family) {
          throw new Error('"family" is not defined.')
        } else if (!style) {
          throw new Error('"style" is not defined.')
        } else if (!['italic', 'normal'].includes(style)) {
          throw new Error(`The "${style}" style is not supported. Use "italic" or "normal" instead.`)
        } else if (!weight) {
          throw new Error('"weight" is not defined.')
        } else if (!/^\d+$/.test(weight)) {
          throw new Error('"weight" should be a positive integer.')
        }

        if (viteConfig.command === 'serve') {
          return `export default ${JSON.stringify({
            html: `<style>
              @font-face {
                font-display: swap;
                font-family: "${family}";
                src: url("${viteConfig.server.origin ?? ''}/@fs${pathname}") format("${FONT_FORMAT}");
                font-weight: ${weight};
                font-style: ${style};
              }
            </style>`.replace(/\s+/g, ' '),
          })}`
        } else {
          const initialFileName = basename(pathname, extname(pathname))
          const initialFileBuffer = readFileSync(pathname)
          const initialFileHash = hash([initialFileBuffer])
          const initialFontData = create(initialFileBuffer)

          if ('fonts' in initialFontData) {
            throw new Error('Font collections are not supported!')
          }

          const initialFontCodePoints = new Set(initialFontData.characterSet)

          // Arrays of unique code points based on subsets from GOOGLE_FONTS_SETS and the source font.
          const groups = GOOGLE_FONTS_SETS.map((subset) =>
            subset.filter((codePoint) => initialFontCodePoints.delete(codePoint)),
          ).filter((group) => group.length > 0)

          // If there are any code points left that are not included in GOOGLE_FONTS_SETS.
          if (initialFontCodePoints.size > 0) {
            groups.push(Array.from(initialFontCodePoints))
          }

          // Compact the array of number arrays: if a previous sub-array has fewer elements than minChunkSize, its elements are merged into the next sub-array.
          const mergedGroups = groups.reduce<Array<Array<number>>>(
            (accumulator, currentValue) =>
              accumulator.length > 0 && accumulator[accumulator.length - 1].length < MIN_CHUNK_SIZE
                ? (accumulator[accumulator.length - 1].push(...currentValue),
                  accumulator.map((item) => item.sort((a, b) => a - b)))
                : [...accumulator, [...currentValue]],

            [],
          )

          const outputMeta = []

          for (const codePointes of mergedGroups) {
            const chunks = []
            let start = codePointes[0]
            let end = start

            for (let i = 1; i < codePointes.length; i++) {
              if (codePointes[i] === end + 1) {
                end = codePointes[i]
              } else {
                chunks.push(start === end ? `U+${start.toString(16)}` : `U+${start.toString(16)}-${end.toString(16)}`)
                start = end = codePointes[i]
              }
            }

            chunks.push(start === end ? `U+${start.toString(16)}` : `U+${start.toString(16)}-${end.toString(16)}`)
            const glyphString = codePointes.map((codePoint) => String.fromCodePoint(codePoint)).join('')
            const fileId = hash([glyphString, initialFileHash])
            const fileName = `${fileId}.${FONT_FORMAT}`
            const filePath = `${CACHE_DIRECTORY}/${fileName}`
            globalThis.__cachedIds?.add(fileName)

            if (!existsSync(filePath)) {
              writeFileSync(filePath, await subsetFont(initialFileBuffer, glyphString, {targetFormat: FONT_FORMAT}))
            }

            outputMeta.push({
              src: `__VITE_ASSET__${this.emitFile({
                name: `${initialFileName}.${FONT_FORMAT}`,
                source: readFileSync(filePath),
                type: 'asset',
              })}__`,

              unicodeRange: chunks.join(','),
            })
          }

          return `export default ${JSON.stringify({
            html: `<style>
              ${outputMeta
                .map(
                  (chunk) =>
                    `@font-face {
                      font-display: swap;
                      font-family: "${family}";
                      src: url("${chunk.src}") format("${FONT_FORMAT}");
                      font-weight: ${weight};
                      font-style: ${style};
                      unicode-range: ${chunk.unicodeRange};
                    }`,
                )
                .join('')}
              </style>`.replace(/\s+/g, ' '),
          })}`
        }
      },
    },

    async buildEnd() {
      // Skip serve (Dev mode) and SSR build.
      if (viteConfig.command === 'build' && !viteConfig.build.ssr) {
        readdirSync(CACHE_DIRECTORY)
          .filter((entry) => !globalThis.__cachedIds?.has(entry))
          .forEach((entry) => rmSync(`${CACHE_DIRECTORY}/${entry}`))
      }
    },
  }
}
