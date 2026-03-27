// Server-only notification helper — uses readDb/writeDb directly (NOT safe for client components)
// Import this ONLY from API routes or server-side code.
import { readDb, writeDb } from '@/lib/db';

export function serverNotify(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', actionUrl?: string) {
  const db = readDb();
  const newNotification = {
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    userId,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl,
  };
  if (!db.notifications) db.notifications = [];
  db.notifications.push(newNotification);
  writeDb(db);
  return newNotification;
}

export function serverNotifyRole(role: string, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', actionUrl?: string) {
  const db = readDb();
  if (!db.notifications) db.notifications = [];
  
  const usersToNotify = db.users.filter((u: any) => u.role === role);
  usersToNotify.forEach((user: any) => {
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      userId: user.id,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl,
    };
    db.notifications.push(newNotification);
  });
  
  writeDb(db);
}
