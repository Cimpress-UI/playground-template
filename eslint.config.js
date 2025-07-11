import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import checkFile from 'eslint-plugin-check-file';
import eslintPluginImportX from 'eslint-plugin-import-x';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default tseslint.config([
  includeIgnoreFile(gitignorePath),
  globalIgnores(['dist']),

  {
    files: ['**/*'],
    plugins: {
      'check-file': checkFile,
    },

    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          '**': 'KEBAB_CASE',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
        { ignoreMiddleExtensions: true },
      ],
    },
  },

  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
      reportUnusedInlineConfigs: 'error',
    },
    plugins: {
      'react-hooks': reactHooks,
      unicorn: eslintPluginUnicorn,
      'import-x': eslintPluginImportX,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/react-compiler': ['error', { eslintSuppressionRules: ['react-hooks/rules-of-hooks'] }],
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
        },
      ],
    },
  },

  {
    files: ['playground/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['playground/vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ['**/*.{ts,cts,mts,tsx}'],
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],
    extends: [reactRefresh.configs.vite],
  },

  eslintConfigPrettier,
]);
