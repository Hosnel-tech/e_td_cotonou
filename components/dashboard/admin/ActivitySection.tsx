"use client";

import { motion } from 'framer-motion';
import { BookOpen, Bell, ChevronRight, User } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  subtitle: string;
  time: string;
  icon: any;
  isNotification?: boolean;
}

const ActivityItem = ({ title, subtitle, time, icon: Icon, isNotification }: ActivityItemProps) => (
  <div className="flex items-center justify-between p-4 bg-sky-900/5 rounded-lg group hover:bg-sky-900/10 transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-sky-900 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h4 className="text-black text-base font-semibold font-montserrat">
          {title} {isNotification ? '' : `- ${subtitle}`}
        </h4>
        <p className="text-black text-base font-normal font-montserrat opacity-70">
          {isNotification ? subtitle : `Organisé par ${subtitle.split(' ')[0]} Paul`} 
        </p>
        <span className="text-black text-[10px] font-medium font-montserrat opacity-50">
          {time}
        </span>
      </div>
    </div>
    <button className="px-4 py-1.5 bg-sky-900 text-white text-xs font-semibold font-montserrat rounded-[5px] flex items-center gap-1 hover:bg-sky-950 transition-colors">
      Voir plus
      <ChevronRight size={14} />
    </button>
  </div>
);

export default function ActivitySection() {
  const scheduledTDs = [
    { title: 'Anglais', subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
    { title: 'Maths', subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
    { title: 'EST', subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
  ];

  const notifications = [
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
    { title: 'Nouveau TD créé', subtitle: 'Confirmer ou rejeter le TD', time: 'Il y a 2 min', icon: BookOpen, isNotification: true },
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* TD programmés */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="text-sky-900" size={28} />
          <h3 className="text-black text-xl font-semibold font-montserrat">TD programmés</h3>
        </div>
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {scheduledTDs.map((td, idx) => (
            <ActivityItem key={idx} {...td} />
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6"
      >
        <div className="flex items-center gap-2">
          <Bell className="text-sky-900" size={28} />
          <h3 className="text-black text-xl font-semibold font-montserrat">Notifications</h3>
        </div>
        <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
          {notifications.map((notif, idx) => (
            <ActivityItem key={idx} {...notif} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
