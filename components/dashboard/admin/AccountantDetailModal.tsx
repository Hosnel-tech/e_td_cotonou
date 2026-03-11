"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Accountant } from './AccountantTable';

interface AccountantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountant: Accountant | null;
}

export default function AccountantDetailModal({ isOpen, onClose, accountant }: AccountantDetailModalProps) {
  if (!accountant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 z-[60] backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4 font-montserrat">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[846px] bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-10 pb-4 flex items-center justify-between">
                <h2 className="text-black text-3xl font-semibold">Détail d’un comptable</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="text-black" size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-10 pt-4 space-y-10">
                <div className="bg-white rounded-[10px] border border-stone-300 p-8 space-y-6">
                  {/* Section Title with accent */}
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-sky-900 rounded-sm" />
                    <h3 className="text-black text-xl font-semibold">Informations du comptable</h3>
                  </div>

                  {/* Detail Rows */}
                  <div className="space-y-0">
                    <DetailRow label="Nom :" value={`${accountant.lastName} ${accountant.firstName}`} />
                    <DetailRow label="Email :" value={accountant.email} />
                    <DetailRow label="Téléphone :" value={accountant.phone} />
                    <DetailRow 
                      label="Statut :" 
                      value={accountant.status === 'actif' ? 'Actif' : 'Inactif'} 
                      valueClassName={accountant.status === 'actif' ? 'text-sky-900' : 'text-red-600'}
                      isLast
                    />
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-10 py-4 bg-sky-900 text-white text-xl font-semibold rounded-lg hover:bg-sky-950 transition-all shadow-lg active:scale-95 font-montserrat"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ label, value, valueClassName = "text-black", isLast = false }: { label: string; value: string; valueClassName?: string; isLast?: boolean }) {
  return (
    <div className={`py-5 flex items-center justify-between ${!isLast ? 'border-b border-stone-300/50' : ''}`}>
      <span className="text-neutral-400 text-lg font-semibold">{label}</span>
      <span className={`text-right text-lg font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}
