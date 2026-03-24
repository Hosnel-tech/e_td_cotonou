"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TDTable from '@/components/dashboard/enseignant/TDTable';
import DashboardSearch from '@/components/dashboard/enseignant/DashboardSearch';
import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';

export default function PaymentsPage() {
  const [tds, setTds] = useState<TD[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    tdService.getTDs().then(setTds);
  }, []);

  const paidTDs = tds.filter(td => {
    const matchesSearch = td.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        td.classe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && td.status === 'payé';
  });

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
            Paiements
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

        {/* Advanced Search */}
        <section className="bg-white rounded-[10px] p-8 space-y-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]">
          <h2 className="text-xl font-semibold font-montserrat text-black">Recherche avancée</h2>
          
          <div className="flex items-center gap-6">
            <DashboardSearch 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher par matière ou classe..."
            />
          </div>
        </section>

        {/* Payments Table Section */}
        <section>
          <TDTable 
            showActions={true}
            data={paidTDs} 
          />
        </section>

      </main>
    </div>
  );
}
