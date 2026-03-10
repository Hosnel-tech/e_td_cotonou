"use client";

import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar, 
  History 
} from 'lucide-react';

interface TDCardProps {
  matter: string;
  classe: string;
  heure: string;
  date: string;
  duree: string;
  status: 'en cours' | 'terminé' | 'rejeté';
  type?: 'Primaire' | 'Collège';
  onOpenDetails?: (data: any) => void;
}

export default function TDCard({
  matter,
  classe,
  heure,
  date,
  duree,
  status,
  type,
  onOpenDetails
}: TDCardProps) {
  const isEnCours = status === 'en cours';
  const isTermine = status === 'terminé';

  const handleDetailsClick = () => {
    const data = { name: matter, classe, time: heure, date, duration: duree, status, type };
    if (onOpenDetails) {
      onOpenDetails(data);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[10px] p-6 shadow-[0px_0px_10px_0px_rgba(0,75,112,0.15)] flex flex-col space-y-4 border border-transparent hover:border-sky-900/10 transition-all group"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-black/40 text-[10px] font-semibold font-montserrat tracking-wider uppercase">MATIERE</span>
          <h3 className="text-black text-xl font-semibold font-montserrat truncate max-w-[120px]">{matter}</h3>
        </div>
        <div className={`px-3 py-1 rounded-[20px] inline-flex items-center justify-center w-fit transition-colors ${
          isEnCours ? 'bg-sky-900/10 text-sky-900' : 
          isTermine ? 'bg-green-800/10 text-green-800' :
          'bg-red-600/10 text-red-600'
        }`}>
          <span className="text-[9px] font-bold font-montserrat uppercase whitespace-nowrap">
            {status}
          </span>
        </div>
        {type && (
          <div className="mt-2 px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 w-fit">
            <span className="text-[8px] font-bold text-stone-500 font-montserrat uppercase">
              {type}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <Users size={16} className="text-black/30" />
            </div>
            <span className="text-black/40 text-[13px] font-semibold font-montserrat">Classe:</span>
          </div>
          <span className="text-black text-[13px] font-semibold font-montserrat text-right">{classe}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <Clock size={16} className="text-black/30" />
            </div>
            <span className="text-black/40 text-[13px] font-semibold font-montserrat">Heure:</span>
          </div>
          <span className="text-black text-[13px] font-semibold font-montserrat text-right">{heure}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <Calendar size={16} className="text-black/30" />
            </div>
            <span className="text-black/40 text-[13px] font-semibold font-montserrat">Date:</span>
          </div>
          <span className="text-black text-[13px] font-semibold font-montserrat text-right">{date}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <History size={16} className="text-black/30" />
            </div>
            <span className="text-black/40 text-[13px] font-semibold font-montserrat">Durée:</span>
          </div>
          <span className="text-black text-[13px] font-semibold font-montserrat text-right">{duree}</span>
        </div>
      </div>

      <button 
        onClick={handleDetailsClick}
        className="w-full mt-2 px-8 py-3 bg-green-800 hover:bg-green-900 text-white rounded-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98]"
      >
        <span className="text-sm font-semibold font-montserrat">En savoir plus</span>
      </button>
    </motion.div>
  );
}
