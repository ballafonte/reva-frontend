'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authStore, useAuthContext } from '@reva-frontend/common';

export interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component that protects routes requiring authentication
 *
 * If the user is not authenticated, they will be redirected to the sign-in page
 * with a redirectTo query parameter to return them to the intended page after sign-in.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }

    // Check both isAuthenticated state and token store as fallback
    // This prevents redirect loops when token is stored but state hasn't updated yet
    const token = authStore.getToken();
    const actuallyAuthenticated = isAuthenticated || !!token;

    // If not authenticated, redirect to sign-in
    if (!actuallyAuthenticated) {
      const redirectTo = encodeURIComponent(pathname);
      router.push(`/sign-in?redirectTo=${redirectTo}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Check token as fallback for rendering
  const token = authStore.getToken();
  const actuallyAuthenticated = isAuthenticated || !!token;

  // Show nothing while loading or not authenticated
  if (isLoading || !actuallyAuthenticated) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
