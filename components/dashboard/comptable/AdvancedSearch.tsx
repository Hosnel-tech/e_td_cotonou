"use client";

import { motion } from 'framer-motion';
import { Search, ChevronDown, Download, Calendar } from 'lucide-react';

export default function AdvancedSearch() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Recherche avancée</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 items-end">
        {/* Search Bar */}
        <div className="xl:col-span-2 space-y-2">
          <div className="relative h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.10)] border-[0.83px] border-black/40 flex items-center px-4 group transition-all focus-within:ring-2 focus-within:ring-sky-900/20">
            <Search size={20} className="text-zinc-300 group-focus-within:text-sky-900 transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher....." 
              className="w-full bg-transparent border-none outline-none px-3 text-black text-base font-semibold font-montserrat placeholder:text-zinc-300"
            />
          </div>
        </div>

        {/* Status Dropdown (Tous les niveaux) */}
        <div className="space-y-2">
          <div className="h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-black/40 flex items-center justify-between px-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <span className="text-black text-xl font-normal font-montserrat whitespace-nowrap">Tous les niveaux</span>
            <ChevronDown size={24} className="text-black group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <div className="h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-black/40 flex items-center justify-between px-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <span className="text-black text-xl font-normal font-montserrat whitespace-nowrap opacity-60">mm/dd/yyyy</span>
            <Calendar size={24} className="text-black" />
          </div>
        </div>

        {/* Etablissement Dropdown */}
        <div className="space-y-2">
          <div className="h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-black/40 flex items-center justify-between px-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <span className="text-black text-xl font-normal font-montserrat whitespace-nowrap">Etablissement</span>
            <ChevronDown size={24} className="text-black group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Bank Dropdown */}
        <div className="space-y-2">
          <div className="h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-black/40 flex items-center justify-between px-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <span className="text-black text-xl font-normal font-montserrat whitespace-nowrap">Banque</span>
            <ChevronDown size={24} className="text-black group-hover:translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#0c3a5e' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-sky-900 rounded-lg shadow-lg flex items-center gap-3 text-white text-xl font-semibold font-montserrat group transition-all"
        >
          <Download size={24} className="group-hover:translate-y-0.5 transition-transform" />
          Exporter (.CSV)
        </motion.button>
      </div>
    </motion.section>
  );
}
