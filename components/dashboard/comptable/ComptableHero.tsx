"use client";

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export default function ComptableHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-80 bg-[#96D0EE] rounded-[10px] px-10 py-12 flex justify-between items-center relative overflow-hidden"
    >
      <div className="z-10 flex flex-col justify-center gap-4 max-w-2xl">
        <h2 className="text-3xl font-semibold text-sky-900 font-montserrat leading-tight">
          Bienvenu sur votre dashboard comptable !
        </h2>
        <p className="text-2xl font-medium text-black font-montserrat leading-relaxed">
          Grâce aux travaux dirigés, accompagnez vos élèves vers la réussite.
        </p>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-fit px-8 py-4 bg-sky-900 text-white rounded-[10px] text-xl font-semibold mt-4 shadow-lg shadow-sky-900/10 transition-all font-montserrat"
        >
          Se déconnecter
        </motion.button>
      </div>
      
      {/* Decorative Illustration */}
      <div className="hidden lg:block relative w-[450px] h-[450px] -mr-6 -mt-3">
        <Image 
          src="https://ik.imagekit.io/hwjv8hvj0/Whisk_233cd415af16997a64b4c17267a56082dr-removebg-preview%201.png" 
          alt="Dashboard Illustration" 
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl -mr-40 -mt-40" />
    </motion.div>
  );
}
