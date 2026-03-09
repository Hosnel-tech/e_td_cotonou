"use client";

import { useState } from 'react';
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

const paymentData = [
  { id: 1, name: 'Anglais', classe: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 2, name: 'Français', classe: 'Tle', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 3, name: 'SVT', classe: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 4, name: 'EST', classe: 'CM2', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
            data={paymentData
              .filter(td => {
                const matchesSearch = td.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    td.classe.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch && td.status === 'Payé';
              })
              .map(td => ({
                id: td.id,
                subject: td.name,
                class: td.classe,
                date: td.date,
                start: td.start,
                end: td.end,
                status: td.status as any,
                duration: td.duration
              }))} 
          />
        </section>

      </main>
    </div>
  );
}
