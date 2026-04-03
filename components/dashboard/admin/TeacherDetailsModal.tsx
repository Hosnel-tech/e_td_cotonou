"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';
import { Teacher } from '@/types/user.types';

interface TeacherDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  onStatusUpdate?: (id: string, status: string) => Promise<void>;
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

export default function TeacherDetailsModal({ isOpen, onClose, teacher, onStatusUpdate }: TeacherDetailsModalProps) {
  if (!teacher) return null;

  const handleValidate = async () => {
    if (onStatusUpdate && teacher) {
      await onStatusUpdate(teacher.id, 'actif');
      onClose();
    } else {
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
                <h2 className="text-black text-3xl font-semibold font-montserrat tracking-tight">
                  Détail d’un enseignant
                </h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X size={32} className="text-black" />
                </button>
              </div>

              {/* Body */}
              <div className="px-10 pb-6 space-y-6">
                {/* Personal Info */}
                <SectionCard title="Informations personnelles">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    <div>
                      <InfoRow label="Nom :" value={teacher.name} />
                      <InfoRow label="Email :" value={teacher.email} />
                      <InfoRow label="Téléphone :" value={teacher.phone ?? '-'} />
                      <InfoRow label="Genre :" value={teacher.genre === 'M' ? 'Masculin' : teacher.genre === 'F' ? 'Féminin' : '-'} divider={false} />
                    </div>
                    <div>
                      <InfoRow label="ID Unique :" value={teacher.id} />
                      <InfoRow label="Nationalité :" value={teacher.nationality ?? '-'} />
                      <InfoRow label="Date de naissance :" value={teacher.birthDate ?? '-'} />
                      <InfoRow label="Date d'inscription :" value={new Date(teacher.createdAt).toLocaleDateString('fr-FR')} divider={false} />
                    </div>
                  </div>
                </SectionCard>

                {/* Pedagogical Info */}
                <SectionCard title="Informations pédagogiques">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    <div>
                      <InfoRow label="Niveau :" value={teacher.niveau.charAt(0).toUpperCase() + teacher.niveau.slice(1)} />
                      <InfoRow label="Etablissement :" value={teacher.school} divider={false} />
                    </div>
                    <div>
                      {teacher.niveau === 'primaire' && (
                        <InfoRow label="Classe :" value={teacher.className ?? '-'} />
                      )}
                      <InfoRow label="Matière :" value={teacher.subject} divider={false} />
                    </div>
                  </div>
                </SectionCard>

                {/* Banking Info */}
                <SectionCard title="Informations financières">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    <div>
                      <InfoRow label="Numéro IFU :" value={teacher.ifu ?? '-'} />
                      <InfoRow label="RIB / Compte :" value={teacher.bankAccount ?? '-'} divider={false} />
                    </div>
                    <div>
                      <InfoRow label="Banque :" value={teacher.bankName ?? '-'} />
                      <InfoRow label="Dernier Salaire :" value="0 F (N/A)" divider={false} />
                    </div>
                  </div>
                </SectionCard>

                {/* Status */}
                <SectionCard title="Sûreté & Accès">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-neutral-400 text-lg font-semibold font-montserrat">Statut du compte :</span>
                    <span className={`text-lg font-bold font-montserrat px-4 py-1 rounded-full ${
                      teacher.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {teacher.status.toUpperCase()}
                    </span>
                  </div>
                </SectionCard>
              </div>

              {/* Footer */}
              <div className="px-10 pb-10 flex justify-end items-center gap-4">
                {teacher.status !== 'actif' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleValidate}
                    className="px-10 py-5 bg-sky-900 text-white text-base font-semibold font-montserrat rounded-lg hover:bg-sky-950 transition-colors shadow-lg"
                  >
                    Valider
                  </motion.button>
                )}
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
