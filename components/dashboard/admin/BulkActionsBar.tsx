"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Trash2, X } from 'lucide-react';

interface BulkActionsBarProps {
  count: number;
  onClear: () => void;
  onDelete?: () => void;
  primaryAction?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
  showDelete?: boolean;
}

export default function BulkActionsBar({ 
  count, 
  onClear, 
  onDelete, 
  primaryAction,
  showDelete = true 
}: BulkActionsBarProps) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-4 bg-sky-900 border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md"
        >
          <div className="flex items-center gap-3 pr-6 border-r border-white/20">
            <span className="flex items-center justify-center w-8 h-8 bg-white text-sky-900 font-bold rounded-lg text-sm">
              {count}
            </span>
            <span className="text-white font-medium whitespace-nowrap font-montserrat text-sm">
              {count > 1 ? 'éléments sélectionnés' : 'élément sélectionné'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showDelete && (
              <button
                onClick={onDelete}
                className="group flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all text-white border border-transparent hover:border-white/20"
              >
                <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold font-montserrat">Supprimer</span>
              </button>
            )}

            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="group flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all text-white border border-transparent hover:border-white/20"
              >
                <primaryAction.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold font-montserrat">{primaryAction.label}</span>
              </button>
            )}

            <div className="w-px h-6 bg-white/20 mx-2" />

            <button
              onClick={onClear}
              className="flex items-center justify-center w-10 h-10 hover:bg-white/10 rounded-xl transition-all text-white/70 hover:text-white"
              title="Désélectionner tout"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
