"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  Calendar, 
  Upload, 
  ChevronDown 
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useConfirm } from '@/hooks/useConfirm';
import { tdService } from '@/services/td.service';
import { authService } from '@/services/auth.service';
import { SUBJECTS_BY_CLASS } from '@/constants/education';
import { scheduleService } from '@/services/schedule.service';
import { Schedule } from '@/types/schedule.types';
import { getSaturdaysOfCurrentMonth } from '@/lib/date-utils';

interface NewTDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function NewTDModal({ isOpen, onClose, onSuccess }: NewTDModalProps) {
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userClass, setUserClass] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    classe: '', // Added for flexible class selection
    startTime: '',
    endTime: '',
    date: '',
    duration: ''
  });
  const [adminSchedules, setAdminSchedules] = useState<Schedule[]>([]);
  const [isFetchingSchedules, setIsFetchingSchedules] = useState(false);

  // Fetch current user and class on mount
  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      if (user && user.role === 'enseignant') {
        setCurrentUser(user);
        
        // Logic for class and subjects
        let initialClass = '';
        if (user.niveau === 'primaire') {
          initialClass = 'CM2';
        } else {
          initialClass = '3ème'; // Default selection for secondary
        }
        
        setUserClass(initialClass);
        const subjects = SUBJECTS_BY_CLASS[initialClass] || [];
        setAvailableSubjects(subjects);
        
        setFormData(prev => ({ 
          ...prev, 
          classe: initialClass,
          subject: subjects[0] || '' 
        }));
      }
    };

    if (isOpen) {
      fetchUser();
      
      // Get dynamic Saturdays for the current month
      const saturdays = getSaturdaysOfCurrentMonth();
      const mockSchedules: Schedule[] = saturdays.map(date => ({
        id: date,
        date: date,
        createdAt: new Date().toISOString()
      }));
      
      setAdminSchedules(mockSchedules);
      
      // Auto-select the first Saturday if none selected
      if (mockSchedules.length > 0) {
        setFormData(prev => ({ ...prev, date: mockSchedules[0].date }));
      }
    }
  }, [isOpen]);

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
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Update subjects if class changes (only for secondary)
      if (name === 'classe') {
        const subjects = SUBJECTS_BY_CLASS[value] || [];
        setAvailableSubjects(subjects);
        newData.subject = subjects[0] || '';
      }
      
      return newData;
    });
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
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

    try {
      await tdService.createTD({
        subject: formData.subject,
        classe: formData.classe, 
        niveau: formData.classe === 'CM2' ? 'primaire' : 'secondaire', 
        date: formData.date,
        time: formData.startTime,
        duration: formData.duration,
        status: "en attente",
        teacher: currentUser?.name || "Enseignant", // Matches TD interface
        epreuveName: selectedFile?.name,
        epreuveUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined
      });
      onSuccess?.();
      onClose();
      // Reset
      setSelectedFile(null);
      setFormData({
        name: '',
        subject: availableSubjects[0] || '',
        classe: currentUser?.niveau === 'primaire' ? 'CM2' : '3ème',
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

                {/* Class selection (visible for Secondary only) */}
                {currentUser?.niveau === 'secondaire' && (
                  <div className="space-y-3">
                    <label className="block text-base font-semibold font-montserrat text-black">
                      Niveau de classe <span className="text-red-600">*</span>
                    </label>
                    <div className="relative group">
                      <select 
                        name="classe"
                        value={formData.classe}
                        onChange={handleChange}
                        className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)]"
                      >
                        <option value="3ème">3ème</option>
                        <option value="Tle">Tle</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                    </div>
                  </div>
                )}

                {/* Subject */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Matière <span className="text-red-600 font-normal opacity-50 ml-1">
                      (Actuel : {formData.classe || 'Chargement...'})
                    </span> <span className="text-red-600">*</span>
                  </label>
                  <div className="relative group">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={availableSubjects.length === 0}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)] disabled:bg-gray-50 disabled:opacity-50"
                    >
                      {availableSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
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

                {/* Date Dropdown (Admin Schedules) */}
                <div className="space-y-3">
                  <label className="block text-base font-semibold font-montserrat text-black">
                    Date du TD <span className="text-red-600 font-normal opacity-50 ml-1">(Samedis du mois)</span> <span className="text-red-600">*</span>
                  </label>
                  <div className="relative group">
                    <select 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      disabled={isFetchingSchedules || adminSchedules.length === 0}
                      className="w-full h-14 px-6 bg-white rounded-lg border-[0.83px] border-sky-900 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:shadow-[0px_0px_8px_rgba(0,75,112,0.2)] disabled:bg-gray-50 disabled:opacity-50"
                    >
                      {isFetchingSchedules ? (
                        <option>Chargement des dates...</option>
                      ) : adminSchedules.length > 0 ? (
                        adminSchedules.map((s) => {
                          // Format: "Lun. 14 Avr. 2026"
                          const d = new Date(s.date);
                          const formatted = d.toLocaleDateString('fr-FR', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          });
                          return (
                            <option key={s.id} value={s.date}>
                              {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">Aucune date planifiée</option>
                      )}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                      <Calendar size={20} className="text-black/40" />
                      <ChevronDown size={20} className="text-black" />
                    </div>
                  </div>
                  {adminSchedules.length === 0 && !isFetchingSchedules && (
                    <p className="text-xs text-red-500 font-medium italic mt-1">Contactez l'administration pour définir des dates.</p>
                  )}
                </div>
              </div>

              {/* File Upload Area */}
              <div 
                onClick={handleFileClick}
                className={`w-full h-48 border-[0.83px] border-dashed rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors group ${
                  selectedFile ? 'border-green-800 bg-green-50/30' : 'border-sky-900 bg-white hover:bg-sky-50'
                }`}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <Upload className={`${selectedFile ? 'text-green-800' : 'text-sky-900'} group-hover:scale-110 transition-transform`} size={32} />
                <span className={`text-base font-normal font-montserrat ${selectedFile ? 'text-green-800 font-semibold' : 'text-black'}`}>
                  {selectedFile ? `Fichier sélectionné : ${selectedFile.name}` : 'Charger le fichier de l’épreuve'}
                </span>
                {selectedFile && (
                  <span className="text-xs text-green-800/60 font-medium italic">Cliquez pour changer de fichier</span>
                )}
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
