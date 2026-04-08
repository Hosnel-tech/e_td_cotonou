import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

import { serverNotify } from '@/lib/notifications.server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const user = db.users.find((u: any) => u.id === id && u.role === 'enseignant');
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = readDb();
    const body = await request.json();
    const index = db.users.findIndex((u: any) => u.id === id);
    if (index === -1) return NextResponse.json({ error: 'Enseignant introuvable' }, { status: 404 });
    
    const teacher = db.users[index];
    const oldStatus = teacher.status;
    const newStatus = body.status;

    // Update user in memory
    db.users[index] = { ...db.users[index], ...body };

    // Senior Pro: Cascade Status Update to TDs
    // If account is deactivated or rejected, set all associated TDs to 'rejeté'
    if (newStatus && ['inactif', 'rejeté'].includes(newStatus)) {
      db.tds = db.tds.map((td: any) => 
        td.teacher === teacher.name ? { ...td, status: 'rejeté' } : td
      );
    }

    // Handle Notifications
    if (newStatus && newStatus !== oldStatus) {
      const newNotification = {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        userId: id,
        title: newStatus === 'actif' ? 'Compte validé' : 'Compte restreint',
        message: newStatus === 'actif' 
          ? 'Votre compte a été validé par l’administrateur. Bienvenue !' 
          : `Votre compte est désormais ${newStatus}. Vos séances de TD ont été suspendues.`,
        type: newStatus === 'actif' ? 'success' : 'warning',
        read: false,
        createdAt: new Date().toISOString(),
        actionUrl: newStatus === 'actif' ? '/enseignant/dashboard' : undefined
      };
      if (!db.notifications) db.notifications = [];
      db.notifications.push(newNotification);
    }

    writeDb(db);
    return NextResponse.json(db.users[index]);
  } catch (error) {
    console.error('PUT Teacher Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = readDb();
    const index = db.users.findIndex((u: any) => u.id === id);
    if (index === -1) return NextResponse.json({ error: 'Enseignant introuvable' }, { status: 404 });
    
    const teacherName = db.users[index].name;

    // Remove user
    const deleted = db.users.splice(index, 1)[0];

    // Senior Pro: Cascade Delete TDs
    db.tds = db.tds.filter((td: any) => td.teacher !== teacherName);

    writeDb(db);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error('DELETE Teacher Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
