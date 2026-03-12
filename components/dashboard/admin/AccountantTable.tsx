"use client";

import { motion } from 'framer-motion';
import { Eye, Check } from 'lucide-react';

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
      <table className="w-full text-left">
        <thead>
          <tr className="bg-sky-900/5 h-16">
            <th className="pl-8 w-20">
              <div onClick={toggleSelectAll} className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 cursor-pointer flex items-center justify-center transition-all ${isAllSelected ? 'bg-sky-900' : isIndeterminate ? 'bg-sky-900/40' : 'bg-white'}`}>
                {isAllSelected && <Check className="text-white" size={18} strokeWidth={4} />}
              </div>
            </th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold">Nom</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold">Email</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {accountants.map((accountant, idx) => (
            <tr key={accountant.id} className={`h-20 hover:bg-slate-50 transition-colors cursor-pointer ${isSelected(accountant.id) ? 'bg-sky-900/[0.03]' : ''}`} onClick={() => toggleSelectOne(accountant.id)}>
              <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                <div className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${isSelected(accountant.id) ? 'bg-sky-900' : 'bg-white'}`}>
                  {isSelected(accountant.id) && <Check className="text-white" size={18} strokeWidth={4} />}
                </div>
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal">{accountant.lastName} {accountant.firstName}</td>
              <td className="px-6 py-4 text-black text-xl font-normal">{accountant.email}</td>
              <td className="px-6 py-4 text-center">
                 <button onClick={(e) => { e.stopPropagation(); onView(accountant); }} className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-all"><Eye size={20} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
