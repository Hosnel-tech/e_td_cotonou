"use client";

import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  Wallet, 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  ChevronDown
} from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdminTDCard, { AdminTDCardProps } from '@/components/dashboard/admin/AdminTDCard';
import Pagination from '@/components/dashboard/admin/Pagination';
import { useState } from 'react';

const mockTDs: Omit<AdminTDCardProps, 'staggerIndex'>[] = [
  { subject: 'Anglais', status: 'en cours', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'Français', status: 'terminé', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'SVT', status: 'en cours', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'EST', status: 'terminé', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'Français', status: 'terminé', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'EST', status: 'terminé', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'Anglais', status: 'en cours', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
  { subject: 'SVT', status: 'en cours', className: '3ème', time: '14h -17h', date: '12/07/25', duration: '3h' },
];

export default function AdminTDManagementPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black">Gestion des TD</h1>
          <p className="text-xl font-normal text-gray-600">Gérez les travaux dirigés et séances</p>
        </header>

        {/* Stats Section */}
        <section className="flex flex-wrap gap-8">
          <StatCard label="Nombre total" value="23" icon={ClipboardList} variant="green" trend="12%" staggerIndex={0} />
          <StatCard label="En cours" value="17" icon={Clock} variant="red" trend="12%" staggerIndex={1} />
          <StatCard label="Terminés" value="13" icon={CheckCircle2} variant="orange" trend="12%" staggerIndex={2} />
          <StatCard label="Payés" value="10" icon={Wallet} variant="sky" trend="12%" staggerIndex={3} />
        </section>

        {/* Search & Filters */}
        <section className="flex items-center gap-8">
          <div className="flex-1 h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.15)] flex items-center px-6 gap-4">
            <Search className="text-zinc-300" size={24} />
            <input 
              type="text" 
              placeholder="Rechercher....." 
              className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-zinc-300"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold text-black whitespace-nowrap">Filtrer par :</span>
            <button className="flex items-center gap-6 h-14 px-8 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-sky-900 group">
              <span className="text-sky-900 text-xl font-semibold">Payés</span>
              <ChevronDown className="text-sky-900 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">Mes travaux dirigés</h2>
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setViewMode('list')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-sky-900 text-white shadow-lg' : 'text-black/40 hover:text-black border border-gray-100'
                }`}
              >
                <List size={28} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-sky-900 text-white shadow-lg' : 'text-black/40 hover:text-black border border-gray-100'
                }`}
              >
                <LayoutGrid size={24} />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockTDs.map((td, idx) => (
              <AdminTDCard key={idx} {...td} staggerIndex={idx} />
            ))}
          </div>

          {/* Table Footer / Pagination */}
          <div className="flex items-center justify-between pt-10 border-t border-gray-100">
            <span className="text-2xl font-normal text-black">Total 0</span>
            <Pagination currentPage={2} totalPages={2} />
          </div>
        </section>

      </main>
    </div>
  );
}
