"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HourEntry {
  date: string;
  classe: '3ème' | 'Tle';
  hours: number;
}

interface TeacherPayment {
  id: string;
  name: string;
  establishment: string;
  subject: string;
  rates: { '3ème': number; Tle: number };
  entries: HourEntry[];
  totalAmount: number;
}

const MOCK_DATA: TeacherPayment[] = [
  {
    id: '1',
    name: 'ADEBO Murywa',
    establishment: 'SURU LERE',
    subject: 'Maths',
    rates: { '3ème': 6000, Tle: 7000 },
    entries: [
      { date: '27/04/2024', classe: '3ème', hours: 4 },
      { date: '27/04/2024', classe: 'Tle', hours: 0 },
      { date: '28/04/2024', classe: '3ème', hours: 0 },
      { date: '28/04/2024', classe: 'Tle', hours: 0 },
      { date: '29/04/2024', classe: '3ème', hours: 0 },
      { date: '29/04/2024', classe: 'Tle', hours: 0 },
      { date: '30/04/2024', classe: '3ème', hours: 0 },
      { date: '30/04/2024', classe: 'Tle', hours: 0 },
      { date: '01/05/2024', classe: '3ème', hours: 4 },
      { date: '01/05/2024', classe: 'Tle', hours: 0 },
      { date: '02/05/2024', classe: '3ème', hours: 0 },
      { date: '02/05/2024', classe: 'Tle', hours: 0 },
      { date: '03/05/2024', classe: '3ème', hours: 8 },
      { date: '03/05/2024', classe: 'Tle', hours: 0 },
    ],
    totalAmount: 48000
  },
  {
    id: '2',
    name: 'AHOUANSOU Marcel',
    establishment: 'SURU LERE',
    subject: 'Anglais',
    rates: { '3ème': 6000, Tle: 7000 },
    entries: [
      { date: '27/04/2024', classe: '3ème', hours: 4 },
      { date: '27/04/2024', classe: 'Tle', hours: 0 },
      { date: '28/04/2024', classe: '3ème', hours: 0 },
      { date: '28/04/2024', classe: 'Tle', hours: 0 },
      { date: '29/04/2024', classe: '3ème', hours: 0 },
      { date: '29/04/2024', classe: 'Tle', hours: 0 },
      { date: '30/04/2024', classe: '3ème', hours: 0 },
      { date: '30/04/2024', classe: 'Tle', hours: 0 },
      { date: '01/05/2024', classe: '3ème', hours: 4 },
      { date: '01/05/2024', classe: 'Tle', hours: 0 },
      { date: '02/05/2024', classe: '3ème', hours: 0 },
      { date: '02/05/2024', classe: 'Tle', hours: 0 },
      { date: '03/05/2024', classe: '3ème', hours: 8 },
      { date: '03/05/2024', classe: 'Tle', hours: 0 },
    ],
    totalAmount: 21000
  },
  {
    id: '3',
    name: 'ASSOGBA Ghislain',
    establishment: 'SURU LERE',
    subject: 'Philo',
    rates: { '3ème': 6000, Tle: 7000 },
    entries: [
      { date: '27/04/2024', classe: '3ème', hours: 4 },
      { date: '27/04/2024', classe: 'Tle', hours: 0 },
      { date: '28/04/2024', classe: '3ème', hours: 0 },
      { date: '28/04/2024', classe: 'Tle', hours: 0 },
      { date: '29/04/2024', classe: '3ème', hours: 0 },
      { date: '29/04/2024', classe: 'Tle', hours: 0 },
      { date: '30/04/2024', classe: '3ème', hours: 0 },
      { date: '30/04/2024', classe: 'Tle', hours: 0 },
      { date: '01/05/2024', classe: '3ème', hours: 4 },
      { date: '01/05/2024', classe: 'Tle', hours: 0 },
      { date: '02/05/2024', classe: '3ème', hours: 0 },
      { date: '02/05/2024', classe: 'Tle', hours: 0 },
      { date: '03/05/2024', classe: '3ème', hours: 8 },
      { date: '03/05/2024', classe: 'Tle', hours: 0 },
    ],
    totalAmount: 24000
  }
];

const DATES = ['27/04/2024', '28/04/2024', '29/04/2024', '30/04/2024', '01/05/2024', '02/05/2024', '03/05/2024'];

export default function MatrixPaymentTable() {
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
              <th colSpan={14} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat">NOMBRE D'HEURES</th>
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat">MATIERE</th>
              <th colSpan={2} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[180px]">TAUX HORAIRE</th>
              <th rowSpan={3} className="border border-black p-4 text-center text-black text-xl font-semibold font-montserrat w-[150px]">MONTANT</th>
            </tr>
            
            {/* Level 2 Header: Dates */}
            <tr className="bg-white">
              {DATES.map(date => (
                <th key={date} colSpan={2} className="border border-black p-2 text-center text-black text-xs font-medium font-montserrat">{date}</th>
              ))}
              <th rowSpan={2} className="border border-black p-2 text-center text-black text-[12px] font-medium font-montserrat">3 ème</th>
              <th rowSpan={2} className="border border-black p-2 text-center text-black text-[12px] font-medium font-montserrat">Tle</th>
            </tr>

            {/* Level 3 Header: Sub-classes */}
            <tr className="bg-zinc-300">
              {DATES.flatMap(date => [
                <th key={`${date}-3e`} className="border border-black p-2 text-center text-black text-[9.7px] font-medium font-montserrat">3 ème</th>,
                <th key={`${date}-Tle`} className="border border-black p-2 text-center text-black text-[9.7px] font-medium font-montserrat">Tle</th>
              ])}
            </tr>
          </thead>
          
          <tbody>
            {/* Group Header: Establishment */}
            <tr className="bg-zinc-100">
              <td colSpan={19} className="border border-black p-4 text-center text-black text-2xl font-bold font-montserrat uppercase tracking-widest">SURU LERE</td>
            </tr>

            {MOCK_DATA.map((teacher, idx) => (
              <tr key={teacher.id} className="h-20 hover:bg-slate-50 transition-colors">
                <td className="border border-black p-4 text-black text-lg font-semibold font-montserrat whitespace-nowrap">{teacher.name}</td>
                
                {/* Hours Matrix */}
                {DATES.flatMap(date => {
                    const e3 = teacher.entries.find(e => e.date === date && e.classe === '3ème')?.hours ?? 0;
                    const eTle = teacher.entries.find(e => e.date === date && e.classe === 'Tle')?.hours ?? 0;
                    return [
                        <td key={`${teacher.id}-${date}-3e`} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">{e3}</td>,
                        <td key={`${teacher.id}-${date}-Tle`} className="border border-black p-2 text-center text-black text-[14px] font-medium font-montserrat">{eTle}</td>
                    ];
                })}

                {/* Subject & Rates */}
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.subject}</td>
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.rates['3ème']}</td>
                <td className="border border-black p-2 text-center text-black text-[14px] font-bold font-montserrat">{teacher.rates.Tle}</td>
                
                {/* Total */}
                <td className="border border-black p-2 text-center text-black text-lg font-bold font-montserrat shadow-inner">{teacher.totalAmount.toLocaleString('fr-FR')} F</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-10 border-t border-black/10 flex items-center justify-between bg-white">
        <div className="text-black text-2xl font-normal font-montserrat">
          Total {MOCK_DATA.length}
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
