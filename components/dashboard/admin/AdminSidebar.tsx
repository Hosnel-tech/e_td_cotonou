"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpenCheck, 
  Users, 
  Wallet, 
  Settings, 
  LogOut 
} from 'lucide-react';

const navItems = [
  { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Gestion des TD', href: '/admin/dashboard/td-management', icon: BookOpenCheck },
  { name: 'Enseignants', href: '/admin/dashboard/teachers', icon: Users },
  { name: 'Comptables', href: '/admin/dashboard/accountants', icon: Wallet },
  { name: 'Paramètres', href: '/admin/dashboard/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 h-screen bg-white shadow-xl flex flex-col fixed left-0 top-0 z-50 font-montserrat">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <Image 
            src="https://placehold.co/125x125/004B70/FFFFFF/png?text=TD" 
            alt="TD Hub Logo" 
            fill
            className="rounded-lg object-contain"
          />
        </div>
        <span className="text-sky-900 text-2xl font-bold">TD Hub</span>
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
                    ? 'bg-blue-300/10 text-sky-900 border-r-[1.67px] border-sky-900' 
                    : 'text-gray-900 hover:text-black hover:bg-gray-50'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={isActive ? 'text-sky-900' : 'text-gray-400 group-hover:text-black'} 
                />
                <span className={`text-base ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="admin-active-indicator"
                    className="absolute right-0 top-0 bottom-0 w-[1.67px] bg-sky-900" 
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div className="p-8 border-t border-gray-100">
        <button 
          className="flex items-center gap-4 text-red-600 hover:text-red-700 transition-all group w-full px-6 py-4"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-semibold">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
