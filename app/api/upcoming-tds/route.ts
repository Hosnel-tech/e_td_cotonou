import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.upcomingTDs);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newItem = { ...body, id: Date.now().toString() };
  db.upcomingTDs.push(newItem);
  writeDb(db);
  return NextResponse.json(newItem, { status: 201 });
}
