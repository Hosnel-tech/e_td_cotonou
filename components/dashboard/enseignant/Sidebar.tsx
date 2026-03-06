"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpenCheck, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { name: 'Tableau de bord', href: '/enseignant/dashboard', icon: LayoutDashboard },
  { name: 'Gestion des TD', href: '/enseignant/dashboard/td-management', icon: BookOpenCheck },
  { name: 'Paiements', href: '/enseignant/dashboard/payments', icon: CreditCard },
  { name: 'Paramètres', href: '/enseignant/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 h-screen bg-white shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.10)] flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image 
            src="https://ik.imagekit.io/hwjv8hvj0/logo-mairie-cotonou%20(1)%201.png?updatedAt=1772469936525" 
            alt="TD Hub Logo" 
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
                    ? 'bg-[#96D0EE]/50 text-sky-900 border-r-2 border-sky-900' 
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
