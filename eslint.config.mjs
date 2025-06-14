import { defineFlatConfig } from '@typescript-eslint/flat-config';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineFlatConfig({
  ignores: ['eslint.config.mjs'],
  languageOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    globals: {
      ...require('globals').node,
      ...require('globals').jest,
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'prettier/prettier': 'error',
  },
  includes: [
    // если нужно подключить рекомендуемые правила:
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
});
