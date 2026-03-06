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
  onOpenDetails?: (data: any) => void;
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
  const isTermine = status === 'terminé';

  const handleDetailsClick = () => {
    const data = { name: matter, classe, time: heure, date, duration: duree, status };
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
        <div className={`px-4 py-1.5 rounded-[30px] flex items-center justify-center min-w-[80px] transition-colors ${
          isEnCours ? 'bg-sky-900/20 text-sky-900' : 
          isTermine ? 'bg-green-800/20 text-green-800' :
          'bg-red-600/20 text-red-600'
        }`}>
          <span className="text-[10px] font-bold font-montserrat uppercase">
            {status}
          </span>
        </div>
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
