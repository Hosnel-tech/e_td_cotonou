"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, UserRoundSearch } from 'lucide-react';
import { Accountant } from './AccountantTable';

interface AccountantDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountant: Accountant | null;
}

interface InfoRowProps {
  label: string;
  value: string;
  divider?: boolean;
}

const InfoRow = ({ label, value, divider = true }: InfoRowProps) => (
  <>
    <div className="flex items-center justify-between py-3">
      <span className="text-neutral-400 text-lg font-semibold font-montserrat">{label}</span>
      <span className="text-black text-lg font-semibold font-montserrat text-right">{value}</span>
    </div>
    {divider && <div className="w-full h-px bg-stone-300/50" />}
  </>
);

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard = ({ title, children }: SectionCardProps) => (
  <div className="bg-white rounded-[10px] border border-stone-300 p-6 space-y-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1.5 h-5 bg-sky-900 rounded-sm" />
      <h3 className="text-black text-xl font-semibold font-montserrat">{title}</h3>
    </div>
    {children}
  </div>
);

export default function AccountantDetailsModal({ isOpen, onClose, accountant }: AccountantDetailsModalProps) {
  if (!accountant) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 z-[60]"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl w-full max-w-[846px] max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl scrollbar-hide flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-10 pb-6 flex items-center justify-between">
                <h2 className="text-black text-3xl font-semibold font-montserrat">
                  Détail d’un comptable
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X size={32} className="text-black" />
                </button>
              </div>

              {/* Body */}
              <div className="px-10 pb-6">
                <SectionCard title="Informations du comptable">
                  <InfoRow label="Nom :" value={`${accountant.lastName} ${accountant.firstName}`} />
                  <InfoRow label="Email :" value={accountant.email} />
                  <InfoRow label="Téléphone :" value={accountant.phone} />
                  <div className="flex items-center justify-between py-3">
                    <span className="text-neutral-400 text-lg font-semibold font-montserrat">Statut :</span>
                    <span className="text-sky-900 text-lg font-semibold font-montserrat text-right">
                      {accountant.status.charAt(0).toUpperCase() + accountant.status.slice(1)}
                    </span>
                  </div>
                </SectionCard>
              </div>

              {/* Footer */}
              <div className="px-10 pb-10 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-10 py-5 bg-white ring-1 ring-inset ring-red-600 text-red-600 text-base font-semibold font-montserrat rounded-lg hover:bg-red-50 transition-colors"
                >
                  Fermer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
