"use client";

import { motion } from 'framer-motion';

export default function SecurityForm() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-10 space-y-10"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Mot de passe</h2>
      
      <div className="grid grid-cols-1 gap-10">
        {/* Old Password */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Ancien mot de passe <span className="text-red-600">*</span>
          </label>
          <input 
            type="password" 
            placeholder="XXXXXXXXXX"
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all"
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
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Confirmer mot de passe <span className="text-red-600">*</span>
          </label>
          <input 
            type="password" 
            placeholder="XXXXXXXXXX"
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 placeholder:text-stone-300 transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#0c3a5e' }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-sky-900 rounded-md text-white text-base font-semibold font-montserrat shadow-lg shadow-sky-900/20 transition-all"
        >
          Modifier
        </motion.button>
      </div>
    </motion.section>
  );
}
