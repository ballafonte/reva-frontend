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

This monorepo uses Yarn workspaces. Installing dependencies at the root will install all dependencies for all packages:

```bash
yarn install
```

This command installs dependencies for:

- The root workspace (dev tools and configuration)
- All packages in the `packages/` directory

## Workspace Scripts

These scripts operate across all packages in the monorepo:

### Type Checking

Check for TypeScript errors across all packages:

```bash
yarn type-check
```

### Linting

Lint all packages:

```bash
yarn lint
```

### Formatting

Format all code:

```bash
yarn format
```

Check formatting:

```bash
yarn format:check
```

## Further Reading

For package-specific documentation, see:

- [Common Package](./packages/common/README.md) - Shared types, API, queries, mutations, and utilities
- [Web Package](./packages/web/README.md) - Next.js application, development, Storybook, and testing
