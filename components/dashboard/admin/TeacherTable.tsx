"use client";

import { motion } from 'framer-motion';
import { Eye, Check, X, SearchX } from 'lucide-react';
import { Teacher } from '@/types/user.types';
import { useConfirm } from '@/hooks/useConfirm';

interface TeacherTableProps {
  teachers: Teacher[];
  onView?: (teacher: Teacher) => void;
  onStatusUpdate?: (id: string, status: 'actif' | 'rejeté' | 'inactif') => void;
  isSelected: (id: string) => boolean;
  toggleSelectOne: (id: string, isShift?: boolean) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  toggleSelectAll: () => void;
}

export default function TeacherTable({ 
  teachers, 
  onView,
  onStatusUpdate,
  isSelected,
  toggleSelectOne,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll
}: TeacherTableProps) {
  const confirm = useConfirm();
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
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Niveau</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Date</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Statut</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight">Etablissement</th>
            <th className="px-6 py-4 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {teachers.length > 0 ? (
            teachers.map((teacher, idx) => {
              const isPending = teacher.status === 'en attente';
              const selected = isSelected(teacher.id);

              return (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={teacher.id} 
                  className={`h-20 hover:bg-slate-50 transition-colors group ${
                    selected ? 'bg-sky-900/[0.03]' : ''
                  }`} 
                  onClick={(e) => toggleSelectOne(teacher.id, e.shiftKey)}
                >
                  <td className="pl-8" onClick={(e) => e.stopPropagation()}>
                    <div 
                      onClick={(e) => toggleSelectOne(teacher.id, e.shiftKey)}
                      className={`w-7 h-7 rounded-[5px] border-[1.67px] border-sky-900 flex items-center justify-center transition-all cursor-pointer ${
                        selected ? 'bg-sky-900' : 'bg-white group-hover:bg-gray-50'
                      }`}
                    >
                      {selected && <Check className="text-white" size={18} strokeWidth={4} />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-normal">{teacher.name}</td>
                  <td className="px-6 py-4 text-black text-xl font-medium">{teacher.subject}</td>
                  <td className="px-6 py-4 text-black text-xl font-normal text-center">{teacher.className}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase ${
                      teacher.niveau === 'primaire' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {teacher.niveau}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-normal">{new Date(teacher.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-5 py-2 rounded-2xl text-[10px] font-bold inline-block min-w-[100px] text-center uppercase shadow-sm border ${
                      teacher.status === 'actif'      ? 'bg-green-800 text-white border-green-900' :
                      teacher.status === 'en attente' ? 'bg-amber-400 text-white border-amber-500' :
                      teacher.status === 'inactif'    ? 'bg-gray-500 text-white border-gray-600' :
                      'bg-red-600 text-white border-red-700'
                    }`}>
                      {teacher.status === 'actif'      ? 'Actif' :
                       teacher.status === 'en attente' ? 'En attente' :
                       teacher.status === 'inactif'    ? 'Inactif' :
                       'Rejeté'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-black text-xl font-normal italic opacity-80">{teacher.school}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                      {teacher.status === 'en attente' ? (
                        <>
                          <button
                            onClick={async () => {
                              const ok = await confirm({
                                title: "Valider cet enseignant ?",
                                description: `Activer le compte de ${teacher.name} lui donnera accès au tableau de bord. Il sera notifié.`,
                                confirmLabel: "Oui, activer",
                                variant: "success",
                              });
                              if (ok) onStatusUpdate?.(teacher.id, 'actif');
                            }}
                            className="w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md bg-green-800 text-white hover:bg-green-900 hover:scale-105 cursor-pointer"
                            title="Valider l'enseignant"
                          >
                            <Check size={20} strokeWidth={3} />
                          </button>
                          <button
                            onClick={async () => {
                              const ok = await confirm({
                                title: "Rejeter cette demande ?",
                                description: `Rejeter la demande de ${teacher.name}. Il sera notifié du refus.`,
                                confirmLabel: "Oui, rejeter",
                                variant: "danger",
                              });
                              if (ok) onStatusUpdate?.(teacher.id, 'rejeté');
                            }}
                            className="w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md bg-red-600 text-white hover:bg-red-700 hover:scale-105 cursor-pointer"
                            title="Rejeter la demande"
                          >
                            <X size={20} strokeWidth={3} />
                          </button>
                        </>
                      ) : teacher.status === 'actif' ? (
                        <button
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Désactiver ce compte ?",
                              description: `${teacher.name} n'aura plus accès à la plateforme.`,
                              confirmLabel: "Oui, désactiver",
                              variant: "warning",
                            });
                            if (ok) onStatusUpdate?.(teacher.id, 'inactif');
                          }}
                          className="w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md bg-gray-500 text-white hover:bg-gray-600 hover:scale-105 cursor-pointer"
                          title="Désactiver le compte"
                        >
                          <X size={20} strokeWidth={3} />
                        </button>
                      ) : teacher.status === 'inactif' || teacher.status === 'rejeté' ? (
                        <button
                          onClick={async () => {
                            const ok = await confirm({
                              title: "Réactiver ce compte ?",
                              description: `${teacher.name} retrouvera l'accès à la plateforme.`,
                              confirmLabel: "Oui, réactiver",
                              variant: "info",
                            });
                            if (ok) onStatusUpdate?.(teacher.id, 'actif');
                          }}
                          className="w-9 h-9 rounded-[5px] flex items-center justify-center transition-all shadow-md bg-sky-900 text-white hover:bg-sky-950 hover:scale-105 cursor-pointer"
                          title="Réactiver le compte"
                        >
                          <Check size={20} strokeWidth={3} />
                        </button>
                      ) : null}
                      
                      <button 
                        onClick={() => onView?.(teacher)} 
                        className="w-9 h-9 bg-stone-100 text-sky-900 rounded-[5px] flex items-center justify-center hover:bg-stone-200 transition-all shadow-sm hover:scale-105 cursor-pointer"
                        title="Voir les détails"
                      >
                        <Eye size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={9} className="py-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center gap-5"
                >
                  <div className="w-24 h-24 bg-sky-50 rounded-full flex items-center justify-center text-sky-900/20">
                    <SearchX size={56} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-sky-900 font-montserrat tracking-tight">Aucun enseignant</h4>
                    <p className="text-xl text-stone-400 font-montserrat tracking-tight">Il n'y a actuellement aucun enseignant inscrit dans la base de données.</p>
                  </div>
                </motion.div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
