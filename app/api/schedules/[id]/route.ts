import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = readDb();
    const { date } = await request.json();
    
    const index = db.schedules.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }

    db.schedules[index] = { ...db.schedules[index], date };
    writeDb(db);

    return NextResponse.json(db.schedules[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = readDb();
    
    const index = db.schedules.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Schedule not found' }, { status: 404 });
    }

    const deleted = db.schedules.splice(index, 1)[0];
    writeDb(db);

    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
