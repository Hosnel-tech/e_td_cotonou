import { TD } from './td.types';

export interface Notification {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'success' | 'error';
  tdData: TD & { type?: string };
}

export interface UpcomingTD {
  id: string;
  subject: string;
  class: string;
  time: string;
  relative: string;
  status: 'Marqué terminé' | 'Programmé';
}
