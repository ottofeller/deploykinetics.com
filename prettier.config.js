export default {
  bracketSpacing: false,
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [{files: '*.svelte', options: {parser: 'svelte'}}],
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tailwindStylesheet: './src/lib/layouts/Root/styles.css',
}
