"use client";

import { motion } from 'framer-motion';
import { Search, ChevronDown, Calendar, Download } from 'lucide-react';
import { useState } from 'react';
import { SCHOOLS } from '@/constants/education';

interface DropdownProps {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}

const Dropdown = ({ options, placeholder, value, onChange }: DropdownProps) => {
  return (
    <div className="relative group flex-1 min-w-[200px]">
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 bg-white rounded-lg border border-stone-200 px-6 appearance-none text-black text-lg font-medium font-montserrat shadow-sm hover:border-sky-900/40 transition-all outline-none focus:ring-2 focus:ring-sky-900/10 cursor-pointer"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-transform group-hover:scale-110" />
      </div>
    </div>
  );
};

interface AdvancedSearchProps {
  onLevelChange: (level: string) => void;
  selectedLevel: string;
  selectedSchool: string;
  onSchoolChange: (school: string) => void;
  selectedPreference: string;
  onPreferenceChange: (pref: string) => void;
}

export default function AdvancedSearch({ 
  onLevelChange, 
  selectedLevel,
  selectedSchool,
  onSchoolChange,
  selectedPreference,
  onPreferenceChange
}: AdvancedSearchProps) {
  const [bank, setBank] = useState('');
  const [search, setSearch] = useState('');

  const BANKS = ["BOA", "BIIC", "NSIA", "UBA", "BGFI", "ECOBANK", "BCEAO"];
  const LEVELS = ["primaire", "secondaire"];
  const PREFERENCES = ["électronique", "bancaire"];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl shadow-[0px_0px_15px_2px_rgba(0,0,0,0.05)] border border-black/5 p-10 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-black text-2xl font-bold font-montserrat tracking-tight">Recherche avancée</h2>
        <button className="h-14 px-8 bg-sky-900 text-white rounded-lg flex items-center justify-center gap-3 font-semibold text-lg font-montserrat shadow-lg shadow-sky-900/20 hover:bg-sky-950 active:scale-95 transition-all">
          <Download size={20} />
          <span>Exporter (.CSV)</span>
        </button>
      </div>
      
      {/* Search and Filters Grid */}
      <div className="space-y-6">
        {/* Row 1: Search and Levels */}
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="relative flex-1 group">
            <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-sky-900 transition-colors" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par enseignant..." 
              className="w-full h-14 bg-white rounded-lg border border-stone-200 pl-14 pr-6 text-lg font-medium placeholder:text-neutral-300 text-black outline-none shadow-sm focus:border-sky-900 transition-all font-montserrat"
            />
          </div>
          
          <div className="flex flex-wrap flex-1 gap-6">
            <Dropdown 
              placeholder="Sélectionner le niveau" 
              options={LEVELS} 
              value={selectedLevel} 
              onChange={onLevelChange} 
            />
            <Dropdown 
              placeholder="Sélectionner la banque" 
              options={BANKS} 
              value={bank} 
              onChange={setBank} 
            />
          </div>
        </div>

        {/* Row 2: Schools and Payment Preference */}
        <div className="flex flex-col xl:flex-row gap-6">
          <Dropdown 
            placeholder="Établissement" 
            options={[...SCHOOLS]} 
            value={selectedSchool} 
            onChange={onSchoolChange} 
          />

          <Dropdown 
            placeholder="Préférence de paiement" 
            options={PREFERENCES} 
            value={selectedPreference} 
            onChange={onPreferenceChange} 
          />
        </div>
      </div>
    </motion.section>
  );
}
