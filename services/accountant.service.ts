import { Accountant, AccountStatus } from '@/types/user.types';

const BASE = '/api/accountants';

export const accountantService = {
  async getAccountants(): Promise<Accountant[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch accountants');
    return res.json();
  },

  async updateAccountant(id: string, data: Partial<Accountant>): Promise<Accountant> {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update accountant');
    return res.json();
  },

  async updateStatus(id: string, status: AccountStatus): Promise<Accountant> {
    return this.updateAccountant(id, { status });
  }
};
