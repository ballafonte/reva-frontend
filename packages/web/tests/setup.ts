import '@testing-library/jest-dom';

// Note: Next.js modules are mocked via moduleNameMapper in jest.config.js
// These mocks use the existing mock files from src/components/common/__mocks__/

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

// Set up environment variables for API testing
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3000/api/';
process.env.REACT_APP_API_BASE_URL = 'http://localhost:3000/api/';

// Mock global fetch
global.fetch = jest.fn();

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
