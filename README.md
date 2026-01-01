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
