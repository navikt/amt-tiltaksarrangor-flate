import eslint from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from "typescript-eslint"
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginCypress from 'eslint-plugin-cypress'

/** @type {import("eslint").Linter.Config[]} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  pluginCypress.configs.recommended,
  eslintConfigPrettier,
  {
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
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'off',
      'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
    }
  }
]
