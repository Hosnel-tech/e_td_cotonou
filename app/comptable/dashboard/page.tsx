"use client";

import { motion } from 'framer-motion';
import { Wallet, CreditCard, PieChart } from 'lucide-react';
import ComptableSidebar from '@/components/dashboard/comptable/ComptableSidebar';
import ComptableHero from '@/components/dashboard/comptable/ComptableHero';
import EvaluationSection from '@/components/dashboard/comptable/EvaluationSection';
import PendingPaymentsTable from '@/components/dashboard/comptable/PendingPaymentsTable';
import StatCard from '@/components/dashboard/enseignant/StatCard';

export default function ComptableDashboardPage() {
  return (
    <>
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
          Bienvenue dans votre espace comptable
        </motion.p>
      </header>

      <ComptableHero />

      <section className="flex flex-wrap gap-8">
        <StatCard 
          label="Montant dû" 
          value="1.334.432 F" 
          icon={Wallet} 
          variant="green" 
          trend="12%"
          staggerIndex={0} 
        />
        <StatCard 
          label="TD à payés" 
          value="17" 
          icon={CreditCard} 
          variant="red" 
          trend="12%"
          staggerIndex={1} 
        />
        <StatCard 
          label="Dépenses mensuelles" 
          value="3.321.424 F" 
          icon={PieChart} 
          variant="orange" 
          trend="12%"
          staggerIndex={2} 
        />
      </section>

      <EvaluationSection />
      <PendingPaymentsTable />
    </>
  );
}
