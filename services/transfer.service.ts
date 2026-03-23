import { Transfer } from '@/types/financial.types';
import { TRANSFERS } from '@/data/transfers';

export const transferService = {
  async getTransfers(): Promise<Transfer[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...TRANSFERS];
  },

  async exportTransfer(id: string): Promise<void> {
    console.log(`Exporting transfer ${id}...`);
  }
};
