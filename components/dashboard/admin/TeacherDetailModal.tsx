"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  BookOpen, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Globe, 
  UserSquare2, 
  Check, 
  Ban,
  School,
  IdCard,
  CreditCard,
  Building
} from 'lucide-react';

interface TeacherDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: any; // Using any for mock brevity, would be typed in real app
}

export default function TeacherDetailModal({ isOpen, onClose, teacher }: TeacherDetailModalProps) {
  if (!teacher) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[1120px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[85vh] md:min-h-auto"
          >
            {/* Sidebar (Left) */}
            <div className="w-full md:w-80 bg-sky-900/5 p-8 flex flex-col items-center border-r border-gray-100">
              <div className="relative mb-8">
                <div className="w-40 h-40 bg-sky-900/10 rounded-2xl flex items-center justify-center overflow-hidden">
                  <User size={80} className="text-sky-900/40" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-800 rounded-full border-2 border-white shadow-sm" />
              </div>

              <div className="text-center space-y-2 mb-10">
                <h3 className="text-2xl font-bold text-black font-montserrat">Pauline VIGAN</h3>
                <p className="text-sky-900/50 text-sm font-bold uppercase tracking-widest font-montserrat">PROFFESSEUR CERTIFIE</p>
              </div>

              <div className="w-full space-y-4">
                <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
                  <BookOpen size={24} className="text-sky-900" />
                  <span className="text-black font-bold font-montserrat">Anglais</span>
                </div>
                <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
                  <MapPin size={24} className="text-sky-900" />
                  <span className="text-black font-bold font-montserrat">Cotonou, Bénin</span>
                </div>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="flex-1 p-10 md:p-14 pb-10 flex flex-col relative bg-white">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute right-10 top-10 text-black hover:scale-110 transition-transform"
              >
                <X size={32} strokeWidth={2.5} />
              </button>

              <div className="flex-1 space-y-12">
                {/* Section 1: Informations personnelles */}
                <section className="space-y-6">
                  <h4 className="text-2xl font-bold text-black font-montserrat">Informations personnelles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                    <DetailGroup label="Email" value="vigan.pauline@edu.bj" />
                    <DetailGroup label="Numero" value="01 97 25 49 15" />
                    <DetailGroup label="Date de naissance" value="12 Mai 1988" />
                    <DetailGroup label="Nationalite" value="Béninoise" />
                    <DetailGroup label="Genre" value="Féminin" />
                  </div>
                </section>

                {/* Section 2: Détails Pédagogiques */}
                <section className="space-y-6">
                  <h4 className="text-2xl font-bold text-black font-montserrat">Détails Pédagogiques</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <DetailGroup label="Etablissement" value="CEG Entente" />
                    <DetailGroup label="Classe" value="3ème" />
                  </div>
                </section>

                {/* Section 3: Informations bancaires */}
                <section className="space-y-6">
                  <h4 className="text-2xl font-bold text-black font-montserrat">Informations bancaires</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-12">
                    <DetailGroup label="Numero Bancaire" value="1202015094283" />
                    <DetailGroup label="Numero IFU" value="1202015094283" />
                    <DetailGroup label="Banque" value="Ecobank" />
                  </div>
                </section>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-6 pt-10">
                <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-all font-montserrat font-bold text-black shadow-sm">
                  <Ban size={22} />
                  <span>Rejeté</span>
                </button>
                <button className="flex items-center gap-3 px-8 py-4 bg-green-800 text-white rounded-md hover:bg-green-900 transition-all font-montserrat font-bold shadow-lg">
                  <Check size={22} />
                  <span>Valider le profil</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DetailGroup({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <span className="block text-sky-900/50 text-sm font-bold uppercase tracking-wider font-montserrat leading-tight">
        {label}
      </span>
      <span className="block text-black text-lg font-bold font-montserrat whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}
