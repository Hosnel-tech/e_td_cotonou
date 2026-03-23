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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 bg-sky-900 text-white shrink-0">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex items-end gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <User size={48} className="text-white" />
                  </div>
                  <div className="space-y-1 mb-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                      {accountant.firstName} {accountant.lastName}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        accountant.status === 'actif' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {accountant.status === 'actif' ? 'Compte Actif' : 'Compte Inactif'}
                      </span>
                      <span className="text-white/60 text-sm">ID: #{accountant.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-6 bg-sky-900 rounded-full" />
                      <h3 className="text-xl font-bold text-slate-900">Informations Personnelles</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <InfoField icon={Mail} label="Email Professionnel" value={accountant.email} />
                      <InfoField icon={Phone} label="Téléphone" value={accountant.phone} />
                      <InfoField icon={Calendar} label="Date de Naissance" value={accountant.birthDate} />
                      <InfoField icon={Globe} label="Nationalité" value={accountant.nationality} />
                      <InfoField icon={MapPin} label="Adresse/Localisation" value={accountant.location} />
                    </div>
                  </div>

                  {/* Administrative Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-6 bg-sky-900 rounded-full" />
                      <h3 className="text-xl font-bold text-slate-900">Informations Bancaires & IFU</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <InfoField icon={FileText} label="Numéro IFU" value={accountant.ifu} />
                      <InfoField icon={Landmark} label="Nom de la Banque" value={accountant.bankName} />
                      <InfoField icon={CreditCard} label="Numéro de Compte" value={accountant.bankAccount} />
                    </div>
                    
                    <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 space-y-3">
                      <h4 className="font-bold text-amber-900 flex items-center gap-2 text-lg">
                        <User size={20} />
                        Rôle du Comptable
                      </h4>
                      <p className="text-amber-800 font-medium leading-relaxed">
                        Ce compte a accès aux modules de gestion des paiements, validation des virements et suivi budgétaire global de la plateforme.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-slate-100 flex justify-end shrink-0 bg-slate-50/50">
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 bg-sky-900 text-white font-bold rounded-xl hover:bg-sky-950 transition-all shadow-lg hover:shadow-sky-900/20 active:scale-95"
                >
                  Fermer les Détails
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
