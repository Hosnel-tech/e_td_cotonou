"use client";

import { motion } from 'framer-motion';
import { Wallet, CreditCard, PieChart, Check } from 'lucide-react';
import ComptableSidebar from '@/components/dashboard/comptable/ComptableSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdvancedSearch from '@/components/dashboard/comptable/AdvancedSearch';
import PaymentManagementTable, { PAYMENTS_DATA } from '@/components/dashboard/comptable/PaymentManagementTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';

export default function PaymentManagementPage() {
  const selection = useSelection(PAYMENTS_DATA);

  return (
    <>
      <header className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-semibold text-black font-montserrat tracking-tight"
        >
          Paiements
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

      <AdvancedSearch />
      <PaymentManagementTable 
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
          label: 'Marquer payé',
          icon: Check,
          onClick: () => alert('Actions groupées: Paiements marqués comme effectués')
        }}
        showDelete={false} 
      />
    </>
  );
}
