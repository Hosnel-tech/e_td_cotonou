import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'green' | 'red' | 'orange' | 'sky';
  trend?: string;
  trendUp?: boolean;
  staggerIndex?: number;
}

const variants = {
  green: {
    container: 'bg-white',
    iconBg: 'bg-green-800/10',
    iconColor: 'text-green-800',
    trendColor: 'text-green-800'
  },
  red: {
    container: 'bg-white',
    iconBg: 'bg-red-600/10',
    iconColor: 'text-red-600',
    trendColor: 'text-red-600'
  },
  orange: {
    container: 'bg-white',
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400',
    trendColor: 'text-amber-400'
  },
  sky: {
    container: 'bg-white',
    iconBg: 'bg-sky-900/10',
    iconColor: 'text-sky-900',
    trendColor: 'text-sky-900'
  }
};

export default function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  variant = 'sky',
  trend,
  trendUp = true,
  staggerIndex = 0 
}: StatCardProps) {
  const styles = variants[variant];
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * staggerIndex, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`relative flex-1 min-w-[260px] h-44 bg-white rounded-[10px] p-6 border border-stone-300/50 shadow-[0px_0px_8.333333015441895px_0px_rgba(0,0,0,0.10)] flex flex-col justify-between overflow-hidden cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${styles.iconBg}`}>
          <Icon size={20} className={styles.iconColor} />
        </div>
        <span className="text-base font-semibold font-inter text-black">{label}</span>
      </div>

      <div className="space-y-4">
        <div className="text-3xl font-semibold font-inter text-black">
          {value}
        </div>

        {trend && (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold font-inter ${styles.trendColor}`}>
              {trend}
            </span>
            <TrendIcon size={16} className={styles.trendColor} />
            <span className="text-neutral-400 text-sm font-semibold font-inter whitespace-nowrap">
              VS le mois précédent
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
