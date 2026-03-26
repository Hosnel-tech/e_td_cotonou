import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { serverNotifyRole } from '@/lib/notifications.server';
import { Teacher } from '@/types/user.types';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = readDb();
    
    if (db.users.find(u => u.email === data.email)) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    const newUser: Teacher = {
      id: Math.random().toString(36).substring(7),
      name: data.name,
      email: data.email,
      role: 'enseignant',
      status: 'en attente',
      phone: data.phone,
      subject: data.matiere,
      className: data.classe,
      niveau: data.niveau || 'secondaire',
      school: data.etablissement,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDb(db);

    // Notify Admin
    serverNotifyRole(
      'admin',
      'Nouvelle inscription',
      `L'enseignant ${newUser.name} s'est inscrit et attend validation.`,
      'info',
      '/admin/teachers'
    );

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l’inscription' }, { status: 500 });
  }
}
