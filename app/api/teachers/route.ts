import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  const teachers = db.users.filter(u => u.role === 'enseignant');
  return NextResponse.json(teachers);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newTeacher = {
    ...body,
    id: Math.random().toString(36).substring(7),
    role: 'enseignant',
    status: 'en attente',
    createdAt: new Date().toISOString(),
  };
  db.users.push(newTeacher);
  writeDb(db);
  return NextResponse.json(newTeacher, { status: 201 });
}
