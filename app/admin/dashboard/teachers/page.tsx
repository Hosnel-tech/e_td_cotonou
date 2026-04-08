"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, ChevronDown, SearchSlash
} from 'lucide-react';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import TeacherTable from '@/components/dashboard/admin/TeacherTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';
import TeacherDetailsModal from '@/components/dashboard/admin/TeacherDetailsModal';
import Pagination from '@/components/dashboard/admin/Pagination';
import { exportToCSV } from '@/lib/export.utils';
import { Check, X, Trash2 } from 'lucide-react';
import { teacherService } from '@/services/teacher.service';
import { Teacher } from '@/types/user.types';

const STATUS_FILTERS = ['Tous', 'Actif', 'En attente'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const ITEMS_PER_PAGE = 10;

function TeachersPageContent() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Modal State
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    teacherService.getTeachers().then(setTeachers);
  }, []);

  // Auto-open modal when navigating from a notification deep-link
  useEffect(() => {
    const teacherId = searchParams.get('teacher');
    if (teacherId && teachers.length > 0) {
      const found = teachers.find(t => t.id === teacherId);
      if (found) {
        setSelectedTeacher(found);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, teachers]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.school.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      activeFilter === 'Tous' || 
      teacher.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE));
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selection = useSelection(filteredTeachers);
  const { isSelected, toggleSelectOne, isAllSelected, isIndeterminate, toggleSelectAll, selectionCount, clearSelection } = selection;

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await teacherService.updateStatus(id, status);
      // Refresh local state
      const updatedTeachers = await teacherService.getTeachers();
      setTeachers(updatedTeachers);
    } catch (error: any) {
      console.error('Error updating status:', error);
      const msg = error.message || "Une erreur est survenue lors de la mise à jour du statut.";
      alert(msg);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await teacherService.bulkDelete(selection.selectedIds);
      const updated = await teacherService.getTeachers();
      setTeachers(updated);
      clearSelection();
    } catch (error) {
       console.error('Bulk delete error:', error);
       alert('Erreur lors de la suppression groupée.');
    }
  };



  return (
    <div className="p-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Enseignants</h1>
          <p className="text-xl font-normal text-gray-600">Gérez les comptes et les affectations des enseignants</p>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard label="Total Enseignants" value={teachers.length.toString()} icon={Users} variant="green" trend={teachers.length > 0 ? "Actualisé" : "Initialisé"} staggerIndex={0} />
          <StatCard label="Actifs" value={teachers.filter(t => t.status === 'actif').length.toString()} icon={Users} variant="sky" trend={teachers.filter(t => t.status === 'actif').length > 0 ? "Actif" : "Aucun"} staggerIndex={1} />
          <StatCard label="En attente" value={teachers.filter(t => t.status === 'en attente').length.toString()} icon={Users} variant="orange" trend={teachers.filter(t => t.status === 'en attente').length > 0 ? "À traiter" : "Aucun"} staggerIndex={2} />
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
                onChange={(e) => { 
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
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
                        onClick={() => { 
                          setActiveFilter(f); 
                          setDropdownOpen(false); 
                          setCurrentPage(1);
                        }}
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
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
             >
               <TeacherTable 
                 teachers={paginatedTeachers}
                 onView={handleViewTeacher}
                 onStatusUpdate={handleStatusUpdate}
                 isSelected={isSelected}
                 toggleSelectOne={toggleSelectOne}
                 isAllSelected={isAllSelected}
                 isIndeterminate={isIndeterminate}
                 toggleSelectAll={toggleSelectAll}
               />
             </motion.div>
          </AnimatePresence>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTeachers.length}
          />
        </section>
        
        <BulkActionsBar 
          count={selectionCount} 
          onClear={clearSelection}
          onDelete={handleBulkDelete}
        />

        <TeacherDetailsModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          teacher={selectedTeacher}
          onStatusUpdate={handleStatusUpdate}
        />
    </div>
  );
}

export default function TeachersPage() {
  return (
    <Suspense fallback={null}>
      <TeachersPageContent />
    </Suspense>
  );
}
