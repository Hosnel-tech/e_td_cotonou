import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.payments);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newPayment = {
    ...body,
    id: Date.now().toString(),
  };
  db.payments.push(newPayment);
  writeDb(db);
  return NextResponse.json(newPayment, { status: 201 });
}
