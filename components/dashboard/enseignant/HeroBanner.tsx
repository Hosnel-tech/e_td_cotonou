"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-70 bg-[#96D0EE] rounded-2xl px-10 py-5 flex justify-between items-center relative overflow-hidden"
    >
      <div className="z-10 flex flex-col justify-center gap-4 max-w-2xl">
        <h2 className="text-3xl font-semibold text-sky-900 font-montserrat">
          Bienvenu sur votre dashboard enseignant !
        </h2>
        <p className="text-2xl font-normal text-sky-800 font-montserrat leading-relaxed">
          Grâce aux travaux dirigés, accompagnez vos élèves vers la réussite.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="w-fit px-8 py-3 bg-sky-900 text-white rounded-xl text-xl font-semibold mt-2 shadow-lg shadow-sky-900/20 active:translate-y-0.5 transition-all font-montserrat"
        >
          Se déconnecter
        </motion.button>
      </div>
      
      {/* Decorative Illustration Holder */}
      <div className="hidden lg:block relative w-96 h-96 -mr-12 -mt-12">
        <Image 
          src="https://ik.imagekit.io/hwjv8hvj0/Whisk_233cd415af16997a64b4c17267a56082dr-removebg-preview%201.png" 
          alt="Dashboard Illustration" 
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-900/5 rounded-full blur-3xl -mr-32 -mt-32" />
    </motion.div>
  );
}
