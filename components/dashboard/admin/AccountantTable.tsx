"use client";

import { motion } from 'framer-motion';
import { Eye, Check, X } from 'lucide-react';

export interface Accountant {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  status: 'actif' | 'inactif';
  birthDate: string;
  nationality: string;
  location: string;
  ifu: string;
  bankAccount: string;
  bankName: string;
}

interface AccountantTableProps {
  accountants: Accountant[];
  onView: (accountant: Accountant) => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function AccountantTable({ 
  accountants, 
  onView,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: AccountantTableProps) {
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
          {accountants.map((accountant, idx) => {
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
                    <button 
                      onClick={() => onView(accountant)} 
                      className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-all shadow-md hover:scale-105"
                    >
                      <Eye size={20} strokeWidth={2.5} />
                    </button>
                    <button
                      className="w-9 h-9 bg-[#EE2E33] text-white rounded-[5px] flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
