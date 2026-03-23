"use client";

import { motion } from 'framer-motion';
import { Wallet, CreditCard, PieChart, Download } from 'lucide-react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdvancedSearch from '@/components/dashboard/comptable/AdvancedSearch';
import TransfersTable, { TRANSFERS_DATA } from '@/components/dashboard/comptable/TransfersTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';

export default function TransfersPage() {
  const selection = useSelection(TRANSFERS_DATA);

  return (
    <>
      {/* Page Header */}
      <header className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-semibold text-black"
        >
          Virements
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

      {/* Stats Grid */}
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

      {/* Detailed Transfers Table */}
      <TransfersTable 
        isSelected={selection.isSelected}
        toggleSelectOne={selection.toggleSelectOne}
        isAllSelected={selection.isAllSelected}
        isIndeterminate={selection.isIndeterminate}
        toggleSelectAll={selection.toggleSelectAll}
      />

      <BulkActionsBar 
        count={selection.selectionCount} 
        onClear={selection.clearSelection} 
        primaryAction={{
          label: 'Exporter',
          icon: Download,
          onClick: () => alert('Actions groupées: Virements exportés au format CSV')
        }}
        showDelete={false} 
      />
    </>
  );
}
