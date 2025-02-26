import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextCoreWebVitals = compat.extends('next/core-web-vitals');
const nextTypescript = compat.extends('next/typescript');
const prettierConfig = compat.extends('plugin:prettier/recommended');

const config = [
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'dist/',
      'public/',
      'coverage/',
      '.husky/',
      '.vscode/',
      'jest.setup.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...prettierConfig,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 80,
          tabWidth: 2,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          'newlines-between': 'always-and-inside-groups',
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: 'generated/*',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
];

export default config;
