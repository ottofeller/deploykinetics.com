import htmlnano from 'htmlnano'
import {building} from '$app/environment'

const minifyHtml = async (html: string) => {
  const htmlnanoProcess = await htmlnano.process(
    html,

    {
      // Whitespace characters should not be deleted where Svelte expects them to be present - https://github.com/sveltejs/svelte/issues/12913#issuecomment-2301551560.
      collapseWhitespace: undefined,

      // Some hydration code needs comments, so leave them in - https://github.com/sveltejs/kit/issues/7493#issuecomment-1303218382.
      removeComments: /<!--\s/,
    },
  )

  return htmlnanoProcess.html
}

export const handle = async ({resolve, event}) => {
  let page = ''

  return resolve(event, {
    transformPageChunk: ({html, done}: {html: string; done: boolean}) => {
      page += html

      if (done) {
        // Minifying HTML at build time.
        return building ? minifyHtml(page) : page
      }
    },
  })
}
