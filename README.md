# Reva Frontend

A monorepo containing shared packages and web applications for the Reva frontend.

## Structure

- `packages/common` - Shared TypeScript types, API endpoints, react-query queries/mutations, and business logic
- `packages/web` - Next.js React application

## Getting Started

### Node Version

This project uses Node.js 24.12.0. If you're using `nvm`, you can automatically switch to the correct version:

```bash
nvm use
```

### Install Dependencies

```bash
npm install
```

### Development

Run the web application in development mode:

```bash
cd packages/web
npm run dev
```

### Storybook

Storybook is a tool for developing and testing UI components in isolation. It provides a visual development environment where you can view, test, and document components independently of the main application.

#### Running Storybook

Start the Storybook development server:

```bash
cd packages/web
npm run storybook
```

This will start Storybook on `http://localhost:6006` (the browser will not open automatically).

#### Building Storybook

Build a static version of Storybook for deployment:

```bash
cd packages/web
npm run build-storybook
```

The static build will be output to the `storybook-static` directory.

### Type Checking

Check for TypeScript errors across all packages:

```bash
npm run type-check
```

### Linting

Lint all packages:

```bash
npm run lint
```

### Formatting

Format all code:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

### Testing

Both packages use Jest for unit testing. The test structure mirrors the source code structure for easy navigation.

#### Running Tests

**Common Package:**

```bash
cd packages/common
npm test
```

**Web Package:**

```bash
cd packages/web
npm test
```

#### Test Commands

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (re-runs on file changes)
- `npm run test:coverage` - Run tests with coverage report

#### Test Structure

**Common Package (`packages/common/tests/`):**

- Tests are organized to mirror the `src` directory structure
- Test files use the `.test.ts` or `.test.tsx` extension
- Utilities and mock data are in `tests/utils/` and `tests/mockData/`

**Web Package (`packages/web/tests/`):**

- Tests mirror the `src/components` directory structure
- Component tests are in `tests/components/common/` and `tests/components/ui/`
- Test utilities and mocks are in `tests/utils/`
- Each component has a corresponding test file (e.g., `Button.test.tsx` for `Button.tsx`)

#### Writing Tests

- Use React Testing Library for component tests
- Use the custom `render` utility from `@tests/utils/test-utils` for web package tests
- Tests should verify component rendering, user interactions, and edge cases
- Mock external dependencies and Next.js modules as needed

## Packages

### @reva-frontend/common

Shared package containing:

- TypeScript types (`src/types`)
- API endpoints (`src/api`)
- React Query queries (`src/utils/queries`)
- React Query mutations (`src/utils/mutations`)
- Business logic utilities (`src/utils`)

### @reva-frontend/web

Next.js application that uses resources from the common package.
