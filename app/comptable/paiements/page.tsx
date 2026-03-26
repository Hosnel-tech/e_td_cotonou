"use client";

import { motion } from 'framer-motion';
import { 
  Search, Download, Plus, Filter, Check, SearchSlash
} from 'lucide-react';
import { useConfirm } from '@/hooks/useConfirm';
import { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import PaymentManagementTable from '@/components/dashboard/comptable/PaymentManagementTable';
import { useSelection } from '@/hooks/useSelection';
import BulkActionsBar from '@/components/dashboard/admin/BulkActionsBar';
import { paymentService } from '@/services/payment.service';
import { Payment } from '@/types/financial.types';
import { exportToCSV } from '@/lib/export.utils';

import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';

export default function AccountantPaymentsPage() {
  const confirm = useConfirm();
  const [tds, setTds] = useState<TD[]>([]);
  const selection = useSelection(tds.filter(t => t.status === 'terminé' || t.status === 'payé'));
  const { selectionCount, clearSelection, selectedIds, isSelected, toggleSelectOne, isAllSelected, isIndeterminate, toggleSelectAll } = selection;
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    tdService.getTDs().then(all => {
      setTds(all.filter(t => t.status === 'terminé' || t.status === 'payé'));
    });
  }, []);

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await tdService.updateStatus(id, status);
      const updated = await tdService.getTDs();
      setTds(updated.filter(t => t.status === 'terminé' || t.status === 'payé'));
    } catch (error) {
       console.error('Error updating status:', error);
       alert('Erreur lors de la mise à jour du statut.');
    }
  };

  const handleBulkPay = async () => {
    try {
      await tdService.bulkUpdateStatus(selectedIds, 'payé');
      const updated = await tdService.getTDs();
      setTds(updated.filter(t => t.status === 'terminé' || t.status === 'payé'));
      clearSelection();
    } catch (error) {
       console.error('Bulk pay error:', error);
       alert('Erreur lors du paiement groupé.');
    }
  };

  const filteredTDs = tds.filter(td => 
    td.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    td.classe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-end pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-black tracking-tight font-montserrat">Gestion des Paiements</h1>
          <p className="text-xl font-normal text-black/60 font-montserrat">Validez et suivez les règlements des enseignants</p>
        </div>
      </header>

      {/* Filters & Search - Expand to full width */}
      <div className="flex items-center gap-6 bg-white p-8 rounded-2xl border border-stone-100 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.06)] mb-10 transition-all">
        <div className="flex-1 h-[72px] bg-white rounded-xl border border-stone-300 flex items-center px-8 gap-4 focus-within:ring-4 focus-within:ring-sky-900/5 focus-within:border-sky-900 transition-all text-black group">
          <Search className="text-neutral-400 group-focus-within:text-sky-900 transition-colors" size={28} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par enseignant, matière, classe..." 
            className="bg-transparent outline-none text-xl font-medium placeholder:text-neutral-400 w-full font-montserrat"
          />
        </div>
        <button className="h-[72px] px-10 bg-white border border-stone-300 rounded-xl flex items-center gap-4 font-bold text-black hover:bg-slate-50 transition-all cursor-pointer shadow-sm active:scale-95 group font-montserrat">
          <Filter size={24} className="group-hover:rotate-12 transition-transform" />
          <span className="text-lg">Filtres avancés</span>
        </button>
      </div>

      {/* Table Area - Taking up full available space */}
      <section className="bg-white rounded-[20px] shadow-[0px_0px_15px_2px_rgba(0,0,0,0.08)] border border-stone-100 overflow-hidden mb-12">
        <table className="w-full text-left table-auto border-separate border-spacing-0">
          <thead className="bg-[#F8FBFC]">
            <tr className="h-24">
              <th className="pl-12 w-28">
                <button 
                  onClick={() => toggleSelectAll()}
                  className={`w-8 h-8 rounded-lg border-2 border-sky-900 flex items-center justify-center transition-all ${isAllSelected ? 'bg-sky-900 shadow-lg shadow-sky-900/20' : 'bg-white hover:bg-sky-50'}`}
                >
                  {isAllSelected && <Check className="text-white" size={20} strokeWidth={4} />}
                  {!isAllSelected && isIndeterminate && <div className="w-4 h-1 bg-sky-900 rounded-full" />}
                </button>
              </th>
              <th className="px-8 py-6 text-sky-900 text-2xl font-bold font-montserrat">Détails de la séance</th>
              <th className="px-8 py-6 text-sky-900 text-2xl font-bold text-center font-montserrat">Statut</th>
              <th className="px-12 py-6 text-sky-900 text-2xl font-bold text-center whitespace-nowrap font-montserrat">Actions de paiement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredTDs.length > 0 ? (
              filteredTDs.map((td, idx) => {
                const selected = isSelected(td.id);
                return (
                  <tr 
                    key={td.id || idx} 
                    onClick={(e) => toggleSelectOne(td.id, e.shiftKey)}
                    className={`hover:bg-slate-50 transition-all duration-300 h-32 cursor-pointer group ${selected ? 'bg-sky-900/[0.02]' : ''}`}
                  >
                    <td className="pl-12">
                      <div className={`w-8 h-8 rounded-lg border-2 border-sky-900 flex items-center justify-center transition-all ${selected ? 'bg-sky-900 shadow-md shadow-sky-900/10' : 'bg-white group-hover:bg-gray-50'}`}>
                        {selected && <Check className="text-white" size={20} strokeWidth={4} />}
                      </div>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex flex-col gap-3">
                        <span className="text-[28px] font-black text-black font-montserrat tracking-tight leading-tight">{td.subject}</span>
                        <div className="flex items-center gap-5 text-lg text-stone-500 font-semibold font-montserrat">
                           <span className="bg-sky-100 text-sky-900 px-4 py-1.5 rounded-lg text-sm font-black tracking-widest border border-sky-200 uppercase">{td.classe}</span>
                           <span className="h-2 w-2 bg-stone-200 rounded-full" />
                           <span>{td.date} à {td.time}</span>
                           <span className="h-2 w-2 bg-stone-200 rounded-full" />
                           <span className="italic font-normal opacity-80">Durée: {td.duration}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                       <span className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] border-2 shadow-sm font-montserrat transition-all whitespace-nowrap ${
                         td.status === 'payé' ? 'bg-emerald-900 text-white border-emerald-950 px-10' : 'bg-amber-400 text-amber-950 border-amber-500'
                       }`}>
                         {td.status === 'payé' ? 'Confirmé' : 'À régler'}
                       </span>
                    </td>
                  <td className="px-12 py-6">
                    <div className="flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                      {td.status === 'terminé' && (
                        <button
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Confirmer le règlement ?",
                              description: `Voulez-vous marquer le TD de ${td.subject} (${td.classe}) comme payé ? Cette action notifiera l'enseignant.`,
                              confirmLabel: "Confirmer le paiement",
                              variant: "success",
                            });
                            if (ok) handleStatusUpdate(td.id, 'payé');
                          }}
                          className="px-12 py-5 bg-emerald-900 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-950 transition-all hover:scale-[1.03] active:scale-95 flex items-center gap-4 cursor-pointer font-montserrat shadow-emerald-900/10"
                        >
                          <Check size={28} strokeWidth={4} />
                          Confirmer le Règlement
                        </button>
                      )}
                      {td.status === 'payé' && (
                        <div className="flex items-center gap-4 text-emerald-900 font-black text-2xl px-6 py-3 opacity-40 font-montserrat italic">
                          <Check size={32} strokeWidth={4} />
                          Règlement Effectué
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-44 text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8"
                  >
                     <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 shadow-inner border border-stone-100">
                        <SearchSlash size={80} strokeWidth={1.5} />
                     </div>
                     <div className="space-y-3">
                        <h4 className="text-[40px] font-black text-sky-900 font-montserrat tracking-tight leading-none">Aucun paiement en attente</h4>
                        <p className="text-2xl text-stone-400 font-medium font-montserrat tracking-tight opacity-80 uppercase leading-normal">Les nouvelles séances terminées apparaîtront ici.</p>
                     </div>
                  </motion.div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      
      <BulkActionsBar 
        count={selectionCount} 
        onClear={clearSelection}
        primaryAction={{
          label: "Confirmer Paiements",
          icon: Check,
          onClick: handleBulkPay
        }}
        showDelete={false}
      />
    </>
  );
}
