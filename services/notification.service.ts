export const notificationService = {
  async getNotifications() {
    const res = await fetch('/api/notifications', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  },

  async getUpcomingTDs() {
    const res = await fetch('/api/upcoming-tds', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  },

  async clearNotifications() {
    await fetch('/api/notifications', { method: 'DELETE' });
  }
};
