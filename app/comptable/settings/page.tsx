"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SettingsSidebar from '@/components/dashboard/comptable/SettingsSidebar';
import PersonalInfoForm from '@/components/dashboard/comptable/PersonalInfoForm';
import SecurityForm from '@/components/dashboard/comptable/SecurityForm';
import { authService } from '@/services/auth.service';
import { User } from '@/types/user.types';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profil');
  const [user, setUser] = useState<User | null>(null);
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
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-sky-900" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
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
          Gérez vos informations de compte Comptable
        </motion.p>
      </header>

      {/* Main Settings Content */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Navigation Section */}
        <SettingsSidebar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setMessage(null); }} />

        {/* Form Section */}
        <div className="flex-1 w-full space-y-6">
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

          <AnimatePresence mode="wait">
            {activeTab === 'profil' ? (
              <PersonalInfoForm 
                key="profil" 
                formData={profileForm}
                saving={saving}
                onChange={(updates) => setProfileForm({ ...profileForm, ...updates })}
                onSubmit={handleProfileSubmit}
              />
            ) : (
              <SecurityForm 
                key="securité" 
                formData={securityForm as any}
                saving={saving}
                onChange={(updates) => setSecurityForm({ ...securityForm, ...updates })}
                onSubmit={handleSecuritySubmit}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
