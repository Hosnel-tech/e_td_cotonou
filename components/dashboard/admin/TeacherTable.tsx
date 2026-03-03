"use client";

import { motion } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  className: string;
  date: string;
  status: 'actif' | 'inactif';
  school: string;
}

interface TeacherTableProps {
  teachers: Teacher[];
  onView?: (teacher: Teacher) => void;
}

export default function TeacherTable({ teachers, onView }: TeacherTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-sky-900/5 h-16">
            <th className="px-6 py-4 first:rounded-l-lg">
              <div className="w-7 h-7 flex items-center justify-center bg-white rounded-[5px] border-[0.83px] border-sky-900">
                <input type="checkbox" className="sr-only" />
              </div>
            </th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Enseignant</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Matières</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Classe</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Date</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center">Statut</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat">Etablissement</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat text-center last:rounded-r-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-300">
          {teachers.map((teacher, idx) => (
            <motion.tr
              key={teacher.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="group hover:bg-slate-50 transition-colors h-16"
            >
              <td className="px-6 py-4">
                <div className="w-7 h-7 flex items-center justify-center bg-white rounded-[5px] border-[0.83px] border-sky-900">
                  <input type="checkbox" className="sr-only" />
                </div>
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                {teacher.name}
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal font-montserrat text-center">
                {teacher.subject}
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal font-montserrat text-center">
                {teacher.className}
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal font-montserrat text-center">
                {teacher.date}
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`px-3.5 py-1.5 rounded-2xl text-white text-xs font-medium font-montserrat inline-block min-w-[70px] ${
                  teacher.status === 'actif' ? 'bg-sky-900' : 'bg-red-600'
                }`}>
                  {teacher.status}
                </span>
              </td>
              <td className="px-6 py-4 text-black text-xl font-normal font-montserrat">
                {teacher.school}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2.5">
                  <button className="p-1.5 bg-red-600 rounded-[5px] text-white hover:bg-red-700 transition-colors">
                    <Trash2 size={16} />
                  </button>
                  <button 
                    onClick={() => onView?.(teacher)}
                    className="p-1.5 bg-sky-900 rounded-[5px] text-white hover:bg-sky-950 transition-colors"
                  >
                    <Eye size={16} />
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
