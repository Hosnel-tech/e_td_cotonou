"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Eye } from 'lucide-react';
import { useState } from 'react';
import AdminTDDetailsModal from '@/components/dashboard/admin/AdminTDDetailsModal';
import { Payment } from '@/types/financial.types';
import { TD } from '@/types/td.types';

interface PaymentManagementTableProps {
  payments: Payment[];
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function PaymentManagementTable({
  payments,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: PaymentManagementTableProps) {
  const [selectedTD, setSelectedTD] = useState<TD | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (payment: Payment) => {
    setSelectedTD({
      id: payment.id,
      subject: payment.subject,
      teacher: payment.teacher,
      classe: payment.grade || 'N/A',
      date: payment.date,
      niveau: payment.niveau,
      duration: payment.duration,
      time: '08:00 - 11:00',
      status: 'terminé',
    });
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]"
    >
      <div className="p-8">
        <h2 className="text-black text-2xl font-bold font-montserrat tracking-tight mb-8">Paiements en attente</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-sky-900/5 h-20">
                <th className="pl-8 w-20">
                  <div 
                    onClick={toggleSelectAll}
                    className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'}`}
                  >
                    {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
                    {!isAllSelected && isIndeterminate && <div className="w-3 h-0.5 bg-white rounded-full" />}
                  </div>
                </th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Enseignant</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Matières</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Classe</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Niveau</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Date</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Durée</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Montant</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center">Statut</th>
                <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center last:rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {payments.map((payment, idx) => (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className={`h-20 transition-colors group cursor-pointer ${isSelected(payment.id) ? 'bg-sky-900/[0.03]' : 'hover:bg-slate-50'}`}
                  onClick={(e) => toggleSelectOne(payment.id, e.shiftKey)}
                >
                  <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                    <div 
                      onClick={(e) => toggleSelectOne(payment.id, e.shiftKey)}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${isSelected(payment.id) ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'}`}
                    >
                      {isSelected(payment.id) && <Check className="text-white" size={18} strokeWidth={4} />}
                    </div>
                  </td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat whitespace-nowrap">{payment.teacher}</td>
                  <td className="text-black text-xl font-medium px-4 font-montserrat">{payment.subject}</td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">{payment.grade}</td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      payment.niveau === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {payment.niveau}
                    </span>
                  </td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">{payment.date}</td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">{payment.duration}</td>
                  <td className="text-black text-xl font-bold px-4 font-montserrat">{payment.amount}</td>
                  <td className="px-4 text-center">
                    <span className="px-5 py-2 bg-green-800 rounded-2xl text-white text-xs font-semibold font-montserrat inline-block shadow-sm">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleOpenDetails(payment); }}
                        className="p-2 bg-slate-100 text-sky-900 rounded-md hover:bg-slate-200 transition-all active:scale-90"
                        title="Voir les détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          alert('Paiement marqué comme effectué'); 
                        }}
                        className="px-5 py-2 bg-sky-900 rounded-[5px] text-white text-xs font-semibold font-montserrat hover:bg-sky-950 transition-colors shadow-md active:scale-95 whitespace-nowrap"
                      >
                        {payment.action || 'Marquer payé'}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 border-t border-stone-100 flex items-center justify-between">
        <span className="text-black text-2xl font-normal font-montserrat">Total {payments.length}</span>
        
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center text-black hover:bg-slate-50 rounded-md transition-colors">
            <ChevronLeft size={28} />
          </button>
          
          <div className="flex items-center gap-2">
            <button className="w-12 h-12 flex items-center justify-center bg-white rounded-md border-[0.83px] border-green-800 text-green-800 text-2xl font-semibold font-montserrat hover:bg-green-50 transition-colors">
              1
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-green-800 rounded-md text-white text-2xl font-semibold font-montserrat shadow-lg shadow-green-800/20">
              2
            </button>
          </div>

          <button className="w-12 h-12 flex items-center justify-center text-black hover:bg-slate-50 rounded-md transition-colors">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      <AdminTDDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedTD} 
      />
    </motion.section>
  );
}
