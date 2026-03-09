"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import NewTDModal from '@/components/dashboard/enseignant/NewTDModal';
import TDDetailsModal from '@/components/dashboard/enseignant/TDDetailsModal';
import TDTable from '@/components/dashboard/enseignant/TDTable';
import DashboardSearch from '@/components/dashboard/enseignant/DashboardSearch';

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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTDs = useMemo(() => {
    return mockTDs.filter(td => {
      const matchesSearch = td.matter.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          td.classe.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const handleOpenDetails = (data: any) => {
    setSelectedTD(data);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      {/* Sidebar Area */}
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
            <DashboardSearch 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher par matière ou classe..."
            />

            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 h-14 bg-[#004B70] text-white rounded-lg flex items-center justify-center gap-2.5 font-semibold font-montserrat hover:bg-green-700 transition-all shadow-md group whitespace-nowrap"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              Ajouter un TD
            </button>
          </div>
        </section>

        {/* Unified TD Table / Grid */}
        <section>
          <TDTable 
            onOpenDetails={handleOpenDetails} 
            data={filteredTDs.map(td => ({
              subject: td.matter,
              status: td.status as any,
              class: td.classe,
              time: td.heure,
              date: td.date,
              duration: td.duree
            }))}
          />
        </section>

        {/* Pagination Controls */}
        <footer className="flex items-center justify-between bg-white p-8 rounded-lg shadow-sm border border-stone-100">
          <span className="text-2xl font-normal font-montserrat text-black">Total {filteredTDs.length}</span>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
              <ChevronLeft size={28} />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-md border border-green-800 text-green-800 font-semibold font-montserrat text-2xl hover:bg-green-50 transition-colors">
                1
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-md bg-green-800 text-white font-semibold font-montserrat text-2xl shadow-md transition-transform hover:scale-105">
                2
              </button>
            </div>
            <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
              <ChevronRight size={28} />
            </button>
          </div>
        </footer>

      </main>

      {/* Modals */}
      <NewTDModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <TDDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        tdData={selectedTD} 
      />
    </div>
  );
}
