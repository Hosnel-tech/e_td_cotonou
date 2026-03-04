"use client";

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export default function ComptableHero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-72 bg-[#96D0EE] rounded-2xl p-10 overflow-hidden flex items-center shadow-sm"
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-[700px] flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-sky-900 text-3xl font-bold font-montserrat">
            Jean Claude Bienvenu sur votre dashboard !
          </h2>
          <p className="text-sky-900 text-3xl font-normal font-montserrat leading-relaxed">
            Grâce aux travaux dirigés, accompagnez vos élèves vers la réussite.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-fit px-10 py-4 bg-sky-900 text-white rounded-[10px] inline-flex items-center justify-center gap-2.5 text-xl font-semibold font-montserrat shadow-lg shadow-sky-900/20 transition-all"
        >
          <LogOut size={20} className="mr-1" />
          Se déconnecter
        </motion.button>
      </div>

      {/* Illustration */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] hidden xl:block"
      >
        <Image 
          src="https://ik.imagekit.io/hwjv8hvj0/Whisk_233cd415af16997a64b4c17267a56082dr-removebg-preview%201.png" 
          alt="Dashboard Illustration" 
          width={400}
          height={400}
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-900/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </motion.section>
  );
}
