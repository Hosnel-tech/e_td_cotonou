import { TD } from './td.types';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  message?: string;
  time: string;
  type: 'success' | 'error' | 'info' | 'warning';
  tdData?: TD & { type?: string };
  actionUrl?: string;
}


export interface UpcomingTD {
  id: string;
  subject: string;
  class: string;
  time: string;
  relative: string;
  status: 'Marqué terminé' | 'Programmé';
}
