"use client";

import { motion } from 'framer-motion';
import { List, LayoutGrid, Check, X, Eye, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const tableData = [
  { teacher: 'VIGAN Pauline', matter: 'Anglais', classe: '3ème', date: '12/11/25', status: 'en cours', duration: '3h' },
  { teacher: 'VIGAN Pauline', matter: 'Anglais', classe: '3ème', date: '12/11/25', status: 'terminé', duration: '3h' },
  { teacher: 'VIGAN Pauline', matter: 'Anglais', classe: '3ème', date: '12/11/25', status: 'en cours', duration: '3h' },
  { teacher: 'VIGAN Pauline', matter: 'Anglais', classe: '3ème', date: '12/11/25', status: 'payé', duration: '3h' },
];

export default function AdminTDTable() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8 font-montserrat">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-black">Travaux dirigés</h2>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setViewMode('list')}
            className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
              viewMode === 'list' ? 'bg-sky-900 text-white shadow-lg' : 'text-black/40 hover:text-black'
            }`}
          >
            <List size={28} />
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
              viewMode === 'grid' ? 'bg-sky-900 text-white shadow-lg' : 'text-black/40 hover:text-black'
            }`}
          >
            <LayoutGrid size={28} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left min-w-[1000px]">
          <thead className="bg-sky-900/5 h-16">
            <tr>
              <th className="pl-6 w-16">
                <input type="checkbox" className="w-7 h-7 rounded-[5px] border-[0.83px] border-sky-900 appearance-none checked:bg-sky-900 checked:after:content-['✓'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center cursor-pointer transition-all" />
              </th>
              <th className="text-sky-900 text-xl font-semibold px-4">Enseignants</th>
              <th className="text-sky-900 text-xl font-semibold px-4">Matières</th>
              <th className="text-sky-900 text-xl font-semibold px-4">Classe</th>
              <th className="text-sky-900 text-xl font-semibold px-4">Date</th>
              <th className="text-sky-900 text-xl font-semibold px-4">Statut</th>
              <th className="text-sky-900 text-xl font-semibold px-4">Durée</th>
              <th className="text-sky-900 text-xl font-semibold px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-300">
            {tableData.map((row, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="h-16 hover:bg-gray-50 transition-colors"
              >
                <td className="pl-6">
                  <input type="checkbox" className="w-7 h-7 rounded-[5px] border-[0.83px] border-sky-900 appearance-none checked:bg-sky-900 checked:after:content-['✓'] checked:after:text-white checked:after:flex checked:after:items-center checked:after:justify-center cursor-pointer transition-all" />
                </td>
                <td className="text-black text-xl font-normal px-4">{row.teacher}</td>
                <td className="text-black text-xl font-normal px-4">{row.matter}</td>
                <td className="text-black text-xl font-normal px-4">{row.classe}</td>
                <td className="text-black text-xl font-normal px-4">{row.date}</td>
                <td className="px-4">
                  <span className={`px-4 py-1.5 rounded-2xl text-xs font-medium inline-block ${
                    row.status === 'en cours' ? 'bg-sky-900 text-white' :
                    row.status === 'terminé' ? 'bg-green-800 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                  </span>
                </td>
                <td className="text-black text-xl font-normal px-4">{row.duration}</td>
                <td className="px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="w-8 h-8 bg-green-800 text-white rounded-[5px] flex items-center justify-center hover:bg-green-900 transition-colors shadow-sm">
                      <Check size={16} />
                    </button>
                    <button className="w-8 h-8 bg-red-600 text-white rounded-[5px] flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
                      <X size={16} />
                    </button>
                    <button className="w-8 h-8 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-colors shadow-sm">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center pt-8">
        <button className="group flex items-center gap-4 px-10 py-4 bg-sky-900 text-white rounded-[10px] text-xl font-medium transition-all hover:bg-sky-950 shadow-lg active:scale-95">
          Accédez à tous les travaux dirigés
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
