export type AccountStatus = 'actif' | 'en attente' | 'inactif' | 'rejeté';

export interface BaseAccount {
  id: string;
  email: string;
  phone: string;
  status: AccountStatus;
  birthDate: string;
  nationality: string;
  location: string;
  ifu: string;
  bankAccount: string;
  bankName: string;
}

export interface Teacher extends BaseAccount {
  name: string;
  subject: string;
  className: string;
  date: string; // Registration date
  school: string;
}

export interface Accountant extends BaseAccount {
  firstName: string;
  lastName: string;
}
