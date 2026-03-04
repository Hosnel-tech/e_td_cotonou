"use client";

import { motion } from 'framer-motion';

const transfers = [
  { id: 1, bank: 'BOA', amount: '1.500.000 F FCFA' },
  { id: 2, bank: 'ECOBANK', amount: '1.500.000 F FCFA' },
  { id: 3, bank: 'BIIC', amount: '1.500.000 F FCFA' },
  { id: 4, bank: 'UBA', amount: '1.500.000 F FCFA' },
];

export default function TransfersTable() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)]"
    >
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-black text-2xl font-semibold font-montserrat">Virements</h2>
          <span className="px-3 py-1 bg-sky-900/10 rounded-2xl text-sky-900 text-xl font-semibold font-montserrat">
            14 trouvés
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-900/5 h-16">
                <th className="px-6 py-4 text-left first:rounded-l-lg w-16">
                  <div className="w-7 h-7 bg-white rounded-[5px] border-[0.83px] border-sky-900 flex items-center justify-center cursor-pointer">
                    <input type="checkbox" className="sr-only" />
                  </div>
                </th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Banque</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-left">Montant total</th>
                <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-right last:rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {transfers.map((transfer, idx) => (
                <motion.tr 
                  key={transfer.id}
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
                  <td className="px-6 py-4 text-black text-xl font-normal font-montserrat whitespace-nowrap">{transfer.bank}</td>
                  <td className="px-6 py-4 text-black text-xl font-semibold font-montserrat">{transfer.amount}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 bg-green-800 rounded-md text-white text-sm font-medium font-montserrat hover:bg-green-900 transition-colors shadow-sm">
                      Exporter (.CSV)
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
}
