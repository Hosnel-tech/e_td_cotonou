// This service is safe to use in client components — it uses fetch (API routes) only, NOT fs/db directly.
import { Notification, UpcomingTD } from '@/types/notification.types';

const BASE = '/api/notifications';

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch notifications');
    return res.json();
  },

  async getUpcomingTDs(): Promise<UpcomingTD[]> {
    const res = await fetch('/api/tds/upcoming', { cache: 'no-store' });
    if (!res.ok) return []; // gracefully return empty if route doesn't exist yet
    return res.json();
  },

  async notify(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', actionUrl?: string) {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl,
      }),
    });
    if (!res.ok) throw new Error('Failed to create notification');
    return res.json();
  },

  async sendEmail(to: string, subject: string, body: string) {
    // Mock email sending — server-side logic only
    console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject} | Body: ${body}`);
  }
};
