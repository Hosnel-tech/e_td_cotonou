import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const payment = db.payments.find((p: any) => p.id === id);
  if (!payment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(payment);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.payments.findIndex((p: any) => p.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  db.payments[index] = { ...db.payments[index], ...body };
  writeDb(db);
  return NextResponse.json(db.payments[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.payments.findIndex((p: any) => p.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.payments.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
