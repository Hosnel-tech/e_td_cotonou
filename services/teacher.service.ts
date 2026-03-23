import { Teacher, AccountStatus } from '@/types/user.types';
import { TEACHERS } from '@/data/teachers';

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...TEACHERS];
  },

  async updateStatus(id: string, status: AccountStatus): Promise<void> {
    const index = TEACHERS.findIndex(t => t.id === id);
    if (index !== -1) {
      TEACHERS[index].status = status;
    }
  }
};
