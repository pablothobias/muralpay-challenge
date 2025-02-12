module.exports = {
  ignores: [
    'node_modules/',
    '.next/',
    'out/',
    'build/',
    'dist/',
    'public/',
    'coverage/',
    'cypress/',
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
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
