"use client";

import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, 
  Wallet, CircleDollarSign, CheckCircle2, BadgeCheck,
  FileText, ArrowUpRight, Check, Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import PendingPaymentsTable from '@/components/dashboard/comptable/PendingPaymentsTable';
import { transferService } from '@/services/transfer.service';

import { Transfer, Payment } from '@/types/financial.types';
import { TD } from '@/types/td.types';
import { Schedule } from '@/types/schedule.types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getSaturdaysOfCurrentMonth } from '@/lib/date-utils';

// Helper: parse French-formatted amount strings (e.g. "15.000" → 15000)
const parseAmount = (raw: string) =>
  parseInt(raw.replace(/\./g, '').replace(/\D/g, '') || '0', 10);

export default function AccountantDashboard() {
  const [terminedTDs, setTerminedTDs] = useState<TD[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [allTDs, setAllTDs] = useState<TD[]>([]);
  const [recentSchedules, setRecentSchedules] = useState<Schedule[]>([]);
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
      
      // Get dynamic Saturdays for the current month
      const saturdays = getSaturdaysOfCurrentMonth();
      const mockSchedules: Schedule[] = saturdays.map(date => ({
        id: date,
        date: date,
        createdAt: new Date().toISOString()
      }));
      setRecentSchedules(mockSchedules);
    } catch (error) {
      console.error('Error fetching accountant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);



  // ── Stats calculations ───────────────────────────────────────────────────────
  const montantTotal = payments.reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const montantDu    = payments
    .filter(p => p.status === 'En attente')
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const tdTermines = allTDs.filter(t => t.status === 'terminé').length;

  return (
    <div className="space-y-10">
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

      {/* Admin Schedules Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-white rounded-lg p-8 shadow-sm border border-stone-100 space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-900 shrink-0">
              <Calendar size={20} />
            </div>
            <h2 className="text-xl font-bold text-black font-montserrat tracking-tight">Calendrier des Samedis (TD)</h2>
          </div>
          <span className="px-4 py-1.5 bg-sky-900/5 text-sky-900 rounded-full text-sm font-bold font-montserrat uppercase tracking-wider">
            4 derniers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading && recentSchedules.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400 gap-3 opacity-60">
              <Calendar size={48} strokeWidth={1.5} />
              <p className="text-lg font-medium font-montserrat">Aucune date renseignée par l'administration</p>
            </div>
          ) : (
            recentSchedules.slice(0, 4).map((schedule) => (
              <motion.div
                key={schedule.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-5 rounded-xl border border-stone-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center text-sky-900 group-hover:bg-sky-900 group-hover:text-white transition-colors">
                  <span className="text-xs font-bold uppercase">{format(new Date(schedule.date), 'MMM', { locale: fr })}</span>
                  <span className="text-2xl font-black leading-none">{format(new Date(schedule.date), 'dd')}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-black font-montserrat">
                    {format(new Date(schedule.date), 'EEEE dd MMMM', { locale: fr })}
                  </p>
                  <p className="text-sm text-black/40 font-medium">Séance de TD programmée</p>
                </div>
                <ArrowUpRight size={20} className="text-black/20 group-hover:text-sky-900 transition-colors" />
              </motion.div>
            ))
          )}
        </div>
      </motion.section>

      {/* Pending Payments Table */}
      <PendingPaymentsTable 
        tds={terminedTDs}
      />
    </div>
  );
}
