import globals from 'globals'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['node_modules/'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },

  eslintConfigPrettier,
]
