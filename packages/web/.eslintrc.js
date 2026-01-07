module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', '@reva-frontend/reva-frontend'],
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
  },
  overrides: [
    {
      // Only enforce client-only import restriction within Next.js App Router files
      files: ['src/app/**/*.{ts,tsx}'],
      rules: {
        '@reva-frontend/reva-frontend/no-client-import-in-server': 'error',
      },
    },
  ],
};
