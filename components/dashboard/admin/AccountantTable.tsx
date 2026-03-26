"use client";

import { motion } from 'framer-motion';
import { Eye, Check, X, SearchX } from 'lucide-react';
import { Accountant } from '@/types/user.types';
import { useConfirm } from '@/hooks/useConfirm';

interface AccountantTableProps {
  accountants: Accountant[];
  onView: (accountant: Accountant) => void;
  onStatusUpdate?: (id: string, status: 'actif' | 'inactif') => void;
  onDelete?: (id: string) => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function AccountantTable({ 
  accountants, 
  onView,
  onStatusUpdate,
  onDelete,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: AccountantTableProps) {
  const confirm = useConfirm();
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[1000px]">
        <thead>
          <tr className="bg-sky-900/5 h-20">
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
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Comptable</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Email</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Téléphone</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Statut</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {accountants.length > 0 ? (
            accountants.map((accountant, idx) => {
              const selected = isSelected(accountant.id);

              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={accountant.id} 
                  className={`h-20 hover:bg-slate-50 transition-colors group cursor-pointer ${
                    selected ? 'bg-sky-900/[0.03]' : ''
                  }`} 
                  onClick={(e) => toggleSelectOne(accountant.id, e.shiftKey)}
                >
                  <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                    <div 
                      onClick={(e) => toggleSelectOne(accountant.id, e.shiftKey)}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${
                        selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'
                      }`}
                    >
                      {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-normal">
                    {accountant.lastName} {accountant.firstName}
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-medium">{accountant.email}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal">{accountant.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-bold inline-block min-w-[100px] text-center uppercase shadow-sm border ${
                      accountant.status === 'actif' ? 'bg-green-800 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {accountant.status === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                      {accountant.status === 'actif' ? (
                        <button
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Désactiver ce comptable ?",
                              description: `Le comptable ${accountant.lastName} ${accountant.firstName} n'aura plus accès à la plateforme.`,
                              confirmLabel: "Oui, désactiver",
                              variant: "warning",
                            });
                            if (ok) onStatusUpdate?.(accountant.id, 'inactif');
                          }}
                          className="w-9 h-9 bg-amber-400 text-white rounded-[5px] flex items-center justify-center hover:bg-amber-500 transition-all shadow-md hover:scale-105 cursor-pointer"
                          title="Désactiver le compte"
                        >
                          <X size={18} strokeWidth={2.5} />
                        </button>
                      ) : (
                        <button
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Activer ce comptable ?",
                              description: `Le comptable ${accountant.lastName} ${accountant.firstName} retrouvera l'accès à la plateforme.`,
                              confirmLabel: "Oui, activer",
                              variant: "success",
                            });
                            if (ok) onStatusUpdate?.(accountant.id, 'actif');
                          }}
                          className="w-9 h-9 bg-green-800 text-white rounded-[5px] flex items-center justify-center hover:bg-green-900 transition-all shadow-md hover:scale-105 cursor-pointer"
                          title="Activer le compte"
                        >
                          <Check size={18} strokeWidth={2.5} />
                        </button>
                      )}

                      <button 
                        onClick={() => onView(accountant)} 
                        className="w-9 h-9 bg-stone-100 text-sky-900 rounded-[5px] flex items-center justify-center hover:bg-stone-200 transition-all shadow-sm hover:scale-105 cursor-pointer"
                        title="Voir les détails"
                      >
                        <Eye size={20} strokeWidth={2.5} />
                      </button>
                      
                      <button
                        onClick={async () => {
                          const ok = await confirm({
                            title: "Supprimer ce comptable ?",
                            description: `Cette action est irréversible. Toutes les données de ${accountant.lastName} ${accountant.firstName} seront effacées.`,
                            confirmLabel: "Oui, supprimer",
                            variant: "danger",
                          });
                          if (ok) onDelete?.(accountant.id);
                        }}
                        className="w-9 h-9 bg-red-600/10 text-red-600 rounded-[5px] flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm cursor-pointer"
                        title="Supprimer le compte"
                      >
                        <X size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="py-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-900/20">
                    <SearchX size={56} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">Aucun comptable</h4>
                    <p className="text-xl text-stone-400 font-montserrat tracking-tight">Il n'y a actuellement aucun comptable enregistré.</p>
                  </div>
                </motion.div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
