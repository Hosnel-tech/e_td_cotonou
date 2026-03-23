import { Payment } from '@/types/financial.types';
import { PAYMENTS, PENDING_PAYMENTS } from '@/data/payments';

export const paymentService = {
  async getPayments(): Promise<Payment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...PAYMENTS];
  },

  async getPendingPayments(): Promise<Payment[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...PENDING_PAYMENTS];
  },

  async markAsPaid(id: string): Promise<void> {
    const index = PAYMENTS.findIndex(p => p.id === id);
    if (index !== -1) {
      PAYMENTS[index].status = 'Payé';
    }
  }
};
