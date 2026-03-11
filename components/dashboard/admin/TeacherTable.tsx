import { motion } from 'framer-motion';
import { Eye, Check, X } from 'lucide-react';

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  className: string;
  date: string;
  status: 'actif' | 'en attente';
  school: string;
}

interface TeacherTableProps {
  teachers: Teacher[];
  onView?: (teacher: Teacher) => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string) => void;
  isAllSelected: boolean;
  toggleSelectAll: () => void;
}

export default function TeacherTable({ 
  teachers, 
  onView,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  toggleSelectAll
}: TeacherTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-sky-900/5 h-16">
            <th className="pl-8 w-20">
              <div 
                onClick={toggleSelectAll}
                className="w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 bg-white cursor-pointer flex items-center justify-center transition-all active:scale-95"
              >
                {isAllSelected && <div className="w-4 h-4 bg-sky-900 rounded-[2px]" />}
              </div>
            </th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Enseignant</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Matières</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Classe</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Date</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Statut</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Etablissement</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-300">
          {teachers.map((teacher, idx) => {
            const isPending = teacher.status === 'en attente';
            return (
              <motion.tr
                key={teacher.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="group hover:bg-slate-50 transition-colors h-16"
              >
                <td className="pl-8">
                  <div 
                    onClick={() => toggleSelectOne(teacher.id)}
                    className="w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 bg-white group-hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center active:scale-95"
                  >
                    {isSelected(teacher.id) && <div className="w-4 h-4 bg-sky-900 rounded-[2px]" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                  {teacher.subject}
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                  {teacher.className}
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                  {teacher.date}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3.5 py-1.5 rounded-2xl text-white text-xs font-semibold font-montserrat inline-block min-w-[100px] text-center shadow-sm ${
                    teacher.status === 'actif' ? 'bg-green-800' : 'bg-amber-400'
                  }`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                  {teacher.school}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
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
                      className="w-9 h-9 bg-sky-900 text-white rounded-[5px] flex items-center justify-center hover:bg-sky-950 hover:scale-105 transition-all shadow-md"
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
