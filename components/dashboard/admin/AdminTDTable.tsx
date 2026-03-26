"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { List, LayoutGrid, Check, X, Eye, ArrowRight, Download, SearchX } from 'lucide-react';
import { useState } from 'react';
import { useConfirm } from '@/hooks/useConfirm';
import Link from 'next/link';
import { getTDType } from '@/components/dashboard/enseignant/tdUtils';
import AdminTDCard from './AdminTDCard';
import AdminTDDetailsModal from './AdminTDDetailsModal';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from './BulkActionsBar';
import { TD } from '@/types/td.types';

interface AdminTDTableProps {
  tds?: TD[];
  limit?: number;
  showFooter?: boolean;
  showHeader?: boolean;
  showBulkActions?: boolean;
  showModal?: boolean;
  title?: string;
  externalSelection?: ReturnType<typeof useSelection>;
  externalViewMode?: 'list' | 'grid';
  onViewModeChange?: (mode: 'list' | 'grid') => void;
  onOpenDetails?: (td: TD) => void;
  onStatusUpdate?: (id: string, status: string) => void;
}

export default function AdminTDTable({ 
  tds = [], 
  limit, 
  showFooter = true, 
  showHeader = true,
  showBulkActions = true,
  showModal = true,
  title = "Mes travaux dirigés",
  externalSelection,
  externalViewMode,
  onViewModeChange,
  onOpenDetails,
  onStatusUpdate
}: AdminTDTableProps) {
  const [internalViewMode, setInternalViewMode] = useState<'list' | 'grid'>('list');
  const viewMode = externalViewMode || internalViewMode;
  const setViewMode = onViewModeChange || setInternalViewMode;

  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

  // Use external selection if provided, otherwise manage internally
  const internalSelection = useSelection(tds);
  const selection = externalSelection || internalSelection;

  const displayData = limit ? tds.slice(0, limit) : tds;

  const confirm = useConfirm();

  const handleOpenDetails = (td: TD) => {
    if (onOpenDetails) {
      onOpenDetails(td);
    } else {
      setSelectedTD(td);
      setIsInternalModalOpen(true);
    }
  };

  const statusConfig: Record<string, string> = {
    'en attente': 'bg-amber-400',
    'en cours': 'bg-sky-900',
    'terminé': 'bg-green-800',
    'payé': 'bg-sky-400',
    'rejeté': 'bg-red-600'
  };

  return (
    <>
      <div className="bg-white rounded-[10px] shadow-sm border border-stone-100 overflow-hidden">
        {showHeader && (
          <div className="p-8 flex items-center justify-between border-b border-stone-100">
            <h2 className="text-2xl font-bold text-black font-montserrat tracking-tight">{title}</h2>
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setViewMode('list')}
                className={`w-11 h-11 flex items-center justify-center rounded-md border transition-all ${viewMode === 'list' ? 'bg-sky-900 text-white border-sky-900 shadow-lg' : 'text-black/40 border-stone-200 hover:border-sky-900/30'}`}
              >
                <List size={26} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`w-11 h-11 flex items-center justify-center rounded-md border transition-all ${viewMode === 'grid' ? 'bg-sky-900 text-white border-sky-900 shadow-lg' : 'text-black/40 border-stone-200 hover:border-sky-900/30'}`}
              >
                <LayoutGrid size={24} />
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {viewMode === 'list' ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-sky-900/5 h-20 border-b border-stone-100">
                  <th className="p-5 text-left w-20">
                    <button 
                      onClick={() => selection.toggleSelectAll()}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${selection.isAllSelected ? 'bg-sky-900' : 'bg-white'}`}
                    >
                      {selection.isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                      {!selection.isAllSelected && selection.isIndeterminate && <div className="w-3 h-0.5 bg-sky-900" />}
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">Enseignants</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">Matières</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left text-center">Classe</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left text-center">Niveau</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">Date</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left text-center">Statut</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left text-center">Durée</th>
                  <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length > 0 ? (
                  displayData.map((td) => {
                    const isSelected = selection.isSelected(td.id);
                    return (
                      <motion.tr 
                        key={td.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => selection.toggleSelectOne(td.id, e.shiftKey)}
                        className={`border-b border-stone-100 hover:bg-slate-50/50 transition-colors cursor-pointer ${isSelected ? 'bg-sky-900/5' : ''}`}
                      >
                        <td className="p-5">
                          <div className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${isSelected ? 'bg-sky-900' : 'bg-white'}`}>
                            {isSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-black font-montserrat">{td.teacher}</td>
                        <td className="px-4 py-4 font-semibold text-black font-montserrat">{td.subject}</td>
                        <td className="px-4 py-4 font-semibold text-black font-montserrat">{td.classe}</td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            td.niveau === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {td.niveau}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-black font-montserrat">{td.date}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-block px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase ${statusConfig[td.status] || 'bg-sky-900'}`}>
                            {td.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-black font-montserrat text-center">{td.duration}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {td.status === 'en attente' && (
                              <>
                                <button 
                                  onClick={async () => {
                                    const ok = await confirm({
                                      title: 'Valider ce TD ?',
                                      description: `Confirmer la validation du TD de ${td.subject} (${td.classe}). L'enseignant sera notifié.`,
                                      confirmLabel: 'Oui, valider',
                                      variant: 'success',
                                    });
                                    if (ok) onStatusUpdate?.(td.id, 'en cours');
                                  }}
                                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all shadow-sm bg-green-800 text-white hover:bg-green-900 hover:scale-110 cursor-pointer"
                                  title="Valider le TD"
                                >
                                  <Check size={16} strokeWidth={3} />
                                </button>
                                <button 
                                  onClick={async () => {
                                    const ok = await confirm({
                                      title: 'Rejeter ce TD ?',
                                      description: `Cette action rejetera le TD de ${td.subject} (${td.classe}). L'enseignant sera notifié du refus.`,
                                      confirmLabel: 'Oui, rejeter',
                                      variant: 'danger',
                                    });
                                    if (ok) onStatusUpdate?.(td.id, 'rejeté');
                                  }}
                                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all shadow-sm bg-red-600 text-white hover:bg-red-700 hover:scale-110 cursor-pointer"
                                  title="Rejeter le TD"
                                >
                                  <X size={16} strokeWidth={3} />
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => handleOpenDetails(td)}
                              className="w-8 h-8 bg-sky-900 text-white rounded-md flex items-center justify-center hover:bg-sky-950 transition-all shadow-sm hover:scale-110 cursor-pointer"
                              title="Voir les détails"
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="py-24 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center gap-5"
                      >
                        <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-900/20">
                          <SearchX size={56} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">Aucun travail dirigé</h4>
                          <p className="text-xl text-stone-400 font-montserrat tracking-tight">Il n'y a actuellement aucun travail dirigé enregistré dans le système.</p>
                        </div>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className={`p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${displayData.length === 0 ? 'place-items-center' : ''}`}>
              {displayData.length > 0 ? (
                displayData.map((td, idx) => (
                  <AdminTDCard 
                    key={td.id} 
                    {...td} 
                    staggerIndex={idx}
                    isSelected={selection.isSelected(td.id)}
                    onToggleSelection={(shift) => selection.toggleSelectOne(td.id, shift)}
                    onOpenDetails={() => handleOpenDetails(td)}
                  />
                ))
              ) : (
                <div className="col-span-full py-24 flex flex-col items-center justify-center gap-5 text-center w-full bg-[#F4FAFD]/30 rounded-2xl border-2 border-dashed border-sky-100">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5 text-center"
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-sky-900/20 shadow-sm mx-auto">
                      <SearchX size={56} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1 px-8">
                      <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">C'est encore vide ici</h4>
                      <p className="text-xl text-stone-400 font-montserrat tracking-tight max-w-md mx-auto">Aucun travail dirigé n'a été trouvé.</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>

        {showFooter && (
          <div className="p-6 bg-slate-50 flex justify-center">
            <Link 
              href="/admin/dashboard/td-management"
              className="group flex items-center gap-3 px-8 py-3 bg-sky-900 text-white rounded-lg font-semibold font-montserrat hover:bg-sky-950 transition-all shadow-lg hover:shadow-sky-900/20"
            >
              Voir tous les travaux dirigés
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {showBulkActions && (
        <BulkActionsBar 
          count={selection.selectionCount} 
          onClear={selection.clearSelection} 
          primaryAction={{
            label: 'Exporter',
            icon: Download,
            onClick: () => console.log('Exporting selected TDs...')
          }}
        />
      )}

      {showModal && (
        <AdminTDDetailsModal 
          isOpen={isInternalModalOpen} 
          onClose={() => setIsInternalModalOpen(false)} 
          data={selectedTD} 
        />
      )}
    </>
  );
}
