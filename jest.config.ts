import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 10000,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@emotion/styled$': '<rootDir>/node_modules/@emotion/styled',
    '^@emotion/react$': '<rootDir>/node_modules/@emotion/react',
    '^next/font/google$': '<rootDir>/src/__mocks__/next/font/google.ts',
    '^next/head$': '<rootDir>/src/__mocks__/next/head.tsx',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          experimental: {
            plugins: [['@swc/plugin-emotion', {}]],
          },
        },
      },
    ],
  },
  clearMocks: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  coverageDirectory: 'coverage',
};

export default config;
