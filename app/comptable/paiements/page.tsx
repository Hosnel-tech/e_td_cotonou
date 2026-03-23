"use client";

import { motion } from 'framer-motion';
import { 
  Search, Download, Plus, Filter, Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import ComptableSidebar from '@/components/dashboard/comptable/ComptableSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import PaymentManagementTable from '@/components/dashboard/comptable/PaymentManagementTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';
import { paymentService } from '@/services/payment.service';
import { Payment } from '@/types/financial.types';

export default function AccountantPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    paymentService.getPayments().then(setPayments);
  }, []);

  const selection = useSelection(payments);

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <ComptableSidebar />
      
      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header */}
        <header className="flex justify-between items-end pb-4 border-b border-stone-200">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-black tracking-tight">Gestion des Paiements</h1>
            <p className="text-xl font-normal text-black/60 font-montserrat">Validez et suivez les règlements des enseignants</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="h-14 bg-white text-sky-900 border-2 border-sky-900 px-6 rounded-lg font-bold flex items-center gap-2 transition-all hover:bg-sky-50 active:scale-95 shadow-sm">
              <Plus size={20} strokeWidth={3} />
              Nouveau Paiement
            </button>
            <button className="h-14 bg-sky-900 text-white px-8 rounded-lg font-bold flex items-center gap-2 transition-all hover:bg-sky-950 shadow-lg shadow-sky-900/20 active:scale-95">
              <Download size={20} strokeWidth={3} />
              Exporter (.CSV)
            </button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
          <div className="flex-1 h-14 bg-slate-50 rounded-lg border border-neutral-200 flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-900/10 transition-all text-black">
            <Search className="text-neutral-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par enseignant, matière, classe..." 
              className="bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 w-full"
            />
          </div>
          <button className="h-14 px-6 bg-slate-50 border border-neutral-200 rounded-lg flex items-center gap-3 font-semibold text-black hover:bg-slate-100 transition-all">
            <Filter size={20} />
            Filtres avancés
          </button>
        </div>

        {/* Table */}
        <PaymentManagementTable 
          payments={payments}
          isSelected={selection.isSelected}
          toggleSelectOne={selection.toggleSelectOne}
          isAllSelected={selection.isAllSelected}
          isIndeterminate={selection.isIndeterminate}
          toggleSelectAll={selection.toggleSelectAll}
        />

        {/* Bulk Actions Bar */}
        <BulkActionsBar 
          count={selection.selectionCount} 
          onClear={selection.clearSelection}
          primaryAction={{
            label: 'Marquer payé',
            icon: Check,
            onClick: () => console.log('Marking selected as paid...')
          }}
        />
      </main>
    </div>
  );
}
