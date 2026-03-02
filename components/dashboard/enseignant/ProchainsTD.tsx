"use client";

import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

const upcomingData = [
  { id: 1, subject: 'Anglais', class: 'Tle', time: '12/01/26 à 14h', relative: 'Il y a 2 min', status: 'Marqué terminé' },
  { id: 2, subject: 'EST', class: 'CM2', time: '15/01/26 à 10h', relative: 'Dans 2 jours', status: 'Programmé' },
  { id: 3, subject: 'PCT', class: '3ème', time: '18/01/26 à 08h', relative: 'Dans 5 jours', status: 'Programmé' },
  { id: 4, subject: 'Maths', class: '2nde', time: '20/01/26 à 16h', relative: 'La semaine prochaine', status: 'En attente' },
  { id: 5, subject: 'Français', class: '1ère', time: '22/01/26 à 09h', relative: 'La semaine prochaine', status: 'En attente' },
  { id: 6, subject: 'SVT', class: '3ème', time: '25/01/26 à 11h', relative: 'Dans 10 jours', status: 'Programmé' },
];

export default function ProchainsTD() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-50 w-full h-[450px] flex flex-col">
      {/* Header avec alignement optique */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[#004d71]">
          <ClipboardList size={28} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Prochains TD</h3>
      </div>

      {/* Liste des items */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {upcomingData.map((td, index) => (
          <motion.div 
            key={td.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl bg-[#f8fafc] border border-slate-50 relative group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {/* Avatar Icon */}
              <div className="w-14 h-14 bg-[#004d71] rounded-full flex items-center justify-center text-white shrink-0 shadow-inner">
                <ClipboardList size={24} />
              </div>

              {/* Contenu Texte */}
              <div className="space-y-0.5">
                <h4 className="text-lg font-bold text-slate-900">
                  {td.subject} <span className="text-slate-500 font-medium">- {td.class}</span>
                </h4>
                <p className="text-slate-600 font-medium">
                  Programmé pour le {td.time}
                </p>
              </div>
            </div>

            {/* Meta & Action */}
            <div className="flex flex-col items-end justify-between h-full min-h-[60px]">
              <span className="text-xs font-semibold text-slate-400">
                {td.relative}
              </span>
              
              <button className="mt-auto px-4 py-2 bg-[#14643c] hover:bg-[#0f4d2e] text-white text-xs font-bold rounded-lg transition-all transform active:scale-95">
                {td.status}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}