import {sveltekit} from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import {version} from './package.json'
import {codeHighlight} from './vite-plugins/code-highlight'
import {fontOptimizer} from './vite-plugins/font-optimizer'

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    target: 'esnext',
  },

  define: {
    'import.meta.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
    'import.meta.env.VERSION': JSON.stringify(version),
  },

  plugins: [tailwindcss(), codeHighlight(), fontOptimizer(), sveltekit()],
})
