export type PaymentStatus = 'Terminé' | 'En attente' | 'Refusé';

export interface Payment {
  id: string;
  teacher: string;
  subject: string;
  grade: string;
  niveau: 'primaire' | 'secondaire';
  date: string;
  duration: string;
  amount: string;
  status: PaymentStatus | string;
  action?: string;
}

export interface Transfer {
  id: string;
  bank: string;
  amount: string;
  date?: string;
}
