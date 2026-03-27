import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type AuthGuardOptions = {
  requiredRole?: 'enseignant' | 'admin' | 'comptable';
};

/**
 * Protects a page by checking the current user's status.
 * Redirects to /login?reason=... if the account is deactivated, pending, or the role doesn't match.
 */
export function useAuthGuard(options: AuthGuardOptions = {}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (!res.ok) {
          router.replace('/login?reason=unauthorized');
          return;
        }

        const user = await res.json();

        if (!user) {
          router.replace('/login?reason=unauthorized');
          return;
        }

        // Role check
        if (options.requiredRole && user.role !== options.requiredRole) {
          router.replace('/login?reason=unauthorized');
          return;
        }

        // Status guard
        if (user.status === 'inactif' || user.status === 'rejeté') {
          // Logout then redirect
          await fetch('/api/auth/logout', { method: 'POST' });
          router.replace('/login?reason=deactivated');
          return;
        }

        if (user.status === 'en attente') {
          await fetch('/api/auth/logout', { method: 'POST' });
          router.replace('/login?reason=pending');
          return;
        }
      } catch (err) {
        router.replace('/login?reason=unauthorized');
      }
    };

    checkAuth();
  }, [router, options.requiredRole]);
}
