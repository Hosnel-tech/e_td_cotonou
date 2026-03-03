"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight,
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

  const handleOpenDetails = (data: any) => {
    setSelectedTD(data);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-8">
        
        {/* Page Header */}
        <header className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold text-black font-montserrat"
          >
            Gestion TD
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600 font-montserrat"
          >
            Gérez vos travaux dirigés et séances
          </motion.p>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
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

        {/* Actions Bar */}
        <section className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-sky-900 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher....." 
              className="w-full h-14 pl-14 pr-6 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.15)] outline-none font-semibold font-montserrat text-black placeholder:text-zinc-300 transition-shadow focus:shadow-[0px_0px_10px_1px_rgba(0,75,112,0.2)]"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-10 bg-sky-900 hover:bg-sky-950 text-white rounded-lg shadow-lg flex items-center gap-3 transition-all active:scale-95"
          >
            <Plus className="text-white" size={24} />
            <span className="text-xl font-semibold font-montserrat">Nouveau TD</span>
          </button>
        </section>

        {/* TD List Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold font-montserrat text-black">Mes travaux dirigés</h2>
            <div className="flex items-center gap-2.5">
              <button className="w-11 h-11 flex items-center justify-center rounded-md text-black/40 hover:text-black transition-colors">
                <List size={28} />
              </button>
              <button className="w-11 h-11 flex items-center justify-center rounded-md bg-sky-900 text-white shadow-lg">
                <LayoutGrid size={28} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

          <div className="flex items-center justify-between pt-8 border-t border-gray-100">
            <span className="text-2xl font-normal font-montserrat text-black">Total 0</span>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
                <ChevronLeft size={28} />
              </button>
              <div className="flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-md border border-green-800 text-green-800 font-semibold font-montserrat text-2xl">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-green-800 text-white font-semibold font-montserrat text-2xl shadow-md">
                  2
                </button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
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
