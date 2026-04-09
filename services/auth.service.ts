import { User, UserRole } from '@/types/user.types';

export interface AuthSession {
  user: User | null;
  status: 'authenticated' | 'unauthenticated' | 'pending';
}

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

  async login(email: string, password: string): Promise<User> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 403) {
      const data = await res.json();
      throw new Error(data.error || 'Accès refusé');
    }

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Identifiants invalides');
    }

    return res.json();
  },

  async register(data: any): Promise<User> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erreur lors de l’inscription');
    }

    return res.json();
  },

  async logout(): Promise<void> {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
        window.location.href = '/login';
    }
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    const res = await fetch('/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erreur lors de la mise à jour du profil');
    }

    return res.json();
  },

  async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
    // Mock password update since it's a demo JSON DB
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (oldPassword === 'error') {
      throw new Error('Ancien mot de passe incorrect');
    }
  }
};
