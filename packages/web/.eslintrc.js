module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'reva-frontend/no-client-import-in-server': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: {
        'reva-frontend': {
          rules: {
            'no-client-import-in-server': require('../../eslint-rules/no-client-import-in-server'),
          },
        },
      },
    },
  ],
};
