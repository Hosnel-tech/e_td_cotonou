export interface AdminTDData {
  id: string;
  teacher: string;
  subject: string;
  classe: string;
  date: string;
  time: string;
  status: 'en attente' | 'en cours' | 'terminé' | 'payé' | 'rejeté';
  duration: string;
}

export const ADMIN_TDS: AdminTDData[] = [
  { id: '1', teacher: 'VIGAN Pauline', subject: 'Anglais',  classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'en attente', duration: '3h' },
  { id: '2', teacher: 'VIGAN Pauline', subject: 'Français', classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'terminé',   duration: '3h' },
  { id: '3', teacher: 'VIGAN Pauline', subject: 'SVT',      classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'en attente', duration: '3h' },
  { id: '4', teacher: 'VIGAN Pauline', subject: 'EST',      classe: 'CM2',  date: '12/07/25', time: '14h - 17h', status: 'terminé',   duration: '3h' },
  { id: '5', teacher: 'VIGAN Pauline', subject: 'Français', classe: 'Tle',  date: '12/07/25', time: '14h - 17h', status: 'en attente', duration: '3h' },
  { id: '6', teacher: 'VIGAN Pauline', subject: 'EST',      classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'terminé',   duration: '3h' },
  { id: '7', teacher: 'VIGAN Pauline', subject: 'Anglais',  classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'en cours',  duration: '3h' },
  { id: '8', teacher: 'VIGAN Pauline', subject: 'SVT',      classe: 'CM2',  date: '12/07/25', time: '14h - 17h', status: 'en attente', duration: '3h' },
  { id: '9', teacher: 'VIGAN Pauline', subject: 'Physique', classe: '2nde', date: '13/07/25', time: '08h - 10h', status: 'payé',      duration: '2h' },
  { id: '10', teacher: 'VIGAN Pauline', subject: 'Chimie',   classe: '1ère', date: '13/07/25', time: '10h - 12h', status: 'rejeté',    duration: '2h' },
];
