/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
    '**/?(*.)+(spec|test).tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/../common/src/$1',
    '^@reva-frontend/common$': '<rootDir>/../common/src/index',
    '^@reva-frontend/common/(.*)$': '<rootDir>/../common/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^next/navigation$':
      '<rootDir>/src/components/common/__mocks__/next-navigation',
    '^next/link$': '<rootDir>/src/components/common/__mocks__/next-link',
    '^next/image$': '<rootDir>/src/components/common/__mocks__/next-image',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.types.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transformIgnorePatterns: ['node_modules/(?!(uuid|@tanstack/react-query)/)'],
};
