"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpenCheck, Download } from 'lucide-react';
import { TD } from '@/types/td.types';

interface AdminTDDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TD | null;
  onStatusUpdate?: (id: string, status: any) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  'en cours':   { label: 'En cours',   color: 'text-sky-900'   },
  'terminé':    { label: 'Terminé',    color: 'text-green-800' },
  'en attente': { label: 'En attente', color: 'text-amber-500' },
  'payé':       { label: 'Payé',       color: 'text-red-600'   },
  'rejeté':     { label: 'Rejeté',     color: 'text-red-800'   },
};

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
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

export default function AdminTDDetailsModal({ isOpen, onClose, data, onStatusUpdate }: AdminTDDetailsModalProps) {
  if (!data) return null;

  const cfg = statusConfig[data.status] ?? statusConfig['en cours'];

  const handleAction = async (status: string) => {
    if (onStatusUpdate) {
      await onStatusUpdate(data.id, status);
      onClose();
    }
  };

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
            className="fixed inset-0 bg-black/25 z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div
              className="bg-white rounded-3xl w-full max-w-[874px] max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 flex items-start gap-4">
                <div className="w-16 h-16 bg-sky-900/10 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpenCheck className="text-sky-900" size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-black text-3xl font-semibold font-montserrat leading-tight">
                    Détails du TD : {data.subject}
                  </h2>
                  <p className="text-black text-xl font-normal font-montserrat opacity-70">
                    Ici vous avez les informations détaillées sur un TD
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0 mt-1"
                >
                  <X size={24} className="text-black" />
                </button>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-sky-900/25 mx-auto" />

              {/* Body */}
              <div className="p-8 space-y-5">

                {/* Section 1: Informations de l'enseignant */}
                <SectionCard title="Informations de l'enseignant">
                  <InfoRow label="Nom :" value={data.teacher} />
                  <InfoRow label="Classe :" value={data.classe} />
                  <InfoRow label="Etablissement :" value={'SURU LERE'} />
                  <InfoRow label="Numero :" value={'01 67 89 23 15'} divider={false} />
                </SectionCard>

                {/* Section 2: Informations sur le TD */}
                <SectionCard title="Informations sur le TD">
                  <InfoRow label="Matière :" value={data.subject} />
                  <InfoRow label="Classe :" value={data.classe} />
                  <InfoRow label="Heure :" value={data.time} />
                  <InfoRow label="Durée :" value={data.duration} />
                  <InfoRow label="Date :" value={data.date} />
                  <div className="flex items-center justify-between py-3">
                    <span className="text-neutral-400 text-lg font-semibold font-montserrat">Epreuve :</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-base font-semibold font-montserrat ${data.epreuveName ? 'text-black' : 'text-neutral-300'}`}>
                        {data.epreuveName || 'Non jointe'}
                      </span>
                      {data.epreuveUrl && (
                        <a 
                          href={data.epreuveUrl} 
                          download={data.epreuveName}
                          className="text-green-800 hover:text-green-900 transition-colors p-1 hover:bg-stone-50 rounded"
                        >
                          <Download size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </SectionCard>

                {/* Section 3: Statut du TD */}
                <SectionCard title="Statut du TD">
                  <InfoRow
                    label="Statut :"
                    value={<span className={`font-semibold ${cfg.color}`}>{cfg.label}</span>}
                    divider={false}
                  />
                </SectionCard>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex justify-end items-center gap-4">
                {data.status === 'en attente' ? (
                  <>
                    {/* Rejeter */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction('rejeté')}
                      className="px-8 py-4 bg-red-600 text-white text-xl font-semibold font-montserrat rounded-lg hover:bg-red-700 transition-colors shadow-md"
                    >
                      Rejeter
                    </motion.button>
                    {/* Valider */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction('en cours')}
                      className="px-8 py-4 bg-green-800 text-white text-xl font-semibold font-montserrat rounded-lg hover:bg-green-900 transition-colors shadow-md"
                    >
                      Valider
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-8 py-4 bg-green-800 text-white text-xl font-semibold font-montserrat rounded-lg hover:bg-green-900 transition-colors shadow-md"
                  >
                    Fermer
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
