"use client";

import { motion } from 'framer-motion';
import { Bell, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { notificationService } from '@/services/notification.service';
import { Notification } from '@/types/notification.types';

interface NotificationsProps {
  onOpenDetails?: (data: any) => void;
}

export default function Notifications({ onOpenDetails }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications().then(data => {
      setNotifications(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] w-full h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 flex items-center justify-center text-sky-900">
          <Bell size={22} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-semibold text-black font-montserrat tracking-tight">Notifications</h3>
      </div>

      {/* Liste */}
      <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {!isLoading && notifications.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 opacity-60">
            <Bell size={48} strokeWidth={1.5} />
            <p className="text-sm font-medium">Aucune notification</p>
          </div>
        ) : (
          notifications.map((notif, index) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="p-4 rounded-lg bg-sky-900/5 flex items-center gap-4 relative h-24 shadow-sm border border-sky-900/5 hover:bg-sky-900/[0.07] transition-colors"
            >
              {/* Icon Circle */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                notif.type === 'success' ? 'bg-green-800' : 'bg-red-600'
              }`}>
                {notif.type === 'success' 
                  ? <Check size={24} className="text-white" strokeWidth={3} /> 
                  : <X size={24} className="text-white" strokeWidth={3} />
                }
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0 pr-16 overflow-hidden space-y-1">
                <h4 className="text-base font-semibold text-black font-montserrat truncate leading-tight">
                  {notif.title}
                </h4>
                <p className="text-sm font-normal text-black font-montserrat opacity-70 leading-tight">
                  {notif.desc}
                </p>
              </div>

              {/* Absolute Timestamp (Top Right) */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-medium text-black/50 font-montserrat">
                  {notif.time}
                </span>
              </div>

              {/* Absolute "Voir plus" (Bottom Right) */}
              <button 
                onClick={() => onOpenDetails?.(notif.tdData)}
                className="absolute bottom-4 right-4 h-6 px-3 bg-sky-900 rounded-[5px] flex items-center justify-center shadow-sm hover:bg-sky-950 transition-colors active:scale-95"
              >
                <span className="text-white text-[10px] font-semibold font-montserrat whitespace-nowrap">
                  Voir plus
                </span>
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
