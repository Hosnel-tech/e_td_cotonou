import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const teacher = db.teachers.find((t: any) => t.id === id);
  if (!teacher) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(teacher);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.teachers.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  db.teachers[index] = { ...db.teachers[index], ...body };
  writeDb(db);
  return NextResponse.json(db.teachers[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.teachers.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.teachers.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
