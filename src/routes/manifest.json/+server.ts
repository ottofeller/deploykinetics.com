import {json} from '@sveltejs/kit'
import {meta} from '$content/meta'
export const prerender = true

const render = {
  background_color: meta.siteBackgroundColor,
  display: 'minimal-ui',
  icons: [{src: meta.favicon, type: 'image/svg+xml'}],
  name: meta.siteName,
  start_url: '/',
  theme_color: meta.siteThemeColor,
}

export const GET = () => json(render)
