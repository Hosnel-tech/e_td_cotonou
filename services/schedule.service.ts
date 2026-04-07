import { Schedule } from '@/types/schedule.types';

const BASE = '/api/schedules';

export const scheduleService = {
  async getSchedules(): Promise<Schedule[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch schedules');
    return res.json();
  },

  async createSchedule(date: string): Promise<Schedule> {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
    });
    if (!res.ok) throw new Error('Failed to create schedule');
    return res.json();
  },

  async updateSchedule(id: string, date: string): Promise<Schedule> {
    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date }),
    });
    if (!res.ok) throw new Error('Failed to update schedule');
    return res.json();
  },

  async deleteSchedule(id: string): Promise<void> {
    const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete schedule');
  },
};
