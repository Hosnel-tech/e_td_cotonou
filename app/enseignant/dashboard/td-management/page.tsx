"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ClipboardList,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TDCard from '@/components/dashboard/enseignant/TDCard';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import NewTDModal from '@/components/dashboard/enseignant/NewTDModal';
import TDDetailsModal from '@/components/dashboard/enseignant/TDDetailsModal';

const mockTDs = [
  { matter: 'Anglais', status: 'en cours', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'Français', status: 'terminé', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'SVT', status: 'en cours', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'EST', status: 'terminé', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'Français', status: 'terminé', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'EST', status: 'terminé', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'Anglais', status: 'en cours', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
  { matter: 'SVT', status: 'en cours', classe: '3ème', heure: '14h - 17h', date: '12/07/25', duree: '3h' },
];

export default function TDManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTD, setSelectedTD] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDetails = (data: any) => {
    setSelectedTD(data);
    setIsDetailsOpen(true);
  };

  // Close dropdown when clicking outside - Senior Pro implementation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-8">
        
        {/* Page Header */}
        <header className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-semibold text-black font-montserrat"
          >
            Gestion TD
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-black font-montserrat"
          >
            Gérez vos travaux dirigés et séances
          </motion.p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard 
            label="Nombre total" 
            value="23" 
            icon={ClipboardList} 
            variant="green" 
            trend="12%"
            staggerIndex={0} 
          />
          <StatCard 
            label="En cours" 
            value="17" 
            icon={Clock} 
            variant="red" 
            trend="12%"
            trendUp={false}
            staggerIndex={1} 
          />
          <StatCard 
            label="Terminés" 
            value="13" 
            icon={CheckCircle2} 
            variant="orange" 
            trend="12%"
            staggerIndex={2} 
          />
          <StatCard 
            label="Payés" 
            value="10" 
            icon={Wallet} 
            variant="sky" 
            trend="12%"
            staggerIndex={3} 
          />
        </section>

        {/* Advanced Search & Actions */}
        <section className="bg-white rounded-[10px] p-6 space-y-6">
          <h2 className="text-xl font-semibold font-montserrat text-black">Recherche avancée</h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-sky-900 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Rechercher....." 
                className="w-full h-14 pl-14 pr-6 bg-white rounded-lg border border-neutral-300 outline-none font-semibold font-montserrat text-black placeholder:text-neutral-400 transition-shadow focus:border-sky-900/50"
              />
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative w-44" ref={dropdownRef}>
                <button 
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className={`w-full h-14 px-6 bg-white rounded-lg border transition-all flex items-center justify-between ${
                    isStatusOpen ? 'border-sky-900 ring-1 ring-sky-900/10' : 'border-neutral-300 hover:border-sky-900/30'
                  }`}
                >
                  <span className="text-black text-xl font-medium font-montserrat">Statut</span>
                  <ChevronDown className={`text-black transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} size={20} />
                </button>
                
                {/* Dropdown Menu - Framer Motion for premium feel */}
                <motion.div 
                  initial={false}
                  animate={isStatusOpen ? { opacity: 1, y: 0, display: 'block' } : { opacity: 0, y: -10, transitionEnd: { display: 'none' } }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 w-full mt-2 bg-white rounded-[5px] shadow-[0px_10px_30px_rgba(0,0,0,0.1)] z-20 overflow-hidden border border-gray-100"
                >
                  <button 
                    onClick={() => setIsStatusOpen(false)}
                    className="w-full px-5 py-3.5 text-left text-black text-base font-medium font-montserrat hover:bg-sky-900/5 transition-colors"
                  >
                    En cours
                  </button>
                  <div className="h-px bg-zinc-100 mx-1" />
                  <button 
                    onClick={() => setIsStatusOpen(false)}
                    className="w-full px-5 py-3.5 text-left text-black text-base font-medium font-montserrat hover:bg-sky-900/5 transition-colors"
                  >
                    Terminé
                  </button>
                  <div className="h-px bg-zinc-100 mx-1" />
                  <button 
                    onClick={() => setIsStatusOpen(false)}
                    className="w-full px-5 py-3.5 text-left text-black text-base font-medium font-montserrat hover:bg-sky-900/5 transition-colors"
                  >
                    Rejeté
                  </button>
                </motion.div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="h-14 flex-1 lg:flex-none lg:w-60 bg-sky-900 hover:bg-sky-950 text-white rounded-lg shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <Plus className="text-white" size={24} />
                <span className="text-xl font-semibold font-montserrat">Nouveau TD</span>
              </button>
            </div>
          </div>
        </section>

        {/* TD List Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-montserrat text-black">Mes travaux dirigés</h2>
            <div className="flex items-center gap-2.5">
              <button className="w-11 h-11 flex items-center justify-center rounded-md text-black hover:bg-gray-50 transition-colors">
                <List size={28} />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-md bg-sky-900 text-white shadow-lg">
                <LayoutGrid size={28} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-8">
            {mockTDs.map((td, index) => (
              <TDCard 
                key={index}
                matter={td.matter}
                status={td.status as any}
                classe={td.classe}
                heure={td.heure}
                date={td.date}
                duree={td.duree}
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-10">
            <span className="text-2xl font-normal font-montserrat text-black">Total 0</span>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 rounded-full transition-all">
                <ChevronLeft size={28} />
              </button>
              <div className="flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-md border border-green-800 text-green-800 font-semibold font-montserrat text-2xl hover:bg-green-50">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-green-800 text-white font-semibold font-montserrat text-2xl shadow-md transition-transform hover:scale-105 active:scale-95">
                  2
                </button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center text-black hover:bg-gray-50 rounded-full transition-all">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* New TD Modal */}
      <NewTDModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* TD Details Modal */}
      <TDDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        tdData={selectedTD} 
      />
    </div>
  );
}
