# @reva-frontend/common

Shared package containing TypeScript types, API endpoints, React Query queries/mutations, and business logic utilities used across the Reva frontend monorepo.

## Contents

- **TypeScript types** (`src/types`) - Shared type definitions
- **API endpoints** (`src/api`) - API client functions and utilities
- **React Query queries** (`src/utils/queries`) - Data fetching hooks and queries
- **React Query mutations** (`src/utils/mutations`) - Data mutation hooks
- **Business logic utilities** (`src/utils`) - Reusable utility functions, hooks, and contexts

## Building

Build the package:

```bash
yarn build
```

The compiled output will be in the `dist/` directory.

## Testing

This package uses Jest for unit testing. The test structure mirrors the source code structure for easy navigation.

### Running Tests

```bash
yarn test
```

### Test Commands

- `yarn test` - Run all tests once
- `yarn test:watch` - Run tests in watch mode (re-runs on file changes)
- `yarn test:coverage` - Run tests with coverage report

### Test Structure

Tests are located in the `tests/` directory and organized to mirror the `src` directory structure:

- Tests use the `.test.ts` or `.test.tsx` extension
- Utilities and mock data are in `tests/utils/` and `tests/mockData/`
- Test files are co-located with their corresponding source files

### Writing Tests

- Write unit tests for utilities, API functions, and business logic
- Use Jest's built-in matchers and testing utilities
- Mock external dependencies as needed
- Maintain test coverage for critical business logic

## Dependencies

This package depends on:

- `@revassurance/api` - API client library
- `@tanstack/react-query` - Data fetching and state management
- `crypto-js` - Encryption utilities
- `fuse.js` - Fuzzy search
- `moment` - Date manipulation
- `uuid` - UUID generation

