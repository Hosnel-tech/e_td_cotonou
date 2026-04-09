import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.currentUser);
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    const db = readDb();
    
    // Update currentUser
    const updatedUser = { ...db.currentUser, ...updates };
    db.currentUser = updatedUser;
    
    // Sync with users array
    const userIndex = db.users.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      db.users[userIndex] = updatedUser;
    }
    
    writeDb(db);
    
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}
