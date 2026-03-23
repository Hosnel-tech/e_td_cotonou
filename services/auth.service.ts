import { User, AuthSession } from '@/types/auth.types';
import { MOCK_USER } from '@/data/auth';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_USER;
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
