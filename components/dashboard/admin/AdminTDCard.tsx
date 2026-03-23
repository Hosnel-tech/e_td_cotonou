"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Calendar, History, Check, X, Eye } from 'lucide-react';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';

export interface AdminTDCardProps {
  id: string;
  teacher: string;
  subject: string;
  status: 'en cours' | 'terminé' | 'en attente' | 'payé' | 'rejeté';
  classe: string;
  time: string;
  date: string;
  duration: string;
  staggerIndex?: number;
  isSelected?: boolean;
  onToggleSelection?: (isShift: boolean) => void;
  onOpenDetails?: () => void;
}

const statusConfig: Record<string, { pill: string; label: string }> = {
  'en cours':   { pill: 'bg-sky-900 text-white',   label: 'En cours'   },
  'terminé':    { pill: 'bg-green-800 text-white', label: 'Terminé'   },
  'en attente': { pill: 'bg-amber-400 text-white', label: 'En attente' },
  'payé':       { pill: 'bg-sky-400 text-white',    label: 'Payé'       },
  'rejeté':     { pill: 'bg-red-600 text-white',    label: 'Rejeté'     },
};

export default function AdminTDCard({
  id,
  teacher,
  subject,
  status,
  classe,
  time,
  date,
  duration,
  staggerIndex = 0,
  isSelected = false,
  onToggleSelection,
  onOpenDetails,
}: AdminTDCardProps) {
  const cfg      = statusConfig[status] ?? statusConfig['en cours'];
  const isPending = status === 'en attente';
  const type     = getTDType(classe);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * staggerIndex, duration: 0.4 }}
      whileHover={{ y: -4 }}
      onClick={(e) => onToggleSelection?.(e.shiftKey)}
      className={`bg-white rounded-[10px] shadow-sm p-6 flex flex-col gap-4 border cursor-pointer transition-all ${
        isSelected ? 'border-sky-900 ring-2 ring-sky-900/10' : 'border-stone-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className={`mt-1 w-5 h-5 rounded-[4px] border border-sky-900 flex items-center justify-center transition-all ${isSelected ? 'bg-sky-900' : 'bg-white'}`}>
            {isSelected && <Check className="text-white" size={12} strokeWidth={4} />}
          </div>
          <div className="space-y-1">
            <span className="text-black/40 text-[10px] font-bold uppercase">MATIERE</span>
            <h3 className="text-black text-xl font-semibold leading-tight">{subject}</h3>
          </div>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border shadow-sm ${cfg.pill}`}>{cfg.label}</span>
      </div>

      <div className="space-y-3 flex-1 px-1">
        <div className="flex items-center justify-between text-black/60 text-sm">
          <span className="font-medium">Enseignant:</span>
          <span className="text-black font-semibold truncate max-w-[120px]">{teacher}</span>
        </div>
        <div className="flex items-center justify-between text-black/60 text-sm">
          <span className="font-medium">Classe:</span>
          <span className="text-black font-semibold">{classe}</span>
        </div>
        <div className="flex items-center justify-between text-black/60 text-sm">
          <span className="font-medium">Date:</span>
          <span className="text-black font-semibold">{date}</span>
        </div>
        <div className="flex items-center justify-between text-black/60 text-sm">
          <span className="font-medium">Heure:</span>
          <span className="text-black font-semibold">{time}</span>
        </div>
        <div className="flex items-center justify-between text-black/60 text-sm">
          <span className="font-medium">Durée:</span>
          <span className="text-black font-semibold">{duration}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-stone-100" onClick={(e) => e.stopPropagation()}>
        <button
          disabled={!isPending}
          className={`flex-1 h-10 rounded-md flex items-center justify-center transition-all shadow-md ${
            isPending
              ? 'bg-green-800 text-white hover:bg-green-900 hover:scale-105'
              : 'bg-green-800/25 text-white/50 cursor-not-allowed'
          }`}
        >
          <Check size={20} strokeWidth={3} />
        </button>
        <button
          disabled={!isPending}
          className={`flex-1 h-10 rounded-md flex items-center justify-center transition-all shadow-md ${
            isPending
              ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
              : 'bg-red-600/25 text-white/50 cursor-not-allowed'
          }`}
        >
          <X size={20} strokeWidth={3} />
        </button>
        <button 
          onClick={onOpenDetails} 
          className="flex-1 h-10 bg-sky-900 text-white rounded-md flex items-center justify-center hover:bg-sky-950 transition-all shadow-md hover:scale-105"
        >
          <Eye size={20} />
        </button>
      </div>
    </motion.div>
  );
}
