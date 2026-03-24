"use client";

import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, 
  Wallet, Clock, CheckCircle2, AlertCircle,
  FileText, ArrowUpRight, Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import PendingPaymentsTable from '@/components/dashboard/comptable/PendingPaymentsTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';
import { paymentService } from '@/services/payment.service';
import { transferService } from '@/services/transfer.service';
import { Payment, Transfer } from '@/types/financial.types';

export default function AccountantDashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [payData, transData] = await Promise.all([
          paymentService.getPayments(),
          transferService.getTransfers()
        ]);
        setPayments(payData);
        setTransfers(transData);
      } catch (error) {
        console.error('Error fetching accountant data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const selection = useSelection(payments);

  const totalDecaisse = transfers.reduce((sum, t) => sum + parseInt(t.amount.replace(/\D/g, '') || '0'), 0);
  const totalEnAttente = payments
    .filter(p => p.status.toLowerCase() === 'en attente')
    .reduce((sum, p) => sum + parseInt(p.amount.replace(/\D/g, '') || '0'), 0);
  const validesCeMois = payments.filter(p => p.status.toLowerCase() === 'payé' || p.status.toLowerCase() === 'validé').length;
  const litiges = payments.filter(p => p.status.toLowerCase() === 'rejeté' || p.status.toLowerCase() === 'litige').length;

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-black tracking-tight">Tableau de bord</h1>
          <p className="text-xl font-normal text-black/60">Bienvenue, voici le résumé de l'activité financière</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-4 gap-3 shadow-sm min-w-[300px]">
            <Search className="text-neutral-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher un paiement..." 
              className="bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 text-black w-full"
            />
          </div>
          <button className="h-14 bg-sky-900 text-white px-6 rounded-lg font-semibold flex items-center gap-2 transition-all hover:bg-sky-950 shadow-lg shadow-sky-900/20 active:scale-95">
            <Download size={20} />
            Exporter (.CSV)
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          label="Total décaissé" 
          value={isLoading ? "..." : `${totalDecaisse.toLocaleString()} F`}
          icon={Wallet} 
          variant="green" 
          trend={totalDecaisse > 0 ? "Actualisé" : "Initialisé"}
          staggerIndex={0}
        />
        <StatCard 
          label="En attente" 
          value={isLoading ? "..." : `${totalEnAttente.toLocaleString()} F`}
          icon={Clock} 
          variant="orange" 
          trend={totalEnAttente > 0 ? "À traiter" : "À jour"}
          staggerIndex={1}
        />
        <StatCard 
          label="Validés ce mois" 
          value={isLoading ? "..." : validesCeMois.toString()}
          icon={CheckCircle2} 
          variant="sky" 
          trend={validesCeMois > 0 ? "Actualisé" : "Initialisé"}
          staggerIndex={2}
        />
        <StatCard 
          label="Litiges" 
          value={isLoading ? "..." : litiges.toString()}
          icon={AlertCircle} 
          variant="red" 
          trend={litiges > 0 ? "À voir" : "Aucun"}
          staggerIndex={3}
        />
      </section>

      {/* Pending Payments Table */}
      <PendingPaymentsTable 
        payments={payments}
        isSelected={selection.isSelected}
        toggleSelectOne={selection.toggleSelectOne}
        isAllSelected={selection.isAllSelected}
        isIndeterminate={selection.isIndeterminate}
        toggleSelectAll={selection.toggleSelectAll}
      />

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm border border-stone-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-black font-montserrat tracking-tight">Trésorerie récente</h2>
            <button className="text-sky-900 font-semibold flex items-center gap-2 hover:underline">
              Voir tout
              <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="space-y-6">
            {!isLoading && transfers.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
                <FileText size={48} strokeWidth={1.5} />
                <p className="text-sm font-medium">Aucun virement récent</p>
              </div>
            ) : (
              transfers.slice(0, 3).map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-800/10 flex items-center justify-center text-green-800">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-black">Virement {transfer.bank} Ref #{transfer.id.slice(0,8)}</p>
                      <p className="text-sm text-black/40 font-medium">{transfer.date || 'Date non spécifiée'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-800">+ {transfer.amount} F</p>
                    <p className="text-xs font-bold text-green-800/60 uppercase">COMPLÉTÉ</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-sky-900 rounded-lg p-8 text-white shadow-xl shadow-sky-900/30"
        >
          <h2 className="text-xl font-bold font-montserrat mb-6">Actions rapides</h2>
          <div className="space-y-4 font-montserrat">
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-4 px-6 transition-all border border-white/10 active:scale-95">
              <Plus size={24} />
              <span className="font-semibold">Nouveau virement</span>
            </button>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-4 px-6 transition-all border border-white/10 active:scale-95">
              <FileText size={24} />
              <span className="font-semibold">Générer rapport mensuel</span>
            </button>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-4 px-6 transition-all border border-white/10 active:scale-95">
              <Filter size={24} />
              <span className="font-semibold">Filtres avancés</span>
            </button>
          </div>
        </motion.div>
      </div>

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
    </>
  );
}
