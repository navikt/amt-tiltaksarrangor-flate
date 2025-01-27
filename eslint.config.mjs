import eslint from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginCypress from 'eslint-plugin-cypress/flat'

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    ignores: [
      '.eslintrc.*',
      '**/build/*.js',
      'vite.config.ts',
      '/server/server.js',
      'plugin:react/recommended',
      'node_modules/',
      'build/'
    ]
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
      'no-fallthrough': 0,
      'no-useless-escape': 0,
      'no-tabs': 0,
      'array-bracket-spacing': [ 0, 'always' ],
      'object-curly-spacing': [ 0, 'always' ],
      quotes: [ 2, 'single', { avoidEscape: true } ],
      semi: [ 'error', 'never' ],
      'no-multiple-empty-lines': [ 'warn', { max: 1, maxEOF: 1 } ],
      'jsx-quotes': [ 2, 'prefer-double' ]
    }
  }
]
