"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AddAccountantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAccountantModal({ isOpen, onClose }: AddAccountantModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 z-[60] backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[875px] bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-10 pb-4 flex items-center justify-between">
                <h2 className="text-black text-3xl font-semibold font-montserrat">Ajouter un comptable</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="text-black" size={24} />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-10 pt-4 space-y-8">
                {/* Name Field */}
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-black text-base font-semibold font-montserrat">Nom du comptable </span>
                    <span className="text-red-600 text-base font-semibold font-montserrat">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jean Claude"
                    className="w-full h-14 px-8 bg-white rounded-[10px] border border-stone-300 focus:border-sky-900 outline-none text-black text-base font-normal font-montserrat transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-black text-base font-semibold font-montserrat">Email </span>
                    <span className="text-red-600 text-base font-semibold font-montserrat">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jeanclaude@gmail.com"
                    className="w-full h-14 px-8 bg-white rounded-[10px] border border-stone-300 focus:border-sky-900 outline-none text-black text-base font-normal font-montserrat transition-colors"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-black text-base font-semibold font-montserrat">Téléphone </span>
                    <span className="text-red-600 text-base font-semibold font-montserrat">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01 68 89 03 12"
                    className="w-full h-14 px-8 bg-white rounded-[10px] border border-stone-300 focus:border-sky-900 outline-none text-black text-base font-normal font-montserrat transition-colors"
                  />
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-5">
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-white rounded-lg outline outline-[0.83px] outline-red-600 text-red-600 text-base font-semibold font-montserrat hover:bg-red-50 transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    className="px-8 py-4 bg-sky-900 rounded-lg outline outline-[0.83px] text-white text-base font-semibold font-montserrat hover:bg-sky-950 transition-all"
                  >
                    Ajouter un comptable
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
