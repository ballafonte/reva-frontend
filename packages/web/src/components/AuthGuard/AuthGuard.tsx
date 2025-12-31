'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/utils/contexts/AuthContext';

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

    // If not authenticated, redirect to sign-in
    if (!isAuthenticated) {
      const redirectTo = encodeURIComponent(pathname);
      router.push(`/sign-in?redirectTo=${redirectTo}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show nothing while loading or redirecting
  if (isLoading || !isAuthenticated) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}

