"use client";

import { motion } from 'framer-motion';
import { BookOpen, Bell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ActivityItemProps {
  title: string;
  subtitle: string;
  time: string;
  icon: any;
  isNotification?: boolean;
  actionLabel?: string;
  actionVariant?: 'primary' | 'secondary';
  actionUrl?: string;
}


import { useState, useEffect } from 'react';
import { notificationService } from '@/services/notification.service';
import { Notification, UpcomingTD } from '@/types/notification.types';

const ActivityItem = ({ title, subtitle, time, icon: Icon, isNotification, actionLabel = 'Voir plus', actionUrl }: ActivityItemProps) => {
  const router = useRouter();

  const handleAction = () => {
    if (actionUrl) {
      router.push(actionUrl);
    }
  };

  return (
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
            {isNotification ? subtitle : 'Détails du TD'}
          </p>
        </div>
      </div>

      {/* Timestamp (Top Right) */}
      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-medium text-black/50 font-montserrat">{time}</span>
      </div>

      {/* Action badge (Bottom Right) */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={handleAction}
          className={`h-7 px-4 bg-sky-900 rounded-[5px] flex items-center justify-center text-white text-[10px] font-semibold font-montserrat hover:bg-sky-950 transition-colors shadow-sm ${actionUrl ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
        >
          {actionLabel}
        </button>
      </div>
    </motion.div>
  );
};


export default function ActivitySection() {
  const [upcomingTds, setUpcomingTds] = useState<UpcomingTD[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tdData, notifData] = await Promise.all([
          notificationService.getUpcomingTDs(),
          notificationService.getNotifications()
        ]);
        setUpcomingTds(tdData);
        setNotifications(notifData);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Polling every 10 seconds for real-time activity updates
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* TD programmés */}
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
          {!isLoading && upcomingTds.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
              <BookOpen size={48} strokeWidth={1.5} />
              <p className="text-sm font-medium">Aucun TD programmé</p>
            </div>
          ) : (
            upcomingTds.map((td, idx) => (
              <ActivityItem 
                key={td.id} 
                title={td.subject} 
                subtitle={`${td.class} - ${td.time}`} 
                time={td.relative} 
                icon={BookOpen} 
              />
            ))
          )}
        </div>
      </motion.div>

      {/* Notifications */}
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
          {!isLoading && notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
              <Bell size={48} strokeWidth={1.5} />
              <p className="text-sm font-medium">Aucune notification</p>
            </div>
          ) : (
            notifications.map((notif, idx) => (
              <ActivityItem 
                key={notif.id} 
                title={notif.title} 
                subtitle={notif.desc || notif.message || ''} 
                time={notif.time} 
                icon={Bell} 
                isNotification={true}
                actionUrl={notif.actionUrl}
              />
            ))
          )}
        </div>
      </motion.div>

    </div>
  );
}
