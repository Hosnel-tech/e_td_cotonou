"use client";

import { motion } from 'framer-motion';
import { Wallet, CircleDollarSign, CheckCircle2, BadgeCheck, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  variant: 'green' | 'red' | 'orange' | 'sky';
  icon: any;
  staggerIndex: number;
}

const variants = {
  green: {
    iconBg: 'bg-green-800/10',
    iconColor: 'text-green-800',
    trendColor: 'text-green-800',
    trendBg: 'bg-green-800/10'
  },
  red: {
    iconBg: 'bg-red-600/10',
    iconColor: 'text-red-600',
    trendColor: 'text-red-600',
    trendBg: 'bg-red-600/10'
  },
  orange: {
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400',
    trendColor: 'text-amber-400',
    trendBg: 'bg-amber-400/10'
  },
  sky: {
    iconBg: 'bg-sky-900/10',
    iconColor: 'text-sky-900',
    trendColor: 'text-sky-900',
    trendBg: 'bg-sky-900/10'
  }
};

const StatCard = ({ label, value, trend, variant, icon: Icon, staggerIndex }: StatCardProps) => {
  const styles = variants[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * staggerIndex, duration: 0.5 }}
      whileHover={{ y: -4, boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" }}
      className="bg-white rounded-xl border border-stone-100 p-8 shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.06)] flex flex-col justify-between h-[180px] flex-1 min-w-[280px] group transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${styles.iconBg}`}>
          <Icon size={20} className={styles.iconColor} />
        </div>
        <span className="text-black text-base font-semibold font-montserrat tracking-tight leading-none">{label}</span>
      </div>

      <div className="space-y-4">
        <div className="text-black text-[32px] font-bold font-montserrat tracking-tighter leading-none">
          {value}
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${styles.trendBg}`}>
            <span className={`text-sm font-bold font-montserrat ${styles.trendColor}`}>{trend}</span>
            <TrendingUp size={14} className={styles.trendColor} />
          </div>
          <span className="text-neutral-400 text-sm font-semibold font-montserrat tracking-tight">VS le mois précédent</span>
        </div>
      </div>
    </motion.div>
  );
};

interface PaymentStatsCardsProps {
  montantTotal: number;
  montantDu: number;
  tdTermines: number;
  isLoading: boolean;
}

export default function PaymentStatsCards({
  montantTotal,
  montantDu,
  tdTermines,
  isLoading
}: PaymentStatsCardsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
      <StatCard 
        label="Montant total" 
        value={isLoading ? "..." : `${montantTotal.toLocaleString('fr-FR')} F`} 
        trend="12%" 
        variant="green" 
        icon={Wallet} 
        staggerIndex={0} 
      />
      <StatCard 
        label="Montant dû" 
        value={isLoading ? "..." : `${montantDu.toLocaleString('fr-FR')} F`} 
        trend="8%" 
        variant="orange" 
        icon={CircleDollarSign} 
        staggerIndex={1} 
      />
      <StatCard 
        label="TD terminés" 
        value={isLoading ? "..." : tdTermines.toString()} 
        trend="15%" 
        variant="sky" 
        icon={CheckCircle2} 
        staggerIndex={2} 
      />
    </section>
  );
}
