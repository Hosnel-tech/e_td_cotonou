"use client";

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: { name: string; email: string };
  onChange: (updates: { name?: string; email?: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
}

export default function PersonalInfoForm({ formData, onChange, onSubmit, saving }: PersonalInfoFormProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-10 space-y-10"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Informations personnelles</h2>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10">
        {/* Name Field */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Nom complet <span className="text-red-600">*</span>
          </label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-sky-900 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 transition-all shadow-sm"
            required
          />
        </div>

        {/* Email Field */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Email <span className="text-red-600">*</span>
          </label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none transition-all shadow-sm focus:border-sky-900"
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <motion.button 
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-12 py-4 bg-sky-900 rounded-md text-white text-base font-semibold font-montserrat shadow-lg shadow-sky-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving && <Loader2 size={18} className="animate-spin" />}
            Modifier le profil
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
}
