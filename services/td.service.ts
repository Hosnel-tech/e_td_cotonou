import { TD, TDStatus } from '@/types/td.types';

const BASE = '/api/tds';

export const tdService = {
  async getTDs(): Promise<TD[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch TDs');
    return res.json();
  },

  async getTDById(id: string): Promise<TD> {
    const res = await fetch(`${BASE}/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('TD not found');
    return res.json();
  },

  async createTD(data: Omit<TD, 'id'>): Promise<TD> {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create TD');
    return res.json();
  },

  async updateTD(id: string, data: Partial<TD>): Promise<TD> {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update TD');
    return res.json();
  },

  async updateStatus(id: string, status: TDStatus): Promise<TD> {
    return this.updateTD(id, { status });
  },

  async deleteTD(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete TD');
  },
  
  async bulkUpdateStatus(ids: string[], status: TDStatus): Promise<void> {
    const res = await fetch(`${BASE}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status }),
    });
    if (!res.ok) throw new Error('Failed to update TDs');
  },

  async bulkDelete(ids: string[]): Promise<void> {
    const res = await fetch(`${BASE}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, action: 'delete' }),
    });
    if (!res.ok) throw new Error('Failed to delete TDs');
  },
};
