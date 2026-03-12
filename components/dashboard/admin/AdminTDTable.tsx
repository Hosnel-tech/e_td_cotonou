"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { List, LayoutGrid, Check, X, Eye, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';
import AdminTDCard from './AdminTDCard';
import AdminTDDetailsModal, { AdminTDDetailsData } from './AdminTDDetailsModal';

import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from './BulkActionsBar';

const tableData = [
  { id: 'td-1', teacher: 'VIGAN Pauline', matter: 'Anglais',  classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'en attente', duration: '3h' },
  { id: 'td-2', teacher: 'VIGAN Pauline', matter: 'Français', classe: 'Tle',   date: '12/07/25', time: '14h - 17h', status: 'terminé',   duration: '3h' },
  { id: 'td-3', teacher: 'VIGAN Pauline', matter: 'SVT',      classe: '3ème', date: '12/07/25', time: '14h - 17h', status: 'en cours',  duration: '3h' },
  { id: 'td-4', teacher: 'VIGAN Pauline', matter: 'EST',      classe: 'CM2',  date: '12/07/25', time: '14h - 17h', status: 'payé',     duration: '3h' },
] as const;

export default function AdminTDTable() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedTD, setSelectedTD] = useState<AdminTDDetailsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Multi-selection hook
  const {
    selectedIds,
    isAllSelected,
    isIndeterminate,
    toggleSelectAll,
    toggleSelectOne,
    isSelected,
    clearSelection,
    selectionCount,
    hasSelection
  } = useSelection([...tableData]);

  const handleOpenDetails = (row: typeof tableData[number]) => {
    setSelectedTD({
      subject:  row.matter,
      teacher:  row.teacher,
      classe:   row.classe,
      time:     row.time,
      duration: row.duration,
      date:     row.date,
      status:   row.status,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTD(null);
  };

  return (
    <>
      <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-10 font-montserrat">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-black tracking-tight">Mes travaux dirigés</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('list')}
              className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-sky-900 text-white shadow-lg'
                  : 'text-black/40 hover:text-black border border-stone-200'
              }`}
            >
              <List size={28} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-sky-900 text-white shadow-lg'
                  : 'text-black/40 hover:text-black border border-stone-200'
              }`}
            >
              <LayoutGrid size={28} />
            </button>
          </div>
        </div>

        {/* LIST / GRID toggle */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="overflow-x-auto"
            >
              <table className="w-full text-left min-w-[1100px]">
                <thead className="bg-sky-900/5 h-20">
                  <tr>
                    <th className="pl-8 w-20">
                      <div 
                        onClick={toggleSelectAll}
                        className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${
                          isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'
                        }`}
                      >
                        {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                        {!isAllSelected && isIndeterminate && <div className="w-3 h-0.5 bg-white rounded-full" />}
                      </div>
                    </th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Enseignants</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Matières</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Classe</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Type</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Date</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Statut</th>
                    <th className="text-sky-900 text-xl font-semibold px-4">Durée</th>
                    <th className="text-sky-900 text-xl font-semibold px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-300">
                  {tableData.map((row, idx) => {
                    const isPending = row.status === 'en attente';
                    const selected = isSelected(row.id);
                    return (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={idx}
                        className={`h-20 transition-colors group cursor-pointer ${
                          selected ? 'bg-sky-900/[0.03]' : 'hover:bg-gray-50/50'
                        }`}
                        onClick={(e) => toggleSelectOne(row.id, e.shiftKey)}
                      >
                        <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                          <div 
                            onClick={(e) => toggleSelectOne(row.id, e.shiftKey)}
                            className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${
                              selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'
                            }`}
                          >
                            {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                          </div>
                        </td>
                        <td className="text-black text-xl font-normal px-4">{row.teacher}</td>
                        <td className="text-black text-xl font-medium px-4">{row.matter}</td>
                        <td className="text-black text-xl font-normal px-4">{row.classe}</td>
                        <td className="text-black text-xl font-normal px-4">{getTDType(row.classe)}</td>
                        <td className="text-black text-xl font-normal px-4">{row.date}</td>
                        <td className="px-4">
                          <span className={`px-5 py-2 rounded-2xl text-xs font-semibold inline-block min-w-[100px] text-center ${
                            row.status === 'en cours'   ? 'bg-sky-900 text-white shadow-sm' :
                            row.status === 'terminé'    ? 'bg-green-800 text-white shadow-sm' :
                            row.status === 'en attente' ? 'bg-amber-400 text-white shadow-sm' :
                            'bg-red-600 text-white shadow-sm'
                          }`}>
                            {row.status === 'en cours'   ? 'En cours'   :
                             row.status === 'terminé'    ? 'Terminé'    :
                             row.status === 'en attente' ? 'En attente' :
                             row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-black text-xl font-normal px-4">{row.duration}</td>
                        <td className="px-4 text-center">
                          <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <button
                              disabled={!isPending}
                              className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md ${
                                isPending
                                  ? 'bg-green-800 text-white hover:bg-green-900 hover:scale-105'
                                  : 'bg-green-800/25 text-white/50 cursor-not-allowed'
                              }`}
                            >
                              <Check size={20} strokeWidth={3} />
                            </button>
                            <button
                              disabled={!isPending}
                              className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md ${
                                isPending
                                  ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
                                  : 'bg-red-600/25 text-white/50 cursor-not-allowed'
                              }`}
                            >
                              <X size={20} strokeWidth={3} />
                            </button>
                            {/* Eye — always active, opens modal */}
                            <button
                              onClick={() => handleOpenDetails(row)}
                              className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 hover:scale-105 transition-all shadow-md"
                            >
                              <Eye size={20} strokeWidth={2.5} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </motion.div>
          ) : (
            /* GRID VIEW */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {tableData.map((row, idx) => (
                <AdminTDCard
                  key={idx}
                  id={row.id}
                  teacher={row.teacher}
                  subject={row.matter}
                  status={row.status as any}
                  classe={row.classe}
                  time={row.time}
                  date={row.date}
                  duration={row.duration}
                  staggerIndex={idx}
                  isSelected={isSelected(row.id)}
                  onToggleSelection={(shift) => toggleSelectOne(row.id, shift)}
                  onOpenDetails={() => handleOpenDetails(row)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="flex justify-center py-4">
          <Link href="/admin/dashboard/td-management">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 px-12 py-5 bg-sky-900 text-white rounded-[10px] text-xl font-medium transition-all hover:bg-sky-950 shadow-xl cursor-pointer"
            >
              Accédez à tous les travaux dirigés
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
            </motion.span>
          </Link>
        </div>
      </section>

      {/* Bulk Actions Bar */}
      <BulkActionsBar 
        count={selectionCount} 
        onClear={clearSelection}
        onDelete={() => {
          if (confirm(`Voulez-vous supprimer les ${selectionCount} éléments sélectionnés ?`)) {
            alert('Suppression effectuée (Simulation)');
            clearSelection();
          }
        }}
        onExport={() => {
          alert(`Exportation de ${selectionCount} éléments...`);
          clearSelection();
        }}
      />

      {/* Details Modal */}
      <AdminTDDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedTD}
      />
    </>
  );
}
