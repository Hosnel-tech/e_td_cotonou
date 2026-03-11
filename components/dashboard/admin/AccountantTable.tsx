"use client";

import { motion } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';

export interface Accountant {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  status: 'actif' | 'inactif';
}

interface AccountantTableProps {
  accountants: Accountant[];
  onView: (accountant: Accountant) => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string) => void;
  isAllSelected: boolean;
  toggleSelectAll: () => void;
}

export default function AccountantTable({ 
  accountants, 
  onView,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  toggleSelectAll
}: AccountantTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[1100px]">
        <thead>
          <tr className="bg-sky-900/5 h-20">
            <th className="pl-8 w-20">
              <div 
                onClick={toggleSelectAll}
                className="w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 bg-white cursor-pointer flex items-center justify-center transition-all active:scale-95"
              >
                {isAllSelected && <div className="w-4 h-4 bg-sky-900 rounded-[2px]" />}
              </div>
            </th>
            <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Nom</th>
            <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Prénoms</th>
            <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Email</th>
            <th className="text-sky-900 text-xl font-semibold px-4 font-montserrat">Phone</th>
            <th className="text-sky-900 text-xl font-semibold px-4 text-center font-montserrat">Statut</th>
            <th className="text-sky-900 text-xl font-semibold px-4 text-center font-montserrat">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-300">
          {accountants.map((accountant, idx) => (
            <motion.tr
              key={accountant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="h-20 hover:bg-slate-50 transition-colors group"
            >
              <td className="pl-8">
                <div 
                  onClick={() => toggleSelectOne(accountant.id)}
                  className="w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 bg-white group-hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center active:scale-95"
                >
                  {isSelected(accountant.id) && <div className="w-4 h-4 bg-sky-900 rounded-[2px]" />}
                </div>
              </td>
              <td className="text-black text-xl font-normal px-4 font-montserrat">
                {accountant.lastName}
              </td>
              <td className="text-black text-xl font-normal px-4 font-montserrat">
                {accountant.firstName}
              </td>
              <td className="text-black text-xl font-normal px-4 font-montserrat">
                {accountant.email}
              </td>
              <td className="text-black text-xl font-normal px-4 font-montserrat text-nowrap">
                {accountant.phone}
              </td>
              <td className="px-4 text-center">
                <span className={`px-4 py-1.5 rounded-2xl text-white text-xs font-medium font-montserrat inline-block min-w-[80px] ${
                  accountant.status === 'actif' ? 'bg-sky-900' : 'bg-red-600'
                }`}>
                  {accountant.status}
                </span>
              </td>
              <td className="px-4 text-center">
                <div className="flex items-center justify-center gap-3">
                  <button className="p-2 bg-red-600 rounded-[5px] text-white hover:bg-red-700 transition-all hover:scale-110 shadow-sm">
                    <Trash2 size={20} />
                  </button>
                  <button 
                    onClick={() => onView(accountant)}
                    className="p-2 bg-sky-900 rounded-[5px] text-white hover:bg-sky-950 transition-all hover:scale-110 shadow-sm"
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
