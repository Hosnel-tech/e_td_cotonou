"use client";

import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, 
  Wallet, CircleDollarSign, CheckCircle2, BadgeCheck,
  FileText, ArrowUpRight, Check
} from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import PendingPaymentsTable from '@/components/dashboard/comptable/PendingPaymentsTable';
import { transferService } from '@/services/transfer.service';
import { Transfer, Payment } from '@/types/financial.types';
import { TD } from '@/types/td.types';

// Helper: parse French-formatted amount strings (e.g. "15.000" → 15000)
const parseAmount = (raw: string) =>
  parseInt(raw.replace(/\./g, '').replace(/\D/g, '') || '0', 10);

export default function AccountantDashboard() {
  const [terminedTDs, setTerminedTDs] = useState<TD[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [allTDs, setAllTDs] = useState<TD[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [tdsRes, transData, paymentsRes] = await Promise.all([
        fetch('/api/tds', { cache: 'no-store' }).then(r => r.json()),
        transferService.getTransfers(),
        fetch('/api/payments', { cache: 'no-store' }).then(r => r.json()),
      ]);
      const tdList = tdsRes as TD[];
      const payList = paymentsRes as Payment[];
      setAllTDs(tdList);
      setTerminedTDs(tdList.filter(t => t.status === 'terminé'));
      setTransfers(transData);
      setPayments(payList);
    } catch (error) {
      console.error('Error fetching accountant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleMarkAsPaid = async (tdId: string) => {
    try {
      await fetch(`/api/tds/${tdId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'payé' }),
      });
      await fetchData();
    } catch (error) {
      console.error('Error marking TD as paid:', error);
    }
  };


  // ── Stats calculations ───────────────────────────────────────────────────────
  //
  // montantTotal : somme de TOUS les paiements ("En attente" + "Payé").
  //   → Représente le montant cumulé de tous les TDs facturés (terminés + payés).
  //   → Les TDs "en cours" ne génèrent pas encore de paiement, donc non inclus.
  //
  // montantDu : uniquement les paiements "En attente".
  //   → Ce sont les TDs terminés qui n'ont pas encore été payés par l'administration.
  //
  const montantTotal = payments.reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const montantDu    = payments
    .filter(p => p.status === 'En attente')
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const tdTermines = allTDs.filter(t => t.status === 'terminé').length;
  const tdPayes    = allTDs.filter(t => t.status === 'payé').length;

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-black tracking-tight">Tableau de bord</h1>
          <p className="text-xl font-normal text-black/60">Bienvenue, voici le résumé de l'activité financière</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-4 gap-3 shadow-sm min-w-[500px]">
            <Search className="text-neutral-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher un paiement..." 
              className="bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 text-black w-full"
            />
          </div>
          {/* <button className="h-14 bg-sky-900 text-white px-6 rounded-lg font-semibold flex items-center gap-2 transition-all hover:bg-sky-950 shadow-lg shadow-sky-900/20 active:scale-95">
            <Download size={20} />
            Exporter (.CSV)
          </button> */}
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          label="Montant total"
          value={isLoading ? "..." : `${montantTotal.toLocaleString('fr-FR')} F`}
          icon={Wallet}
          variant="green"
          trend={montantTotal > 0 ? "Cumulé" : "Initialisé"}
          staggerIndex={0}
        />
        <StatCard
          label="Montant dû"
          value={isLoading ? "..." : `${montantDu.toLocaleString('fr-FR')} F`}
          icon={CircleDollarSign}
          variant="orange"
          trend={montantDu > 0 ? "À régler" : "À jour"}
          trendUp={montantDu === 0}
          staggerIndex={1}
        />
        <StatCard
          label="TD terminés"
          value={isLoading ? "..." : tdTermines.toString()}
          icon={CheckCircle2}
          variant="sky"
          trend={tdTermines > 0 ? "En attente paiement" : "Aucun"}
          staggerIndex={2}
        />
        <StatCard
          label="TD payés"
          value={isLoading ? "..." : tdPayes.toString()}
          icon={BadgeCheck}
          variant="red"
          trend={tdPayes > 0 ? "Confirmés" : "Aucun"}
          staggerIndex={3}
        />
      </section>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 bg-white rounded-lg p-8 shadow-sm border border-stone-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-black font-montserrat tracking-tight">Trésorerie récente</h2>
            {/* <button className="text-sky-900 font-semibold flex items-center gap-2 hover:underline">
              Voir tout
              <ArrowUpRight size={18} />
            </button> */}
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
      </div>

      {/* Pending Payments Table */}
      <PendingPaymentsTable 
        tds={terminedTDs}
      />


    </>
  );
}
