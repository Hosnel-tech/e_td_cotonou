import { Accountant, AccountStatus } from '@/types/user.types';
import { ACCOUNTANTS } from '@/data/accountants';

export const accountantService = {
  async getAccountants(): Promise<Accountant[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...ACCOUNTANTS];
  },

  async updateStatus(id: string, status: AccountStatus): Promise<void> {
    const index = ACCOUNTANTS.findIndex(a => a.id === id);
    if (index !== -1) {
      ACCOUNTANTS[index].status = status;
    }
  }
};
