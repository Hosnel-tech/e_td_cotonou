"use client";

import { motion } from 'framer-motion';
import { User, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  const tabs = [
    { id: 'profil', icon: User, label: 'Profil' },
    { id: 'securité', icon: ShieldCheck, label: 'Sécurité' },
  ];

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 h-fit space-y-8"
    >
      <h2 className="text-black text-2xl font-semibold font-montserrat">Navigation</h2>
      
      <div className="space-y-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-md transition-all relative overflow-hidden group ${
                isActive 
                  ? 'bg-sky-900 text-white shadow-lg' 
                  : 'bg-white text-sky-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon 
                size={24} 
                className={isActive ? 'text-white' : 'text-sky-900'} 
              />
              <span className="text-base font-semibold font-montserrat">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.aside>
  );
}
