"use client";

import { motion } from 'framer-motion';
import { Clock, Calendar, Check, X, Eye } from 'lucide-react';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';
import { TD } from '@/types/td.types';

interface AdminTDCardProps extends TD {
  staggerIndex?: number;
  isSelected?: boolean;
  onToggleSelection?: (isShift: boolean) => void;
  onOpenDetails?: () => void;
  hideSelection?: boolean;
}

const statusConfig: Record<string, { pill: string; label: string }> = {
  'en cours':   { pill: 'bg-sky-900 text-white',   label: 'En cours'   },
  'terminé':    { pill: 'bg-green-800 text-white', label: 'Terminé'   },
  'en attente': { pill: 'bg-amber-400 text-white', label: 'En attente' },
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
  hideSelection = true
}: AdminTDCardProps) {
  const cfg      = statusConfig[status] ?? statusConfig['en cours'];
  const isPending = status === 'en attente';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * staggerIndex }}
      whileHover={{ y: -5 }}
      onClick={(e) => !hideSelection && onToggleSelection?.(e.shiftKey)}
      className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col gap-6 transition-all group ${
        !hideSelection && isSelected ? 'border-sky-900 shadow-md ring-1 ring-sky-900/5' : 'border-stone-100 hover:border-sky-900/10 hover:shadow-md'
      } ${!hideSelection ? 'cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {!hideSelection && onToggleSelection && (
            <div className={`w-5 h-5 rounded-[4px] border border-sky-900 flex items-center justify-center transition-all ${
              isSelected ? 'bg-sky-900' : 'bg-white'
            }`}>
              {isSelected && <Check size={12} strokeWidth={4} className="text-white" />}
            </div>
          )}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-sky-900/40 font-montserrat tracking-widest uppercase">Matière</span>
            <h3 className="text-xl font-bold text-black font-montserrat tracking-tight truncate max-w-[150px]">{subject}</h3>
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
