"use client";

import { motion } from 'framer-motion';
import { ClipboardList, Users, Wallet, CircleDollarSign, CheckCircle2, BadgeCheck, Timer, Hourglass } from 'lucide-react';
import AdminHero from '@/components/dashboard/admin/AdminHero';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import ActivitySection from '@/components/dashboard/admin/ActivitySection';
import AdminTDTable from '@/components/dashboard/admin/AdminTDTable';
import { tdService } from '@/services/td.service';
import { teacherService } from '@/services/teacher.service';
import { paymentService } from '@/services/payment.service';
import { TD } from '@/types/td.types';
import { Teacher } from '@/types/user.types';
import { Payment } from '@/types/financial.types';
import { useState, useEffect } from 'react';

// Helper: parse French-formatted amount strings (e.g. "15.000" → 15000)
const parseAmount = (raw: string) =>
  parseInt(raw.replace(/\./g, '').replace(/\D/g, '') || '0', 10);

export default function AdminDashboardPage() {
  const [tds, setTds] = useState<TD[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tdData, teacherData, paymentData] = await Promise.all([
          tdService.getTDs(),
          teacherService.getTeachers(),
          paymentService.getPayments()
        ]);
        setTds(tdData);
        setTeachers(teacherData);
        setPayments(paymentData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Stats calculations ───────────────────────────────────────────────────────
  //
  // montantTotal : somme de TOUS les paiements ("En attente" + "Payé").
  //   → Représente le chiffre d'affaires total cumulé des TDs terminés + payés.
  //   → Les TDs "en cours" ne sont pas encore facturés, donc sans montant trackable.
  //
  // montantDu : uniquement les paiements "En attente".
  //   → Ce sont les TDs qui ont le statut "terminé" et qui attendent d'être payés.
  //
  const montantTotal = payments.reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const montantDu    = payments
    .filter(p => p.status === 'En attente')
    .reduce((sum, p) => sum + parseAmount(p.amount), 0);
  const tdEnAttente = tds.filter(t => t.status === 'en attente').length;
  const tdEnCours   = tds.filter(t => t.status === 'en cours').length;
  const tdTermines  = tds.filter(t => t.status === 'terminé').length;
  const tdPayes     = tds.filter(t => t.status === 'payé').length;

  return (
    <div className="p-10 space-y-10">
        
        {/* Header Section */}
        <header className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold text-black"
          >
            Tableau de bord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600"
          >
            Bienvenue dans votre espace administrateur
          </motion.p>
        </header>

        {/* Global Hero Section */}
        <AdminHero />

        {/* ── Section 1 : Vue d'ensemble des TD ── */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-400 uppercase tracking-widest">Vue d'ensemble</h2>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total TD"
              value={isLoading ? "..." : tds.length.toString()}
              icon={ClipboardList}
              variant="green"
              trend={tds.length > 0 ? "En hausse" : "Initialisé"}
              staggerIndex={0}
            />
            <StatCard
              label="Enseignants actifs"
              value={isLoading ? "..." : teachers.filter(t => t.status === 'actif').length.toString()}
              icon={Users}
              variant="sky"
              trend={teachers.filter(t => t.status === 'actif').length > 0 ? "En hausse" : "Initialisé"}
              staggerIndex={1}
            />
            <StatCard
              label="TD en attente"
              value={isLoading ? "..." : tdEnAttente.toString()}
              icon={Hourglass}
              variant="orange"
              trend={tdEnAttente > 0 ? "À valider" : "Aucun"}
              trendUp={tdEnAttente === 0}
              staggerIndex={2}
            />
            <StatCard
              label="TD en cours"
              value={isLoading ? "..." : tdEnCours.toString()}
              icon={Timer}
              variant="red"
              trend={tdEnCours > 0 ? "En progression" : "Aucun"}
              staggerIndex={3}
            />
          </section>
        </div>

        {/* ── Section 2 : Finances ── */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-400 uppercase tracking-widest">Finances</h2>
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Montant total"
              value={isLoading ? "..." : `${montantTotal.toLocaleString('fr-FR')} F`}
              icon={Wallet}
              variant="green"
              trend={montantTotal > 0 ? "Cumulé" : "Initialisé"}
              staggerIndex={4}
            />
            <StatCard
              label="Montant dû"
              value={isLoading ? "..." : `${montantDu.toLocaleString('fr-FR')} F`}
              icon={CircleDollarSign}
              variant="orange"
              trend={montantDu > 0 ? "À régler" : "À jour"}
              trendUp={montantDu === 0}
              staggerIndex={5}
            />
            <StatCard
              label="TD terminés"
              value={isLoading ? "..." : tdTermines.toString()}
              icon={CheckCircle2}
              variant="sky"
              trend={tdTermines > 0 ? "En attente paiement" : "Aucun"}
              staggerIndex={6}
            />
            <StatCard
              label="TD payés"
              value={isLoading ? "..." : tdPayes.toString()}
              icon={BadgeCheck}
              variant="red"
              trend={tdPayes > 0 ? "Confirmés" : "Aucun"}
              staggerIndex={7}
            />
          </section>
        </div>

        {/* Activity & Notifications Section */}
        <ActivitySection />

        {/* TD Table Management Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">Gestion des TD récents</h2>
          </div>
          <AdminTDTable tds={tds} limit={4} />
        </div>

    </div>
  );
}
