"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpenCheck, 
  Users, 
  Wallet, 
  Settings, 
  LogOut,
  ChevronRight,
  Calendar
} from 'lucide-react';

const navItems = [
  { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Gestion des TD', href: '/admin/dashboard/td-management', icon: BookOpenCheck },
  { name: 'Enseignants', href: '/admin/dashboard/teachers', icon: Users },
  { name: 'Comptables', href: '/admin/dashboard/accountants', icon: Users },
  { name: 'Paiements TD', href: '/admin/dashboard/payments', icon: Wallet },
  { name: 'Paramètres', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration safety: Return a placeholder or the background to avoid layout shift
  if (!mounted) {
    return (
      <div className="w-72 h-screen bg-white shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.10)] flex flex-col fixed left-0 top-0 z-50">
        <div className="p-8 flex items-center gap-4">
          <div className="relative w-16 h-16 bg-gray-50 rounded-lg animate-pulse" />
          <div className="h-6 w-32 bg-gray-50 rounded animate-pulse" />
        </div>
        <div className="flex-1 px-4 py-8 space-y-4">
          {navItems.map((item, i) => (
            <div key={i} className="h-12 bg-gray-50 rounded-md animate-pulse mx-2" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 h-screen bg-white shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.10)] flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image 
            src="https://ik.imagekit.io/hwjv8hvj0/logo-mairie-cotonou%20(1)%201.png?updatedAt=1772469936525" 
            alt="E-TD Cotonou Logo" 
            width={64}
            height={64}
            className="rounded-lg object-contain"
          />
        </div>
        <span className="text-sky-900 text-xl font-semibold font-montserrat">E-TD <br /> Cotonou</span>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 px-6 py-4 rounded-md transition-all relative overflow-hidden group ${
                  isActive 
                    ? 'bg-blue-300/25 text-sky-900 border-r-[1.67px] border-sky-900' 
                    : 'text-black hover:bg-gray-50'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={isActive ? 'text-sky-900' : 'text-black'} 
                />
                <span className={`text-base font-montserrat ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <ChevronRight size={16} className="ml-auto text-sky-900" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="p-8">
        <button 
          className="flex items-center gap-4 text-red-600 hover:text-red-700 transition-all group w-full px-6 py-4"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-semibold font-montserrat">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
