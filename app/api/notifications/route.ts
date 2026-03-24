import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.notifications);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newNotif = { ...body, id: Date.now().toString() };
  db.notifications.push(newNotif);
  writeDb(db);
  return NextResponse.json(newNotif, { status: 201 });
}

export async function DELETE() {
  const db = readDb();
  db.notifications = [];
  writeDb(db);
  return NextResponse.json({ message: 'Notifications cleared' });
}
