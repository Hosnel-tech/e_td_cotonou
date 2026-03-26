"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, SearchSlash, Check, Wallet, Filter
} from 'lucide-react';
import { useConfirm } from '@/hooks/useConfirm';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import { tdService } from '@/services/td.service';
import { TD } from '@/types/td.types';
import TDTable from '@/components/dashboard/enseignant/TDTable';

export default function AdminPaymentsPage() {
  const confirm = useConfirm();
  const [tds, setTds] = useState<TD[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    tdService.getTDs().then(all => {
      // Filter for finished or paid TDs
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
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-sky-900">Paiements des TD</h1>
          <p className="text-xl font-normal text-gray-600">Suivez et validez les paiements des séances terminées</p>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard label="A payer" value={tds.filter(t => t.status === 'terminé').length.toString()} icon={Wallet} variant="orange" trend="En attente" staggerIndex={0} />
          <StatCard label="Total Payé" value={tds.filter(t => t.status === 'payé').length.toString()} icon={Check} variant="green" trend="Effectué" staggerIndex={1} />
        </section>

        {/* Search */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-stone-100 flex items-center gap-4">
          <div className="flex-1 h-14 bg-slate-50 rounded-lg border border-neutral-200 flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-sky-900/10 transition-all">
            <Search className="text-neutral-400" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par matière ou classe..." 
              className="bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 w-full"
            />
          </div>
          <button className="h-14 px-6 bg-slate-50 border border-neutral-200 rounded-lg flex items-center gap-3 font-semibold text-black hover:bg-slate-100 transition-all">
            <Filter size={20} />
            Filtres
          </button>
        </section>

        {/* Table Area */}
        <section className="space-y-6">
           <AnimatePresence mode="wait">
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden"
             >
                <table className="w-full text-left">
                  <thead className="bg-[#F4FAFD]">
                    <tr>
                      <th className="px-8 py-5 text-sky-900 text-xl font-semibold">Matière</th>
                      <th className="px-6 py-5 text-sky-900 text-xl font-semibold text-center">Statut</th>
                      <th className="px-6 py-5 text-sky-900 text-xl font-semibold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredTDs.length > 0 ? (
                      filteredTDs.map((td, idx) => (
                        <tr key={td.id || idx} className="hover:bg-slate-50 transition-colors h-20">
                          <td className="px-8 py-4">
                            <div className="flex flex-col">
                              <span className="text-xl font-bold text-black">{td.subject}</span>
                              <span className="text-sm text-gray-500">{td.classe} • {td.date}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                              td.status === 'payé' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {td.status === 'payé' ? 'Payé' : 'À Payer'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              {td.status === 'terminé' && (
                                <button
                                  onClick={async () => {
                                    const ok = await confirm({
                                      title: "Valider ce paiement ?",
                                      description: `Confirmer le paiement pour la séance de ${td.subject} (${td.classe}). L'enseignant sera informé.`,
                                      confirmLabel: "Oui, valider",
                                      variant: "success",
                                    });
                                    if (ok) handleStatusUpdate(td.id, 'payé');
                                  }}
                                  className="px-6 py-3 bg-sky-900 text-white rounded-xl font-bold font-montserrat shadow-md hover:bg-sky-950 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                                >
                                  <Check size={18} />
                                  Valider Paiement
                                </button>
                              )}
                              {td.status === 'payé' && (
                                <span className="text-green-600 font-bold flex items-center gap-2">
                                  <Check size={18} />
                                  Confirmé
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-20 text-center">
                           <div className="flex flex-col items-center gap-4 text-gray-400">
                             <SearchSlash size={48} />
                             <p className="text-xl font-medium">Aucun paiement trouvé</p>
                           </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </motion.div>
           </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
