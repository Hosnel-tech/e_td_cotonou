import { User, AuthSession } from '@/types/auth.types';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  },

  async getSession(): Promise<AuthSession> {
    const user = await this.getCurrentUser();
    return {
      user,
      status: user ? 'authenticated' : 'unauthenticated'
    };
  },

  async login(): Promise<void> {
    console.log('Login logic would go here');
  },

  async logout(): Promise<void> {
    console.log('Logout logic would go here');
  }
};
