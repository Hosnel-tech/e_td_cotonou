import { readDb, writeDb } from '@/lib/db';
import { NextResponse } from 'next/server'; // Added this import

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const item = db.accountants.find((a: any) => a.id === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.accountants.findIndex((a: any) => a.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  db.accountants[index] = { ...db.accountants[index], ...body };
  writeDb(db);
  return NextResponse.json(db.accountants[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.accountants.findIndex((a: any) => a.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.accountants.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
