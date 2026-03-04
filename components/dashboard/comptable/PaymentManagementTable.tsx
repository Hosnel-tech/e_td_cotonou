"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const payments = [
  { id: 1, teacher: 'VIGAN Pauline', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '40. 000', status: 'Terminé', action: 'Payé' },
  { id: 2, teacher: 'Jean KOUASSI', subject: 'Math', grade: 'CM2', date: '12/11/25', duration: '1h', amount: '50. 000', status: 'Terminé', action: 'Payé' },
  { id: 3, teacher: 'Paul ARNEAU', subject: 'Philosophie', grade: 'Tle', date: '12/11/25', duration: '4h', amount: '150. 000', status: 'Terminé', action: 'Payé' },
  { id: 4, teacher: 'DOUKPO Rose', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '65. 000', status: 'Terminé', action: 'Payé' },
];

export default function PaymentManagementTable() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]"
    >
      <div className="p-8">
        <h2 className="text-black text-2xl font-semibold font-montserrat mb-8">Paiements en attente</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-900/5 h-16">
                <th className="px-6 py-4 text-left first:rounded-l-lg w-16">
                  <div className="w-7 h-7 bg-white rounded-[5px] border-[0.83px] border-sky-900 flex items-center justify-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                  </div>
                </th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Enseignant</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Matières</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Classe</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Date</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Durée</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Montant</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Statut</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center last:rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {payments.map((payment, idx) => (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className="group hover:bg-slate-50 transition-colors h-16"
                >
                  <td className="px-6 py-4">
                    <div className="w-7 h-7 bg-white rounded-[5px] border-[0.83px] border-sky-900 flex items-center justify-center cursor-pointer">
                      <input type="checkbox" className="sr-only" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat whitespace-nowrap">{payment.teacher}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">{payment.subject}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">{payment.grade}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">{payment.date}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">{payment.duration}</td>
                  <td className="px-6 py-4 text-black text-xl font-semibold font-montserrat">{payment.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3.5 py-1.5 bg-green-800 rounded-2xl text-white text-xs font-medium font-montserrat inline-block">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-1.5 bg-sky-900 rounded-[5px] text-white text-xs font-medium font-montserrat hover:bg-sky-950 transition-colors">
                      {payment.action}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer / Summary & Pagination */}
      <div className="p-8 border-t border-stone-100 flex items-center justify-between">
        <span className="text-black text-2xl font-normal font-montserrat">Total 0</span>
        
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
    </motion.section>
  );
}
