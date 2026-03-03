"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GraduationCap, 
  User, 
  BookOpen, 
  Users, 
  Calendar, 
  Clock 
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
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[874px] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header Area */}
            <div className="p-10 flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-sky-900/10 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="text-sky-900" size={44} />
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold font-montserrat text-black">
                    Détails du TD : {tdData.name}
                  </h2>
                  <p className="text-2xl font-normal font-montserrat text-black/60">
                    Ici vous avez les informations détaillées sur un TD
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* Content Divider */}
            <div className="h-[1px] w-full bg-sky-900/10" />

            {/* Body Content */}
            <div className="p-10 space-y-12">
              
              {/* Teacher & Status Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-sky-900/10 rounded-full border-2 border-sky-900/30 flex items-center justify-center">
                    <User className="text-sky-900" size={36} />
                  </div>
                  <div className="space-y-1 text-left">
                    <p className="text-xl font-semibold font-montserrat text-sky-900/50 uppercase tracking-wider">
                      ENSEIGNANT
                    </p>
                    <p className="text-3xl font-semibold font-montserrat text-black">
                      {tdData.teacher || 'Vigan Pauline'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-right">
                  <p className="text-xl font-semibold font-montserrat text-sky-900/50 uppercase tracking-wider">
                    ETAT ACTUEL
                  </p>
                  <span className={`px-4 py-2 rounded-full text-xl font-semibold font-montserrat inline-block ${
                    tdData.status === 'en cours' 
                      ? 'bg-sky-900 text-white' 
                      : 'bg-green-800 text-white'
                  }`}>
                    {tdData.status === 'en cours' ? 'En cours' : 'Terminé'}
                  </span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'MATIERE', value: tdData.name, icon: BookOpen },
                  { label: 'CLASSE', value: tdData.classe, icon: Users },
                  { label: 'DATE', value: tdData.date, icon: Calendar },
                  { label: 'DUREE', value: `${tdData.duration} (${tdData.time})`, icon: Clock },
                ].map((item, idx) => (
                  <div key={idx} className="bg-sky-900/5 rounded-lg p-6 space-y-3">
                    <div className="flex items-center gap-2 text-sky-900/50">
                      <item.icon size={16} />
                      <span className="text-sm font-semibold font-montserrat uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-2xl font-semibold font-montserrat text-black">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-6 pt-6">
                <button className="px-8 py-4 bg-white text-black text-xl font-semibold font-montserrat rounded-lg hover:bg-gray-50 transition-colors">
                  Modifier
                </button>
                <button className="px-8 py-4 bg-green-800 text-white text-xl font-semibold font-montserrat rounded-lg shadow-lg shadow-green-900/10 hover:bg-green-900 transition-all active:scale-95">
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
