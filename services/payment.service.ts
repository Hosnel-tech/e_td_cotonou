import { Payment } from '@/types/financial.types';

const BASE = '/api/payments';

export const paymentService = {
  async getPayments(): Promise<Payment[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch payments');
    return res.json();
  },

  async getPendingPayments(): Promise<Payment[]> {
    const all = await this.getPayments();
    return all.filter(p => p.status !== 'Payé');
  },

  async createPayment(data: Omit<Payment, 'id'>): Promise<Payment> {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create payment');
    return res.json();
  },

  async updatePayment(id: string, data: Partial<Payment>): Promise<Payment> {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update payment');
    return res.json();
  },

  async markAsPaid(id: string): Promise<Payment> {
    return this.updatePayment(id, { status: 'Payé' });
  },

  async deletePayment(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete payment');
  },
};
