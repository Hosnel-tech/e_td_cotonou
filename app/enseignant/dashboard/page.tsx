"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  FileText, 
  CreditCard,
  FileX
} from 'lucide-react';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import HeroBanner from '@/components/dashboard/enseignant/HeroBanner';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TDTable from '@/components/dashboard/enseignant/TDTable';
import ProchainsTD from '@/components/dashboard/enseignant/ProchainsTD';
import Notifications from '@/components/dashboard/enseignant/Notifications';
import TDDetailsModal from '@/components/dashboard/enseignant/TDDetailsModal';

export default function DashboardPage() {
  const [selectedTD, setSelectedTD] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleOpenDetails = (data: any) => {
    setSelectedTD(data);
    setIsDetailsOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-10">
        
        {/* Page Header */}
        <header className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold text-black font-montserrat"
          >
            Tableau de bord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-500 font-montserrat"
          >
            Bienvenue dans votre espace enseignant
          </motion.p>
        </header>

        {/* Hero Section */}
        <HeroBanner />

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            label="Travaux Dirigés" 
            value="23" 
            icon={ClipboardList} 
            variant="green" 
            trend="12%"
            staggerIndex={0} 
          />
          <StatCard 
            label="Epreuves" 
            value="17" 
            icon={FileText} 
            variant="red" 
            trend="12%"
            trendUp={false}
            staggerIndex={1} 
          />
          <StatCard 
            label="TD payés" 
            value="13" 
            icon={CreditCard} 
            variant="orange" 
            trend="12%"
            staggerIndex={2} 
          />
          <StatCard 
            label="TD non payés" 
            value="10" 
            icon={FileX} 
            variant="sky" 
            trend="12%"
            staggerIndex={3} 
          />
        </section>

        {/* Activity Section Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-7">
            <ProchainsTD />
          </div>
          <div className="xl:col-span-5">
            <Notifications />
          </div>
        </section>

        {/* Main Data Table */}
        <section className="pb-10">
          <TDTable onOpenDetails={handleOpenDetails} limit={4} />
        </section>

      </main>

      {/* TD Details Modal */}
      <TDDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        tdData={selectedTD} 
      />
    </div>
  );
}
