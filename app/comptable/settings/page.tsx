"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SettingsSidebar from '@/components/dashboard/comptable/SettingsSidebar';
import PersonalInfoForm from '@/components/dashboard/comptable/PersonalInfoForm';
import SecurityForm from '@/components/dashboard/comptable/SecurityForm';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profil');

  return (
    <>
      {/* Page Header */}
      <header className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-semibold text-black font-montserrat"
        >
          Paramètres
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-normal text-gray-600 font-montserrat"
        >
          Bienvenue dans votre espace comptable
        </motion.p>
      </header>

      {/* Main Settings Content */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Navigation Section */}
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Form Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'profil' ? (
            <PersonalInfoForm key="profil" />
          ) : (
            <SecurityForm key="securité" />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
