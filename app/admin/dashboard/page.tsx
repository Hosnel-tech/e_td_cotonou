"use client";

import { motion } from 'framer-motion';
import { ClipboardList, Users, AlertCircle, Wallet } from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import AdminHero from '@/components/dashboard/admin/AdminHero';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import ActivitySection from '@/components/dashboard/admin/ActivitySection';
import AdminTDTable from '@/components/dashboard/admin/AdminTDTable';

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      {/* Permanent Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-10">
        
        {/* Header Section */}
        <header className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold text-black"
          >
            Tableau de bord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600"
          >
            Bienvenue dans votre espace administrateur
          </motion.p>
        </header>

        {/* Global Hero Section */}
        <AdminHero />

        {/* Dynamic Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Travaux dirigés" 
            value="23" 
            icon={ClipboardList} 
            variant="green" 
            trend="12%"
            staggerIndex={0} 
          />
          <StatCard 
            label="Enseignants" 
            value="17" 
            icon={Users} 
            variant="red" 
            trend="12%"
            staggerIndex={1} 
          />
          <StatCard 
            label="Non payés" 
            value="13" 
            icon={AlertCircle} 
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

        {/* Activity & Notifications Section */}
        <ActivitySection />

        {/* TD Table Management Section */}
        <AdminTDTable limit={4} />

      </main>
    </div>
  );
}
