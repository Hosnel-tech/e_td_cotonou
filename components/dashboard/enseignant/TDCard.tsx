"use client";

import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar, 
  History,
  Info 
} from 'lucide-react';

interface TDCardProps {
  matter: string;
  classe: string;
  heure: string;
  date: string;
  duree: string;
  status: 'en cours' | 'terminé';
  onOpenDetails: (data: any) => void;
}

export default function TDCard({
  matter,
  classe,
  heure,
  date,
  duree,
  status,
  onOpenDetails
}: TDCardProps) {
  const isEnCours = status === 'en cours';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[10px] p-6 shadow-[0px_0px_10px_0px_rgba(0,75,112,0.15)] space-y-4 border border-transparent hover:border-sky-900/10 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-black/40 text-[10px] font-semibold font-montserrat tracking-wider uppercase">MATIERE</span>
          <h3 className="text-black text-xl font-semibold font-montserrat">{matter}</h3>
        </div>
        <div className={`px-4 py-1.5 rounded-[30px] flex items-center justify-center ${
          isEnCours ? 'bg-sky-900/10 text-sky-900' : 'bg-green-800/10 text-green-800'
        }`}>
          <span className="text-xs font-semibold font-montserrat">{status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-black/40" />
            <span className="text-black/40 text-sm font-semibold font-montserrat">Classe:</span>
          </div>
          <span className="text-black text-sm font-semibold font-montserrat">{classe}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-black/40" />
            <span className="text-black/40 text-sm font-semibold font-montserrat">Heure:</span>
          </div>
          <span className="text-black text-sm font-semibold font-montserrat">{heure}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-black/40" />
            <span className="text-black/40 text-sm font-semibold font-montserrat">Date:</span>
          </div>
          <span className="text-black text-sm font-semibold font-montserrat">{date}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={16} className="text-black/40" />
            <span className="text-black/40 text-sm font-semibold font-montserrat">Durée:</span>
          </div>
          <span className="text-black text-sm font-semibold font-montserrat">{duree}</span>
        </div>
      </div>

      <button 
        onClick={() => onOpenDetails({ name: matter, classe, time: heure, date, duration: duree, status })}
        className="w-full mt-2 px-8 py-3 bg-green-800 hover:bg-green-900 text-white rounded-lg flex items-center justify-center gap-2.5 transition-colors group"
      >
        <span className="text-base font-semibold font-montserrat">En savoir plus</span>
      </button>
    </motion.div>
  );
}
