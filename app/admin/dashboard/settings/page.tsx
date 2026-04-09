"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { authService } from '@/services/auth.service';
import { User as UserType } from '@/types/user.types';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'securite'>('profil');
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [securityForm, setSecurityForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        if (data) {
          setUser(data);
          setProfileForm({ name: data.name, email: data.email });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const updated = await authService.updateProfile(profileForm);
      setUser(updated);
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erreur lors de la mise à jour' });
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas' });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      await authService.updatePassword(securityForm.oldPassword, securityForm.newPassword);
      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
      setSecurityForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Erreur lors de la modification du mot de passe' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-sky-900" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-black font-montserrat"
          >
            Paramètres
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-normal text-gray-600 font-montserrat"
          >
            Gérez vos informations de compte Administrateur
          </motion.p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Card */}
          <aside className="w-full lg:w-96 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6"
            >
              <h2 className="text-2xl font-bold text-black font-montserrat px-2">Navigation</h2>
              <nav className="space-y-2">
                <button 
                  onClick={() => { setActiveTab('profil'); setMessage(null); }}
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
                  onClick={() => { setActiveTab('securite'); setMessage(null); }}
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
            </motion.div>
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
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-black font-montserrat">
                  {activeTab === 'profil' ? 'Informations personnelles' : 'Modifier le mot de passe'}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {message && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-3 p-4 rounded-md ${
                      message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <p className="font-montserrat font-medium">{message.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={activeTab === 'profil' ? handleProfileSubmit : handleSecuritySubmit} className="space-y-8">
                {activeTab === 'profil' ? (
                  <>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Nom complet <span className="text-red-600">*</span>
                        </span>
                        <div className="relative group">
                          <input 
                            type="text" 
                            value={profileForm.name}
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                            className="w-full h-14 bg-white border border-sky-900 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                            required
                          />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Email professionnel <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="email" 
                            value={profileForm.email}
                            onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                            required
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
                            value={securityForm.oldPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, oldPassword: e.target.value })}
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                            required
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
                            value={securityForm.newPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                            required
                            minLength={6}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block">
                        <span className="text-base font-semibold text-black font-montserrat mb-2 block">
                          Confirmer le nouveau mot de passe <span className="text-red-600">*</span>
                        </span>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="XXXXXXXXXX"
                            value={securityForm.confirmPassword}
                            onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                            className="w-full h-14 bg-white border border-stone-300 rounded-md px-6 text-black text-base font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all placeholder:text-stone-300"
                            required
                          />
                        </div>
                      </label>
                    </div>
                  </>
                )}

                <div className="flex justify-end pt-4">
                  <motion.button 
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-10 py-4 bg-sky-900 text-white rounded-md text-base font-semibold font-montserrat shadow-lg hover:bg-sky-950 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {saving && <Loader2 size={18} className="animate-spin" />}
                    {activeTab === 'profil' ? 'Sauvegarder les modifications' : 'Mettre à jour le mot de passe'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </section>
        </div>
    </div>
  );
}
