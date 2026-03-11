"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Calendar, History, Check, X, Eye } from 'lucide-react';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';

export interface AdminTDCardProps {
  teacher: string;
  subject: string;
  status: 'en cours' | 'terminé' | 'en attente' | 'payé';
  classe: string;
  time: string;
  date: string;
  duration: string;
  staggerIndex?: number;
  onOpenDetails?: () => void;
}

const statusConfig: Record<string, { pill: string; label: string }> = {
  'en cours':   { pill: 'bg-sky-900/20 text-sky-900',   label: 'En cours'   },
  'terminé':    { pill: 'bg-green-800/20 text-green-800', label: 'Terminé'   },
  'en attente': { pill: 'bg-amber-400/20 text-amber-500', label: 'En attente' },
  'payé':       { pill: 'bg-red-600/20 text-red-600',    label: 'Payé'       },
};

export default function AdminTDCard({
  teacher,
  subject,
  status,
  classe,
  time,
  date,
  duration,
  staggerIndex = 0,
  onOpenDetails,
}: AdminTDCardProps) {
  const cfg      = statusConfig[status] ?? statusConfig['en cours'];
  const isActive = status === 'en attente';
  const type     = getTDType(classe);

  const infoItems = [
    { icon: Users,   label: 'Classe:',  value: classe   },
    { icon: Clock,   label: 'Heure:',   value: time     },
    { icon: Calendar,label: 'Date:',    value: date     },
    { icon: History, label: 'Durée:',   value: duration },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * staggerIndex, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, boxShadow: '0px 12px 28px rgba(0,75,112,0.18)' }}
      className="bg-white rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,75,112,0.15)] p-6 flex flex-col gap-4 font-montserrat border border-transparent hover:border-sky-900/10 transition-all"
    >
      {/* Header: MATIERE label + status badge */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-black/40 text-[10px] font-semibold font-montserrat tracking-widest uppercase">MATIERE</span>
          <h3 className="text-black text-xl font-semibold font-montserrat leading-tight">{subject}</h3>
        </div>
        <span className={`px-4 py-1.5 rounded-[30px] text-xs font-semibold whitespace-nowrap ${cfg.pill}`}>
          {cfg.label}
        </span>
      </div>

      {/* Info rows */}
      <div className="space-y-3 flex-1">
        {infoItems.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/40">
              <Icon size={16} />
              <span className="text-sm font-semibold font-montserrat">{label}</span>
            </div>
            <span className="text-black text-sm font-semibold font-montserrat">{value}</span>
          </div>
        ))}
        {/* Type row */}
        <div className="flex items-center justify-between">
          <span className="text-black/40 text-sm font-semibold font-montserrat">Type:</span>
          <span className="text-black text-sm font-semibold font-montserrat">{type}</span>
        </div>
      </div>

      {/* Action buttons — same logic as table rows */}
      <div className="flex items-center gap-3 pt-1">
        <button
          disabled={!isActive}
          className={`flex-1 h-10 rounded-md flex items-center justify-center transition-all shadow-md ${
            isActive
              ? 'bg-green-800 text-white hover:bg-green-900 hover:scale-105'
              : 'bg-green-800/25 text-white/50 cursor-not-allowed'
          }`}
        >
          <Check size={20} strokeWidth={3} />
        </button>
        <button
          disabled={!isActive}
          className={`flex-1 h-10 rounded-md flex items-center justify-center transition-all shadow-md ${
            isActive
              ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
              : 'bg-red-600/25 text-white/50 cursor-not-allowed'
          }`}
        >
          <X size={20} strokeWidth={3} />
        </button>
        {/* Eye always active */}
        <button
          onClick={onOpenDetails}
          className="flex-1 h-10 bg-sky-900 text-white rounded-md flex items-center justify-center hover:bg-sky-950 hover:scale-105 transition-all shadow-md">
          <Eye size={20} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
