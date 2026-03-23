"use client";

import { motion } from 'framer-motion';
import { Eye, Check, X } from 'lucide-react';
import { Teacher } from '@/types/user.types';

interface TeacherTableProps {
  teachers: Teacher[];
  onView?: (teacher: Teacher) => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function TeacherTable({ 
  teachers, 
  onView,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: TeacherTableProps) {
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
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Enseignant</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Matières</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Classe</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Date</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Statut</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Etablissement</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {teachers.map((teacher, idx) => {
            const isPending = teacher.status === 'en attente';
            const selected = isSelected(teacher.id);

            return (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={teacher.id} 
                className={`h-20 hover:bg-slate-50 transition-colors group cursor-pointer ${
                  selected ? 'bg-sky-900/[0.03]' : ''
                }`} 
                onClick={(e) => toggleSelectOne(teacher.id, e.shiftKey)}
              >
                <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                  <div 
                    onClick={(e) => toggleSelectOne(teacher.id, e.shiftKey)}
                    className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all ${
                      selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'
                    }`}
                  >
                    {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                  </div>
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal">{teacher.name}</td>
                <td className="px-6 py-4 text-black text-xl font-medium">{teacher.subject}</td>
                <td className="px-6 py-4 text-black text-xl font-normal text-center">{teacher.className}</td>
                <td className="px-6 py-4 text-black text-xl font-normal">{teacher.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-5 py-2 rounded-2xl text-[10px] font-bold inline-block min-w-[100px] text-center uppercase shadow-sm border ${
                    teacher.status === 'actif'      ? 'bg-green-800 text-white' :
                    teacher.status === 'en attente' ? 'bg-amber-400 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {teacher.status === 'actif'      ? 'Actif' :
                     teacher.status === 'en attente' ? 'En attente' :
                     'Rejeté'}
                  </span>
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal italic opacity-80">{teacher.school}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={!isPending}
                      className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md ${
                        isPending
                          ? 'bg-green-800 text-white hover:bg-green-900 hover:scale-105'
                          : 'bg-green-800/25 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      <Check size={20} strokeWidth={3} />
                    </button>
                    <button
                      disabled={!isPending}
                      className={`w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md ${
                        isPending
                          ? 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
                          : 'bg-red-600/25 text-white/50 cursor-not-allowed'
                      }`}
                    >
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => onView?.(teacher)} 
                      className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 transition-all shadow-md hover:scale-105"
                    >
                      <Eye size={20} strokeWidth={2.5} />
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
