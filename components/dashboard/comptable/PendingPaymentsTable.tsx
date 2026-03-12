"use client";

import { motion } from 'framer-motion';
import { ChevronRight, Check, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSelection } from '@/hooks/useSelection';
import AdminTDDetailsModal, { AdminTDDetailsData } from '@/components/dashboard/admin/AdminTDDetailsModal';

export const PENDING_PAYMENTS_DATA = [
  { id: '1', teacher: 'VIGAN Pauline', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '40. 000', status: 'Terminé' },
  { id: '2', teacher: 'Jean KOUASSI', subject: 'Math', grade: 'CM2', date: '12/11/25', duration: '1h', amount: '50. 000', status: 'Terminé' },
  { id: '3', teacher: 'Paul ARNEAU', subject: 'Philosophie', grade: 'Tle', date: '12/11/25', duration: '4h', amount: '150. 000', status: 'Terminé' },
  { id: '4', teacher: 'DOUKPO Rose', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '65. 000', status: 'Terminé' },
];

interface PendingPaymentsTableProps {
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function PendingPaymentsTable({
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: PendingPaymentsTableProps) {
  const [selectedTD, setSelectedTD] = useState<AdminTDDetailsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (payment: any) => {
    setSelectedTD({
      subject: payment.subject,
      teacher: payment.teacher,
      classe: payment.grade,
      date: payment.date,
      duration: payment.duration,
      time: '08:00 - 11:00', // Mocking time
      status: 'terminé', // Mocking status for details view
    });
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8"
    >
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-black text-2xl font-bold font-montserrat tracking-tight">Paiements en attente</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-sky-900/5 h-20">
            <tr>
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
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Enseignant</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Matières</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Classe</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Date</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Durée</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Montant</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center">Statut</th>
              <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-300">
            {PENDING_PAYMENTS_DATA.map((payment, idx) => {
              const selected = isSelected(payment.id);
              return (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`h-20 transition-colors group cursor-pointer ${
                    selected ? 'bg-sky-900/[0.03]' : 'hover:bg-gray-50/50'
                  }`}
                  onClick={(e) => toggleSelectOne(payment.id, e.shiftKey)}
                >
                  <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                    <div 
                      onClick={(e) => toggleSelectOne(payment.id, e.shiftKey)}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${
                        selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'
                      }`}
                    >
                      {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                    </div>
                  </td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">{payment.teacher}</td>
                  <td className="text-black text-xl font-medium px-4 font-montserrat">{payment.subject}</td>
                  <td className="text-black text-xl font-normal px-4 font-montserrat">{payment.grade}</td>
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
                        onClick={(e) => { e.stopPropagation(); alert('Paiement marqué comme effectué'); }}
                        className="px-5 py-2 bg-sky-900 rounded-[5px] text-white text-xs font-semibold font-montserrat hover:bg-sky-950 transition-all shadow-md active:scale-95 whitespace-nowrap"
                      >
                        Marquer payé
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-12 pb-4">
        <Link href="/comptable/paiements" className="w-full max-w-[510px]">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#072e4a' }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-sky-900 rounded-[10px] flex items-center justify-center gap-3 text-white text-xl font-semibold font-inter shadow-xl group transition-all"
          >
            Accéder à tous les paiements
            <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>

      <AdminTDDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedTD} 
      />
    </motion.section>
  );
}
