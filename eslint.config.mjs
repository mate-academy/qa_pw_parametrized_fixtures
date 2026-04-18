import globals from 'globals';
import pluginJs from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
    },
  },
  {
    plugins: {
      import: importPlugin,
      playwright: playwright,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,

      'import/no-unresolved': 'error',
      'no-unused-vars': 'error',
      'max-len': [
        'error',
        {
          code: 200,
          comments: 200,
        },
      ],
      'playwright/expect-expect': 'off',
    },
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: [
      '**/node_modules/*',
      'playwright.config.js',
      '**/playwright-report/**',
    ],
  },
];
