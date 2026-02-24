import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-sky-300/80 backdrop-blur-md h-28 flex items-center px-20">
        <div className="text-sky-900 text-3xl font-bold">E-TD Cotonou</div>
        <div className="ml-auto hidden md:flex items-center gap-12 text-sky-900 text-xl font-semibold">
          <a href="#features" className="hover:text-sky-700 transition-colors">Fonctionnalités</a>
          <a href="#how-it-works" className="hover:text-sky-700 transition-colors">Comment ça marche ?</a>
          <a href="#about" className="hover:text-sky-700 transition-colors">À propos</a>
        </div>
        <button className="ml-auto md:ml-12 px-7 py-3 bg-sky-900 text-white text-xl font-semibold rounded-lg hover:bg-sky-800 transition-all flex items-center gap-2">
          Se connecter
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-20 pt-32 pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-12">
            <h1 className="text-sky-900 text-5xl md:text-7xl font-bold leading-tight">
              L’excellence du soutien scolaire pour le <span className="text-sky-900">CEP, BEPC & BAC</span>
            </h1>
            <p className="text-gray-800 text-3xl font-medium leading-relaxed max-w-2xl">
              La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel et recevoir facilement vos paiements depuis votre interface
            </p>
            <button className="px-10 py-5 bg-sky-900 text-white text-2xl font-bold rounded-xl hover:bg-sky-800 hover:scale-105 transition-all shadow-xl">
              Se connecter
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-sky-900/10 rounded-full blur-3xl -z-10"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image 
                src="/hero_students.png" 
                alt="E-TD Cotonou Students" 
                width={800} 
                height={800} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-sky-900 py-20 px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-white">
          <div className="text-center space-y-2 border-r border-white/20 last:border-none">
            <div className="text-5xl font-bold">98%</div>
            <div className="text-2xl font-normal opacity-90">Taux de réussite</div>
          </div>
          <div className="text-center space-y-2 lg:border-r border-white/20 last:border-none">
            <div className="text-5xl font-bold">500+</div>
            <div className="text-2xl font-normal opacity-90">Enseignants</div>
          </div>
          <div className="text-center space-y-2 border-r border-white/20 last:border-none">
            <div className="text-5xl font-bold">50+</div>
            <div className="text-2xl font-normal opacity-90">Centre de TD</div>
          </div>
          <div className="text-center space-y-2 last:border-none">
            <div className="text-5xl font-bold">24/7</div>
            <div className="text-2xl font-normal opacity-90">Disponibilité</div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="features" className="py-40 px-20 space-y-40">
        <div className="text-center space-y-6">
          <h2 className="text-5xl font-bold text-black">Une solution pour chaque rôle</h2>
          <p className="text-3xl text-gray-700 max-w-4xl mx-auto">Des outils adaptés spécifiquement pour les enseignants, les administrateurs et les comptables</p>
        </div>

        {/* Teachers */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-20 h-20 bg-sky-900 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-4xl font-bold text-black">Pour les Enseignants</h3>
            <p className="text-3xl text-gray-600 leading-relaxed">Planifiez des sessions de TD, suivez leur statut en temps réel et recevez facilement vos paiements depuis une interface intuitive</p>
          </div>
          <div className="flex-1">
            <Image src="/teacher_dashboard.png" alt="Teacher Dashboard" width={600} height={400} className="rounded-2xl shadow-2xl" />
          </div>
        </div>

        {/* Admin */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-20 h-20 bg-green-800 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 className="text-4xl font-bold text-black">Pour les Administrateurs</h3>
            <p className="text-3xl text-gray-600 leading-relaxed">Un tableau de bord intuitif pour superviser l’ensemble des activités pédagogiques et gérer les utilisateurs</p>
          </div>
          <div className="flex-1">
            <Image src="/admin_dashboard.png" alt="Admin Dashboard" width={600} height={400} className="rounded-2xl shadow-2xl" />
          </div>
        </div>

        {/* Accountant */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-4xl font-bold text-black">Pour les Comptables</h3>
            <p className="text-3xl text-gray-600 leading-relaxed">Suivi des paiements, gestion des frais et génération des rapports pour les états de paiement et de virement</p>
          </div>
          <div className="flex-1">
            <Image src="/accountant_dashboard.png" alt="Accountant Dashboard" width={600} height={400} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-40 bg-gray-50 px-20">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-black">Comment ça marche ?</h2>
            <p className="text-3xl text-gray-700 max-w-4xl mx-auto">Nous avons simplifié chaque étape pour vous permettre de comprendre notre fonctionnement en un clin d&apos;œil.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-sky-900 p-12 rounded-3xl space-y-8 text-white">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-sky-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold">Création de compte</h4>
              <p className="text-xl opacity-90">Inscrivez-vous et accédez à votre espace adapté en fonction de votre profil</p>
            </div>
            
            <div className="bg-white p-12 rounded-3xl space-y-8 shadow-xl">
              <div className="w-16 h-16 bg-sky-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold">Configuration</h4>
              <p className="text-xl text-gray-600">Configurez vos informations, ajoutez des travaux dirigés et suivez leur statut en temps réel</p>
            </div>

            <div className="bg-white p-12 rounded-3xl space-y-8 shadow-xl">
              <div className="w-16 h-16 bg-sky-900 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h4 className="text-2xl font-bold">Gestion & suivi</h4>
              <p className="text-xl text-gray-600">Recevez des notifications, suivez les performances et assurez le succès des candidats</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-20">
        <div className="max-w-7xl mx-auto bg-sky-900/5 rounded-[40px] p-24 text-center space-y-12 border border-sky-900/10">
          <h2 className="text-6xl font-bold text-sky-900">Prêt à transformer la gestion de vos TD ?</h2>
          <p className="text-3xl text-sky-900/80 max-w-4xl mx-auto">Rejoignez des centaines d’enseignants et d’administrateurs qui font confiance à notre solution</p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 pt-6">
            <button className="px-10 py-5 bg-sky-900 text-white text-xl font-bold rounded-2xl hover:bg-sky-800 transition-all shadow-xl">Créer un compte gratuit</button>
            <button className="px-10 py-5 bg-slate-200 text-sky-900 text-xl font-bold rounded-2xl border border-sky-900 hover:bg-slate-300 transition-all">Contactez l’équipe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-900 text-white pt-40 pb-20 px-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
          <div className="lg:col-span-5 space-y-12">
            <div className="text-4xl font-bold">E-TD Cotonou</div>
            <p className="text-xl opacity-80 leading-relaxed max-w-md">
              La plateforme tout en un pour gérer les travaux dirigés, suivre leur statut en temps réel et recevez facilement vos paiements depuis votre interface
            </p>
            <div className="flex gap-8">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-sky-900 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-current" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <h5 className="text-xl font-bold">Produit</h5>
            <ul className="space-y-4 opacity-80 text-lg">
              <li><a href="#" className="hover:opacity-100">Fonctionnalités</a></li>
              <li><a href="#" className="hover:opacity-100">Tarification</a></li>
              <li><a href="#" className="hover:opacity-100">Mise à jour</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <h5 className="text-xl font-bold">Ressources</h5>
            <ul className="space-y-4 opacity-80 text-lg">
              <li><a href="#" className="hover:opacity-100">Guide d’utilisation</a></li>
              <li><a href="#" className="hover:opacity-100">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100">Support</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <h5 className="text-xl font-bold">Légal</h5>
            <ul className="space-y-4 opacity-80 text-lg">
              <li><a href="#" className="hover:opacity-100">Confidentialité</a></li>
              <li><a href="#" className="hover:opacity-100">Conditions d’utilisation</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-40 pt-12 border-t border-white/20 text-center">
          <p className="text-xl font-semibold font-inter">@copywritting | Designer par Rapides Services | 2026</p>
        </div>
      </footer>
    </div>
  );
}
