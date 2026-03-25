import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function POST() {
    const db = readDb();
    db.currentUser = null as any;
    writeDb(db);
    return NextResponse.json({ success: true });
}
