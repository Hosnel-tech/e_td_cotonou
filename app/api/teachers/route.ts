import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.teachers);
}

export async function POST(request: Request) {
  const db = readDb();
  const body = await request.json();
  const newTeacher = {
    ...body,
    id: Date.now().toString(),
  };
  db.teachers.push(newTeacher);
  writeDb(db);
  return NextResponse.json(newTeacher, { status: 201 });
}
