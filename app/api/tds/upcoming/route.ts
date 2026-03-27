import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  const currentUser = db.currentUser;
  const now = new Date();

  const upcoming = (db.tds || [])
    .filter((td: any) => {
      // Only "en cours" TDs (validated by admin)
      if (td.status !== 'en cours') return false;
      // If a teacher is logged in, only show their TDs
      if (currentUser?.role === 'enseignant') {
        return td.teacher === currentUser.name;
      }
      return true; // admins/comptables see all
    })
    .map((td: any) => {
      const tdDate = new Date(`${td.date}T${td.time || '08:00'}`);
      const diffMs = tdDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      let relative = 'Aujourd\'hui';
      if (diffDays > 1) relative = `Dans ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
      else if (diffDays < 0) relative = 'Passé';

      return {
        id: td.id,
        subject: td.subject,
        class: td.classe,
        time: td.time || '--:--',
        relative,
        status: 'En cours',
      };
    });

  return NextResponse.json(upcoming);
}
