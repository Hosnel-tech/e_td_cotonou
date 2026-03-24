import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.accountants);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newAccountant = {
    ...body,
    id: Date.now().toString(),
  };
  db.accountants.push(newAccountant);
  writeDb(db);
  return NextResponse.json(newAccountant, { status: 201 });
}
