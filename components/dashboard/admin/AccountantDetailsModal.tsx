"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MapPin, Globe, CreditCard, Landmark, FileText, Calendar } from 'lucide-react';
import { Accountant } from '@/types/user.types';

interface AccountantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountant: Accountant | null;
}

interface InfoFieldProps {
  icon: any;
  label: string;
  value: string;
}

const InfoField = ({ icon: Icon, label, value }: InfoFieldProps) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
    <div className="w-10 h-10 rounded-lg bg-sky-900/5 flex items-center justify-center text-sky-900 shrink-0">
      <Icon size={20} />
    </div>
    <div className="flex-1 space-y-0.5">
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold text-slate-900 break-all">{value || 'N/A'}</p>
    </div>
  </div>
);

export default function AccountantDetailsModal({ isOpen, onClose, accountant }: AccountantDetailsModalProps) {
  if (!accountant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-50 transition-opacity"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div 
              className="bg-white w-full max-w-[846px] min-h-[542px] rounded-2xl shadow-2xl relative flex flex-col p-12 overflow-hidden font-montserrat"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-[32px] font-bold text-black">Détail d’un comptable</h2>
                <button 
                  onClick={onClose} 
                  className="w-10 h-10 flex items-center justify-center text-black hover:bg-slate-100 rounded-full transition-all"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Main Info Box */}
              <div className="flex-1 w-full max-w-[770px] mx-auto bg-white rounded-[10px] border border-stone-300 p-8 space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-6 bg-sky-900 rounded-sm" />
                  <h3 className="text-xl font-bold text-black">Informations du comptable</h3>
                </div>

                <div className="space-y-0 text-lg font-semibold">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-400">Nom :</span>
                    <span className="text-black text-right uppercase">{accountant.lastName} {accountant.firstName}</span>
                  </div>
                  <div className="w-full h-px bg-stone-300/50" />
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-400">Email :</span>
                    <span className="text-black text-right lowercase">{accountant.email}</span>
                  </div>
                  <div className="w-full h-px bg-stone-300/50" />
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-400">Téléphone :</span>
                    <span className="text-black text-right">{accountant.phone}</span>
                  </div>
                  <div className="w-full h-px bg-stone-300/50" />
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-400">Statut :</span>
                    <span className="text-sky-900 text-right capitalize">{accountant.status}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-8 py-5 bg-white border border-red-600 text-red-600 text-base font-bold rounded-lg hover:bg-red-50 transition-all active:scale-95"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

