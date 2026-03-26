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
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  const oldStatus = db.users[index].status;
  const newStatus = body.status;

  db.users[index] = { ...db.users[index], ...body };
  writeDb(db);

  // Status Change Notifications
  if (newStatus && newStatus !== oldStatus) {
    if (newStatus === 'actif') {
      serverNotify(id, 'Compte validé', 'Votre compte a été validé par l’administrateur. Bienvenue !', 'success', '/enseignant/dashboard');
      // sendEmail mock
      console.log(`[EMAIL] To: ${db.users[index].email} | Compte validé`);
    } else if (newStatus === 'rejeté') {
      serverNotify(id, 'Compte rejeté', 'Votre demande d’inscription a été rejetée.', 'error');
      console.log(`[EMAIL] To: ${db.users[index].email} | Accès refusé`);
    }
  }

  return NextResponse.json(db.users[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.users.findIndex((u: any) => u.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.users.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
