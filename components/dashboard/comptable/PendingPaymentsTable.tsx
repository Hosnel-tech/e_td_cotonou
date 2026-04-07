"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, SearchX, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import AdminTDDetailsModal from '@/components/dashboard/admin/AdminTDDetailsModal';
import { TD } from '@/types/td.types';

interface PendingPaymentsTableProps {
  tds: TD[];
}

export default function PendingPaymentsTable({
  tds
}: PendingPaymentsTableProps) {
  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleOpenDetails = (td: TD) => {
    setSelectedTD(td);
    setIsModalOpen(true);
  };

  // Pagination logic
  const totalPages = Math.ceil(tds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTDs = tds.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] mb-12"
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-black text-2xl font-bold font-montserrat tracking-tight">Paiements en attente</h2>
          <div className="px-4 py-1 bg-sky-900/10 rounded-full text-sky-900 text-sm font-bold uppercase tracking-wider">
            {tds.length} TD{tds.length > 1 ? 's' : ''} à régler
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sky-900/5 h-20">
                <th className="text-sky-900 text-xl font-semibold px-6 font-montserrat rounded-l-lg">Enseignant</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Matière</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Classe</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center">Niveau</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Date</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Durée</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center last:rounded-r-lg w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {paginatedTDs.length > 0 ? (
                paginatedTDs.map((td, idx) => (
                  <motion.tr 
                    key={td.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="h-24 hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-900/10 flex items-center justify-center text-sky-900 font-bold uppercase">
                          {td.teacher.charAt(0)}
                        </div>
                        <span className="text-black text-xl font-medium font-montserrat">{td.teacher}</span>
                      </div>
                    </td>
                    <td className="text-black/80 text-xl font-normal px-4 font-montserrat">{td.subject}</td>
                    <td className="text-black/80 text-xl font-normal px-4 font-montserrat">{td.classe}</td>
                    <td className="px-4 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider ${
                        td.niveau === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {td.niveau}
                      </span>
                    </td>
                    <td className="text-black/80 text-xl font-normal px-4 font-montserrat">{td.date}</td>
                    <td className="text-black/80 text-xl font-normal px-4 font-montserrat font-mono">{td.duration}</td>
                    <td className="px-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleOpenDetails(td)}
                          className="w-12 h-12 flex items-center justify-center bg-slate-100 text-sky-900 rounded-xl hover:bg-sky-900 hover:text-white transition-all active:scale-90 shadow-sm"
                          title="Détails"
                        >
                          <Eye size={24} />
                        </button>
                        <button 
                          onClick={() => alert(`Paiement initié pour le TD de ${td.subject} (${td.teacher}).`)}
                          className="px-6 py-3 bg-green-800 hover:bg-green-900 text-white rounded-xl text-sm font-bold font-montserrat transition-all active:scale-95 shadow-md uppercase tracking-wider"
                        >
                          Payer
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4"
                    >
                      <div className="w-20 h-20 bg-sky-900/5 rounded-full flex items-center justify-center text-sky-900/20">
                        <SearchX size={40} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold text-sky-900 font-montserrat tracking-tight">Aucun paiement en attente</h4>
                        <p className="text-black/40 font-montserrat">Tous les cours terminés ont été réglés.</p>
                      </div>
                    </motion.div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-8 border-t border-stone-100 flex items-center justify-between bg-slate-50/30 rounded-b-lg">
          <div className="text-black/40 text-sm font-medium font-montserrat">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, tds.length)} sur {tds.length}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 text-sky-900 hover:bg-sky-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sky-900 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold font-montserrat transition-all ${
                    currentPage === page 
                      ? 'bg-sky-900 text-white shadow-lg shadow-sky-900/20' 
                      : 'bg-white border border-stone-100 text-sky-900 hover:border-sky-900/30 hover:bg-sky-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-stone-200 text-sky-900 hover:bg-sky-900 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-sky-900 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {selectedTD && (
        <AdminTDDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTD(null);
          }} 
          data={selectedTD} 
        />
      )}
    </motion.section>
  );
}
