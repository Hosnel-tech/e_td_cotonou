import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const td = db.tds.find((t: any) => t.id === id);
  if (!td) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(td);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.tds.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  db.tds[index] = { ...db.tds[index], ...body };
  writeDb(db);
  return NextResponse.json(db.tds[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.tds.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.tds.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
