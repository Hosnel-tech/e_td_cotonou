"use client";

import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  FileText, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import HeroBanner from '@/components/dashboard/enseignant/HeroBanner';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TDTable from '@/components/dashboard/enseignant/TDTable';
import ProchainsTD from '@/components/dashboard/enseignant/ProchainsTD';
import Notifications from '@/components/dashboard/enseignant/Notifications';

export default function DashboardPage() {
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
            Tableau de bord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600 font-montserrat"
          >
            Bienvenue dans votre espace enseignant
          </motion.p>
        </header>

        {/* Hero Section */}
        <HeroBanner />

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Mes TD" 
            value="0" 
            icon={ClipboardList} 
            variant="green" 
            staggerIndex={0} 
          />
          <StatCard 
            label="Epreuves" 
            value="0" 
            icon={FileText} 
            variant="red" 
            staggerIndex={1} 
          />
          <StatCard 
            label="Payés" 
            value="0" 
            icon={CheckCircle2} 
            variant="orange" 
            staggerIndex={2} 
          />
          <StatCard 
            label="Non payés" 
            value="0" 
            icon={XCircle} 
            variant="black" 
            staggerIndex={3} 
          />
        </section>

        {/* Activity Section Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <ProchainsTD />
          </div>
          <div className="xl:col-span-2">
            <Notifications />
          </div>
        </section>

        {/* Main Data Table */}
        <section>
          <TDTable />
        </section>

      </main>
    </div>
  );
}
