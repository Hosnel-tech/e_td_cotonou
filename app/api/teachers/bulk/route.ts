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
    
    // Get names of teachers to be affected (Senior Pro: necessary because TDs use names)
    const affectedTeachers = db.users
      .filter((u: any) => ids.includes(u.id))
      .map((u: any) => u.name);

    if (action === 'delete') {
      // Cascade delete users
      db.users = db.users.filter((user: any) => 
        !(user.role === 'enseignant' && ids.includes(user.id))
      );
      // Cascade delete TDs
      db.tds = db.tds.filter((td: any) => !affectedTeachers.includes(td.teacher));
    } else {
      // Cascade status update users
      db.users = db.users.map((user: any) => 
        (user.role === 'enseignant' && ids.includes(user.id)) 
          ? { ...user, status: status || user.status } 
          : user
      );

      // Cascade status update TDs
      if (status && ['inactif', 'rejeté'].includes(status)) {
        db.tds = db.tds.map((td: any) => 
          affectedTeachers.includes(td.teacher) ? { ...td, status: 'rejeté' } : td
        );
      }
    }
    
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Bulk Action Error:', error);
    return NextResponse.json({ error: 'Failed to process bulk action' }, { status: 500 });
  }
}
