export type UserRole = 'admin' | 'enseignant' | 'comptable';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthSession {
  user: User | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
}
