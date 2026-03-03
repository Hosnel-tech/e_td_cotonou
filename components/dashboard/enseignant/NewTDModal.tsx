"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Calendar, 
  Upload, 
  ChevronDown 
} from 'lucide-react';

interface NewTDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTDModal({ isOpen, onClose }: NewTDModalProps) {
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

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[900px] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-100">
              <h2 className="text-3xl font-semibold font-montserrat text-black">Ajouter un TD</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-black" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TD Name */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Nom du TD <span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="TD Français"
                    className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Matière <span className="text-red-600">*</span>
                  </label>
                  <div className="relative group">
                    <select className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]">
                      <option>Français</option>
                      <option>Anglais</option>
                      <option>SVT</option>
                      <option>Mathématiques</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                {/* Start Time */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Heure de départ <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="-- | --"
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                    />
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                  </div>
                </div>

                {/* End Time */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Heure de fin <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="-- | --"
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                    />
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Durée <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="-- | --"
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                    />
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="12/11/25"
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                    />
                    <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                  </div>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="w-full h-48 border-[0.83px] border-sky-900 border-dashed rounded-lg bg-white flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-sky-50 transition-colors group">
                <Upload className="text-sky-900 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-black text-base font-normal font-montserrat">
                  Charger le fichier de l’épreuve
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-8 flex items-center justify-end gap-6 bg-gray-50/50">
              <button 
                onClick={onClose}
                className="px-10 py-5 bg-white text-red-600 border border-red-600 rounded-lg text-base font-medium font-montserrat hover:bg-red-50 transition-colors shadow-sm"
              >
                Annuler
              </button>
              <button 
                className="px-10 py-5 bg-sky-900 text-white rounded-lg text-base font-medium font-montserrat hover:bg-sky-950 transition-colors shadow-lg active:scale-95 transition-all"
              >
                Ajouter un TD
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
