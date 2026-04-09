"use client";

import { useConfirm } from '@/hooks/useConfirm';
import { motion } from 'framer-motion';
import { ArrowRight, SearchX } from 'lucide-react';
import { TD } from '@/types/td.types';
import { Check, Eye } from 'lucide-react';

interface TDTableProps {
  onOpenDetails?: (data: any) => void;
  onStatusUpdate?: (id: string, status: 'terminé') => void;
  data: TD[];
  limit?: number;
  showActions?: boolean;
  isSelected?: (id: string) => boolean;
  toggleSelectOne?: (id: string, isShift?: boolean) => void;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  toggleSelectAll?: () => void;
}

export default function TDTable({ 
  onOpenDetails, 
  onStatusUpdate,
  data, 
  limit, 
  showActions = true,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: TDTableProps) {
  const confirm = useConfirm();

  // Apply limit if specified (dashboard mode)
  const displayData = limit ? data.slice(0, limit) : data;

  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-8 flex justify-between items-center bg-white border-b border-stone-100">
        <h3 className="text-2xl font-semibold text-black font-montserrat">Mes travaux dirigés</h3>
      </div>

      {/* View Content */}
      <div className="px-8 pb-8 pt-6">
        <motion.div
          key="list-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto -mx-8 px-8"
        >
          <table className="w-full text-left">
            <thead className="bg-[#F4FAFD]">
              <tr>
                {toggleSelectAll && (
                  <th className="pl-8 w-20">
                    <div 
                      onClick={() => toggleSelectAll()}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${
                        isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'
                      }`}
                    >
                      {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                      {!isAllSelected && isIndeterminate && <div className="w-3 h-0.5 bg-white rounded-full" />}
                    </div>
                  </th>
                )}
                <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Matières</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Classe</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Niveau</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Date</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Heure</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Statut</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-semibold font-montserrat">Durée</th>
                {showActions && (
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {displayData.length > 0 ? (
                displayData.map((td, index) => (
                  <motion.tr 
                    key={td.id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`hover:bg-gray-50/30 transition-colors cursor-pointer ${
                      isSelected?.(td.id) ? 'bg-sky-900/[0.03]' : ''
                    }`}
                    onClick={(e) => toggleSelectOne?.(td.id, e.shiftKey)}
                  >
                    {toggleSelectOne && (
                      <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                        <div 
                          onClick={(e) => toggleSelectOne(td.id, e.shiftKey)}
                          className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all cursor-pointer ${
                            isSelected?.(td.id) ? 'bg-sky-900' : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          {isSelected?.(td.id) && <Check className="text-white" size={18} strokeWidth={4} />}
                        </div>
                      </td>
                    )}
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{td.subject}</td>
                    <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.classe}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        td.niveau === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {td.niveau}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.date}</td>
                    <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.time}</td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-[30px] inline-flex items-center justify-center text-xs font-semibold text-white w-fit whitespace-nowrap ${
                        td.status.toLowerCase() === 'en cours' ? 'bg-[#004B70]' : 
                        td.status.toLowerCase() === 'terminé' ? 'bg-[#0F673B]' :
                        'bg-[#EE2E33]'
                      }`}>
                        {td.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-black text-xl font-normal font-montserrat">{td.duration}</td>
                    {showActions && (
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {td.status.toLowerCase() === 'en cours' && (
                            <button 
                              onClick={async (e) => {
                                e.stopPropagation();
                                const ok = await confirm({
                                  title: 'Voulez-vous clôturer ce TD ?',
                                  description: `En marquant le TD de ${td.subject} (${td.classe}) comme terminé, vous confirmez que la séance a bien eu lieu. Le service de comptabilité sera notifié pour le paiement.`,
                                  confirmLabel: 'Oui, clôturer',
                                  variant: 'info',
                                });
                                if (ok) onStatusUpdate?.(td.id, 'terminé');
                              }}
                              className="px-6 py-2 bg-sky-900 text-white rounded-lg text-sm font-semibold font-montserrat hover:bg-sky-950 transition-colors shadow-sm cursor-pointer"
                            >
                              Marquer terminé
                            </button>
                          )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetails?.(td);
                              }}
                              className="w-10 h-10 bg-sky-900 text-white rounded-lg flex items-center justify-center hover:bg-sky-950 transition-all shadow-sm cursor-pointer"
                              title="Détails"
                            >
                              <Eye size={20} />
                            </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showActions ? 8 : 7} className="py-24 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center gap-5"
                    >
                      <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-900/20">
                        <SearchX size={56} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">C'est encore vide ici</h4>
                        <p className="text-xl text-stone-400 font-montserrat tracking-tight">Aucun travail dirigé trouvé pour le moment.</p>
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Footer CTA - Only show if limited (dashboard mode) */}
      {limit && (
        <div className="p-10 flex justify-center bg-white border-t border-stone-100">
          <button 
            onClick={() => window.location.href = '/enseignant/dashboard/td-management'}
            className="w-full max-w-xl px-3 py-4 bg-sky-900 text-white rounded-[10px] text-xl font-medium font-inter flex items-center justify-center gap-2.5 hover:bg-sky-800 transition-all active:scale-[0.99] shadow-lg shadow-sky-900/10"
          >
            Accédez à tous les travaux dirigés
            <ArrowRight size={36} className="rotate-0" />
          </button>
        </div>
      )}
    </div>
  );
}
