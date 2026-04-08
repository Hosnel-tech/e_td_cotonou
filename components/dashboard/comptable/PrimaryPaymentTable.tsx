"use client";

import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { TD } from '@/types/td.types';
import { User, Teacher } from '@/types/user.types';

interface PrimaryPaymentTableProps {
  selectedSchool: string;
  teachers: User[];
  tds: TD[];
}

const PRIMARY_FORFAIT = 50000;

export default function PrimaryPaymentTable({ selectedSchool, teachers, tds }: PrimaryPaymentTableProps) {
  // 1. Filter for Primary TDs that are finished
  const primaryTDs = tds.filter(td => 
    td.niveau === 'primaire' && 
    td.status === 'terminé' &&
    // The TD's teacher should belong to the selected school
    teachers.some(t => t.role === 'enseignant' && (t as Teacher).name === td.teacher && (t as Teacher).school === selectedSchool)
  );

  // 2. Group by teacher and subject (to match the image's row per subject)
  // In the image, rows are distinct entries.
  const tableRows = primaryTDs.map((td, index) => {
    const teacher = teachers.find(t => (t as Teacher).name === td.teacher) as Teacher;
    return {
      id: td.id,
      order: index + 1,
      name: td.teacher,
      subject: td.subject,
      forfait: PRIMARY_FORFAIT,
      paymentPreference: teacher?.paymentPreference || 'électronique'
    };
  });

  const totalForfait = tableRows.reduce((sum, row) => sum + row.forfait, 0);

  if (tableRows.length === 0) {
    return (
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl border border-black/10 p-20 flex flex-col items-center justify-center text-center gap-4 shadow-sm"
      >
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <Inbox size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 font-montserrat">Aucune donnée</h3>
          <p className="text-slate-500 font-medium font-montserrat max-w-md">
            Il n'y a actuellement aucun paiement enregistré pour le niveau primaire dans l'établissement "{selectedSchool}".
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl border border-black/10 overflow-hidden shadow-sm"
    >
      <div className="overflow-x-auto font-montserrat">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f1f5f9] text-black">
              <th className="border border-black p-6 text-center text-xl font-bold uppercase w-[150px]">Nº D'ORDRE</th>
              <th className="border border-black p-6 text-center text-xl font-bold uppercase">NOM ET PRENOMS</th>
              <th className="border border-black p-6 text-center text-xl font-bold uppercase">MATIERE</th>
              <th className="border border-black p-6 text-center text-xl font-bold uppercase w-[200px]">FORFAIT</th>
              <th className="border border-black p-6 text-center text-xl font-bold uppercase w-[200px]">ACTIONS</th>
            </tr>
          </thead>
          
          <tbody>
            {/* Establishment Group Header */}
            <tr className="bg-white font-bold h-20">
              <td colSpan={3} className="border border-black px-10 text-center text-2xl uppercase tracking-widest bg-white">
                {selectedSchool}
              </td>
              <td colSpan={2} className="border border-black px-6 text-center text-2xl bg-white whitespace-nowrap">
                {totalForfait.toLocaleString('fr-FR')} 000
              </td>
            </tr>

            {/* Teacher Rows */}
            {tableRows.map((row, idx) => (
              <tr 
                key={row.id} 
                className={`h-24 ${idx % 2 === 0 ? 'bg-[#f1f3f5]' : 'bg-[#e9ecef]'} hover:bg-slate-200 transition-colors`}
              >
                <td className="border border-black p-4 text-center text-xl font-medium">{row.order}</td>
                <td className="border border-black p-4 text-center text-xl font-medium uppercase">{row.name}</td>
                <td className="border border-black p-4 text-center text-xl font-medium">{row.subject}</td>
                <td className="border border-black p-4 text-center text-xl font-medium whitespace-nowrap">
                  {row.forfait.toLocaleString('fr-FR')}
                </td>
                <td className="border border-black p-4 text-center">
                  {row.paymentPreference === 'électronique' && (
                    <button 
                      onClick={() => alert(`Paiement de ${row.forfait.toLocaleString('fr-FR')} F pour ${row.name} initié.`)}
                      className="px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm font-bold font-montserrat transition-all active:scale-95 shadow-sm uppercase tracking-wider"
                    >
                      Payer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-10 border-t border-black/10 flex items-center justify-between bg-white">
        <div className="text-black text-xl font-medium">
          Total : {tableRows.length} entrées pour le niveau primaire
        </div>
        <div className="text-black text-2xl font-black text-emerald-700">
          Total Général : {totalForfait.toLocaleString('fr-FR')} F
        </div>
      </div>
    </motion.section>
  );
}
