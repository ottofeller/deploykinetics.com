import js from '@eslint/js'
import {globalIgnores} from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import svelte from 'eslint-plugin-svelte'
import * as espree from 'espree'
import globals from 'globals'
import ts from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default ts.config([
  globalIgnores(['.svelte-kit/']),
  ...ts.configs.recommended,
  ...svelte.configs.recommended,

  {
    files: ['**/*.js'],
    ...js.configs.recommended,

    languageOptions: {
      parser: espree,
      globals: {...globals.node},
    },
  },

  {
    files: ['**/*.ts'],

    languageOptions: {
      parserOptions: {
        parser: {ts: ts.parser},
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ['**/*.svelte', '**/*.svelte.ts'],

    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      'svelte/block-lang': ['error', {script: ['ts'], style: ['postcss']}],
      'svelte/button-has-type': 'error',
      'svelte/html-self-closing': 'error',
      'svelte/no-add-event-listener': 'error',
      'svelte/no-navigation-without-resolve': ['error', {ignoreLinks: true}],
      'svelte/no-target-blank': 'error',
      'svelte/no-top-level-browser-globals': 'error',
      'svelte/no-trailing-spaces': 'error',
      'svelte/no-unused-props': 'error',
      'svelte/prefer-class-directive': 'error',
      'svelte/prefer-const': ['error', {excludedRunes: ['$props']}],
      'svelte/require-optimized-style-attribute': 'error',
      'svelte/sort-attributes': 'error',
      'svelte/spaced-html-comment': 'error',
      'svelte/valid-compile': 'error',
      'svelte/valid-style-parse': 'error',
    },
  },

  {
    files: ['**/*.js', '**/*.ts', '**/*.svelte'],
    plugins: {import: importPlugin},

    rules: {
      'import/no-duplicates': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/order': ['error', {alphabetize: {order: 'asc'}, warnOnUnassignedImports: true}],
    },
  },

  eslintConfigPrettier,
])
