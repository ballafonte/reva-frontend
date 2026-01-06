// Mock implementation of next/navigation for Storybook
// This file replaces next/navigation in Storybook to avoid "app router must be mounted" errors

export const mockRouter = {
  push: () => {
    // Mock implementation - navigation actions are no-ops in Storybook
  },
  replace: () => {
    // Mock implementation
  },
  refresh: () => {
    // Mock implementation
  },
  back: () => {
    // Mock implementation
  },
  forward: () => {
    // Mock implementation
  },
  prefetch: () => {
    // Mock implementation
  },
};

export const mockPathname = '/';

export function useRouter() {
  return mockRouter;
}

export function usePathname() {
  return mockPathname;
}

export function useSearchParams() {
  return new URLSearchParams();
}
