"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ShieldAlert } from 'lucide-react';
import PaymentStatsCards from '@/components/dashboard/comptable/PaymentStatsCards';
import AdvancedSearch from '@/components/dashboard/comptable/AdvancedSearch';
import MatrixPaymentTable from '@/components/dashboard/comptable/MatrixPaymentTable';
import { transferService } from '@/services/transfer.service';
import { Payment } from '@/types/financial.types';
import { TD } from '@/types/td.types';
import { User } from '@/types/user.types';
import { SCHOOLS } from '@/constants/education';

export default function AccountantPaymentsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>(SCHOOLS[0]);
  const [allTDs, setAllTDs] = useState<TD[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [tdsRes, paymentsRes, teachersRes] = await Promise.all([
        fetch('/api/tds', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/payments', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/teachers', { cache: 'no-store' }).then(r => r.json()),
      ]);
      setAllTDs(tdsRes as TD[]);
      setPayments(paymentsRes as Payment[]);
      setTeachers(teachersRes as User[]);
    } catch (error) {
      console.error('Error fetching accountant data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Helper: parse French-formatted amount strings (e.g. "15.000" → 15000)
  const parseAmount = (raw: string) =>
    parseInt(raw?.replace(/\./g, '').replace(/\D/g, '') || '0', 10);

  // ── Stats calculations ───────────────────────────────────────────────────────
  const montantTotal = payments.reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const montantDu    = payments
    .filter(p => p.status === 'En attente')
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const tdTermines = allTDs.filter(t => t.status === 'terminé').length;
  const tdPayes    = allTDs.filter(t => t.status === 'payé').length;

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <header className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[32px] font-bold text-black font-montserrat tracking-tight leading-none"
        >
          Gestion de paiement
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-black text-xl font-normal font-montserrat opacity-70"
        >
          Bienvenue dans votre espace comptable
        </motion.p>
      </header>

      {/* Advanced Search (Always visible to select level) */}
      <AdvancedSearch 
        selectedLevel={selectedLevel} 
        onLevelChange={setSelectedLevel}
        selectedSchool={selectedSchool}
        onSchoolChange={setSelectedSchool}
      />

      <AnimatePresence mode="wait">
        {!selectedLevel ? (
          <motion.div
            key="initial-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border-2 border-dashed border-sky-900/10 p-24 flex flex-col items-center justify-center text-center gap-6 shadow-sm"
          >
            <div className="w-24 h-24 bg-sky-900/5 rounded-full flex items-center justify-center text-sky-900 mb-2">
              <BookOpen size={48} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-sky-900 font-montserrat tracking-tight">Sélectionner un niveau</h3>
              <p className="text-xl text-stone-400 font-medium font-montserrat mx-auto">
                Veuillez sélectionner le niveau d'enseignement pour afficher les données de paiement et les statistiques.
              </p>
            </div>
          </motion.div>
        ) : selectedLevel === 'secondaire' ? (
          <motion.div
            key="secondaire-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <PaymentStatsCards 
              montantTotal={montantTotal}
              montantDu={montantDu}
              tdTermines={tdTermines}
              tdPayes={tdPayes}
              isLoading={isLoading}
            />
            <MatrixPaymentTable 
              selectedSchool={selectedSchool} 
              teachers={teachers} 
              tds={allTDs} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="primaire-placeholder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-black/5 p-24 flex flex-col items-center justify-center text-center gap-6"
          >
            <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-500 mb-2">
              <ShieldAlert size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-amber-700 font-montserrat tracking-tight">Gestion Primaire</h3>
              <p className="text-xl text-stone-400 font-medium font-montserrat">
                Le module de gestion des paiements pour le niveau primaire est en cours de développement.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
