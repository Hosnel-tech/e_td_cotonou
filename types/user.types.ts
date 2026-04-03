export type AccountStatus = 'actif' | 'en attente' | 'inactif' | 'rejeté';
export type UserRole = 'admin' | 'enseignant' | 'comptable';

export interface BaseAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: AccountStatus;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Teacher extends BaseAccount {
  role: 'enseignant';
  subject: string;
  className?: string;
  niveau: 'primaire' | 'secondaire';
  genre?: 'M' | 'F';
  school: string;
  birthDate?: string;
  nationality?: string;
  location?: string;
  ifu?: string;
  bankAccount?: string;
  bankName?: string;
}

export interface Accountant extends BaseAccount {
  role: 'comptable';
  firstName: string;
  lastName: string;
}

export interface Admin extends BaseAccount {
  role: 'admin';
}

export type User = Teacher | Accountant | Admin;
