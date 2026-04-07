"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Plus, Pencil, Trash2, Clock, 
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import { scheduleService } from '@/services/schedule.service';
import { Schedule } from '@/types/schedule.types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function HorairesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await scheduleService.getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    setIsSubmiting(true);
    try {
      await scheduleService.createSchedule(newDate);
      setNewDate('');
      await fetchSchedules();
    } catch (error) {
      console.error('Error creating schedule:', error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setEditDate(schedule.date);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editDate) return;
    setIsSubmiting(true);
    try {
      await scheduleService.updateSchedule(editingId, editDate);
      setEditingId(null);
      await fetchSchedules();
    } catch (error) {
      console.error('Error updating schedule:', error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette date ?')) return;
    try {
      await scheduleService.deleteSchedule(id);
      await fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div className="p-10 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-black font-montserrat tracking-tight">Gestion des Horaires</h1>
          <p className="text-xl font-normal text-black/60 font-montserrat">Planifiez et gérez les dates disponibles pour les séances de TD</p>
        </header>

        {/* Stats Section */}
        {/* <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Total Dates" 
            value={schedules.length.toString()} 
            icon={Calendar} 
            variant="green" 
            trend={schedules.length > 0 ? "Actualisé" : "Initialisé"} 
            staggerIndex={0} 
          />
          <StatCard 
            label="Prochainement" 
            value={schedules.filter(s => new Date(s.date) > new Date()).length.toString()} 
            icon={Clock} 
            variant="sky" 
            trend="Dates à venir" 
            staggerIndex={1} 
          />
        </section> */}

        {/* Form Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-stone-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sky-900">
              <Plus size={20} />
            </div>
            <h2 className="text-xl text-black font-semibold font-montserrat">Ajouter une nouvelle date</h2>
          </div>
          
          <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-6">
            <div className="flex-1 min-w-[300px] space-y-2">
              <label className="text-xl font-semibold text-black/60 font-montserrat">Date de la séance</label>
              <div className="h-14 bg-gray-50 rounded-lg border border-neutral-200 flex items-center px-4 focus-within:border-sky-900 focus-within:ring-1 focus-within:ring-sky-900 transition-all">
                <Calendar className="text-neutral-400 mr-3" size={20} />
                <input 
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-xl text-black/40 font-semibold"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={isSubmiting || !newDate}
              className="h-14 px-8 bg-sky-900 text-white rounded-lg font-semibold hover:bg-sky-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-sky-900/10"
            >
              {isSubmiting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
              Ajouter la date
            </button>
          </form>
        </motion.section>

        {/* Table Section */}
        <section className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="p-8 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-2xl text-black font-semibold font-montserrat">Calendrier des dates</h2>
            <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              {schedules.length} {schedules.length > 1 ? 'dates enregistrées' : 'date enregistrée'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-sky-900/5 h-20 border-b border-stone-100">
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">ID</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">Date prévue</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-left">Date de création</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat tracking-tight text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                <AnimatePresence mode="popLayout">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="animate-spin text-sky-900" size={40} />
                          <p className="text-gray-500 font-medium">Chargement des données...</p>
                        </div>
                      </td>
                    </tr>
                  ) : schedules.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-3 opacity-40">
                          <Plus size={48} />
                          <p className="text-lg font-medium">Aucune date ajoutée pour le moment</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    schedules.map((schedule) => (
                      <motion.tr 
                        key={schedule.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-sky-50/30 transition-colors group"
                      >
                        <td className="px-8 py-6 font-mono text-sm text-gray-400">#{schedule.id}</td>
                        <td className="px-8 py-6">
                          {editingId === schedule.id ? (
                            <div className="flex items-center gap-2">
                              <input 
                                type="date" 
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="bg-white border border-neutral-300 rounded px-2 py-1 text-sm outline-none focus:border-sky-900"
                              />
                              <button onClick={handleUpdate} className="p-1 text-green-600 hover:bg-green-50 rounded">
                                <CheckCircle2 size={18} />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <AlertCircle size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-900 shrink-0">
                                <Calendar size={14} />
                              </div>
                              <span className="font-semibold text-gray-800">
                                {format(new Date(schedule.date), 'EEEE dd MMMM yyyy', { locale: fr })}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-6 text-gray-500 text-sm">
                          {format(new Date(schedule.createdAt), 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-3 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(schedule)}
                              className="p-2 text-white bg-sky-900 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Pencil size={18} />
                            </button>
                            <button 
                              onClick={() => handleDelete(schedule.id)}
                              className="p-2 text-white bg-red-600 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>
    </div>
  );
}
