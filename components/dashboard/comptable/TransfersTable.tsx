"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';
import AdminTDDetailsModal from '@/components/dashboard/admin/AdminTDDetailsModal';
import { Transfer } from '@/types/financial.types';
import { TD } from '@/types/td.types';

interface TransfersTableProps {
  transfers: Transfer[];
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function TransfersTable({
  transfers,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: TransfersTableProps) {
  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]"
    >
      <div className="p-8">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-black text-2xl font-bold font-montserrat tracking-tight">Virements</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sky-900/5 h-20">
              <tr>
                <th className="pl-8 w-20">
                  <div 
                    onClick={toggleSelectAll}
                    className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'}`}
                  >
                    {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                    {!isAllSelected && isIndeterminate && <div className="w-3 h-0.5 bg-white rounded-full" />}
                  </div>
                </th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Banque</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Montant total</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-right last:rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {transfers.map((transfer, idx) => {
                const selected = isSelected(transfer.id);
                return (
                  <motion.tr 
                    key={transfer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (idx * 0.1) }}
                    className={`h-20 transition-colors group cursor-pointer ${selected ? 'bg-sky-900/[0.03]' : 'hover:bg-gray-50/50'}`}
                    onClick={(e) => toggleSelectOne(transfer.id, e.shiftKey)}
                  >
                    <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                      <div 
                        onClick={(e) => toggleSelectOne(transfer.id, e.shiftKey)}
                        className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'}`}
                      >
                        {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                      </div>
                    </td>
                    <td className="text-black text-xl font-normal px-4 font-montserrat whitespace-nowrap">{transfer.bank}</td>
                    <td className="text-black text-xl font-semibold px-4 font-montserrat">{transfer.amount}</td>
                    <td className="px-4 text-right">
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            alert('Exportation du virement (' + transfer.bank + ') au format CSV...');
                          }}
                          className="px-5 py-2 bg-green-800 rounded-md text-white text-xs font-semibold font-montserrat hover:bg-green-900 transition-all shadow-md active:scale-95 whitespace-nowrap"
                        >
                          Exporter (.CSV)
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-8 border-t border-stone-100 flex items-center justify-between">
        <span className="text-black text-2xl font-normal font-montserrat">Total {transfers.length}</span>
      </div>

      <AdminTDDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedTD} 
      />
    </motion.section>
  );
}
