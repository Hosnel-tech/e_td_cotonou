"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Clock, CheckCircle2, Wallet,
  Search, ChevronDown, ChevronLeft, ChevronRight,
  List, LayoutGrid, Check, X, Eye, Trash2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdminTDCard from '@/components/dashboard/admin/AdminTDCard';
import AdminTDDetailsModal, { AdminTDDetailsData } from '@/components/dashboard/admin/AdminTDDetailsModal';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';

const ALL_TDS = [
  { id: '1', teacher: 'VIGAN Pauline', subject: 'Anglais',  status: 'en attente', classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '2', teacher: 'VIGAN Pauline', subject: 'Français', status: 'terminé',   classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '3', teacher: 'VIGAN Pauline', subject: 'SVT',      status: 'en attente', classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '4', teacher: 'VIGAN Pauline', subject: 'EST',      status: 'terminé',   classe: 'CM2',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '5', teacher: 'VIGAN Pauline', subject: 'Français', status: 'en attente', classe: 'Tle',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '6', teacher: 'VIGAN Pauline', subject: 'EST',      status: 'terminé',   classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '7', teacher: 'VIGAN Pauline', subject: 'Anglais',  status: 'en cours',  classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { id: '8', teacher: 'VIGAN Pauline', subject: 'SVT',      status: 'en attente', classe: 'CM2',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
];

const STATUS_FILTERS = ['Tous', 'En attente', 'En cours', 'Terminé', 'Rejeté'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const ITEMS_PER_PAGE = 8;

export default function AdminTDManagementPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTD, setSelectedTD] = useState<AdminTDDetailsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = ALL_TDS.filter((td) => {
    const matchesSearch =
      searchQuery === '' ||
      td.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.classe.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeFilter === 'Tous' || td.status === activeFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const { isSelected, toggleSelectOne, isAllSelected, isIndeterminate, toggleSelectAll, selectionCount, clearSelection } = useSelection(filtered);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleOpenDetails = (td: any) => {
    setSelectedTD({...td});
    setIsModalOpen(true);
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
          <StatCard label="Nombre total" value="23" icon={ClipboardList} variant="green" trend="12%" staggerIndex={0} />
          <StatCard label="En cours" value="17" icon={Clock} variant="red" trend="12%" staggerIndex={1} />
          <StatCard label="Terminés" value="13" icon={CheckCircle2} variant="orange" trend="12%" staggerIndex={2} />
          <StatCard label="Payés" value="10" icon={Wallet} variant="sky" trend="12%" staggerIndex={3} />
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

          <AnimatePresence mode="wait">
            {paginated.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-black/40 text-xl py-12">Aucun TD trouvé.</motion.p>
            ) : viewMode === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {paginated.map((td, idx) => (
                  <AdminTDCard key={td.id} {...td as any} staggerIndex={idx} isSelected={isSelected(td.id)} onToggleSelection={(shift) => toggleSelectOne(td.id, shift)} onOpenDetails={() => handleOpenDetails(td)} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]">
                  <thead className="bg-sky-900/5 h-16">
                    <tr>
                      <th className="pl-8 w-20">
                        <div onClick={toggleSelectAll} className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'}`}>
                          {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                        </div>
                      </th>
                      <th className="text-sky-900 text-xl font-semibold px-4">Enseignants</th>
                      <th className="text-sky-900 text-xl font-semibold px-4">Matières</th>
                      <th className="text-sky-900 text-xl font-semibold px-4">Classe</th>
                      <th className="text-sky-900 text-xl font-semibold px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {paginated.map((td, idx) => (
                      <tr key={td.id} className={`h-20 hover:bg-slate-50 transition-colors cursor-pointer ${isSelected(td.id) ? 'bg-sky-900/[0.03]' : ''}`} onClick={() => toggleSelectOne(td.id)}>
                        <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                          <div className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${isSelected(td.id) ? 'bg-sky-900' : 'bg-white'}`}>
                            {isSelected(td.id) && <Check className="text-white" size={18} strokeWidth={4} />}
                          </div>
                        </td>
                        <td className="px-4 text-black text-xl font-normal">{td.teacher}</td>
                        <td className="px-4 text-black text-xl font-medium">{td.subject}</td>
                        <td className="px-4 text-black text-xl font-normal">{td.classe}</td>
                        <td className="px-4 text-center">
                           <button onClick={(e) => { e.stopPropagation(); handleOpenDetails(td); }} className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-all"><Eye size={20} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <span className="text-2xl font-normal text-black font-montserrat">Total {filtered.length}</span>
            <div className="flex items-center gap-2">
               <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-2"><ChevronLeft size={24} /></button>
               <span className="text-xl font-semibold">{currentPage} / {totalPages}</span>
               <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="p-2"><ChevronRight size={24} /></button>
            </div>
          </div>
        </section>

        <BulkActionsBar count={selectionCount} onClear={clearSelection} />
      </main>

      <AdminTDDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedTD} />
    </div>
  );
}
