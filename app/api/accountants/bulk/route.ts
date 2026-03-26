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
    const { action, ids } = await request.json();
    const db = getDB();
    
    if (action === 'delete') {
      db.users = db.users.filter((user: any) => 
        !(user.role === 'comptable' && ids.includes(user.id))
      );
    }
    
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process bulk request' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();
    const db = getDB();
    db.users = db.users.filter((user: any) => !(user.role === 'comptable' && ids.includes(user.id)));
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete accountants' }, { status: 500 });
  }
}
