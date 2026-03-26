import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

import { serverNotifyRole } from '@/lib/notifications.server';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tds);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newTD = {
    ...body,
    id: Math.random().toString(36).substring(7),
    status: 'en attente',
    createdAt: new Date().toISOString(),
  };
  db.tds.push(newTD);
  writeDb(db);

  // Notify Admin
  serverNotifyRole(
    'admin',
    'Nouveau TD créé',
    `Un nouveau TD pour ${newTD.subject} a été créé par ${newTD.teacher} et attend validation.`,
    'info',
    '/admin/dashboard/td-management'
  );

  return NextResponse.json(newTD, { status: 201 });
}
