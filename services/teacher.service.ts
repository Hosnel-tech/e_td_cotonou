import { Teacher, AccountStatus } from '@/types/user.types';

const BASE = '/api/teachers';

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch teachers');
    return res.json();
  },

  async getTeacherById(id: string): Promise<Teacher> {
    const res = await fetch(`${BASE}/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Teacher not found');
    return res.json();
  },

  async createTeacher(data: Omit<Teacher, 'id'>): Promise<Teacher> {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create teacher');
    return res.json();
  },

  async updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher> {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update teacher');
    return res.json();
  },

  async updateStatus(id: string, status: AccountStatus): Promise<Teacher> {
    return this.updateTeacher(id, { status });
  },

  async deleteTeacher(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete teacher');
  },

  async bulkUpdateStatus(ids: string[], status: AccountStatus): Promise<void> {
    const res = await fetch(`${BASE}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, action: 'update-status', status }),
    });
    if (!res.ok) throw new Error('Failed to update teachers');
  },

  async bulkDelete(ids: string[]): Promise<void> {
    const res = await fetch(`${BASE}/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, action: 'delete' }),
    });
    if (!res.ok) throw new Error('Failed to delete teachers');
  },
};
