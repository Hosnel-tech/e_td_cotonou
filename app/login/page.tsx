"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reason = searchParams.get('reason');
    if (reason === 'deactivated') {
      setError("Votre compte a été désactivé. Veuillez contacter l'administrateur.");
    } else if (reason === 'pending') {
      setError("Votre compte est en attente de validation. Veuillez patienter.");
    } else if (reason === 'unauthorized') {
      setError("Vous n'avez pas accès à cette page.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.login(email, password);
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'comptable':
          router.push('/comptable/dashboard');
          break;
        case 'enseignant':
        default:
          router.push('/enseignant/dashboard');
          break;
      }
    } catch (err: any) {
      // Use the server's specific error message (pending, deactivated, rejected, etc.)
      setError(err.message || "Identifiants invalides. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans items-center justify-center p-6 lg:p-12 overflow-y-auto">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[687px] flex flex-col items-center"
      >
        
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

        <div className="w-full space-y-12">
          
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-semibold text-black mb-4 font-montserrat">
              Se connecter
            </h1>
            <p className="text-black/60 text-xl font-montserrat">Accédez à votre espace professionnel</p>
          </div>

          <form className="w-full space-y-8" onSubmit={handleLogin}>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-montserrat font-medium"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-3">
              <label className="text-xl font-semibold text-black font-montserrat flex items-center">
                Email <span className="text-[#EE2E33] ml-1">*</span>
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full h-[67px] px-8 rounded-lg border border-stone-200 bg-white text-xl font-medium text-black focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all font-montserrat"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xl font-semibold text-black font-montserrat flex items-center">
                  Mot de passe <span className="text-[#EE2E33] ml-1">*</span>
                </label>
                <Link href="/forgot-password" title="Mot de passe oublié ?" className="text-sky-900 text-xl font-semibold no-underline hover:underline transition-all font-montserrat">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="XXXXXXXXXXXXX"
                  className="w-full h-[67px] px-8 pr-16 rounded-lg border border-stone-200 bg-white text-xl font-medium text-black placeholder:text-[#C8C8C8] focus:outline-none focus:ring-2 focus:ring-sky-900/20 transition-all font-montserrat"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-[#C8C8C8] hover:text-sky-900 transition-colors p-2"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <motion.button 
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                disabled={isLoading}
                className="w-full bg-sky-900 text-white h-[67px] rounded-lg text-2xl font-semibold hover:bg-sky-950 transition-all font-montserrat flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={32} />
                ) : (
                  "Se connecter"
                )}
              </motion.button>

              <div className="text-center">
                <p className="text-2xl font-normal text-black font-montserrat">
                  Vous êtes nouveau ?{' '}
                  <Link href="/register" className="text-sky-900 font-semibold no-underline hover:underline transition-all hover:opacity-80">
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

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  );
}
