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
    const { ids, action, status } = await request.json();
    const db = getDB();
    
    if (action === 'delete') {
      db.users = db.users.filter((user: any) => 
        !(user.role === 'enseignant' && ids.includes(user.id))
      );
    } else {
      // Default to update status
      db.users = db.users.map((user: any) => 
        (user.role === 'enseignant' && ids.includes(user.id)) 
          ? { ...user, status: status || user.status } 
          : user
      );
    }
    
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process bulk action' }, { status: 500 });
  }
}
