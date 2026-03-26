"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Calendar, 
  Upload, 
  ChevronDown 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useConfirm } from '@/hooks/useConfirm';
import { tdService } from '@/services/td.service';

interface NewTDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function NewTDModal({ isOpen, onClose, onSuccess }: NewTDModalProps) {
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: 'Français',
    startTime: '',
    endTime: '',
    date: '',
    duration: ''
  });

  // Automatically calculate duration when startTime or endTime changes
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startH, startM] = formData.startTime.split(':').map(Number);
      const [endH, endM] = formData.endTime.split(':').map(Number);
      
      let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      
      if (diffMinutes < 0) diffMinutes = 0; // Handle end before start

      const hours = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      
      let durationStr = '';
      if (hours > 0) durationStr += `${hours}h `;
      if (mins > 0 || hours === 0) durationStr += `${mins}min`;
      
      setFormData(prev => ({ ...prev, duration: durationStr.trim() }));
    }
  }, [formData.startTime, formData.endTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.date || !formData.startTime || !formData.endTime) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const ok = await confirm({
      title: "Confirmer l'ajout de ce TD ?",
      description: `Une nouvelle séance de ${formData.subject} sera créée pour le ${formData.date} à ${formData.startTime}.`,
      confirmLabel: "Oui, ajouter",
      variant: "info",
    });

    if (!ok) return;

    setLoading(true);
    try {
      await tdService.createTD({
        subject: formData.subject,
        classe: "Tle", // Default for now or could be a field
        niveau: "secondaire", // Default for now
        date: formData.date,
        time: formData.startTime,
        duration: formData.duration,
        status: "en cours",
        teacher: "M. DUPONT" // Matches TD interface
      });
      onSuccess?.();
      onClose();
      setFormData({
        name: '',
        subject: 'Français',
        startTime: '',
        endTime: '',
        date: '',
        duration: ''
      });
    } catch (error) {
      console.error('Error creating TD:', error);
      alert("Erreur lors de l'ajout du TD.");
    } finally {
      setLoading(false);
    }
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                    >
                      <option value="Français">Français</option>
                      <option value="Anglais">Anglais</option>
                      <option value="SVT">SVT</option>
                      <option value="Mathématiques">Mathématiques</option>
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
                      type="time" 
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)] custom-time-input"
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
                      type="time" 
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)] custom-time-input"
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
                      readOnly
                      value={formData.duration}
                      placeholder="Calculée automatiquement"
                      className="w-full h-14 px-6 bg-gray-50/50 rounded-lg border-[0.83px] border-sky-900/30 outline-none font-medium font-montserrat text-sky-900/60 transition-shadow cursor-default"
                    />
                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-sky-900/30 pointer-events-none" size={20} />
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Date <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)] custom-date-input"
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
                onClick={handleSubmit}
                disabled={loading}
                className="px-10 py-5 bg-sky-900 text-white rounded-lg text-base font-medium font-montserrat hover:bg-sky-950 transition-colors shadow-lg active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? 'Ajout en cours...' : 'Ajouter un TD'}
              </button>
            </div>

            <style jsx>{`
              .custom-time-input::-webkit-calendar-picker-indicator,
              .custom-date-input::-webkit-calendar-picker-indicator {
                position: absolute;
                right: 24px;
                opacity: 0;
                width: 24px;
                height: 24px;
                cursor: pointer;
              }
            `}</style>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
