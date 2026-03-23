"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import { Teacher } from './TeacherTable';

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
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

export default function TeacherDetailsModal({ isOpen, onClose, teacher }: TeacherDetailsModalProps) {
  if (!teacher) return null;

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
              className="bg-white rounded-3xl w-full max-w-[874px] max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 flex items-start gap-4">
                <div className="w-16 h-16 bg-sky-900/10 rounded-xl flex items-center justify-center shrink-0">
                  <GraduationCap className="text-sky-900" size={36} strokeWidth={2} />
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-black text-3xl font-semibold font-montserrat leading-tight">
                    Détails de : {teacher.name}
                  </h2>
                  <p className="text-black text-xl font-normal font-montserrat opacity-70">
                    Voici informations détaillées d’un enseignant
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
              <div className="p-8 space-y-6">
                {/* Personal Info */}
                <SectionCard title="Informations personnelles">
                  <InfoRow label="Nom :" value={teacher.name} />
                  <InfoRow label="Email :" value={teacher.email} />
                  <InfoRow label="Numéro :" value={teacher.phone} />
                  <InfoRow label="Date de naissance :" value={teacher.birthDate} />
                  <InfoRow label="Nationalité :" value={teacher.nationality} />
                  <InfoRow label="Localisation :" value={teacher.location} divider={false} />
                </SectionCard>

                {/* Pedagogical Info */}
                <SectionCard title="Informations pédagogiques">
                  <InfoRow label="Etablissement :" value={teacher.school} />
                  <InfoRow label="Classe :" value={teacher.className} />
                  <InfoRow label="Matière :" value={teacher.subject} divider={false} />
                </SectionCard>

                {/* Banking Info */}
                <SectionCard title="Informations bancaires">
                  <InfoRow label="Numéro bancaire :" value={teacher.bankAccount} />
                  <InfoRow label="Numéro IFU :" value={teacher.ifu} />
                  <InfoRow label="Banque :" value={teacher.bankName} divider={false} />
                </SectionCard>

                {/* Status */}
                <SectionCard title="Statut du TD">
                  <InfoRow 
                    label="Statut :" 
                    value={teacher.status} 
                    divider={false} 
                  />
                </SectionCard>
              </div>

              {/* Footer */}
              <div className="px-8 pb-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-green-800 text-white text-xl font-semibold font-montserrat rounded-lg hover:bg-green-900 transition-colors shadow-md"
                >
                  Marquer terminer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
