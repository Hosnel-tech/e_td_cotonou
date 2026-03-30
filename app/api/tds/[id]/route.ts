import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { serverNotify, serverNotifyRole } from '@/lib/notifications.server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const td = db.tds.find((t: any) => t.id === id);
  if (!td) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(td);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const body = await request.json();
  const index = db.tds.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  const oldTD = db.tds[index];
  const newStatus = body.status;

  db.tds[index] = { ...oldTD, ...body };
  writeDb(db);

  // Handle workflow notifications
  if (newStatus && newStatus !== oldTD.status) {
    const teacher = db.users.find((u: any) => u.name.trim() === oldTD.teacher.trim());
    const teacherId = teacher?.id;

    switch (newStatus) {
      case 'en cours': // Validated by Admin
        if (teacherId) {
          serverNotify(teacherId, 'TD Validé', `Votre TD de ${oldTD.subject} a été validé.`, 'success');
        }
        break;
      case 'rejeté': // Rejected by Admin
        if (teacherId) {
          serverNotify(teacherId, 'TD Rejeté', `Votre TD de ${oldTD.subject} a été rejeté.`, 'error');
        }
        break;
      case 'terminé': // Finished by Teacher
        serverNotifyRole('admin', 'TD Terminé', `${oldTD.teacher} a terminé son TD de ${oldTD.subject}.`, 'info');
        serverNotifyRole('comptable', 'TD à payer', `Un nouveau TD est prêt pour le paiement (${oldTD.subject}).`, 'info');
        break;
      case 'payé': // Paid by Accountant
        if (teacherId) {
          serverNotify(teacherId, 'Paiement Reçu', `Votre TD de ${oldTD.subject} a été marqué comme payé.`, 'success', '/enseignant/dashboard/payments');
        }
        serverNotifyRole('admin', 'Paiement Effectué', `Le TD de ${oldTD.subject} (${oldTD.teacher}) a été payé.`, 'info');
        break;
    }
  }

  return NextResponse.json(db.tds[index]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const index = db.tds.findIndex((t: any) => t.id === id);
  if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = db.tds.splice(index, 1)[0];
  writeDb(db);
  return NextResponse.json(deleted);
}
