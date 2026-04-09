"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Sidebar from '@/components/dashboard/enseignant/Sidebar';
import { authService } from '@/services/auth.service';
import { Teacher } from '@/types/user.types';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [user, setUser] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    className: '',
    school: '',
    subject: ''
  });
  
  const [securityForm, setSecurityForm] = useState({ 
    oldPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser() as Teacher;
        if (data && data.role === 'enseignant') {
          setUser(data);
          setProfileForm({
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            className: data.className || '',
            school: data.school || '',
            subject: data.subject || ''
          });
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
      const updated = await authService.updateProfile(profileForm) as Teacher;
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
      <div className="flex min-h-screen bg-[#F4FAFD] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-sky-900" />
      </div>
    );
  }

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
            Gérez vos informations personnelles et votre sécurité
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
            <div className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-6 space-y-6 text-black">
              <h2 className="text-2xl font-semibold font-montserrat ">Navigation</h2>
              <div className="space-y-2">
                <button 
                  onClick={() => { setActiveTab('profile'); setMessage(null); }}
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
                  onClick={() => { setActiveTab('security'); setMessage(null); }}
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
              <h2 className="text-2xl font-semibold font-montserrat text-black">
                {activeTab === 'profile' ? 'Informations personnelles' : 'Mot de passe'}
              </h2>

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
              
              <form onSubmit={activeTab === 'profile' ? handleProfileSubmit : handleSecuritySubmit} className="space-y-10">
                {activeTab === 'profile' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                    {/* Full Name */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Nom complet <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-sky-900 outline-none font-medium font-montserrat transition-shadow focus:shadow-[0px_0px_5px_rgba(0,75,112,0.2)]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="email" 
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat transition-shadow focus:border-sky-900"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Téléphone <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="tel" 
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat transition-shadow focus:border-sky-900"
                        required
                      />
                    </div>

                    {/* Class */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Classe <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select 
                          value={profileForm.className}
                          onChange={(e) => setProfileForm({ ...profileForm, className: e.target.value })}
                          className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat appearance-none transition-shadow focus:border-sky-900"
                          required
                        >
                          <option value="" disabled hidden>Sélectionner votre classe</option>
                          <option>3ème</option>
                          <option>2nde</option>
                          <option>1ère</option>
                          <option>Tle</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2  pointer-events-none" size={20} />
                      </div>
                    </div>

                    {/* Establishments */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Établissement <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select 
                          value={profileForm.school}
                          onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                          className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat appearance-none transition-shadow focus:border-sky-900 text-black"
                          required
                        >
                          <option value="" disabled hidden>Sélectionner votre établissement</option>
                          <option>Etablissement A</option>
                          <option>Etablissement B</option>
                          <option>Polytechnique</option>
                          <option>Lycée Technique</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="md:col-span-2 space-y-4">
                      <label className="block text-base font-semibold font-montserrat text-black">
                        Matière <span className="text-red-600">*</span>
                      </label>
                      <div className="relative group">
                        <select 
                          value={profileForm.subject}
                          onChange={(e) => setProfileForm({ ...profileForm, subject: e.target.value })}
                          className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat appearance-none transition-shadow focus:border-sky-900"
                          required
                        >
                          <option value="" disabled hidden>Sélectionner votre matière</option>
                          <option>Français</option>
                          <option>Mathématiques</option>
                          <option>SVT</option>
                          <option>Physique-Chimie</option>
                          <option>Anglais</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 text-black">
                    {/* Old Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Ancien mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        value={securityForm.oldPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, oldPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat transition-shadow focus:border-sky-900 focus:text-black"
                        required
                      />
                    </div>

                    {/* New Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Nouveau mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        value={securityForm.newPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat transition-shadow focus:border-sky-900 focus:text-black"
                        required
                        minLength={6}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-4">
                      <label className="block text-base font-semibold font-montserrat">
                        Confirmer le nouveau mot de passe <span className="text-red-600">*</span>
                      </label>
                      <input 
                        type="password" 
                        placeholder="XXXXXXXXXX"
                        value={securityForm.confirmPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-white rounded-md border-[0.69px] border-stone-300 outline-none font-medium font-montserrat transition-shadow focus:border-sky-900 focus:text-black"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end pt-4">
                  <motion.button 
                    type="submit"
                    disabled={saving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-12 py-4 bg-sky-900 text-white rounded-md text-base font-semibold font-montserrat shadow-lg hover:bg-sky-950 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {saving && <Loader2 size={18} className="animate-spin" />}
                    {activeTab === 'profile' ? 'Sauvegarder les modifications' : 'Mettre à jour le mot de passe'}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.section>
        </div>

      </main>
    </div>
  );
}
