import { TD } from '@/types/td.types';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'success' | 'error';
  tdData: TD & { type?: string };
}

export const NOTIFICATIONS: Notification[] = [
  { 
    id: '1', 
    title: 'TD approuvé', 
    desc: 'TD Anglais - 3ème du 12/11/25', 
    time: 'Il y a 2 min', 
    type: 'success',
    tdData: { id: '1', subject: 'Anglais', teacher: 'VIGAN Pauline', classe: '3ème', date: '12/11/25', time: '14h - 17h', duration: '3h', status: 'terminé', type: 'Secondaire' }
  },
  { 
    id: '2', 
    title: 'TD rejeté', 
    desc: 'TD Français - Tle du 12/11/25', 
    time: 'Il y a 15 min', 
    type: 'error',
    tdData: { id: '2', subject: 'Français', teacher: 'VIGAN Pauline', classe: 'Tle', date: '12/11/25', time: '14h - 17h', duration: '3h', status: 'rejeté', type: 'Secondaire' }
  },
  { 
    id: '3', 
    title: 'Nouveau TD assigné', 
    desc: 'TD PCT - 3ème du 13/11/25', 
    time: 'Il y a 1h', 
    type: 'success',
    tdData: { id: '3', subject: 'PCT', teacher: 'VIGAN Pauline', classe: '3ème', date: '13/11/25', time: '08h - 10h', duration: '2h', status: 'en cours', type: 'Secondaire' }
  },
  { 
    id: '4', 
    title: 'Paiement effectué', 
    desc: 'TD Anglais - Tle du 10/11/25', 
    time: 'Il y a 3h', 
    type: 'success',
    tdData: { id: '4', subject: 'Anglais', teacher: 'VIGAN Pauline', classe: 'Tle', date: '10/11/25', time: '14h - 17h', duration: '3h', status: 'payé', type: 'Secondaire' }
  },
];

export interface UpcomingTD {
  id: string;
  subject: string;
  class: string;
  time: string;
  relative: string;
  status: 'Marqué terminé' | 'Programmé';
}

export const UPCOMING_TDS: UpcomingTD[] = [
  { id: '1', subject: 'Anglais', class: 'Tle', time: '12/01/26 à 14h', relative: 'Il y a 2 min', status: 'Marqué terminé' },
  { id: '2', subject: 'EST', class: 'CM2', time: '12/01/26 à 14h', relative: 'Il y a 5 min', status: 'Marqué terminé' },
  { id: '3', subject: 'PCT', class: '3ème', time: '12/01/26 à 15h', relative: 'Il y a 12 min', status: 'Marqué terminé' },
  { id: '4', subject: 'Mathématiques', class: '2nde', time: '13/01/26 à 08h', relative: 'Il y a 1h', status: 'Programmé' },
  { id: '5', subject: 'SVT', class: '1ère', time: '13/01/26 à 10h', relative: 'Il y a 2h', status: 'Programmé' },
];
