"use client";

import { motion } from 'framer-motion';
import { Bell, CheckCircle2, ChevronDown } from 'lucide-react';

const evaluationData = [
  { month: 'Jan', value: 35 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 60 },
  { month: 'Jun', value: 15 },
  { month: 'Jul', value: 10 },
  { month: 'Aug', value: 75, active: true },
  { month: 'Sep', value: 50 },
  { month: 'Oct', value: 65 },
  { month: 'Nov', value: 15 },
  { month: 'Dec', value: 35 },
];

const notifications = [
  { id: 1, type: 'success', title: 'Succès de paiement', teacher: 'Jean KOUASSI', time: 'Il y a 2 min', amount: '45k FCFA' },
  { id: 2, type: 'success', title: 'Succès de paiement', teacher: 'Jean KOUASSI', time: 'Il y a 2 min', amount: '45k FCFA' },
  { id: 3, type: 'success', title: 'Succès de paiement', teacher: 'Jean KOUASSI', time: 'Il y a 2 min', amount: '45k FCFA' },
];

export default function EvaluationSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chart Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-2 bg-white rounded-xl p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] relative overflow-hidden h-[384px] flex flex-col"
      >
        <div className="flex justify-between items-center mb-8 px-2">
          <h3 className="text-black text-base font-semibold font-montserrat">Evaluation</h3>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-black/10 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
            <span className="text-black text-sm font-normal font-montserrat">Last year</span>
            <ChevronDown size={14} className="text-black/40" />
          </div>
        </div>

        {/* Custom Bar Chart Component */}
        <div className="flex-1 flex items-end justify-between gap-1 px-2 relative">
          {/* Y Axis Labels (Static representation) */}
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-black/60 font-montserrat text-right w-6 -ml-8">
            {[90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map(val => (
                <span key={val}>{val}</span>
            ))}
          </div>

          {evaluationData.map((item, idx) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-3 group relative">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.5 + (idx * 0.05), ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-[28px] rounded transition-all duration-300 ${
                  item.active 
                    ? 'bg-sky-900 shadow-[0px_7.5px_9.4px_0px_rgba(105,118,235,0.4)]' 
                    : 'bg-sky-900/30'
                } group-hover:bg-sky-900/50`}
              />
              <span className={`text-[10px] font-montserrat ${item.active ? 'text-sky-900 font-bold' : 'text-black font-normal'}`}>
                {item.month}
              </span>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-sky-900 text-white text-[10px] py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                {item.value}%
              </div>
            </div>
          ))}

          {/* Dotted Target Line */}
          <div className="absolute left-0 right-0 top-[30%] border-t border-dashed border-sky-900/40 pointer-events-none" />
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] flex flex-col"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-sky-900 flex items-center justify-center">
            <Bell size={20} className="text-white" />
          </div>
          <h3 className="text-black text-xl font-semibold font-montserrat">Notifications</h3>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {notifications.map((notif, idx) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (idx * 0.1) }}
              className="bg-green-800/5 rounded-lg p-4 flex items-center gap-4 group cursor-pointer hover:bg-green-800/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-black text-base font-semibold font-montserrat">{notif.title}</h4>
                  <span className="text-black text-[10px] font-medium font-montserrat opacity-60">{notif.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-black text-sm font-normal font-montserrat opacity-80">{notif.teacher}</p>
                  <span className="text-green-800 text-base font-semibold font-montserrat">{notif.amount}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
