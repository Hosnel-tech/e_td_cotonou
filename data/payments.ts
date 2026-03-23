import { Payment } from '@/types/financial.types';

export const PAYMENTS: Payment[] = [
  { id: '1', teacher: 'VIGAN Pauline', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '40. 000', status: 'Terminé', action: 'Marquer payé' },
  { id: '2', teacher: 'Jean KOUASSI', subject: 'Math', grade: 'CM2', date: '12/11/25', duration: '1h', amount: '50. 000', status: 'Terminé', action: 'Marquer payé' },
  { id: '3', teacher: 'Paul ARNEAU', subject: 'Philosophie', grade: 'Tle', date: '12/11/25', duration: '4h', amount: '150. 000', status: 'Terminé', action: 'Marquer payé' },
  { id: '4', teacher: 'DOUKPO Rose', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '65. 000', status: 'Terminé', action: 'Marquer payé' },
];

export const PENDING_PAYMENTS: Payment[] = PAYMENTS.slice(0, 4);
