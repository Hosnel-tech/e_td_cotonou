"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, BookOpen, CreditCard, ChevronDown, Calendar, Check, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { CLASSES, SUBJECTS_BY_CLASS, SECONDARY_SUBJECTS, SCHOOLS } from '@/constants/education';

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    email: '',
    phone: '',
    birthDate: '',
    nationality: 'Béninois',
    niveau: '', // 'primaire' or 'secondaire'
    classe: '',
    matiere: '',
    etablissement: '',
    ifu: '',
    bankNumber: '',
    paymentPreference: '',
    password: ''
  });

  const nextStep = () => setStep((prev) => (prev < 3 ? (prev + 1) as Step : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authService.register(formData);
      router.push('/login');
    } catch (error: any) {
      alert(error.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Reset logic
      if (name === 'niveau') {
        newData.classe = value === 'primaire' ? 'CM2' : '';
        newData.matiere = '';
      }
      if (name === 'classe') {
        newData.matiere = '';
      }
      return newData;
    });
  };

  return (
    <div className="flex min-h-screen bg-white font-sans items-center justify-center p-6 lg:p-12 overflow-y-auto">
      
      <div className="w-full max-w-[750px] flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-semibold text-black font-montserrat">
            S’inscrire
          </h1>
          <p className="text-black/60 text-xl font-montserrat mt-2">Rejoignez la plateforme des enseignants</p>
        </motion.div>

        {/* Stepper Section */}
        <div className="w-full max-w-[687px] flex items-center mb-16 px-4">
          
          <div className="flex flex-col items-center">
            <motion.div 
              initial={false}
              animate={{
                backgroundColor: step === 1 ? "#004B70" : step > 1 ? "#0F673B" : "#E5F0F7",
                scale: step === 1 ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
            >
              {step > 1 ? <Check size={24} className="text-white" /> : <User size={24} className={step === 1 ? "text-white" : "text-sky-900"} />}
            </motion.div>
          </div>

          <div className="flex-1 px-4 relative h-2.5">
            <div className="absolute inset-0 bg-sky-900/10 rounded-full" />
            <motion.div 
              initial={false}
              animate={{ 
                width: step >= 2 ? "100%" : "0%",
                backgroundColor: step >= 2 ? "#0F673B" : "#E5F0F7" 
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <motion.div 
              initial={false}
              animate={{
                backgroundColor: step === 2 ? "#004B70" : step > 2 ? "#0F673B" : "#E5F0F7",
                scale: step === 2 ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
            >
              {step > 2 ? <Check size={24} className="text-white" /> : <BookOpen size={24} className={step === 2 ? "text-white" : "text-sky-900"} />}
            </motion.div>
          </div>

          <div className="flex-1 px-4 relative h-2.5">
            <div className="absolute inset-0 bg-sky-900/10 rounded-full" />
            <motion.div 
              initial={false}
              animate={{ 
                width: step >= 3 ? "100%" : "0%",
                backgroundColor: step === 3 ? "#0F673B" : "#E5F0F7" 
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <motion.div 
              initial={false}
              animate={{
                backgroundColor: step === 3 ? "#004B70" : "#E5F0F7",
                scale: step === 3 ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full flex items-center justify-center relative z-10"
            >
              <CreditCard size={24} className={step === 3 ? "text-white" : "text-sky-900"} />
            </motion.div>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[687px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Nom & Prénom <span className="text-red-600">*</span></label>
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Votre nom complet" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Genre <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <select name="genre" value={formData.genre} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.genre ? 'text-black' : 'text-stone-400'}`}>
                        <option value="" disabled className="text-stone-400">Sélectionner votre genre</option>
                        <option value="M" className="text-black">Masculin</option>
                        <option value="F" className="text-black">Féminin</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Email <span className="text-red-600">*</span></label>
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="votreemail@exemple.com" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Numéro <span className="text-red-600">*</span></label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="00 00 00 00 00" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-xl font-semibold text-black font-montserrat">Date de naissance <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.birthDate ? 'text-black' : 'text-stone-400'}`} />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Nationalité <span className="text-red-600">*</span></label>
                  <input name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Ex: Béninoise" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg font-medium text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Niveau d'enseignement <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select name="niveau" value={formData.niveau} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.niveau ? 'text-black' : 'text-stone-400'}`}>
                      <option value="" disabled className="text-stone-400">Sélectionner votre niveau</option>
                      <option value="primaire" className="text-black">Primaire (CM2)</option>
                      <option value="secondaire" className="text-black">Secondaire (Colleges / Lycées)</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                {formData.niveau === 'primaire' && (
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Classe <span className="text-red-600">*</span></label>
                    <div className="relative opacity-70">
                      <select name="classe" value={formData.classe} disabled className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-stone-50 font-montserrat text-lg outline-none appearance-none font-medium text-black cursor-not-allowed">
                        <option value="CM2">CM2</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Matière <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select 
                      name="matiere" 
                      value={formData.matiere} 
                      onChange={handleInputChange} 
                      disabled={!formData.niveau} 
                      className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.matiere ? 'text-black' : 'text-stone-400'} disabled:opacity-50 disabled:bg-stone-50`}
                    >
                      <option value="" disabled className="text-stone-400">
                        {formData.niveau ? 'Sélectionner votre matière' : 'Sélectionnez d’abord un niveau'}
                      </option>
                      {formData.niveau === 'primaire' ? (
                        SUBJECTS_BY_CLASS['CM2']?.map((m) => (
                           <option key={m} value={m} className="text-black">{m}</option>
                        ))
                      ) : (
                        SECONDARY_SUBJECTS.map((m) => (
                          <option key={m} value={m} className="text-black">{m}</option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Etablissement <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select name="etablissement" value={formData.etablissement} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.etablissement ? 'text-black' : 'text-stone-400'}`}>
                      <option value="" disabled className="text-stone-400">Sélectionner votre établissement</option>
                      {SCHOOLS.map((s) => (
                        <option key={s} value={s} className="text-black">{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Numéro IFU <span className="text-red-600">*</span></label>
                  <input name="ifu" value={formData.ifu} onChange={handleInputChange} placeholder="Votre numéro IFU à 13 chiffres" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Numéro banquaire <span className="text-red-600">*</span></label>
                  <input name="bankNumber" value={formData.bankNumber} onChange={handleInputChange} placeholder="Votre RIB ou numéro de compte" className="w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" />
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Préférence de paiement <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select 
                      name="paymentPreference" 
                      value={formData.paymentPreference} 
                      onChange={handleInputChange} 
                      className={`w-full h-16 px-6 rounded-lg border border-stone-200 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium ${formData.paymentPreference ? 'text-black' : 'text-stone-400'}`}
                    >
                      <option value="" disabled className="text-stone-400">Sélectionner votre préférence</option>
                      <option value="électronique" className="text-black">Paiement électronique</option>
                      <option value="bancaire" className="text-black">Paiement bancaire</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Mot de passe <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={formData.password} 
                      onChange={handleInputChange} 
                      placeholder="Créer un mot de passe sécurisé" 
                      className="w-full h-16 px-6 pr-16 rounded-lg border border-stone-200 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-sky-900/10 transition-all font-medium" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 hover:text-sky-900 transition-colors">
                      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 gap-6">
            <motion.button 
              whileHover={{ scale: step === 1 ? 1 : 1.05 }}
              whileTap={{ scale: step === 1 ? 1 : 0.98 }}
              onClick={prevStep}
              className={`w-full sm:w-auto px-12 py-4 rounded-lg text-white text-2xl font-semibold transition-all ${step === 1 ? 'bg-stone-200 cursor-not-allowed text-stone-400' : 'bg-red-600 hover:bg-red-700'}`}
              disabled={step === 1}
            >
              Retour
            </motion.button>
            <motion.button 
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading}
              onClick={step === 3 ? handleRegister : nextStep}
              className="w-full sm:w-auto px-12 py-4 rounded-lg text-white text-2xl font-semibold bg-sky-900 hover:bg-sky-950 transition-all font-montserrat flex items-center justify-center min-w-[200px]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={28} />
              ) : (
                step === 3 ? "S'inscrire" : "Suivant"
              )}
            </motion.button>
          </div>

          <div className="mt-16 text-center">
             <p className="text-2xl font-normal text-black font-montserrat">
               J’ai déjà un compte ?{' '}
               <Link href="/login" className="text-sky-900 font-semibold no-underline hover:underline transition-all hover:opacity-80">
                 Se connecter
               </Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
