import adapter from '@sveltejs/adapter-auto'
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
export default {
  compilerOptions: {runes: true},

  kit: {
    adapter: adapter(),
    alias: {$content: './src/content', $routes: './src/routes'},
    paths: {relative: false},
  },

  preprocess: [vitePreprocess()],
  vitePlugin: {inspector: true},
}
