"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, BookOpen, CreditCard, ChevronDown, Calendar, Check } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    email: '',
    phone: '',
    birthDate: '',
    nationality: 'Béninois',
    classe: '',
    matiere: '',
    etablissement: '',
    ifu: '',
    bankNumber: '',
    password: ''
  });

  const nextStep = () => setStep((prev) => (prev < 3 ? (prev + 1) as Step : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration logic here
    router.push('/enseignant/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        </motion.div>

        {/* Stepper Section: High-fidelity flex-based progress tracker */}
        <div className="w-full max-w-[687px] flex items-center mb-16 px-4">
          
          {/* Step 1 Icon */}
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
              {step > 1 ? <Check size={24} className="text-white" /> : <User size={24} className={step === 1 ? "text-white" : "text-brand-dark"} />}
            </motion.div>
          </div>

          {/* Trait 1: Between Step 1 and 2 */}
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

          {/* Step 2 Icon */}
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
              {step > 2 ? <Check size={24} className="text-white" /> : <BookOpen size={24} className={step === 2 ? "text-white" : "text-brand-dark"} />}
            </motion.div>
          </div>

          {/* Trait 2: Between Step 2 and 3 */}
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

          {/* Step 3 Icon */}
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
              <CreditCard size={24} className={step === 3 ? "text-white" : "text-brand-dark"} />
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
                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Votre nom complet" className="w-full h-16 px-6 rounded-lg border border-brand-dark bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Genre <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <select name="genre" value={formData.genre} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-brand-dark/20 transition-all ${formData.genre ? 'text-black' : 'text-stone-400'}`}>
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
                  <input name="email" value={formData.email} onChange={handleInputChange} placeholder="votreemail@exemple.com" className="w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xl font-semibold text-black font-montserrat">Numéro <span className="text-red-600">*</span></label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+229 00 00 00 00" className="w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
                  </div>
                  <div className="space-y-3 relative">
                    <label className="text-xl font-semibold text-black font-montserrat">Date de naissance <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all custom-date-input ${formData.birthDate ? 'text-black' : 'text-stone-400'}`} />
                      <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Nationalité <span className="text-red-600">*</span></label>
                  <input name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder="Ex: Béninoise" className="w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg font-medium text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
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
                  <label className="text-xl font-semibold text-black font-montserrat">Classe <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select name="classe" value={formData.classe} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-brand-dark/20 transition-all ${formData.classe ? 'text-black' : 'text-stone-400'}`}>
                      <option value="" disabled className="text-stone-400">Sélectionner votre classe</option>
                      <option value="6e" className="text-black">6ème</option>
                      <option value="5e" className="text-black">5ème</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Matière <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select name="matiere" value={formData.matiere} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-brand-dark/20 transition-all ${formData.matiere ? 'text-black' : 'text-stone-400'}`}>
                      <option value="" disabled className="text-stone-400">Sélectionner votre matière</option>
                      <option value="maths" className="text-black">Mathématiques</option>
                      <option value="pc" className="text-black">Physique-Chimie</option>
                    </select>
                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Etablissement <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select name="etablissement" value={formData.etablissement} onChange={handleInputChange} className={`w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg outline-none appearance-none focus:ring-2 focus:ring-brand-dark/20 transition-all ${formData.etablissement ? 'text-black' : 'text-stone-400'}`}>
                      <option value="" disabled className="text-stone-400">Sélectionner votre établissement</option>
                      <option value="cotonou" className="text-black">Cotonou</option>
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
                  <input name="ifu" value={formData.ifu} onChange={handleInputChange} placeholder="Votre numéro IFU à 13 chiffres" className="w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
                </div>

                <div className="space-y-3">
                  <label className="text-xl font-semibold text-black font-montserrat">Numéro banquaire <span className="text-red-600">*</span></label>
                  <input name="bankNumber" value={formData.bankNumber} onChange={handleInputChange} placeholder="Votre RIB ou numéro de compte" className="w-full h-16 px-6 rounded-lg border border-stone-300 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" />
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
                      className="w-full h-16 px-6 pr-16 rounded-lg border border-stone-300 bg-white font-montserrat text-lg text-black placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-300 hover:text-brand-dark transition-colors">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevStep}
              className={`w-full sm:w-auto px-12 py-4 rounded-lg text-white text-2xl font-semibold bg-red-600 active:translate-y-1 transition-all ${step === 1 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
              disabled={step === 1}
            >
              Retour
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={step === 3 ? handleRegister : nextStep}
              className="w-full sm:w-auto px-12 py-4 rounded-lg text-white text-2xl font-semibold bg-brand-dark transition-all font-montserrat"
            >
              {step === 3 ? "S'inscrire" : "Suivant"}
            </motion.button>
          </div>

          {/* Footer Link */}
          <div className="mt-16 text-center">
             <p className="text-2xl font-normal text-black font-montserrat">
               J’ai déjà un compte ?{' '}
               <Link href="/login" className="text-brand-accent font-semibold no-underline hover:underline decoration-brand-accent transition-all hover:opacity-80">
                 Se connecter
               </Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
