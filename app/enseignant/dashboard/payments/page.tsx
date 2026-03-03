"use client";

import { motion } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';

const paymentData = [
  { id: 1, name: 'TD Anglais', classe: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 2, name: 'TD Français', classe: 'Tle', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 3, name: 'TD SVT', classe: '3ème', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
  { id: 4, name: 'TD EST', classe: 'CM2', date: '12/11/25', start: '14h', end: '17h', status: 'Payé', duration: '3h' },
];

export default function PaymentsPage() {
  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-8">
        
        {/* Page Header */}
        <header className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-semibold text-black font-montserrat"
          >
            Paiements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600 font-montserrat"
          >
            Gérez vos travaux dirigés et séances
          </motion.p>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard 
            label="Nombre total" 
            value="23" 
            icon={ClipboardList} 
            variant="green" 
            trend="12%"
            staggerIndex={0} 
          />
          <StatCard 
            label="En cours" 
            value="17" 
            icon={Clock} 
            variant="red" 
            trend="12%"
            trendUp={false}
            staggerIndex={1} 
          />
          <StatCard 
            label="Terminés" 
            value="13" 
            icon={CheckCircle2} 
            variant="orange" 
            trend="12%"
            staggerIndex={2} 
          />
          <StatCard 
            label="Payés" 
            value="10" 
            icon={Wallet} 
            variant="sky" 
            trend="12%"
            staggerIndex={3} 
          />
        </section>

        {/* Actions Bar */}
        <section className="flex flex-col xl:flex-row items-center gap-6">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-sky-900 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher....." 
              className="w-full h-14 pl-14 pr-6 bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.15)] outline-none font-semibold font-montserrat text-black placeholder:text-zinc-300 transition-shadow focus:shadow-[0px_0px_10px_1px_rgba(0,75,112,0.2)]"
            />
          </div>
          <div className="flex items-center gap-4 w-full xl:w-auto shrink-0">
            <span className="text-xl font-semibold font-montserrat text-black whitespace-nowrap">Filtrer par :</span>
            <button className="h-14 px-8 bg-white border-[0.83px] border-sky-900 rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.1)] flex items-center justify-between gap-6 min-w-[160px] group transition-all hover:bg-sky-50">
              <span className="text-xl font-semibold font-montserrat text-sky-900">Payés</span>
              <ChevronDown className="text-sky-900 transition-transform group-hover:translate-y-0.5" size={24} />
            </button>
          </div>
        </section>

        {/* Payments Table Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-2xl font-semibold font-montserrat text-black">Mes travaux dirigés</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sky-900/5">
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Nom du TD</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Classe</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Date</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Départ</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat">Fin</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat text-center">Statut</th>
                  <th className="px-8 py-5 text-sky-900 text-xl font-semibold font-montserrat text-right">Durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-300/50">
                {paymentData.map((row, idx) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{row.name}</td>
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{row.classe}</td>
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{row.date}</td>
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{row.start}</td>
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat">{row.end}</td>
                    <td className="px-8 py-6 text-center">
                      <span className="bg-red-600 rounded-2xl px-3.5 py-1.5 text-white text-xs font-medium font-montserrat inline-block shadow-sm">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-black text-xl font-normal font-montserrat text-right">{row.duration}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-8 flex items-center justify-between bg-white border-t border-gray-100">
            <span className="text-2xl font-normal font-montserrat text-black">Total 0</span>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
                <ChevronLeft size={28} />
              </button>
              <div className="flex items-center gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-md border border-green-800 text-green-800 font-semibold font-montserrat text-2xl hover:bg-green-50 transition-colors">
                  1
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-md bg-green-800 text-white font-semibold font-montserrat text-2xl shadow-md transition-transform hover:scale-105">
                  2
                </button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
