"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  ChevronDown, 
  LayoutGrid, 
  List,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import Pagination from '@/components/dashboard/admin/Pagination';
import TeacherTable, { Teacher } from '@/components/dashboard/admin/TeacherTable';
import TeacherDetailModal from '@/components/dashboard/admin/TeacherDetailModal';

const mockTeachers: Teacher[] = [
  { id: '1', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'actif', school: 'CEG Entente' },
  { id: '2', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'inactif', school: 'CEG Entente' },
  { id: '3', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'actif', school: 'CEG Entente' },
  { id: '4', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'inactif', school: 'CEG Entente' },
];

export default function AdminTeachersPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black">Enseignants</h1>
          <p className="text-xl font-normal text-gray-600">Gérez tous les enseignants répertoriés sur la plateforme</p>
        </header>

        {/* Stats Section */}
        <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Enseignants" 
            value="17" 
            icon={Users} 
            variant="red" 
            trend="12%" 
            staggerIndex={0} 
          />
          <StatCard 
            label="Actifs" 
            value="17" 
            icon={CheckCircle2} 
            variant="orange" 
            trend="12%" 
            staggerIndex={1} 
          />
          <StatCard 
            label="Non confirmés" 
            value="10" 
            icon={AlertCircle} 
            variant="sky" 
            trend="12%" 
            staggerIndex={2} 
          />
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
            <h2 className="text-2xl font-bold text-black font-montserrat">Enseignants</h2>
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
          <TeacherTable teachers={mockTeachers} onView={handleViewTeacher} />

          {/* Table Footer / Pagination */}
          <div className="flex items-center justify-between pt-10 border-t border-stone-300">
            <span className="text-2xl font-normal text-black font-montserrat">Total 0</span>
            <Pagination currentPage={2} totalPages={2} />
          </div>
        </section>

      </main>

      <TeacherDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        teacher={selectedTeacher} 
      />
    </div>
  );
}
