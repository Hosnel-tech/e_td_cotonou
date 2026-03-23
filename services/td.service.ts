import { TD, TDStatus } from '@/types/td.types';
import { TDS } from '@/data/tds';

export const tdService = {
  async getTDs(): Promise<TD[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...TDS];
  },

  async getTDById(id: string): Promise<TD | undefined> {
    return TDS.find(td => td.id === id);
  },

  async createTD(data: Omit<TD, 'id'>): Promise<TD> {
    const newTD = { ...data, id: Math.random().toString(36).substr(2, 9) };
    TDS.push(newTD);
    return newTD;
  },

  async updateStatus(id: string, status: TDStatus): Promise<void> {
    const index = TDS.findIndex(td => td.id === id);
    if (index !== -1) {
      TDS[index].status = status;
    }
  }
};
