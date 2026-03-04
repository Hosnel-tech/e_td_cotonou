"use client";

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const payments = [
  { id: 1, teacher: 'VIGAN Pauline', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '40. 000', status: 'Terminé', action: 'Payé' },
  { id: 2, teacher: 'Jean KOUASSI', subject: 'Math', grade: 'CM2', date: '12/11/25', duration: '1h', amount: '50. 000', status: 'Terminé', action: 'Payé' },
  { id: 3, teacher: 'Paul ARNEAU', subject: 'Philosophie', grade: 'Tle', date: '12/11/25', duration: '4h', amount: '150. 000', status: 'Terminé', action: 'Payé' },
  { id: 4, teacher: 'DOUKPO Rose', subject: 'Anglais', grade: '3ème', date: '12/11/25', duration: '3h', amount: '65. 000', status: 'Terminé', action: 'Payé' },
];

export default function PendingPaymentsTable() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 mt-8"
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-black text-2xl font-semibold font-montserrat">Paiements en attente</h2>
        <div className="px-3 py-1 bg-sky-900/10 rounded-2xl flex items-center justify-center">
          <span className="text-sky-900 text-xl font-semibold font-montserrat">14</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-sky-900/5 h-16">
              <th className="px-6 py-4 text-left first:rounded-l-lg">
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
                transition={{ delay: 0.8 + (idx * 0.1) }}
                className="group hover:bg-slate-50 transition-colors h-16"
              >
                <td className="px-6 py-4">
                  <div className="w-7 h-7 bg-white rounded-[5px] border-[0.83px] border-sky-900 flex items-center justify-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                  </div>
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">{payment.teacher}</td>
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
                  <button className="px-3 py-1.5 bg-sky-900 rounded-[5px] text-white text-xs font-medium font-montserrat hover:bg-sky-950 transition-colors">
                    {payment.action}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-12 pb-4">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#0c3a5e' }}
          whileTap={{ scale: 0.95 }}
          className="w-[510px] h-14 bg-sky-900 rounded-[10px] flex items-center justify-center gap-2.5 text-white text-xl font-medium font-inter shadow-lg group transition-colors"
        >
          Accédez à tous les paiements
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.section>
  );
}
