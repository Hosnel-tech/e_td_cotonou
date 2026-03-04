"use client";

import { motion } from 'framer-motion';

export default function PersonalInfoForm() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-10 space-y-10"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Informations personnelles</h2>
      
      <div className="grid grid-cols-1 gap-10">
        {/* Name Field */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Nom <span className="text-red-600">*</span>
          </label>
          <input 
            type="text" 
            defaultValue="Paul"
            className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-sky-900 text-black text-base font-medium font-montserrat outline-none focus:ring-2 focus:ring-sky-900/10 transition-all"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-4">
          <label className="block text-black text-base font-semibold font-montserrat">
            Email <span className="text-red-600">*</span>
          </label>
          <input 
            type="email" 
            placeholder="example@gmail.com"
            disabled
            className="w-full h-14 px-6 bg-gray-50 rounded-md border-[0.69px] border-stone-300 text-stone-400 text-base font-medium font-montserrat outline-none cursor-not-allowed"
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
