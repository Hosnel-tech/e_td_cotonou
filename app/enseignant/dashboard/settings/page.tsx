"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  ChevronDown 
} from 'lucide-react';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  return (
    <div className="flex min-h-screen bg-[#F4FAFD]">
      {/* Permanent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 space-y-8">
        
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
            Gérez vos paramètres de connexion
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Navigation Column */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6">
              <h2 className="text-2xl font-semibold font-montserrat text-black">Navigation</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full h-12 px-4 rounded-md flex items-center gap-4 transition-all ${
                    activeTab === 'profile' 
                      ? 'bg-sky-900 text-white shadow-md' 
                      : 'bg-white text-sky-900 hover:bg-sky-50'
                  }`}
                >
                  <User size={24} className={activeTab === 'profile' ? 'text-white' : 'text-sky-900'} />
                  <span className="text-base font-semibold font-montserrat">Profil</span>
                </button>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full h-12 px-4 rounded-md flex items-center gap-4 transition-all ${
                    activeTab === 'security' 
                      ? 'bg-sky-900 text-white shadow-md' 
                      : 'bg-white text-sky-900 hover:bg-sky-50'
                  }`}
                >
                  <ShieldCheck size={24} className={activeTab === 'security' ? 'text-white' : 'text-sky-900'} />
                  <span className="text-base font-semibold font-montserrat">Sécurité</span>
                </button>
              </div>
            </div>
          </motion.section>

          {/* Form Column */}
          <motion.section 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-10 space-y-10">
              {activeTab === 'profile' ? (
                <>
                  <h2 className="text-2xl font-semibold font-montserrat text-black">Informations personnelles</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Last Name */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Nom <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="text" 
                        defaultValue="Paul"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-sky-900 outline-none font-medium font-montserrat text-black transition-shadow focus:shadow-[0px_0px_5px_rgba(0,75,112,0.2)]"
                      />
                    </div>

                    {/* First Name */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Prénom <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="text" 
                        defaultValue="Dublin"
                        placeholder="Dublin"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900"
                      />
                    </div>

                    {/* Email - Full Width */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="email" 
                        defaultValue="example@gmail.com"
                        placeholder="example@gmail.com"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Téléphone <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="tel" 
                        defaultValue="0197254915"
                        placeholder="0197254915"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900"
                      />
                    </div>

                    {/* Class */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Classe <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 appearance-none transition-shadow focus:border-sky-900">
                          <option>3ème</option>
                          <option>2nde</option>
                          <option>1ère</option>
                          <option>Tle</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                      </div>
                    </div>

                    {/* Establishments */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Etablissements <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:border-sky-900">
                          <option hidden>Sélectionner votre établisseent</option>
                          <option>Etablissement A</option>
                          <option>Etablissement B</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Matières <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-black appearance-none transition-shadow focus:border-sky-900">
                          <option hidden>Sélectionner votre matière</option>
                          <option>Français</option>
                          <option>Mathématiques</option>
                          <option>SVT</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold font-montserrat text-black">Mot de passe</h2>
                  
                  <div className="space-y-8">
                    {/* Old Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Ancien mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900 focus:text-black"
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Nouveau mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900 focus:text-black"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Confirmer mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat text-stone-300 transition-shadow focus:border-sky-900 focus:text-black"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Action Button */}
              <div className="flex justify-end pt-4">
                <button className="px-12 py-4 bg-sky-900 text-white rounded-md text-base font-semibold font-montserrat shadow-lg hover:bg-sky-950 transition-all active:scale-95">
                  Modifier
                </button>
              </div>
            </div>
          </motion.section>
        </div>

      </main>
    </div>
  );
}
