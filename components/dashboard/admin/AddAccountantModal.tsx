"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useState } from 'react';
import { accountantService } from '@/services/accountant.service';
import { useConfirm } from '@/hooks/useConfirm';

interface AddAccountantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAccountantModal({ isOpen, onClose, onSuccess }: AddAccountantModalProps) {
  const confirm = useConfirm();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: 'password123', // Default or hidden for now as per mockup
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const [lastName, ...firstNames] = formData.fullName.split(' ');
    const firstName = firstNames.join(' ');

    const ok = await confirm({
      title: "Créer ce compte comptable ?",
      description: `Un accès sera créé pour ${formData.fullName} (${formData.email}).`,
      confirmLabel: "Oui, créer le compte",
      variant: "info",
    });

    if (!ok) return;

    setLoading(true);
    try {
      await accountantService.createAccountant({
        firstName: firstName || 'Compte',
        lastName: lastName || formData.fullName,
        name: formData.fullName,
        role: 'comptable',
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      } as any); // password and other creation-only fields
      onSuccess();
      onClose();
      setFormData({ fullName: '', email: '', phone: '', password: 'password123' });
    } catch (error) {
      console.error('Error creating accountant:', error);
      alert('Erreur lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  };

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
              className="bg-white w-full max-w-[875px] rounded-2xl shadow-2xl relative flex flex-col p-12 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[32px] font-bold text-black font-montserrat">Ajouter un comptable</h2>
                <button 
                  onClick={onClose} 
                  className="w-10 h-10 flex items-center justify-center text-black hover:bg-slate-100 rounded-full transition-all"
                >
                  <X size={32} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Nom */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-black font-montserrat flex items-center gap-1">
                    Nom & Prénoms <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full h-14 bg-white border border-stone-300 rounded-[10px] px-6 text-base font-normal font-montserrat text-black placeholder:text-stone-400 outline-none focus:border-sky-900 transition-all"
                    placeholder="Jean Claude"
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-black font-montserrat flex items-center gap-1">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-14 bg-white border border-stone-300 rounded-[10px] px-6 text-base font-normal font-montserrat text-black placeholder:text-stone-400 outline-none focus:border-sky-900 transition-all"
                    placeholder="jeanclaude@gmail.com"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-black font-montserrat flex items-center gap-1">
                    Téléphone <span className="text-red-600">*</span>
                  </label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full h-14 bg-white border border-stone-300 rounded-[10px] px-6 text-base font-normal font-montserrat text-black placeholder:text-stone-400 outline-none focus:border-sky-900 transition-all"
                    placeholder="01 68 89 03 12"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-6 flex justify-end gap-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-10 py-4 bg-white border border-red-600 text-red-600 text-base font-bold rounded-lg hover:bg-red-50 transition-all active:scale-95"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 bg-sky-900 text-white text-base font-bold rounded-lg hover:bg-sky-950 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? 'Création...' : 'Ajouter un comptable'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
