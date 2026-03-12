"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Download, Calendar, ArrowRight, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import DateRangePicker from './DateRangePicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const LEVELS = ["Primaire", "Secondaire"];
const SCHOOLS = ["SURU LERE", "AKPAKPA CENTRE", "SEBGEYA", "L'OCEAN", "FIYEGNON", "LITTORAL", "LES PYLÖNES", "LES PYRAMIDES", "ENTENTE"];
const BANKS = ["ECOBANK", "BOA", "BIIC", "UBA"];

export default function AdvancedSearch() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    level: "Tous les niveaux",
    school: "Etablissement",
    bank: "Banque",
    search: "",
  });

  const [dateRange, setDateRange] = useState<{ start: Date | null, end: Date | null }>({
    start: null,
    end: null
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const selectOption = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setActiveDropdown(null);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setDateRange({ start, end });
  };

  const Dropdown = ({ label, options, type, value, className = "" }: { label: string, options: string[], type: keyof typeof filters, value: string, className?: string }) => (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => toggleDropdown(type)}
        className={`w-full h-14 px-6 bg-white rounded-lg border shadow-sm flex items-center justify-between text-xl font-medium font-montserrat transition-all ${
          activeDropdown === type ? 'border-sky-900 ring-2 ring-sky-900/10' : 'border-neutral-300 hover:border-sky-900/50'
        } ${value !== label ? 'text-black' : 'text-neutral-500'}`}
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
        <motion.div animate={{ rotate: activeDropdown === type ? 180 : 0 }} className="shrink-0">
          <ChevronDown size={20} className="text-black ml-2" />
        </motion.div>
      </button>

      <AnimatePresence>
        {activeDropdown === type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-16 left-0 w-full bg-white rounded-lg shadow-xl border border-stone-100 z-50 overflow-hidden max-h-60 overflow-y-auto"
          >
            <button 
              onClick={() => selectOption(type, label)}
              className="w-full px-6 py-4 text-left text-base font-medium font-montserrat hover:bg-sky-900/5 text-neutral-400 border-b border-stone-50"
            >
              Réinitialiser
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => selectOption(type, opt)}
                className={`w-full px-6 py-4 text-left text-base font-medium font-montserrat transition-colors hover:bg-sky-900/5 ${
                  value === opt ? 'text-sky-900 bg-sky-900/5 font-semibold' : 'text-black'
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg p-8 space-y-10 border border-stone-100 shadow-sm shadow-stone-200/50"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black font-montserrat">Recherche avancée</h2>
        <button 
          onClick={() => {
            setFilters({ level: "Tous les niveaux", school: "Etablissement", bank: "Banque", search: "" });
            setDateRange({ start: null, end: null });
          }}
          className="text-sm font-semibold text-sky-900 hover:underline px-2"
        >
          Tout effacer
        </button>
      </div>
      
      <div className="space-y-6" ref={dropdownRef}>
        {/* Row 1: Search, Level, School */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <div className="relative h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-5 gap-3 group transition-all focus-within:border-sky-900 focus-within:ring-2 focus-within:ring-sky-900/10">
              <Search size={24} className="text-neutral-400 shrink-0" />
              <input 
                type="text" 
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Rechercher par nom, matricule ou référence....." 
                className="w-full bg-transparent outline-none text-base font-semibold font-montserrat placeholder:text-neutral-400 text-black px-1"
              />
            </div>
          </div>
          <Dropdown label="Tous les niveaux" options={LEVELS} type="level" value={filters.level} />
          <Dropdown label="Etablissement" options={SCHOOLS} type="school" value={filters.school} />
        </div>

        {/* Row 2: Date Range, Bank, Export */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
          {/* Date Range Section */}
          <div className="lg:col-span-2 flex items-center gap-3 relative">
            <div 
              onClick={() => toggleDropdown('date')}
              className={`flex-1 relative h-14 px-5 bg-white rounded-lg border shadow-sm flex items-center cursor-pointer transition-all ${activeDropdown === 'date' ? 'border-sky-900 ring-2 ring-sky-900/10' : 'border-neutral-300 hover:border-sky-900/50'}`}
            >
              <Calendar size={20} className="text-neutral-400 mr-3 shrink-0" />
              <span className={`text-base font-medium font-montserrat ${dateRange.start ? 'text-black' : 'text-neutral-400'}`}>
                {dateRange.start ? format(dateRange.start, 'dd/MM/yyyy') : 'Date début'}
              </span>
            </div>
            
            <ArrowRight size={20} className="text-neutral-300 shrink-0" />
            
            <div 
              onClick={() => toggleDropdown('date')}
              className={`flex-1 relative h-14 px-5 bg-white rounded-lg border shadow-sm flex items-center cursor-pointer transition-all ${activeDropdown === 'date' ? 'border-sky-900 ring-2 ring-sky-900/10' : 'border-neutral-300 hover:border-sky-900/50'}`}
            >
              <Calendar size={20} className="text-neutral-400 mr-3 shrink-0" />
              <span className={`text-base font-medium font-montserrat ${dateRange.end ? 'text-black' : 'text-neutral-400'}`}>
                {dateRange.end ? format(dateRange.end, 'dd/MM/yyyy') : 'Date fin'}
              </span>
            </div>

            <AnimatePresence>
              {activeDropdown === 'date' && (
                <DateRangePicker 
                  startDate={dateRange.start} 
                  endDate={dateRange.end} 
                  onChange={handleDateChange}
                  onClose={() => setActiveDropdown(null)}
                />
              )}
            </AnimatePresence>
          </div>

          <Dropdown label="Banque" options={BANKS} type="bank" value={filters.bank} />

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#082f49' }}
            whileTap={{ scale: 0.98 }}
            className="h-14 bg-sky-900 rounded-lg shadow-lg flex items-center justify-center gap-3 px-6 text-white text-xl font-semibold font-montserrat transition-all"
          >
            <Download size={22} />
            <span>Exporter</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
