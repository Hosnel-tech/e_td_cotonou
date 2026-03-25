"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutList, LayoutGrid, ArrowRight, SearchX } from 'lucide-react';
import TDCard from './TDCard';
import { getTDType } from './tdUtils';
import { TD } from '@/types/td.types';

interface TDTableProps {
  onOpenDetails?: (data: any) => void;
  onStatusUpdate?: (id: string, status: 'terminé') => void;
  data: TD[];
  limit?: number;
  initialView?: 'list' | 'grid';
  showActions?: boolean;
}

export default function TDTable({ 
  onOpenDetails, 
  onStatusUpdate,
  data, 
  limit, 
  initialView = 'list',
  showActions = true
}: TDTableProps) {
  const [view, setView] = useState<'list' | 'grid'>(initialView);

  // Apply limit if specified (dashboard mode)
  const displayData = limit ? data.slice(0, limit) : data;

  const handleOpenDetails = (td: TD) => {
    onOpenDetails?.(td);
  };

  return (
    <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-8 flex justify-between items-center bg-white">
        <h3 className="text-2xl font-semibold text-black font-montserrat">Mes travaux dirigés</h3>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setView('list')}
            className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
              view === 'list' 
                ? 'bg-sky-900 text-white shadow-sm' 
                : 'bg-white text-black border border-stone-200 hover:bg-gray-50'
            }`}
          >
            <LayoutList size={28} />
          </button>
          <button 
            onClick={() => setView('grid')}
            className={`w-11 h-11 flex items-center justify-center rounded-md transition-all ${
              view === 'grid' 
                ? 'bg-sky-900 text-white shadow-sm' 
                : 'bg-white text-black border border-stone-200 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid size={28} />
          </button>
        </div>
      </div>

      {/* View Content */}
      <div className="px-8 pb-8">
        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="overflow-x-auto -mx-8 px-8"
            >
              <table className="w-full text-left">
                <thead className="bg-[#F4FAFD]">
                  <tr>
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
                        className="hover:bg-gray-50/30 transition-colors"
                      >
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
                            td.status.toLowerCase() === 'payé' ? 'bg-[#EE2E33]' :
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
                                  onClick={() => onStatusUpdate?.(td.id, 'terminé')}
                                  className="px-6 py-2 bg-sky-900 text-white rounded-lg text-sm font-semibold font-montserrat hover:bg-sky-950 transition-colors shadow-sm cursor-pointer"
                                >
                                  Marquer terminé
                                </button>
                              )}
                              <button 
                                onClick={() => handleOpenDetails(td)}
                                className="px-6 py-2 bg-[#0F673B] text-white rounded-lg text-sm font-semibold font-montserrat hover:bg-green-700 transition-colors shadow-sm cursor-pointer"
                              >
                                En savoir plus
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
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displayData.length > 0 ? (
                displayData.map((td, index) => (
                  <TDCard 
                    key={td.id || index}
                    matter={td.subject}
                    classe={td.classe}
                    heure={td.time}
                    date={td.date}
                    duree={td.duration}
                    type={getTDType(td.classe)}
                    status={td.status.toLowerCase() as 'en cours' | 'terminé'}
                    onOpenDetails={() => handleOpenDetails(td)}
                  />
                ))
              ) : (
                <div className="col-span-full py-24 flex flex-col items-center justify-center gap-5 text-center bg-[#F4FAFD]/30 rounded-2xl border-2 border-dashed border-sky-100">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5"
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-sky-900/20 shadow-sm">
                      <SearchX size={56} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1 px-8">
                      <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">C'est encore vide ici</h4>
                      <p className="text-xl text-stone-400 font-montserrat tracking-tight max-w-md mx-auto">Aucun travail dirigé trouvé pour le moment. Allez dans la section de gestion pour en ajouter un.</p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
