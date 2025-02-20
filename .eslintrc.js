module.exports = {
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
  ],
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
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
        sortTypesGroup: true,
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
};
