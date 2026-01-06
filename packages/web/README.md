# @reva-frontend/web

Next.js React application that provides the web interface for the Reva platform. This package uses resources from the `@reva-frontend/common` package.

## Development

### Running the Development Server

Start the Next.js development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

Build the application:

```bash
yarn build
```

### Starting Production Server

Start the production server:

```bash
yarn start
```

## Storybook

Storybook is a tool for developing and testing UI components in isolation. It provides a visual development environment where you can view, test, and document components independently of the main application.

### Running Storybook

Start the Storybook development server:

```bash
yarn storybook
```

This will start Storybook on `http://localhost:6006` (the browser will not open automatically).

### Building Storybook

Build a static version of Storybook for deployment:

```bash
yarn build-storybook
```

The static build will be output to the `storybook-static` directory.

## Testing

This package uses Jest and React Testing Library for component testing. The test structure mirrors the source code structure for easy navigation.

### Running Tests

```bash
yarn test
```

### Test Commands

- `yarn test` - Run all tests once
- `yarn test:watch` - Run tests in watch mode (re-runs on file changes)
- `yarn test:coverage` - Run tests with coverage report

### Test Structure

Tests are located in the `tests/` directory:

- Tests mirror the `src/components` directory structure
- Component tests are in `tests/components/common/` and `tests/components/ui/`
- Test utilities and mocks are in `tests/utils/`
- Each component has a corresponding test file (e.g., `Button.test.tsx` for `Button.tsx`)

### Writing Tests

- Use React Testing Library for component tests
- Use the custom `render` utility from `@tests/utils/test-utils` for consistent test setup
- Tests should verify component rendering, user interactions, and edge cases
- Mock external dependencies and Next.js modules as needed

## Dependencies

This package depends on:

- `@reva-frontend/common` - Shared types, API, and utilities
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `@mui/material` & `@mui/icons-material` - Material-UI components
- `@emotion/react` & `@emotion/styled` - CSS-in-JS styling
- `@tanstack/react-query` - Data fetching and state management
- `react-hook-form` & `@hookform/resolvers` - Form handling
- `zod` - Schema validation
