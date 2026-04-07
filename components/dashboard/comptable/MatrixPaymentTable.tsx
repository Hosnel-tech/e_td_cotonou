"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { User, Teacher } from '@/types/user.types';
import { TD } from '@/types/td.types';

interface HourEntry {
  date: string;
  classe: string;
  hours: number;
}

interface TeacherPayment {
  id: string;
  name: string;
  establishment: string;
  subject: string;
  rates: { [key: string]: number };
  entries: HourEntry[];
  totalAmount: number;
}

const durationToHours = (duration: string): number => {
  if (!duration) return 0;
  // Handle "1.5h" or "1h 30min" or "45min"
  const hMatch = duration.match(/(\d+(?:\.\d+)?)h/);
  const mMatch = duration.match(/(\d+)min/);
  
  const hours = hMatch ? parseFloat(hMatch[1]) : 0;
  const minutes = mMatch ? parseInt(mMatch[1]) : 0;
  
  return hours + minutes / 60;
};

const STANDARD_RATES: { [key: string]: number } = {
  '3ème': 6000,
  'Tle': 7000,
  'default': 6500
};

interface MatrixPaymentTableProps {
  selectedSchool: string;
  teachers: User[];
  tds: TD[];
  dates?: string[];
}

export default function MatrixPaymentTable({ selectedSchool, teachers, tds, dates = [] }: MatrixPaymentTableProps) {
  // Senior Pro: Strict enforcement of the 4-date limit for layout stability
  const displayDates = dates.slice(0, 4);
  // 1. Filter specifically for TEACHERS by establishment
  const schoolTeachers = (teachers.filter(t => t.role === 'enseignant' && (t as Teacher).school === selectedSchool) as Teacher[]);

  // 2. Map real data to TeacherPayment format
  const tableData: TeacherPayment[] = schoolTeachers.map(teacher => {
    // Find all TDs for this teacher
    // (Joining by name as per current system logic)
    const teacherTDs = tds.filter(t => t.teacher === teacher.name && t.status === 'terminé');

    const entries: HourEntry[] = teacherTDs.map(td => ({
      date: td.date.split('-').reverse().join('/'), // YYYY-MM-DD to DD/MM/YYYY
      classe: td.classe,
      hours: durationToHours(td.duration)
    }));

    // Calculate total amount
    const totalAmount = entries.reduce((sum, entry) => {
      const rate = STANDARD_RATES[entry.classe] || STANDARD_RATES.default;
      return sum + (entry.hours * rate);
    }, 0);

    return {
      id: teacher.id,
      name: teacher.name,
      establishment: teacher.school || '',
      subject: teacher.subject || 'N/A',
      rates: STANDARD_RATES,
      entries,
      totalAmount
    };
  });

  if (schoolTeachers.length === 0) {
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
          <h3 className="text-xl font-bold text-slate-900 font-montserrat">Aucun enseignant</h3>
          <p className="text-slate-500 font-medium font-montserrat max-w-md">
            Il n'y a aucun enseignant enregistré pour l'établissement "{selectedSchool}" actuellement.
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* Level 1 Header */}
            <tr className="bg-white">
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[280px]">NOM ET PRENOMS</th>
              <th colSpan={displayDates.length * 2 + 2} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat">NOMBRE D'HEURES</th>
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat">MATIERE</th>
              <th colSpan={2} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[180px]">TAUX HORAIRE</th>
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[150px]">MONTANT</th>
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[130px]">ACTIONS</th>
            </tr>
            
            {/* Level 2 Header: Dates */}
            <tr className="bg-white">
              {displayDates.map(date => (
                <th key={date} colSpan={2} className="border border-black p-2 text-center text-black text-xs font-medium font-montserrat">{date}</th>
              ))}
              <th colSpan={2} className="border border-black p-2 text-center text-sky-900 text-sm font-bold font-montserrat bg-sky-50 uppercase tracking-tighter">HEURES</th>
              <th rowSpan={2} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">3 ème</th>
              <th rowSpan={2} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">Tle</th>
            </tr>

            {/* Level 3 Header: Sub-classes */}
            <tr className="bg-zinc-300">
              {displayDates.flatMap((date: string) => [
                <th key={`${date}-3e`} className="border border-black p-2 text-center text-black text-[9.7px] font-medium font-montserrat">3 ème</th>,
                <th key={`${date}-Tle`} className="border border-black p-2 text-center text-black text-[9.7px] font-medium font-montserrat">Tle</th>
              ])}
              <th className="border border-black p-2 text-center text-sky-900 text-[10px] font-bold font-montserrat bg-sky-100">3 ème</th>
              <th className="border border-black p-2 text-center text-sky-900 text-[10px] font-bold font-montserrat bg-sky-100">Tle</th>
            </tr>
          </thead>
          
          <tbody>
            {/* Group Header: Establishment */}
            <tr className="bg-zinc-100">
              <td colSpan={displayDates.length * 2 + 8} className="border border-black p-4 text-center text-black text-2xl font-bold font-montserrat uppercase tracking-widest">{selectedSchool}</td>
            </tr>

            {tableData.map((teacher, idx) => (
              <tr key={teacher.id} className="h-20 hover:bg-slate-50 transition-colors">
                <td className="border border-black p-4 text-black text-lg font-semibold font-montserrat whitespace-nowrap">{teacher.name}</td>
                
                {/* Hours Matrix */}
                {displayDates.flatMap((date: string) => {
                    const e3 = teacher.entries.find(e => e.date === date && e.classe === '3ème')?.hours ?? 0;
                    const eTle = teacher.entries.find(e => e.date === date && e.classe === 'Tle')?.hours ?? 0;
                    return [
                        <td key={`${teacher.id}-${date}-3e`} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">{e3}</td>,
                        <td key={`${teacher.id}-${date}-Tle`} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">{eTle}</td>
                    ];
                })}

                {/* TOTAL HEURES Calculation */}
                {(() => {
                    const total3e = teacher.entries.filter(e => e.classe === '3ème').reduce((acc, curr) => acc + curr.hours, 0);
                    const totalTle = teacher.entries.filter(e => e.classe === 'Tle').reduce((acc, curr) => acc + curr.hours, 0);
                    return [
                        <td key={`${teacher.id}-total-3e`} className="border border-black p-2 text-center text-sky-900 text-[15px] font-bold font-montserrat bg-sky-50/50">{total3e}</td>,
                        <td key={`${teacher.id}-total-Tle`} className="border border-black p-2 text-center text-sky-900 text-[15px] font-bold font-montserrat bg-sky-50/50">{totalTle}</td>
                    ];
                })()}

                {/* Subject & Rates */}
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.subject}</td>
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.rates['3ème']}</td>
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.rates.Tle}</td>
                
                {/* Total */}
                <td className="border border-black p-2 text-center text-black text-lg font-bold font-montserrat shadow-inner">{teacher.totalAmount.toLocaleString('fr-FR')} F</td>

                {/* Actions */}
                <td className="border border-black p-2 text-center">
                  <button 
                    onClick={() => alert(`Paiement de ${teacher.totalAmount.toLocaleString('fr-FR')} F pour ${teacher.name} initié.`)}
                    className="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-md text-sm font-bold font-montserrat transition-all active:scale-95 shadow-sm uppercase tracking-wider"
                  >
                    Payer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-10 border-t border-black/10 flex items-center justify-between bg-white">
        <div className="text-black text-2xl font-normal font-montserrat">
          Total {tableData.length}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center text-black hover:bg-slate-50 rounded-md transition-colors border border-stone-200">
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-green-800 text-green-800 text-lg font-bold font-montserrat rounded-md shadow-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-green-800 text-white text-lg font-bold font-montserrat rounded-md shadow-lg shadow-green-800/20">
              2
            </button>
          </div>

          <button className="w-10 h-10 flex items-center justify-center text-black hover:bg-slate-50 rounded-md transition-colors border border-stone-200">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
