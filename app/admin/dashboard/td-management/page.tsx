"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Clock, CheckCircle2, Wallet,
  Search, ChevronDown, 
  List, LayoutGrid
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdminTDTable from '@/components/dashboard/admin/AdminTDTable';
import AdminTDCard from '@/components/dashboard/admin/AdminTDCard';
import AdminTDDetailsModal from '@/components/dashboard/admin/AdminTDDetailsModal';
import { exportToCSV } from '@/lib/export.utils';
import { Check } from 'lucide-react'; // For primary action icon

import Pagination from '@/components/dashboard/admin/Pagination';
import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';

const STATUS_FILTERS = ['Tous', 'En attente', 'En cours', 'Terminé', 'Rejeté'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const ITEMS_PER_PAGE = 8;

export default function AdminTDManagementPage() {
  const [allTds, setAllTds] = useState<TD[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tdService.getTDs().then(setAllTds);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = allTds.filter((td) => {
    const matchesSearch =
      searchQuery === '' ||
      td.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.classe.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeFilter === 'Tous' || td.status === activeFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleOpenDetails = (td: TD) => {
    setSelectedTD(td);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await tdService.updateStatus(id, status);
      const updated = await tdService.getTDs();
      setAllTds(updated);
    } catch (error) {
      console.error('Error updating TD status:', error);
      alert('Erreur lors de la mise à jour du statut.');
    }
  };



  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat text-black">
      <AdminSidebar />
      <main className="flex-1 ml-72 p-10 space-y-8">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black font-montserrat tracking-tight">Gestion des TD</h1>
          <p className="text-xl font-normal text-black/60 font-montserrat">Gérez les travaux dirigés et séances</p>
        </header>

        <section className="flex flex-wrap gap-6">
          <StatCard
            label="Nombre total"
            value={allTds.length.toString()}
            icon={ClipboardList}
            variant="green"
            trend={allTds.length > 0 ? "Actualisé" : "Initialisé"}
            staggerIndex={0}
          />
          <StatCard
            label="En cours"
            value={allTds.filter(t => t.status === 'en cours').length.toString()}
            icon={Clock}
            variant="red"
            trend={allTds.filter(t => t.status === 'en cours').length > 0 ? "Actif" : "Aucun"}
            staggerIndex={1}
          />
          <StatCard
            label="Terminés"
            value={allTds.filter(t => t.status === 'terminé').length.toString()}
            icon={CheckCircle2}
            variant="orange"
            trend={allTds.filter(t => t.status === 'terminé').length > 0 ? "Effectué" : "Initialisé"}
            staggerIndex={2}
          />
          <StatCard
            label="Payés"
            value={allTds.filter(t => t.status === 'payé').length.toString()}
            icon={Wallet}
            variant="sky"
            trend={allTds.filter(t => t.status === 'payé').length > 0 ? "Confirmé" : "Initialisé"}
            staggerIndex={3}
          />
        </section>

        <section className="bg-white rounded-[10px] p-6 space-y-4 shadow-sm border border-stone-100">
          <h2 className="text-xl font-semibold text-black font-montserrat">Recherche avancée</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-5 gap-3">
              <Search className="text-neutral-400 shrink-0" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Rechercher....."
                className="flex-1 bg-transparent outline-none text-base font-semibold font-montserrat placeholder:text-neutral-400 text-black"
              />
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 h-14 px-6 bg-white rounded-lg border border-neutral-300 shadow-sm transition-all hover:border-sky-900/50 min-w-[160px] justify-between"
              >
                <span className="text-xl font-medium font-montserrat text-black">
                  {activeFilter === 'Tous' ? 'Statut' : activeFilter}
                </span>
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                  <ChevronDown size={20} className="text-black" />
                </motion.div>
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-30 overflow-hidden border border-stone-100"
                  >
                    {STATUS_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => { setActiveFilter(f); setDropdownOpen(false); setCurrentPage(1); }}
                        className={`w-full text-left px-5 py-3.5 text-base font-medium font-montserrat hover:bg-sky-900/5 ${activeFilter === f ? 'text-sky-900 font-semibold' : 'text-black'}`}
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

        <section className="bg-white rounded-lg shadow-sm border border-stone-100 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black font-montserrat">Mes travaux dirigés</h2>
            <div className="flex items-center gap-2.5">
              <button onClick={() => setViewMode('list')} className={`w-11 h-11 flex items-center justify-center rounded-md border transition-all ${viewMode === 'list' ? 'bg-sky-900 text-white border-sky-900 shadow-lg' : 'text-black/40 border-stone-200'}`}>
                <List size={26} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`w-11 h-11 flex items-center justify-center rounded-md border transition-all ${viewMode === 'grid' ? 'bg-sky-900 text-white border-sky-900 shadow-lg' : 'text-black/40 border-stone-200'}`}>
                <LayoutGrid size={24} />
              </button>
            </div>
          </div>

          <AdminTDTable
            tds={paginated}
            showFooter={false}
            showHeader={false}
            showBulkActions={false}
            showModal={false}
            title=""
            onOpenDetails={handleOpenDetails}
            onStatusUpdate={handleStatusUpdate}
            hideSelection={true}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filtered.length}
          />
        </section>
      </main>

      <AdminTDDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedTD} 
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
