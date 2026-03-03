"use client";

import { motion } from 'framer-motion';
import { BookOpen, Clock, Calendar, GraduationCap, Check, X, Eye } from 'lucide-react';

export interface AdminTDCardProps {
  subject: string;
  status: 'en cours' | 'terminé' | 'payé';
  className: string;
  time: string;
  date: string;
  duration: string;
  staggerIndex?: number;
}

export default function AdminTDCard({
  subject,
  status,
  className,
  time,
  date,
  duration,
  staggerIndex = 0
}: AdminTDCardProps) {
  
  const statusStyles = {
    'en cours': 'bg-sky-900/20 text-sky-900',
    'terminé': 'bg-green-800/20 text-green-800',
    'payé': 'bg-sky-900/20 text-sky-900' // Mockup shows "en cours" and "payé" might share colors or similar
  };

  const infoItems = [
    { label: 'Classe:', value: className, icon: GraduationCap },
    { label: 'Heure:', value: time, icon: Clock },
    { label: 'Date:', value: date, icon: Calendar },
    { label: 'Durée:', value: duration, icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * staggerIndex, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,112,0.15)] p-6 space-y-6 flex flex-col font-montserrat"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-black/40 text-[10px] font-semibold uppercase tracking-wider">MATIERE</span>
          <h3 className="text-black text-xl font-bold">{subject}</h3>
        </div>
        <div className={`px-4 py-1.5 rounded-[30px] text-xs font-semibold whitespace-nowrap ${statusStyles[status]}`}>
          {status}
        </div>
      </div>

      {/* Info Grid */}
      <div className="space-y-3 flex-1">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/40">
              <item.icon size={16} />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
            <span className="text-black text-sm font-semibold">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button className="flex-1 h-10 bg-green-800 text-white rounded-md flex items-center justify-center hover:bg-green-900 transition-colors shadow-sm">
          <Check size={20} />
        </button>
        <button className="flex-1 h-10 bg-red-600 text-white rounded-md flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm">
          <X size={20} />
        </button>
        <button className="flex-1 h-10 bg-sky-900 text-white rounded-md flex items-center justify-center hover:bg-sky-950 transition-colors shadow-sm">
          <Eye size={20} />
        </button>
      </div>
    </motion.div>
  );
}
