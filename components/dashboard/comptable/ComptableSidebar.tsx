"use client";

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CreditCard, 
  Send, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', href: '/comptable/dashboard' },
  { icon: CreditCard, label: 'Paiements', href: '/comptable/paiements' },
  { icon: Send, label: 'Virements', href: '/comptable/virements' },
  { icon: Settings, label: 'Paramètres', href: '/comptable/settings' },
];

export default function ComptableSidebar() {
  const pathname = usePathname();

  return (
    <aside 
      className="fixed left-0 top-0 w-72 h-screen bg-white shadow-[0px_0px_8.33px_0px_rgba(0,0,0,0.10)] z-50 flex flex-col font-montserrat"
    >
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

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-4 px-6 py-4 rounded-md transition-all relative overflow-hidden group cursor-pointer ${
                  isActive 
                    ? 'bg-blue-300/25 text-sky-900 border-r-[1.67px] border-sky-900' 
                    : 'text-black hover:bg-gray-50'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={isActive ? 'text-sky-900' : 'text-black'} 
                />
                <span className={`text-base ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <>
                    <ChevronRight size={16} className="ml-auto text-sky-900" />
                    <motion.div 
                      layoutId="comptable-active-indicator"
                      className="absolute right-0 top-0 bottom-0 w-[1.67px] bg-sky-900"
                    />
                  </>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-8">
        <Link href="/login">
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-4 text-red-600 hover:text-red-700 transition-all group w-full px-6 py-4 cursor-pointer"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-semibold">
              Déconnexion
            </span>
          </motion.div>
        </Link>
      </div>
    </aside>
  );
}
