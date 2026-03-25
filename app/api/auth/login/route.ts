import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = readDb();
    
    const user = db.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    // Status check
    if (user.status === 'en attente') {
      return NextResponse.json({ 
        error: 'Votre compte est en attente de validation par l’administrateur. Veuillez revenir plus tard.',
        status: 'pending' 
      }, { status: 403 });
    }

    if (user.status === 'rejeté') {
      return NextResponse.json({ 
        error: 'Votre demande d’inscription a été rejetée.',
        status: 'rejected' 
      }, { status: 403 });
    }

    if (user.status === 'inactif') {
      return NextResponse.json({ 
        error: 'Votre compte est actuellement inactif.',
        status: 'inactive' 
      }, { status: 403 });
    }

    // Mock successful login
    db.currentUser = user;
    writeDb(db);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 });
  }
}
