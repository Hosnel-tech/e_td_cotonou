"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'green' | 'red' | 'orange' | 'black';
  staggerIndex?: number;
}

const variants = {
  green: {
    container: 'bg-green-800 text-white',
    iconBg: 'bg-white/20',
    iconColor: 'text-white'
  },
  red: {
    container: 'bg-white text-black',
    iconBg: 'bg-red-600',
    iconColor: 'text-white'
  },
  orange: {
    container: 'bg-white text-black',
    iconBg: 'bg-amber-400',
    iconColor: 'text-white'
  },
  black: {
    container: 'bg-white text-black border border-slate-50',
    iconBg: 'bg-neutral-900',
    iconColor: 'text-white'
  }
};

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  variant = 'black',
  staggerIndex = 0 
}: StatCardProps) {
  const styles = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * staggerIndex, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className={`relative flex-1 min-w-[240px] h-32 rounded-2xl p-6 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer ${styles.container}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-xl font-semibold font-montserrat tracking-tight">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${styles.iconBg}`}>
          <Icon size={18} className={styles.iconColor} />
        </div>
      </div>
      <div className="text-3xl font-semibold font-montserrat">
        {value}
      </div>
    </motion.div>
  );
}
