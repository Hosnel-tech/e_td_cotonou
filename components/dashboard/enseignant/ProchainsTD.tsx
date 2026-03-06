"use client";

import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

const upcomingData = [
  { id: 1, subject: 'Anglais', class: 'Tle', time: '12/01/26 à 14h', relative: 'Il y a 2 min', status: 'Marqué terminé' },
  { id: 2, subject: 'EST', class: 'CM2', time: '12/01/26 à 14h', relative: 'Il y a 2 min', status: 'Marqué terminé' },
  { id: 3, subject: 'PCT', class: '3ème', time: '12/01/26 à 14h', relative: 'Il y a 2 min', status: 'Marqué terminé' },
];

export default function ProchainsTD() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] w-full h-80 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 flex items-center justify-center text-sky-900">
          <ClipboardList size={22} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-semibold text-black font-montserrat tracking-tight">Prochains TD</h3>
      </div>

      {/* Liste des items */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {upcomingData.map((td, index) => (
          <motion.div 
            key={td.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-sky-900/5 relative flex items-center h-24 shadow-sm border border-sky-900/5 hover:bg-sky-900/[0.07] transition-colors"
          >
            {/* Left Content: Avatar + Text */}
            <div className="flex items-center gap-4">
              {/* Avatar Icon */}
              <div className="w-12 h-12 bg-sky-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                 <ClipboardList size={24} />
              </div>

              {/* Contenu Texte */}
              <div className="space-y-0.5 overflow-hidden">
                <h4 className="text-base font-semibold text-black font-montserrat truncate">
                  {td.subject} - <span className="font-normal">{td.class}</span>
                </h4>
                <p className="text-sm font-normal text-black font-montserrat opacity-70">
                  Programmé pour le {td.time}
                </p>
              </div>
            </div>

            {/* Absolute Timestamp (Top Right) */}
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-medium text-black/50 font-montserrat">
                {td.relative}
              </span>
            </div>

            {/* Absolute Action Badge (Bottom Right) */}
            <div className="absolute bottom-4 right-4">
              <div className="h-6 px-3 bg-green-800 rounded-[5px] flex items-center justify-center shadow-sm">
                <span className="text-white text-[10px] font-semibold font-montserrat whitespace-nowrap">
                  {td.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
