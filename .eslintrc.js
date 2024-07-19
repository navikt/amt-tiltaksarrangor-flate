/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '.eslintrc.*',
    '**/build/*.js',
    'vite.config.ts',
    '/server/server.js',
    'plugin:react/recommended',
    'node_modules/',
    'build/'
  ],
  plugins: ['@typescript-eslint', 'jsx-a11y', 'react'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended'
  ],
  rules: {
    //ref https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-fallthrough': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    'array-bracket-spacing': [0, 'always'],
    'object-curly-spacing': [0, 'always'],
    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    'jsx-quotes': [2, 'prefer-double']
  }
}
