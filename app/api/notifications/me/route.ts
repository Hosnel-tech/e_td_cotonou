import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}j`;
}

/**
 * GET /api/notifications/me
 * Returns only the notifications for the currently logged-in user.
 * Sorted newest-first.
 */
export async function GET() {
  const db = readDb();
  const currentUser = db.currentUser;

  if (!currentUser) {
    return NextResponse.json([], { status: 200 });
  }

  const notifications = (db.notifications || [])
    .filter((n: any) => n.userId === currentUser.id)
    .slice()
    .reverse() // newest first
    .map((n: any) => ({
      id: n.id,
      userId: n.userId,
      title: n.title,
      desc: n.desc || n.message || '',
      message: n.message || n.desc || '',
      time: n.time || formatRelativeTime(n.createdAt),
      type: n.type,
      read: n.read,
      createdAt: n.createdAt,
      actionUrl: n.actionUrl,
    }));

  return NextResponse.json(notifications);
}
