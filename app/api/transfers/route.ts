import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.transfers);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newTransfer = {
    ...body,
    id: Date.now().toString(),
  };
  db.transfers.push(newTransfer);
  writeDb(db);
  return NextResponse.json(newTransfer, { status: 201 });
}
