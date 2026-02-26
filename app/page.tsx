"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* --- Header / Navigation --- */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-brand-light px-6 py-4"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-brand-dark cursor-default"
          >
            E-TD Cotonou
          </motion.div>
          
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

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-dark text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition font-bold shadow-md"
          >
            Se connecter
            <ArrowRight size={18} />
          </motion.button>
        </nav>
      </motion.header>

      {/* --- Main Hero Content --- */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
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

          <motion.button 
            variants={fadeInUp}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-dark text-white px-12 py-4 rounded-xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Se connecter
          </motion.button>
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
              src="https://ik.imagekit.io/hwjv8hvj0/student-boy.png" 
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
        className="bg-brand-dark py-15 px-6 md:px-20 mt-12"
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
              className="text-center space-y-3 border-dashed-v last:border-none"
            >
              <div className="text-5xl font-semibold tracking-tight">{stat.val}</div>
              <div className="text-2xl font-medium opacity-90 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Solutions Section */}
      <section id="features" className="py-40 px-6 md:px-20 space-y-40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-6xl font-extrabold text-slate-900 tracking-tight">Une solution pour chaque rôle</h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">Des outils adaptés spécifiquement pour les enseignants, les administrateurs et les comptables</p>
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
            <Image src="/teacher_dashboard.png" alt="Teacher Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
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
            <Image src="/admin_dashboard.png" alt="Admin Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
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
            <Image src="/accountant_dashboard.png" alt="Accountant Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100 hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-40 bg-slate-50 px-6 md:px-20">
        <div className="max-w-7xl mx-auto space-y-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-6xl font-extrabold text-slate-900 tracking-tight">Comment ça marche ?</h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">Nous avons simplifié chaque étape pour vous permettre de comprendre notre fonctionnement en un clin d&apos;œil.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {[
              {
                title: "Création de compte",
                desc: "Inscrivez-vous et accédez à votre espace adapté en fonction de votre profil",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>,
                dark: true
              },
              {
                title: "Configuration",
                desc: "Configurez vos informations, ajoutez des travaux dirigés et suivez leur statut en temps réel",
                icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></>
              },
              {
                title: "Gestion & suivi",
                desc: "Recevez des notifications, suivez les performances et assurez le succès des candidats",
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`${step.dark ? 'bg-brand-dark text-white' : 'bg-white text-slate-900'} p-12 rounded-[40px] space-y-8 shadow-xl border border-slate-100`}
              >
                <div className={`w-16 h-16 ${step.dark ? 'bg-white' : 'bg-brand-dark'} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12`}>
                  <svg className={`w-8 h-8 ${step.dark ? 'text-brand-dark' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">{step.icon}</svg>
                </div>
                <h4 className="text-2xl font-bold tracking-tight">{step.title}</h4>
                <p className={`text-xl ${step.dark ? 'opacity-90' : 'text-slate-600'} leading-relaxed font-medium`}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-brand-dark text-white pt-40 pb-20 px-6 md:px-20 overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10"
        >
          <div className="lg:col-span-12 flex flex-col items-center text-center space-y-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-5xl font-extrabold tracking-tight"
            >
              E-TD Cotonou
            </motion.div>
            <p className="text-2xl opacity-80 leading-relaxed max-w-3xl font-medium">
              La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel et recevez facilement vos paiements depuis votre interface
            </p>
            <div className="flex gap-12 items-center">
               {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                 <motion.a 
                    key={social} 
                    href="#" 
                    whileHover={{ scale: 1.1, color: '#96D0EE' }}
                    className="text-lg font-bold hover:underline"
                 >
                   {social}
                 </motion.a>
               ))}
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/20 text-center">
          <p className="text-xl font-bold uppercase tracking-widest opacity-60">@copywritting | Designer par Rapides Services | 2026</p>
        </div>
      </footer>
    </div>
  );
}
