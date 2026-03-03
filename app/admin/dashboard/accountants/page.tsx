"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List,
} from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import Pagination from '@/components/dashboard/admin/Pagination';
import AccountantTable, { Accountant } from '@/components/dashboard/admin/AccountantTable';

const mockAccountants: Accountant[] = [
  { id: '1', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
  { id: '2', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
  { id: '3', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'inactif' },
  { id: '4', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
];

export default function AdminAccountantsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header Actions */}
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-black font-montserrat">Comptables</h1>
            <p className="text-xl font-normal text-gray-600 font-montserrat">Gérez tous les comptables répertoriés sur la plateforme</p>
          </div>
          
          <button className="flex items-center gap-4 h-14 bg-sky-900 text-white px-8 rounded-lg shadow-lg hover:bg-sky-950 transition-all font-montserrat group">
            <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-md group-hover:scale-110 transition-transform">
              <Plus size={20} className="text-white" />
            </div>
            <span className="text-xl font-semibold">Nouveau comptable</span>
          </button>
        </header>

        {/* Search & Filters */}
        <section className="flex items-center gap-8">
          <div className="flex-1 h-14 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.15)] flex items-center px-6 gap-4">
            <Search className="text-zinc-300" size={24} />
            <input 
              type="text" 
              placeholder="Rechercher....." 
              className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-zinc-300 font-montserrat"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold text-black whitespace-nowrap font-montserrat">Filtrer par :</span>
            <button className="flex items-center gap-6 h-14 px-8 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] border-[0.83px] border-sky-900 group">
              <span className="text-sky-900 text-xl font-semibold font-montserrat">Actif</span>
              <ChevronDown className="text-sky-900 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black font-montserrat">Comptables</h2>
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

          {/* Table */}
          <AccountantTable accountants={mockAccountants} />

          {/* Table Footer / Pagination */}
          <div className="flex items-center justify-between pt-10 border-t border-stone-300">
            <span className="text-2xl font-normal text-black font-montserrat font-montserrat">Total 0</span>
            <Pagination currentPage={2} totalPages={2} />
          </div>
        </section>

      </main>
    </div>
  );
}
