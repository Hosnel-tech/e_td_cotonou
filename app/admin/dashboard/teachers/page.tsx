"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, ChevronDown, List, LayoutGrid, Eye, SearchSlash
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TeacherTable, { Teacher } from '@/components/dashboard/admin/TeacherTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';
import { TEACHER_DATA } from '@/data/teacherData';
import TeacherDetailsModal from '@/components/dashboard/admin/TeacherDetailsModal';

const STATUS_FILTERS = ['Tous', 'Actif', 'En attente'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Modal State
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredTeachers = TEACHER_DATA.filter((teacher) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.school.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      activeFilter === 'Tous' || 
      teacher.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const selection = useSelection(filteredTeachers);
  const { isSelected, toggleSelectOne, isAllSelected, isIndeterminate, toggleSelectAll, selectionCount, clearSelection } = selection;

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat text-black">
      {/* Permanent Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Enseignants</h1>
          <p className="text-xl font-normal text-gray-600">Gérez les comptes et les affectations des enseignants</p>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard label="Total Enseignants" value={TEACHER_DATA.length.toString()} icon={Users} variant="green" trend="5%" staggerIndex={0} />
          <StatCard label="Actifs" value={TEACHER_DATA.filter(t => t.status === 'actif').length.toString()} icon={Users} variant="sky" trend="2%" staggerIndex={1} />
          <StatCard label="En attente" value={TEACHER_DATA.filter(t => t.status === 'en attente').length.toString()} icon={Users} variant="orange" trend="0%" staggerIndex={2} />
        </section>

        {/* Search & Filters */}
        <section className="bg-white rounded-[10px] p-8 shadow-sm border border-stone-100 space-y-6 text-black">
          <h2 className="text-xl font-semibold">Recherche avancée</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-5 gap-3">
              <Search className="text-neutral-400 shrink-0" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un enseignant, une matière ou une école..."
                className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400"
              />
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 h-14 px-6 bg-white rounded-lg border border-neutral-300 shadow-sm transition-all hover:border-sky-900/50 min-w-[200px] justify-between cursor-pointer"
              >
                <span className="text-lg font-medium">
                  {activeFilter === 'Tous' ? 'Tous les statuts' : activeFilter}
                </span>
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-xl z-30 overflow-hidden border border-stone-100"
                  >
                    {STATUS_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => { setActiveFilter(f); setDropdownOpen(false); }}
                        className={`w-full text-left px-5 py-4 text-base font-medium hover:bg-sky-900/5 transition-colors ${activeFilter === f ? 'text-sky-900 font-semibold' : 'text-gray-700'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Teachers Table Area */}
        <section className="bg-white rounded-lg shadow-sm border border-stone-100 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Liste des enseignants</h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredTeachers.length > 0 ? (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
               >
                 <TeacherTable 
                   teachers={filteredTeachers}
                   onView={handleViewTeacher}
                   isSelected={isSelected}
                   toggleSelectOne={toggleSelectOne}
                   isAllSelected={isAllSelected}
                   isIndeterminate={isIndeterminate}
                   toggleSelectAll={toggleSelectAll}
                 />
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4"
              >
                <SearchSlash size={64} strokeWidth={1.5} />
                <p className="text-xl font-medium">Aucun enseignant trouvé pour cette recherche</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        
        {/* Bulk Actions */}
        <BulkActionsBar 
          count={selectionCount} 
          onClear={clearSelection}
          onDelete={() => {
            if (confirm(`Voulez-vous vraiment supprimer ces ${selectionCount} enseignants ?`)) {
              alert('Suppression effectuée (Simulation)');
              clearSelection();
            }
          }}
          onExport={() => alert(`Exportation de ${selectionCount} enseignants...`)}
        />
      </main>

      {/* Teacher Details Modal */}
      <TeacherDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teacher={selectedTeacher}
      />
    </div>
  );
}
