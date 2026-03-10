"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Clock, CheckCircle2, Wallet,
  Search, ChevronDown, ChevronLeft, ChevronRight,
  List, LayoutGrid, Check, X, Eye,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AdminTDCard, { AdminTDCardProps } from '@/components/dashboard/admin/AdminTDCard';
import AdminTDDetailsModal, { AdminTDDetailsData } from '@/components/dashboard/admin/AdminTDDetailsModal';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';

// ── Mock data ────────────────────────────────────────────────────────────────
const ALL_TDS: Omit<AdminTDCardProps, 'staggerIndex' | 'onOpenDetails'>[] = [
  { teacher: 'VIGAN Pauline', subject: 'Anglais',  status: 'en attente', classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'Français', status: 'terminé',   classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'SVT',      status: 'en attente', classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'EST',      status: 'terminé',   classe: 'CM2',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'Français', status: 'en attente', classe: 'Tle',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'EST',      status: 'terminé',   classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'Anglais',  status: 'en cours',  classe: '3ème', time: '14h - 17h', date: '12/07/25', duration: '3h' },
  { teacher: 'VIGAN Pauline', subject: 'SVT',      status: 'en attente', classe: 'CM2',  time: '14h - 17h', date: '12/07/25', duration: '3h' },
];

const STATUS_FILTERS = ['Tous', 'En attente', 'En cours', 'Terminé', 'Rejeté'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const ITEMS_PER_PAGE = 4;

// ── Pagination component ─────────────────────────────────────────────────────
function Paginator({
  current, total, onChange,
}: { current: number; total: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-stone-300 disabled:opacity-30 hover:bg-stone-50 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-12 h-12 rounded-md text-2xl font-semibold font-montserrat transition-all border ${
            p === current
              ? 'bg-green-800 text-white border-green-800 shadow-md'
              : 'bg-white text-green-800 border-green-800 hover:bg-green-50'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-8 h-8 flex items-center justify-center rounded-md border border-stone-300 disabled:opacity-30 hover:bg-stone-50 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AdminTDManagementPage() {
  const [viewMode,        setViewMode]        = useState<'grid' | 'list'>('grid');
  const [searchQuery,     setSearchQuery]     = useState('');
  const [activeFilter,    setActiveFilter]    = useState<StatusFilter>('Tous');
  const [dropdownOpen,    setDropdownOpen]    = useState(false);
  const [currentPage,     setCurrentPage]     = useState(1);
  const [selectedTD,      setSelectedTD]      = useState<AdminTDDetailsData | null>(null);
  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── Filter & search ──────────────────────────────────────────────────────
  const statusMap: Record<StatusFilter, string> = {
    'Tous':      '',
    'En attente':'en attente',
    'En cours':  'en cours',
    'Terminé':   'terminé',
    'Rejeté':    'rejeté',
  };

  const filtered = ALL_TDS.filter((td) => {
    const matchesSearch =
      searchQuery === '' ||
      td.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      td.classe.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      activeFilter === 'Tous' || td.status === statusMap[activeFilter];
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleOpenDetails = (td: typeof ALL_TDS[number]) => {
    setSelectedTD({
      subject:  td.subject,
      teacher:  td.teacher,
      classe:   td.classe,
      time:     td.time,
      duration: td.duration,
      date:     td.date,
      status:   td.status,
    });
    setIsModalOpen(true);
  };

  const handleFilter = (f: StatusFilter) => {
    setActiveFilter(f);
    setDropdownOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-8">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-black font-montserrat">Gestion des TD</h1>
          <p className="text-xl font-normal text-black/60 font-montserrat">Gérez les travaux dirigés et séances</p>
        </header>

        {/* ── Stat cards ──────────────────────────────────────────────── */}
        <section className="flex flex-wrap gap-6">
          <StatCard label="Nombre total" value="23" icon={ClipboardList} variant="green"  trend="12%" staggerIndex={0} />
          <StatCard label="En cours"     value="17" icon={Clock}         variant="red"    trend="12%" staggerIndex={1} />
          <StatCard label="Terminés"     value="13" icon={CheckCircle2}  variant="orange" trend="12%" staggerIndex={2} />
          <StatCard label="Payés"        value="10" icon={Wallet}        variant="sky"    trend="12%" staggerIndex={3} />
        </section>

        {/* ── Advanced search card ─────────────────────────────────────── */}
        <section className="bg-white rounded-[10px] p-6 space-y-4 shadow-sm border border-stone-100">
          <h2 className="text-xl font-semibold text-black font-montserrat">Recherche avancée</h2>

          <div className="flex items-center gap-4">
            {/* Search bar */}
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

            {/* Status dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-4 h-14 px-6 bg-white rounded-lg border border-neutral-300 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] transition-all hover:border-sky-900/50 min-w-[160px] justify-between"
              >
                <span className="text-xl font-medium font-montserrat text-black">
                  {activeFilter === 'Tous' ? 'Statut' : activeFilter}
                </span>
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-black" />
                </motion.div>
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-44 bg-white rounded-[5px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] z-30 overflow-hidden"
                  >
                    {STATUS_FILTERS.filter(f => f !== 'Tous').map((filter, idx, arr) => (
                      <button
                        key={filter}
                        onClick={() => handleFilter(filter)}
                        className={`w-full text-left px-5 py-3.5 text-base font-medium font-montserrat transition-colors hover:bg-sky-900/5 ${
                          activeFilter === filter ? 'text-sky-900 font-semibold' : 'text-black'
                        } ${idx < arr.length - 1 ? 'border-b border-zinc-100' : ''}`}
                      >
                        {filter}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Content card ─────────────────────────────────────────────── */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">

          {/* Card header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-black font-montserrat">Mes travaux dirigés</h2>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setViewMode('list')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-sky-900 text-white shadow-lg'
                    : 'text-black/40 hover:text-black border border-stone-200'
                }`}
              >
                <List size={26} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-sky-900 text-white shadow-lg'
                    : 'text-black/40 hover:text-black border border-stone-200'
                }`}
              >
                <LayoutGrid size={24} />
              </button>
            </div>
          </div>

          {/* Grid / List */}
          <AnimatePresence mode="wait">
            {paginated.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-black/40 text-xl py-12 font-montserrat"
              >
                Aucun TD trouvé.
              </motion.p>
            ) : viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
              >
                {paginated.map((td, idx) => (
                  <AdminTDCard
                    key={idx}
                    {...td}
                    staggerIndex={idx}
                    onOpenDetails={() => handleOpenDetails(td)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                {paginated.map((td, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between h-16 px-6 bg-white border border-stone-200 rounded-lg hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-xl font-medium font-montserrat w-40 truncate">{td.subject}</span>
                    <span className="text-black/60 text-xl font-normal font-montserrat w-40 truncate">{td.teacher}</span>
                    <span className="text-black/60 text-xl font-normal font-montserrat w-24">{td.classe}</span>
                    <span className="text-black/60 text-xl font-normal font-montserrat w-24">{td.date}</span>
                    <span className={`px-4 py-1.5 rounded-2xl text-xs font-semibold font-montserrat min-w-[100px] text-center ${
                      td.status === 'en cours'   ? 'bg-sky-900 text-white' :
                      td.status === 'terminé'    ? 'bg-green-800 text-white' :
                      td.status === 'en attente' ? 'bg-amber-400 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {td.status === 'en cours' ? 'En cours' :
                       td.status === 'terminé' ? 'Terminé' :
                       td.status === 'en attente' ? 'En attente' :
                       td.status.charAt(0).toUpperCase() + td.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={td.status !== 'en attente'}
                        className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all ${
                          td.status === 'en attente' ? 'bg-green-800 text-white hover:bg-green-900' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >✓</button>
                      <button
                        disabled={td.status !== 'en attente'}
                        className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all ${
                          td.status === 'en attente' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >✕</button>
                      <button
                        onClick={() => handleOpenDetails(td)}
                        className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-all"
                      >👁</button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <span className="text-2xl font-normal text-black font-montserrat">
              Total {filtered.length}
            </span>
            {totalPages > 1 && (
              <Paginator
                current={currentPage}
                total={totalPages}
                onChange={setCurrentPage}
              />
            )}
          </div>
        </section>
      </main>

      {/* TD Details Modal */}
      <AdminTDDetailsModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedTD(null); }}
        data={selectedTD}
      />
    </div>
  );
}
