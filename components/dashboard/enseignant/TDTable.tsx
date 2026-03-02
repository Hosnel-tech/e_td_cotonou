"use client";

import { motion } from 'framer-motion';
import { LayoutList, LayoutGrid } from 'lucide-react';

const tdData = [
  { id: 1, subject: 'Anglais', class: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'En cours', duration: '3h' },
  { id: 2, subject: 'Français', class: 'Tle', date: '12/11/25', start: '14h', end: '17h', status: 'Terminé', duration: '3h' },
  { id: 3, subject: 'SVT', class: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'En cours', duration: '3h' },
  { id: 4, subject: 'EST', class: 'CM2', date: '12/11/25', start: '14h', end: '17h', status: 'Terminé', duration: '3h' },
];

export default function TDTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-50 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-8 flex justify-between items-center border-b border-gray-50">
        <h3 className="text-2xl font-semibold text-black font-montserrat">Mes travaux dirigés</h3>
        <div className="flex gap-3">
          <button className="p-2 bg-sky-900 text-white rounded-md transition-colors hover:bg-sky-800 shadow-sm">
            <LayoutList size={24} />
          </button>
          <button className="p-2 bg-gray-50 text-black rounded-md transition-colors hover:bg-gray-100 border border-gray-200">
            <LayoutGrid size={24} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-sky-900/5">
            <tr>
              <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Matières</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Classe</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Date</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Départ</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Fin</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat text-center">Statut</th>
              <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat text-center">Durée</th>
              <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tdData.map((td, index) => (
              <motion.tr 
                key={td.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{td.subject}</td>
                <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.class}</td>
                <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.date}</td>
                <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.start}</td>
                <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.end}</td>
                <td className="px-6 py-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-semibold font-montserrat ${
                    td.status === 'En cours' ? 'bg-sky-100 text-sky-900' : 'bg-green-100 text-green-800'
                  }`}>
                    {td.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-center text-black text-xl font-normal font-montserrat">{td.duration}</td>
                <td className="px-8 py-6 text-right">
                  <button className="px-4 py-2 bg-green-800 text-white rounded-md text-xs font-medium font-montserrat hover:bg-green-700 transition-colors">
                    En savoir plus
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer CTA */}
      <div className="p-10 flex justify-center border-t border-gray-50">
        <button className="w-full max-w-xl py-4 bg-sky-900 text-white rounded-xl text-xl font-medium font-montserrat flex items-center justify-center gap-3 hover:bg-sky-800 transition-all active:scale-[0.99] shadow-lg shadow-sky-900/10">
          Accédez à tous les travaux dirigés
          <span className="text-2xl">→</span>
        </button>
      </div>
    </div>
  );
}
