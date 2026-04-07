export type TDStatus = 'en attente' | 'en cours' | 'terminé' | 'rejeté';

export interface TD {
  id: string;
  teacher: string;
  subject: string;
  classe: string;
  niveau: 'primaire' | 'secondaire';
  date: string;
  time: string;
  status: TDStatus;
  duration: string;
  epreuveName?: string;
  epreuveUrl?: string;
}

export interface TDDetails extends TD {
  description?: string;
  location?: string;
}
