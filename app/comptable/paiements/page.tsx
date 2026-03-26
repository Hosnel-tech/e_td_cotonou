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

import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';
import ComptableSidebar from '@/components/dashboard/comptable/ComptableSidebar';

export default function AccountantPaymentsPage() {
  const confirm = useConfirm();
  const [tds, setTds] = useState<TD[]>([]);
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

  const filteredTDs = tds.filter(td => 
    td.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    td.classe.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat text-black">
      <ComptableSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10 focus:outline-none">
        {/* Header */}
        <header className="flex justify-between items-end pb-4 border-Stone-200">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-black tracking-tight">Gestion des Paiements</h1>
            <p className="text-xl font-normal text-black/60 font-montserrat">Validez et suivez les règlements des enseignants</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="h-14 bg-sky-900 text-white px-8 rounded-lg font-bold flex items-center gap-2 transition-all hover:bg-sky-950 shadow-lg shadow-sky-900/20 active:scale-95">
              <Download size={20} strokeWidth={3} />
              Exporter (.CSV)
            </button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
          <div className="flex-1 h-14 bg-slate-50 rounded-lg border border-neutral-200 flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-900/10 transition-all text-black border-stone-300">
            <Search className="text-neutral-400 font-bold" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par enseignant, matière, classe..." 
              className="bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 w-full"
            />
          </div>
          <button className="h-14 px-6 bg-slate-50 border border-neutral-300 rounded-lg flex items-center gap-3 font-bold text-black hover:bg-slate-100 transition-all cursor-pointer">
            <Filter size={20} />
            Filtres avancés
          </button>
        </div>

        {/* Table Area */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-sky-900/5">
              <tr>
                <th className="px-8 py-5 text-sky-900 text-xl font-bold">Détails de la séance</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-bold text-center">Statut</th>
                <th className="px-6 py-5 text-sky-900 text-xl font-bold text-center whitespace-nowrap">Actions de paiement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredTDs.length > 0 ? (
                filteredTDs.map((td, idx) => (
                  <tr key={td.id || idx} className="hover:bg-slate-50 transition-colors h-24">
                    <td className="px-8 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-bold text-black">{td.subject}</span>
                        <div className="flex items-center gap-3 text-sm text-stone-500 font-medium font-montserrat tracking-tight">
                           <span className="bg-sky-50 px-2 py-0.5 rounded text-sky-800 font-bold uppercase">{td.classe}</span>
                           <span>•</span>
                           <span>{td.date} à {td.time}</span>
                           <span>•</span>
                           <span className="italic font-normal">Durée: {td.duration}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border-2 ${
                         td.status === 'payé' ? 'bg-green-800 text-white border-green-900' : 'bg-amber-400 text-amber-900 border-amber-500'
                       }`}>
                         {td.status === 'payé' ? 'Confirmé' : 'À régler'}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
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
                            className="px-8 py-3.5 bg-green-800 text-white rounded-xl font-bold shadow-lg hover:bg-green-900 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
                          >
                            <Check size={20} strokeWidth={3} />
                            Confirmer le Règlement
                          </button>
                        )}
                        {td.status === 'payé' && (
                          <div className="flex items-center gap-2 text-green-800 font-bold text-lg bg-green-50 px-4 py-2 rounded-lg border border-green-100 italic">
                            <Check size={20} strokeWidth={3} />
                            Règlement Effectué
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-6">
                       <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                          <SearchSlash size={56} />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-2xl font-bold text-sky-900">Aucun paiement en attente</h4>
                          <p className="text-lg text-stone-400 font-medium">Les nouvelles séances terminées apparaîtront ici.</p>
                       </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
