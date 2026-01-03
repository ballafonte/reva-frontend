import '@testing-library/jest-dom';

// Mock crypto-js
jest.mock('crypto-js', () => {
  const actualCryptoJS = jest.requireActual('crypto-js');
  return {
    ...actualCryptoJS,
    lib: {
      ...actualCryptoJS.lib,
      WordArray: {
        ...actualCryptoJS.lib.WordArray,
        random: jest.fn((bytes: number) => {
          // Return a predictable mock for testing
          const actualRandom = actualCryptoJS.lib.WordArray.random(bytes);
          return actualRandom;
        }),
      },
    },
  };
});

// Mock uuid - since uuid v13 is an ES module, we need to mock it differently
jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: jest.fn(() => {
      counter += 1;
      return `00000000-0000-0000-0000-${String(counter).padStart(12, '0')}`;
    }),
  };
});

// Mock moment to use consistent timezone for tests
jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return moment;
});

// Set up environment variables for API testing
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000/api/';
process.env.REACT_APP_API_BASE_URL = 'http://localhost:3000/api/';

// Mock global fetch
global.fetch = jest.fn();

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
