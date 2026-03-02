"use client";

import { motion } from 'framer-motion';
import { Bell, ShieldCheck, X } from 'lucide-react';

const notificationData = [
  { id: 1, title: 'TD approuvé', desc: 'Marqué terminé pour être payé', time: 'Il y a 2 min', type: 'success' },
  { id: 2, title: 'TD rejeté', desc: 'Votre TD a été rejeté par l\'administration', time: 'Il y a 10 min', type: 'error' },
  { id: 3, title: 'Paiement reçu', desc: 'Votre virement de 25.000 FCFA est validé', time: 'Il y a 1h', type: 'success' },
  { id: 4, title: 'Nouveau TD', desc: 'Vous avez été assigné à un nouveau TD en SVT', time: 'Il y a 3h', type: 'success' },
  { id: 5, title: 'Rappel', desc: 'N\'oubliez pas de remplir votre rapport de TD', time: 'Hier', type: 'error' },
  { id: 6, title: 'Message', desc: 'L\'administrateur vous a envoyé un message', time: 'Hier', type: 'success' },
];

export default function Notifications() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-50 w-full h-[450px] flex flex-col">
      {/* Header : Alignement précis de l'icône Bell */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-[#004d71]">
          <Bell size={28} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h3>
      </div>

      {/* Liste : On retire le 'overflow-y-auto' sauf si la liste est vraiment longue pour éviter les scrollbars inutiles */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {notificationData.map((notif, index) => (
          <motion.div 
            key={notif.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="p-4 rounded-xl bg-[#f8fafc]/80 border border-slate-50 flex items-center gap-4 group"
          >
            {/* Icon Circle : Couleurs exactes de l'image */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
              notif.type === 'success' ? 'bg-[#14643c]' : 'bg-[#ef4444]'
            }`}>
              {notif.type === 'success' 
                ? <ShieldCheck size={24} className="text-white" /> 
                : <X size={26} strokeWidth={3} className="text-white" />
              }
            </div>

            {/* Content Area : Utilisation de flex-1 pour pousser le temps à droite */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-slate-900 leading-tight truncate">
                  {notif.title}
                </h4>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap ml-4">
                  {notif.time}
                </span>
              </div>
              <p className="text-[15px] font-medium text-slate-500 mt-0.5">
                {notif.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}