"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* --- Header / Navigation --- */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-light/95 backdrop-blur-md shadow-lg" 
            : "bg-brand-light"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-brand-dark cursor-pointer flex items-center gap-2"
          >
            E-TD Cotonou
          </motion.a>
          
          <div className="hidden md:flex items-center space-x-12 text-black font-semibold">
            {['Fonctionnalités', 'Comment ça marche ?', 'A propos'].map((item) => (
              <motion.a 
                key={item}
                href={item === 'A propos' ? '#about' : item === 'Fonctionnalités' ? '#features' : '#how-it-works'} 
                className="hover:opacity-70 transition relative group py-1"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <Link href="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-dark text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition font-bold shadow-md cursor-pointer"
            >
              Se connecter
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </nav>
      </motion.header>

      {/* --- Main Hero Content --- */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-15"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight"
          >
            L’excellence du soutien scolaire pour le <span className="text-brand-dark uppercase">CEP, BEPC</span> & <span className="text-brand-dark uppercase">BAC</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-1xl text-slate-800 leading-relaxed max-w-2xl font-medium"
          >
            La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel 
            et recevoir facilement vos paiements depuis votre interface
          </motion.p>

          <Link href="/login">
            <motion.button 
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-dark text-white px-12 py-4 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              Se connecter
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Column: Visuals - Senior-level Refined Alignment */}
        <div className="relative h-[550px] w-full mt-12 lg:mt-0 lg:h-[650px]">
          
          {/* Boy Image (Navy Blob) - Background Position, Pushed Up and Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-[-5%] top-[-15px] w-[65%] h-[80%] z-10 animate-float"
          >
            <Image 
              src="https://ik.imagekit.io/hwjv8hvj0/Group%201171277702%20(1).png" 
              alt="Étudiant avec sac à dos"
              fill
              className="object-contain object-right-top"
              priority
            />
          </motion.div>

          {/* Girl Image (Green Blob) - Foreground Position, Pushed Left and Down */}
          <motion.div 
             initial={{ opacity: 0, x: -50, scale: 0.9 }}
             animate={{ opacity: 1, x: 0, scale: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="absolute left-[-5%] bottom-1 w-[55%] h-[80%] z-20 animate-float-delayed"
          >
            <Image 
              src="https://ik.imagekit.io/hwjv8hvj0/student-girl.png" 
              alt="Étudiante souriante"
              fill
              className="object-contain object-left-bottom"
              priority
            />
          </motion.div>
          
        </div>

      </main>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-brand-dark py-15 px-6 md:px-20"
      >
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-white"
        >
          {[
            { val: "98%", label: "Taux de réussite" },
            { val: "500+", label: "Enseignants" },
            { val: "50+", label: "Centre de TD" },
            { val: "24/7", label: "Disponibilité" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              className={`text-center space-y-3 border-dashed-v ${
                i === 3 ? "lg:bg-none" : ""
              } ${
                i % 2 === 1 ? "max-lg:bg-none" : ""
              }`}
            >
              <div className="text-5xl font-semibold tracking-tight">{stat.val}</div>
              <div className="text-2xl font-medium opacity-90 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Solutions Section */}
      <section id="features" className="py-30 px-6 md:px-20 space-y-40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Une solution pour chaque <span className="text-brand-dark">rôle</span></h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto font-medium">Des outils adaptés spécifiquement pour les enseignants, les administrateurs et les comptables</p>
        </motion.div>

        {/* Teachers */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Enseignants</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Planifiez des sessions de TD, suivez leur statut en temps réel et recevez facilement vos paiements depuis une interface intuitive</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 shrink-0"
          >
            <Image src="https://ik.imagekit.io/hwjv8hvj0/Rectangle%2034624521.png" alt="Teacher Dashboard" width={600} height={400} className="rounded-3xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>

        {/* Admin */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Administrateurs</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Un tableau de bord intuitif pour superviser l’ensemble des activités pédagogiques et gérer les utilisateurs</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 shrink-0"
          >
            <Image src="https://ik.imagekit.io/hwjv8hvj0/Rectangle%20346245.png" alt="Admin Dashboard" width={600} height={400} className="rounded-3xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>

        {/* Accountant */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Comptables</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Suivi des paiements, gestion des frais et génération des rapports pour les états de paiement et de virement</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 shrink-0"
          >
            <Image src="https://ik.imagekit.io/hwjv8hvj0/Rectangle462452.png" alt="Accountant Dashboard" width={600} height={400} className="rounded-3xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-white px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header content staggered reveal */}
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="text-center mb-20 space-y-4"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Comment <span className="text-[#004d71]">ça marche ?</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Nous avons simplifié chaque étape pour vous permettre de comprendre notre fonctionnement en un clin d'œil.
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
        >
          
          {/* Colonne Gauche - Cartes Empilées */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Création de compte */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(0,77,113,0.3)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-[#004d71] text-white p-8 rounded-2xl shadow-xl relative group overflow-hidden"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-6 h-6 text-[#004d71]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  <circle cx="18" cy="8" r="3" className="opacity-50" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Création de compte</h4>
              <p className="text-blue-50/90 leading-snug">
                Inscrivez-vous et accédez à votre espace adaptée en fonction de votre profil
              </p>
            </motion.div>

            {/* Configuration */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(150,208,238,0.2)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white text-slate-900 p-8 rounded-2xl border border-brand-light/50 shadow-sm transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#004d71] rounded-lg flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Configuration</h4>
              <p className="text-slate-600 leading-snug">
                Configurez vos informations, ajoutez des travaux dirigés et suivez leur statut en temps réel
              </p>
            </motion.div>
          </div>

          {/* Colonne Centrale - Image Visuelle */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div 
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 30 },
                animate: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              className="relative w-full max-w-[400px] aspect-square lg:aspect-auto lg:h-[500px]"
            >
               {/* Floating Animation Wrapper */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full"
              >
                <Image 
                  src="https://ik.imagekit.io/hwjv8hvj0/Group171277704.png"
                  alt="Illustration aide"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Colonne Droite - Gestion & Suivi */}
          <div className="flex items-start order-3 lg:mt-0">
            <motion.div 
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px -15px rgba(150,208,238,0.2)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white text-slate-900 p-8 rounded-2xl border border-brand-light/50 shadow-sm w-full group transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#004d71] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Gestion & suivi</h4>
              <p className="text-slate-600 leading-snug">
                Recevez des notifications, suivez les performances et assurez le succès des candidats
              </p>
            </motion.div>
          </div>

        </motion.div>
      </div>
      </section>

      {/* --- CTA Section: Prêt à transformer la gestion de vos TD ? --- */}
      <section className="py-24 bg-[#EAF2F6] px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-[#004d71] tracking-tight"
              >
                Prêt à transformer la gestion de vos TD ?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-[#004d71]/80 max-w-3xl mx-auto leading-relaxed font-medium"
              >
                Rejoignez de centaines d’enseignants et d’administrateurs qui font confiance à notre solution
              </motion.p>
            </div>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-[#004d71] text-white px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Créer un compte gratuit
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-transparent text-[#004d71] border-2 border-[#004d71]/30 px-10 py-4 rounded-lg text-lg font-bold hover:bg-[#004d71]/5 transition-all duration-300"
              >
                Contactez l'équipe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="mt-[100px] bg-brand-dark text-white pt-24 pb-12 px-6 md:px-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
          >
            {/* Brand & Socials */}
            <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-8">
              <div className="text-4xl font-extrabold tracking-tight">
                E-TD Cotonou
              </div>
              <p className="text-lg opacity-80 leading-relaxed max-w-sm font-medium">
                La plateforme en un pour gérer les travaux dirigés, suivre leur statut en temps réel et recevez facilement vos paiement depuis votre interface
              </p>
              <div className="flex gap-6 items-center">
                {[
                  { name: 'Facebook', icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                  )},
                  { name: 'Twitter', icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  )},
                  { name: 'LinkedIn', icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  )},
                  { name: 'Instagram', icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  )}
                ].map((social) => (
                  <motion.a 
                    key={social.name} 
                    href="#" 
                    whileHover={{ scale: 1.2, color: '#96D0EE', y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="hover:opacity-100 opacity-80"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Column: Produit */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <h4 className="text-xl font-bold">Produit</h4>
                <ul className="space-y-4 text-lg opacity-80">
                  {['Fontionnalités', 'Tarification', 'Mise à jour'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-brand-light transition-colors hover:pl-2 duration-300 inline-block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column: Ressources */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <h4 className="text-xl font-bold">Ressources</h4>
                <ul className="space-y-4 text-lg opacity-80">
                  {['Guide d\'utilisation', 'FAQ', 'Support'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-brand-light transition-colors hover:pl-2 duration-300 inline-block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column: Légal */}
              <motion.div variants={fadeInUp} className="space-y-6">
                <h4 className="text-xl font-bold">Légal</h4>
                <ul className="space-y-4 text-lg opacity-80">
                  {['Confidentialité', 'Condition d\'utilisation'].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-brand-light transition-colors hover:pl-2 duration-300 inline-block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="pt-12 border-t border-white/10 text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl font-semibold tracking-wide opacity-90"
            >
              @copywritting | Designer par Rapides Services | 2026
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
