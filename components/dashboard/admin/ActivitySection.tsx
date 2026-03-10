"use client";

import { motion } from 'framer-motion';
import { BookOpen, Bell, User } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  subtitle: string;
  time: string;
  icon: any;
  isNotification?: boolean;
  actionLabel?: string;
  actionVariant?: 'primary' | 'secondary';
}

const ActivityItem = ({ title, subtitle, time, icon: Icon, isNotification, actionLabel = 'Voir plus' }: ActivityItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-4 rounded-lg bg-sky-900/5 relative flex items-center h-24 shadow-sm border border-sky-900/5 hover:bg-sky-900/[0.07] transition-colors"
  >
    {/* Left: Avatar + Text */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-sky-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
        <Icon size={24} />
      </div>
      <div className="space-y-0.5 overflow-hidden">
        <h4 className="text-base font-semibold text-black font-montserrat truncate leading-tight">
          {isNotification ? title : <>{title} – <span className="font-normal">{subtitle}</span></>}
        </h4>
        <p className="text-sm font-normal text-black font-montserrat opacity-70 leading-tight">
          {isNotification ? subtitle : 'Organisé par Abdoul Paul'}
        </p>
      </div>
    </div>

    {/* Timestamp (Top Right) */}
    <div className="absolute top-4 right-4">
      <span className="text-[10px] font-medium text-black/50 font-montserrat">{time}</span>
    </div>

    {/* Action badge (Bottom Right) */}
    <div className="absolute bottom-4 right-4">
      <button className="h-7 px-4 bg-sky-900 rounded-[5px] flex items-center justify-center text-white text-[10px] font-semibold font-montserrat hover:bg-sky-950 transition-colors shadow-sm">
        {actionLabel}
      </button>
    </div>
  </motion.div>
);

export default function ActivitySection() {
  const scheduledTDs = [
    { title: 'Anglais', subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
    { title: 'Maths',   subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
    { title: 'EST',     subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
    { title: 'PCT',     subtitle: '12/01/26', time: 'Il y a 2 min', icon: BookOpen },
  ];

  const notifications = [
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
    { title: 'Demande de connexion', subtitle: 'Répondre à la demande de Jean', time: 'Il y a 2 min', icon: User, isNotification: true },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* TD programmés — same card shell as ProchainsTD */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] w-full h-80 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 flex items-center justify-center text-sky-900">
            <BookOpen size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-semibold text-black font-montserrat tracking-tight">TD programmés</h3>
        </div>

        {/* Scrollable list */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {scheduledTDs.map((td, idx) => (
            <ActivityItem key={idx} {...td} />
          ))}
        </div>
      </motion.div>

      {/* Notifications — same card shell as Notifications component */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-lg p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] w-full h-80 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 flex items-center justify-center text-sky-900">
            <Bell size={22} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-semibold text-black font-montserrat tracking-tight">Notifications</h3>
        </div>

        {/* Scrollable list */}
        <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {notifications.map((notif, idx) => (
            <ActivityItem key={idx} {...notif} />
          ))}
        </div>
      </motion.div>

    </div>
  );
}
