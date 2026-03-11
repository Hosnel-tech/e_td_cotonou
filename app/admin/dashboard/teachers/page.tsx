"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  ChevronDown, 
  CheckCircle2,
  AlertCircle,
  Trash2, // Added Trash2
} from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import Pagination from '@/components/dashboard/admin/Pagination';
import TeacherTable, { Teacher } from '@/components/dashboard/admin/TeacherTable';
import TeacherDetailModal from '@/components/dashboard/admin/TeacherDetailModal';
import { useSelection } from '@/hooks/useSelection'; // Added useSelection

const mockTeachers: Teacher[] = [
  { id: '1', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'actif', school: 'CEG Entente' },
  { id: '2', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'en attente', school: 'CEG Entente' },
  { id: '3', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'actif', school: 'CEG Entente' },
  { id: '4', name: 'VIGAN Pauline', subject: 'Anglais', className: '3ème', date: '12/11/25', status: 'en attente', school: 'CEG Entente' },
];

export default function AdminTeachersPage() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<'Tous' | 'Actif' | 'En attente'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const filteredTeachers = useMemo(() => {
    return mockTeachers.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'Tous' || 
                           (selectedStatus === 'Actif' && t.status === 'actif') ||
                           (selectedStatus === 'En attente' && t.status === 'en attente');
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  const { isSelected, toggleSelectOne, isAllSelected, toggleSelectAll, hasSelection, selectionCount } = useSelection(filteredTeachers);

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black font-montserrat">Enseignants</h1>
          <p className="text-xl font-normal text-gray-600 font-montserrat">Gérez tous les enseignants répertoriés sur la plateforme</p>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Advanced Search & Filters */}
        <section className="bg-white rounded-[10px] p-8 space-y-8 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]">
          <h2 className="text-xl font-semibold text-black font-montserrat">Recherche avancée</h2>
          
          <div className="flex items-center gap-8">
            <div className="flex-1 h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-6 gap-4">
              <Search className="text-neutral-400" size={24} />
              <input 
                type="text" 
                placeholder="Rechercher....." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 text-black font-montserrat"
              />
            </div>

            {/* Bulk Delete Button */}
            <AnimatePresence>
              {hasSelection && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2 h-14 bg-red-600 text-white px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all font-montserrat active:scale-95 shrink-0"
                >
                  <Trash2 size={20} />
                  <span className="text-lg font-semibold whitespace-nowrap">
                    Supprimer ({selectionCount})
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="relative">
              <button 
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="flex items-center justify-between h-14 w-44 px-6 bg-white rounded-lg border border-neutral-300 shadow-sm group hover:border-sky-900 transition-all"
              >
                <span className="text-black text-xl font-medium font-montserrat">{selectedStatus === 'Tous' ? 'Statut' : selectedStatus}</span>
                <motion.div
                  animate={{ rotate: showStatusDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="text-black" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {showStatusDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-16 right-0 w-44 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    {['Tous', 'Actif', 'En attente'].map((status, idx, arr) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status as any);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full px-6 py-4 text-left text-base font-medium font-montserrat transition-colors hover:bg-sky-900/5 ${
                          selectedStatus === status ? 'text-sky-900 font-semibold' : 'text-black'
                        } ${idx < arr.length - 1 ? 'border-b border-zinc-100' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black font-montserrat">Enseignants</h2>
          </div>

          {/* Table / Empty State */}
          <AnimatePresence mode="wait">
            {filteredTeachers.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-black/40 text-xl py-12 font-montserrat"
              >
                Aucun enseignant trouvé.
              </motion.p>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <TeacherTable 
                  teachers={filteredTeachers} 
                  onView={handleViewTeacher}
                  isSelected={isSelected}
                  toggleSelectOne={toggleSelectOne}
                  isAllSelected={isAllSelected}
                  toggleSelectAll={toggleSelectAll}
                />
              </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table Footer / Pagination */}
          <div className="flex items-center justify-between pt-10 border-t border-stone-300">
            <span className="text-2xl font-normal text-black font-montserrat">Total {filteredTeachers.length}</span>
            <Pagination currentPage={1} totalPages={2} />
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
