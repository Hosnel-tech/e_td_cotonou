import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap } from 'lucide-react';

interface TeacherDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: any;
}

export default function TeacherDetailModal({ isOpen, onClose, teacher }: TeacherDetailModalProps) {
  if (!teacher) return null;

  // Mock extended data for demonstration (in a real app, this would come from the teacher object)
  const detailData = {
    personal: [
      { label: 'Nom :', value: teacher.name || 'VIGAN Pauline' },
      { label: 'Email :', value: 'pauline@gmail.com' },
      { label: 'Numéro :', value: '01 67 34 25 56' },
      { label: 'Date de naissance :', value: '12-09-1989' },
      { label: 'Nationalité :', value: 'Béninoise' },
      { label: 'Localisation :', value: 'Cotonou, Rue Boulevard 2' },
    ],
    pedagogical: [
      { label: 'Etablissement :', value: 'SURU LERE' },
      { label: 'Classe :', value: teacher.className || '3ème' },
      { label: 'Matière :', value: teacher.subject || 'Anglais' },
    ],
    banking: [
      { label: 'Numéro bancaire :', value: '12345678902984' },
      { label: 'Numéro IFU :', value: '43289052' },
      { label: 'Banque :', value: 'Ecobank' },
    ],
    status: [
      { label: 'Statut :', value: teacher.status || 'actif', isStatus: true },
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/25 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-[874px] bg-white rounded-3xl shadow-2xl overflow-hidden font-montserrat"
          >
            {/* Header */}
            <div className="p-10 flex items-start justify-between border-b border-sky-900/10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-sky-900/10 rounded-xl flex items-center justify-center">
                  <GraduationCap size={36} className="text-sky-900" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold text-black">Détails de : {teacher.name}</h2>
                  <p className="text-xl font-normal text-black/60">Voici informations détaillées d’un enseignant</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={32} strokeWidth={2.5} className="text-black" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-10 max-h-[70vh] overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-sky-900/10 scrollbar-track-transparent">
              <DetailSection title="Informations personnelles" items={detailData.personal} />
              <DetailSection title="Informations pédagogiques" items={detailData.pedagogical} />
              <DetailSection title="Informations bancaires" items={detailData.banking} />
              <DetailSection title="Statut du TD" items={detailData.status} />
              
              {/* Footer Actions */}
              <div className="flex justify-end pt-4 gap-4">
                {teacher.status === 'en attente' ? (
                  <>
                    <button 
                      onClick={onClose}
                      className="px-10 py-4 bg-red-600 text-white text-xl font-semibold rounded-lg hover:bg-red-700 transition-all shadow-lg active:scale-95 font-montserrat"
                    >
                      Rejeter
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-10 py-4 bg-green-800 text-white text-xl font-semibold rounded-lg hover:bg-green-900 transition-all shadow-lg active:scale-95 font-montserrat"
                    >
                      Valider
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 bg-sky-900 text-white text-xl font-semibold rounded-lg hover:bg-sky-950 transition-all shadow-lg active:scale-95 font-montserrat"
                  >
                    Fermer
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DetailSection({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="bg-white rounded-xl border border-stone-300 p-8 space-y-6 relative overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-sky-900 rounded-sm" />
        <h3 className="text-xl font-bold text-black">{title}</h3>
      </div>
      
      <div className="space-y-0">
        {items.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between py-4">
              <span className="text-lg font-semibold text-neutral-400">{item.label}</span>
              <span className={`text-lg font-semibold font-inter ${
                item.isStatus 
                  ? 'text-sky-900' 
                  : 'text-black'
              }`}>
                {item.value}
              </span>
            </div>
            {idx < items.length - 1 && (
              <div className="h-px bg-stone-300/30 w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
