"use client";

import { motion } from 'framer-motion';
import { ClipboardList, Users, AlertCircle, Wallet } from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
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

  const unpaidCount = payments.filter(p => p.status === 'en attente').length;
  const paidCount = payments.filter(p => p.status === 'payé' || p.status === 'validé').length;

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      {/* Permanent Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-10">
        
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

        {/* Dynamic Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Travaux dirigés" 
            value={isLoading ? "..." : tds.length.toString()} 
            icon={ClipboardList} 
            variant="green" 
            trend={tds.length > 0 ? "En hausse" : "Initialisé"}
            staggerIndex={0} 
          />
          <StatCard 
            label="Enseignants" 
            value={isLoading ? "..." : teachers.length.toString()} 
            icon={Users} 
            variant="red" 
            trend={teachers.length > 0 ? "En hausse" : "Initialisé"}
            staggerIndex={1} 
          />
          <StatCard 
            label="Non payés" 
            value={isLoading ? "..." : unpaidCount.toString()} 
            icon={AlertCircle} 
            variant="orange" 
            trend={unpaidCount > 0 ? "À traiter" : "À jour"}
            staggerIndex={2} 
          />
          <StatCard 
            label="Payés" 
            value={isLoading ? "..." : paidCount.toString()} 
            icon={Wallet} 
            variant="sky" 
            trend={paidCount > 0 ? "Confirmé" : "Initialisé"}
            staggerIndex={3} 
          />
        </section>

        {/* Activity & Notifications Section */}
        <ActivitySection />

        {/* TD Table Management Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black">Gestion des TD récents</h2>
          </div>
          <AdminTDTable tds={tds} limit={4} />
        </div>

      </main>
    </div>
  );
}
