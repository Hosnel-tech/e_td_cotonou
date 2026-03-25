import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  const accountants = db.users.filter(u => u.role === 'comptable');
  return NextResponse.json(accountants);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newAccountant = {
    ...body,
    id: Math.random().toString(36).substring(7),
    role: 'comptable',
    status: 'actif',
    createdAt: new Date().toISOString(),
  };
  db.users.push(newAccountant);
  writeDb(db);
  return NextResponse.json(newAccountant, { status: 201 });
}
