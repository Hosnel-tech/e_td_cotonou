"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GraduationCap, 
  Download 
} from 'lucide-react';

interface TDDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tdData: {
    id: number;
    name: string;
    classe: string;
    date: string;
    time: string;
    duration: string;
    status: string;
    teacher?: string;
  } | null;
}

export default function TDDetailsModal({ isOpen, onClose, tdData }: TDDetailsModalProps) {
  if (!tdData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[874px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-10 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-sky-900/10 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap className="text-sky-900" size={36} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold font-montserrat text-black leading-tight">
                    Détails du TD : {tdData.name}
                  </h2>
                  <p className="text-xl font-normal font-montserrat text-black/60">
                    Ici vous avez les informations détaillées sur un TD
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                <X size={32} className="text-black" />
              </button>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-sky-900/10 shrink-0" />

            {/* Body - Scrollable Area */}
            <div className="p-10 pt-6 space-y-10 overflow-y-auto flex-1 custom-scrollbar">
              
              {/* Informations Section */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-5 bg-sky-900 rounded-sm" />
                  <h3 className="text-xl font-semibold font-montserrat text-black uppercase tracking-tight">
                    Informations sur le TD
                  </h3>
                </div>

                <div className="border border-stone-300 rounded-[10px] overflow-hidden">
                  <InfoRow label="Matière :" value={tdData.name} />
                  <InfoRow label="Classe :" value={tdData.classe} />
                  <InfoRow label="Heure :" value={tdData.time} />
                  <InfoRow label="Durée :" value={tdData.duration} />
                  <InfoRow label="Date :" value={tdData.date} />
                  <div className="px-8 py-5 flex items-center justify-between">
                    <span className="text-neutral-400 text-lg font-semibold font-montserrat">Epreuve :</span>
                    <button className="p-1 hover:bg-stone-50 rounded transition-colors group">
                      <Download size={24} className="text-green-800 transition-transform group-active:scale-90" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Statut Section */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-5 bg-sky-900 rounded-sm" />
                  <h3 className="text-xl font-semibold font-montserrat text-black uppercase tracking-tight">
                    Statut du TD
                  </h3>
                </div>

                <div className="border border-stone-300 rounded-[10px] px-8 py-6 flex items-center justify-between">
                  <span className="text-neutral-400 text-lg font-semibold font-montserrat">Statut :</span>
                  <span className={`text-lg font-semibold font-montserrat ${
                    tdData.status === 'en cours' ? 'text-sky-900' : 'text-green-800'
                  }`}>
                    {tdData.status === 'en cours' ? 'En cours' : 'Terminé'}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex justify-end pt-4">
                <button 
                  disabled={tdData.status !== 'en cours'}
                  className={`px-10 py-5 text-xl font-semibold font-montserrat rounded-lg shadow-lg transition-all active:scale-95 ${
                    tdData.status === 'en cours'
                      ? 'bg-green-800 hover:bg-green-900 text-white'
                      : 'bg-stone-200 text-stone-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  Marquer terminer
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div className="px-8 py-5 flex items-center justify-between">
        <span className="text-neutral-400 text-lg font-semibold font-montserrat">{label}</span>
        <span className="text-black text-lg font-semibold font-montserrat">{value}</span>
      </div>
      <div className="mx-8 h-px bg-stone-300/50 last:hidden" />
    </>
  );
}
