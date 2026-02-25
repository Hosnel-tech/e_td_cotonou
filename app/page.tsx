import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* --- Header / Navigation --- */}
      <header className="bg-brand-light px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-dark">E-TD Cotonou</div>
          
          <div className="hidden md:flex items-center space-x-12 text-brand-dark font-semibold">
            <a href="#features" className="hover:opacity-70 transition">Fonctionnalités</a>
            <a href="#how-it-works" className="hover:opacity-70 transition">Comment ça marche ?</a>
            <a href="#about" className="hover:opacity-70 transition">A propos</a>
          </div>

          <button className="bg-brand-dark text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition font-bold">
            Se connecter
            <ArrowRight size={18} />
          </button>
        </nav>
      </header>

      {/* --- Main Hero Content --- */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Text Content */}
        <div className="space-y-10">
          <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark leading-[1.15] tracking-tight">
            L’excellence du soutien scolaire pour le <span className="text-brand-dark uppercase">CEP, BEPC & BAC</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-800 leading-relaxed max-w-2xl font-medium">
            La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel 
            et recevoir facilement vos paiements depuis votre interface
          </p>

          <button className="bg-brand-dark text-white px-12 py-4 rounded-xl text-xl font-bold shadow-2xl hover:translate-y-[-2px] transition-all duration-300 active:scale-95">
            Se connecter
          </button>
        </div>

        {/* Right Column: Visuals - Senior-level Refined Alignment */}
        <div className="relative h-[650px] w-full mt-12 lg:mt-0">
          
          {/* Boy Image (Navy Blob) - Background Position, Pushed Up and Right */}
          <div className="absolute right-[-10%] top-0 w-[65%] h-[80%] z-10 transition-transform duration-500 hover:scale-105">
            <Image 
              src="/student-boy.png" 
              alt="Étudiant avec sac à dos"
              fill
              className="object-contain object-right-top"
              priority
            />
          </div>

          {/* Girl Image (Green Blob) - Foreground Position, Pushed Left and Down */}
          <div className="absolute left-[-5%] bottom-4 w-[55%] h-[80%] z-20 transition-transform duration-500 hover:scale-105">
            <Image 
              src="/student-girl.png" 
              alt="Étudiante souriante"
              fill
              className="object-contain object-left-bottom"
              priority
            />
          </div>
          
        </div>

      </main>

      {/* Rest of the page remains the same but ensure colors align */}
      {/* Stats Section */}
      <section className="bg-brand-dark py-24 px-6 md:px-20 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-white">
          <div className="text-center space-y-2 border-r border-white/20 last:border-none">
            <div className="text-6xl font-extrabold tracking-tight">98%</div>
            <div className="text-xl font-medium opacity-90 uppercase tracking-wide">Taux de réussite</div>
          </div>
          <div className="text-center space-y-2 lg:border-r border-white/20 last:border-none">
            <div className="text-6xl font-extrabold tracking-tight">500+</div>
            <div className="text-xl font-medium opacity-90 uppercase tracking-wide">Enseignants</div>
          </div>
          <div className="text-center space-y-2 border-r border-white/20 last:border-none">
            <div className="text-6xl font-extrabold tracking-tight">50+</div>
            <div className="text-xl font-medium opacity-90 uppercase tracking-wide">Centre de TD</div>
          </div>
          <div className="text-center space-y-2 last:border-none">
            <div className="text-6xl font-extrabold tracking-tight">24/7</div>
            <div className="text-xl font-medium opacity-90 uppercase tracking-wide">Disponibilité</div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="features" className="py-40 px-6 md:px-20 space-y-40">
        <div className="text-center space-y-6">
          <h2 className="text-6xl font-extrabold text-slate-900 tracking-tight">Une solution pour chaque rôle</h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">Des outils adaptés spécifiquement pour les enseignants, les administrateurs et les comptables</p>
        </div>

        {/* Teachers */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Enseignants</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Planifiez des sessions de TD, suivez leur statut en temps réel et recevez facilement vos paiements depuis une interface intuitive</p>
          </div>
          <div className="flex-1">
            <Image src="/teacher_dashboard.png" alt="Teacher Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100" />
          </div>
        </div>

        {/* Admin */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Administrateurs</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Un tableau de bord intuitif pour superviser l’ensemble des activités pédagogiques et gérer les utilisateurs</p>
          </div>
          <div className="flex-1">
            <Image src="/admin_dashboard.png" alt="Admin Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100" />
          </div>
        </div>

        {/* Accountant */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-4xl font-extrabold text-slate-900">Pour les Comptables</h3>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">Suivi des paiements, gestion des frais et génération des rapports pour les états de paiement et de virement</p>
          </div>
          <div className="flex-1">
            <Image src="/accountant_dashboard.png" alt="Accountant Dashboard" width={600} height={400} className="rounded-3xl shadow-2xl border border-slate-100" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-40 bg-slate-50 px-6 md:px-20">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-6xl font-extrabold text-slate-900 tracking-tight">Comment ça marche ?</h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">Nous avons simplifié chaque étape pour vous permettre de comprendre notre fonctionnement en un clin d&apos;œil.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-brand-dark p-12 rounded-[40px] space-y-8 text-white shadow-xl">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold tracking-tight">Création de compte</h4>
              <p className="text-xl opacity-90 leading-relaxed">Inscrivez-vous et accédez à votre espace adapté en fonction de votre profil</p>
            </div>
            
            <div className="bg-white p-12 rounded-[40px] space-y-8 shadow-2xl border border-slate-100">
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold tracking-tight text-slate-900">Configuration</h4>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">Configurez vos informations, ajoutez des travaux dirigés et suivez leur statut en temps réel</p>
            </div>

            <div className="bg-white p-12 rounded-[40px] space-y-8 shadow-2xl border border-slate-100">
              <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold tracking-tight text-slate-900">Gestion & suivi</h4>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">Recevez des notifications, suivez les performances et assurez le succès des candidats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-40 pb-20 px-6 md:px-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
          <div className="lg:col-span-12 flex flex-col items-center text-center space-y-12">
            <div className="text-5xl font-extrabold tracking-tight">E-TD Cotonou</div>
            <p className="text-2xl opacity-80 leading-relaxed max-w-3xl font-medium">
              La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel et recevez facilement vos paiements depuis votre interface
            </p>
            <div className="flex gap-12 items-center">
               <a href="#" className="text-lg font-bold hover:underline">Facebook</a>
               <a href="#" className="text-lg font-bold hover:underline">Twitter</a>
               <a href="#" className="text-lg font-bold hover:underline">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/20 text-center">
          <p className="text-xl font-bold uppercase tracking-widest opacity-60">@copywritting | Designer par Rapides Services | 2026</p>
        </div>
      </footer>
    </div>
  );
}
