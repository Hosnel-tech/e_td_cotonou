import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db', 'database.json');

function getDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function saveDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, ids, status } = body;
    const db = getDB();
    
    if (action === 'delete') {
      db.tds = db.tds.filter((td: any) => !ids.includes(td.id));
    } else {
      db.tds = db.tds.map((td: any) => 
        ids.includes(td.id) ? { ...td, status } : td
      );
    }
    
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process bulk request' }, { status: 500 });
  }
}

// Keep DELETE for backward compatibility or direct calls if needed, but point to POST logic
export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();
    const db = getDB();
    db.tds = db.tds.filter((td: any) => !ids.includes(td.id));
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete TDs' }, { status: 500 });
  }
}
