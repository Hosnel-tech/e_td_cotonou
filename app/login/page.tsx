"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans items-center justify-center p-6 lg:p-12 overflow-y-auto">
      
      {/* Center Content Wrapper: Focus and Simplicity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[687px] flex flex-col items-center"
      >
        
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative w-64 h-64 lg:w-72 lg:h-72">
            <Image 
              src="https://ik.imagekit.io/hwjv8hvj0/logo-mairie-cotonou%20(1)%201.png" 
              alt="Ville de Cotonou Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Form Content Block */}
        <div className="w-full space-y-12">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-semibold text-black mb-4 font-montserrat">
              Se connecter
            </h1>
          </div>

          {/* Login Form */}
          <form 
            className="w-full space-y-8" 
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/enseignant/dashboard');
            }}
          >
            
            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-xl font-semibold text-black font-montserrat flex items-center">
                Email <span className="text-[#EE2E33] ml-1">*</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full h-[67px] px-8 rounded-lg border border-brand-dark bg-white text-xl font-medium text-black focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all font-montserrat"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xl font-semibold text-black font-montserrat flex items-center">
                  Mot de passe <span className="text-[#EE2E33] ml-1">*</span>
                </label>
                <Link href="/forgot-password" title="Mot de passe oublié ?" className="text-brand-accent text-xl font-semibold no-underline hover:underline transition-all font-montserrat">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="XXXXXXXXXXXXX"
                  className="w-full h-[67px] px-8 pr-16 rounded-lg border border-[#C8C8C8] bg-white text-xl font-medium text-black placeholder:text-[#C8C8C8] focus:outline-none focus:ring-2 focus:ring-brand-dark/20 transition-all font-montserrat"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C8C8C8] hover:text-brand-dark transition-colors p-2"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            {/* Submit Button & Registration Link */}
            <div className="space-y-8 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-dark text-white h-[67px] rounded-lg text-2xl font-semibold hover:bg-opacity-95 transition-all font-montserrat"
              >
                Se connecter
              </motion.button>

              <div className="text-center">
                <p className="text-2xl font-normal text-black font-montserrat">
                  Vous êtes nouveau ?{' '}
                  <Link href="/register" className="text-brand-accent font-semibold no-underline hover:underline decoration-brand-accent transition-all hover:opacity-80">
                    S’inscrire
                  </Link>
                </p>
              </div>
            </div>

          </form>

        </div>
      </motion.div>
    </div>
  );
}
