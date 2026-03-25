"use client";

import { useState, useMemo, useEffect } from 'react';
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
import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';

export default function TDManagementPage() {
  const [tds, setTds] = useState<TD[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    tdService.getTDs().then(setTds);
  }, []);

  const filteredTDs = useMemo(() => {
    return tds.filter(td => {
      const matchesSearch = td.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          td.classe.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, tds]);

  const handleOpenDetails = (data: TD) => {
    setSelectedTD(data);
    setIsDetailsOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await tdService.updateStatus(id, status);
      const updated = await tdService.getTDs();
      setTds(updated);
    } catch (error) {
       console.error('Error updating TD status:', error);
       alert('Erreur lors de la mise à jour du statut du TD.');
    }
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
            value={tds.length.toString()} 
            icon={ClipboardList} 
            variant="green" 
            trend="Initialisé"
            staggerIndex={0} 
          />
          <StatCard 
            label="En cours" 
            value={tds.filter(t => t.status === 'en cours').length.toString()} 
            icon={Clock} 
            variant="red" 
            trend="Initialisé"
            trendUp={false}
            staggerIndex={1} 
          />
          <StatCard 
            label="Terminés" 
            value={tds.filter(t => t.status === 'terminé').length.toString()} 
            icon={CheckCircle2} 
            variant="orange" 
            trend="Initialisé"
            staggerIndex={2} 
          />
          <StatCard 
            label="Payés" 
            value={tds.filter(t => t.status === 'payé').length.toString()} 
            icon={Wallet} 
            variant="sky" 
            trend="Initialisé"
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
            onStatusUpdate={handleStatusUpdate}
            data={filteredTDs}
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
