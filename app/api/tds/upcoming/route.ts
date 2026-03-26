import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = readDb();
  const now = new Date();

  const upcoming = (db.tds || [])
    .filter((td: any) => td.status === 'en cours' || td.status === 'en attente')
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
        status: td.status === 'terminé' ? 'Marqué terminé' : 'Programmé',
      };
    });

  return NextResponse.json(upcoming);
}
