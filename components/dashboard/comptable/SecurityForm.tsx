"use client";

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface SecurityFormProps {
  formData: { oldPassword: '', newPassword: '', confirmPassword: '' };
  onChange: (updates: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
}

export default function SecurityForm({ formData, onChange, onSubmit, saving }: SecurityFormProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-10 space-y-10"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Modifier le mot de passe</h2>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10">
        {/* Old Password */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Ancien mot de passe <span className="text-red-600">*</span>
          </label>
          <input 
            type="password" 
            placeholder="XXXXXXXXXX"
            value={formData.oldPassword}
            onChange={(e) => onChange({ oldPassword: e.target.value })}
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all shadow-sm focus:border-sky-900"
            required
          />
        </div>

        {/* New Password */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Nouveau mot de passe <span className="text-red-600">*</span>
          </label>
          <input 
            type="password" 
            placeholder="XXXXXXXXXX"
            value={formData.newPassword}
            onChange={(e) => onChange({ newPassword: e.target.value })}
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all shadow-sm focus:border-sky-900"
            required
            minLength={6}
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Confirmer nouveau mot de passe <span className="text-red-600">*</span>
          </label>
          <input 
            type="password" 
            placeholder="XXXXXXXXXX"
            value={formData.confirmPassword}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all shadow-sm focus:border-sky-900"
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
            Mettre à jour
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
}
