import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tds);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newTD = {
    ...body,
    id: Date.now().toString(),
  };
  db.tds.push(newTD);
  writeDb(db);
  return NextResponse.json(newTD, { status: 201 });
}
