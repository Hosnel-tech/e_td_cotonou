"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, ShieldAlert } from 'lucide-react';
import PaymentStatsCards from '@/components/dashboard/comptable/PaymentStatsCards';
import AdvancedSearch from '@/components/dashboard/comptable/AdvancedSearch';
import MatrixPaymentTable from '@/components/dashboard/comptable/MatrixPaymentTable';
import PrimaryPaymentTable from '@/components/dashboard/comptable/PrimaryPaymentTable';
import { transferService } from '@/services/transfer.service';
import { Payment } from '@/types/financial.types';
import { TD } from '@/types/td.types';
import { User, Teacher } from '@/types/user.types';
import { Schedule } from '@/types/schedule.types';
import { SCHOOLS } from '@/constants/education';
import { getSaturdaysOfCurrentMonth } from '@/lib/date-utils';

export default function AccountantPaymentsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>(SCHOOLS[0]);
  const [selectedPreference, setSelectedPreference] = useState<string>('');
  const [allTDs, setAllTDs] = useState<TD[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [adminDates, setAdminDates] = useState<string[]>([]);
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

      // Process and set the dynamic Saturdays for the current month formatted as DD/MM/YYYY
      const saturdays = getSaturdaysOfCurrentMonth();
      const formattedDates = saturdays
        .map(date => date.split('-').reverse().join('/')) // YYYY-MM-DD to DD/MM/YYYY
        .sort((a, b) => {
          const d1 = new Date(a.split('/').reverse().join('-')).getTime();
          const d2 = new Date(b.split('/').reverse().join('-')).getTime();
          return d1 - d2;
        });

      setAdminDates(formattedDates);
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
  const calculateAnalytics = (pList: Payment[], tdList: TD[]) => {
    let filteredPayments = pList;
    let filteredTDs = tdList;

    // Apply Payment Preference Filter if selected
    if (selectedPreference) {
      filteredPayments = filteredPayments.filter(p => {
        const teacher = teachers.find(t => t.name === p.teacher);
        return (teacher as Teacher)?.paymentPreference === selectedPreference;
      });
      filteredTDs = filteredTDs.filter(td => {
        const teacher = teachers.find(t => t.name === td.teacher);
        return (teacher as Teacher)?.paymentPreference === selectedPreference;
      });
    }

    const total = filteredPayments.reduce((sum, p) => sum + parseAmount(p.amount), 0);
    const due = filteredPayments
      .filter(p => p.status === 'En attente')
      .reduce((sum, p) => sum + parseAmount(p.amount), 0);
    const finished = filteredTDs.filter(t => t.status === 'terminé').length;
    return { total, due, finished };
  };

  const globalStats = calculateAnalytics(payments, allTDs);
  const primaryStats = calculateAnalytics(
    payments.filter(p => p.niveau === 'primaire'),
    allTDs.filter(t => t.niveau === 'primaire')
  );
  const secondaryStats = calculateAnalytics(
    payments.filter(p => p.niveau === 'secondaire'),
    allTDs.filter(t => t.niveau === 'secondaire')
  );

  // Filter teachers list based on selection for the tables
  const filteredTeachers = teachers.filter(t => {
    if (!selectedPreference) return true;
    return (t as Teacher).paymentPreference === selectedPreference;
  });

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

      {/* GLOBAL STATS (Always Visible) */}
      <PaymentStatsCards 
        montantTotal={globalStats.total}
        montantDu={globalStats.due}
        tdTermines={globalStats.finished}
        isLoading={isLoading}
      />

      {/* Advanced Search (Level Management) */}
      <AdvancedSearch 
        selectedLevel={selectedLevel} 
        onLevelChange={setSelectedLevel}
        selectedSchool={selectedSchool}
        onSchoolChange={setSelectedSchool}
        selectedPreference={selectedPreference}
        onPreferenceChange={setSelectedPreference}
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
                Veuillez sélectionner le niveau d'enseignement pour afficher les données de paiement et les statistiques détaillées.
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
              montantTotal={secondaryStats.total}
              montantDu={secondaryStats.due}
              tdTermines={secondaryStats.finished}
              isLoading={isLoading}
            />
            <MatrixPaymentTable 
              selectedSchool={selectedSchool} 
              teachers={filteredTeachers} 
              tds={allTDs} 
              dates={adminDates}
            />
          </motion.div>
        ) : (
          <motion.div
            key="primaire-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <PaymentStatsCards 
              montantTotal={primaryStats.total}
              montantDu={primaryStats.due}
              tdTermines={primaryStats.finished}
              isLoading={isLoading}
            />
            <PrimaryPaymentTable 
              selectedSchool={selectedSchool} 
              teachers={filteredTeachers} 
              tds={allTDs} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
