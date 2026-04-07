"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'securite'>('profil');

  return (
    <div className="p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black font-montserrat">Paramètres</h1>
          <p className="text-xl font-normal text-gray-600 font-montserrat">Gérez vos paramètres de connexion</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Card */}
          <aside className="w-full lg:w-96 space-y-6">
            <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6">
              <h2 className="text-2xl font-bold text-black font-montserrat px-2">Navigation</h2>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profil')}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all group ${
                    activeTab === 'profil' 
                      ? 'bg-sky-900 text-white shadow-md' 
                      : 'text-sky-900 hover:bg-sky-900/5'
                  }`}
                >
                  <User size={24} className={activeTab === 'profil' ? 'text-white' : 'text-sky-900'} />
                  <span className={`text-base font-semibold font-montserrat ${activeTab === 'profil' ? 'text-white' : 'text-sky-900'}`}>
                    Profil
                  </span>
                </button>

                <button 
                  onClick={() => setActiveTab('securite')}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all group ${
                    activeTab === 'securite' 
                      ? 'bg-sky-900 text-white shadow-md' 
                      : 'text-sky-900 hover:bg-sky-900/5'
                  }`}
                >
                  <Lock size={24} className={activeTab === 'securite' ? 'text-white' : 'text-sky-900'} />
                  <span className={`text-base font-semibold font-montserrat ${activeTab === 'securite' ? 'text-white' : 'text-sky-900'}`}>
                    Sécurité
                  </span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Form Content */}
          <section className="flex-1">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 lg:p-10 space-y-10"
            >
              <h2 className="text-2xl font-bold text-black font-montserrat">
                {activeTab === 'profil' ? 'Informations personnelles' : 'Mot de passe'}
              </h2>

              <div className="space-y-8">
                {activeTab === 'profil' ? (
                  <>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Nom <span className="text-red-600">*</span>
                        </span>
                        <div className="relative group">
                          <input 
                            type="text" 
                            defaultValue="Paul"
                            className="w-full h-14 bg-white border border-sky-900 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Email <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="email" 
                            placeholder="example@gmail.com"
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Ancien mot de passe <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="XXXXXXXXXX"
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Nouveau mot de passe <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="XXXXXXXXXX"
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Confirmer mot de passe <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="XXXXXXXXXX"
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                          />
                        </div>
                      </label>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-sky-900 text-white rounded-md text-base font-semibold font-montserrat shadow-lg hover:bg-sky-950 transition-colors"
                >
                  Modifier
                </motion.button>
              </div>
            </motion.div>
          </section>
        </div>
    </div>
  );
}
