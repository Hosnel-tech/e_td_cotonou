import { Transfer } from '@/types/financial.types';

const BASE = '/api/transfers';

export const transferService = {
  async getTransfers(): Promise<Transfer[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch transfers');
    return res.json();
  },

  async createTransfer(data: Omit<Transfer, 'id'>): Promise<Transfer> {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create transfer');
    return res.json();
  }
};
