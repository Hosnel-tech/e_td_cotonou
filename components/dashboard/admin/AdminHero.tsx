"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AdminHero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-64 bg-[#96D0EE] rounded-[10px] overflow-hidden p-10 flex items-center justify-between font-montserrat"
    >
      <div className="space-y-6 z-10 max-w-[711px]">
        <div className="space-y-2">
          <h2 className="text-sky-900 text-3xl font-bold">
            Bienvenu sur votre dashboard admin !
          </h2>
          <p className="text-sky-900 text-3xl font-normal leading-relaxed">
            Grâce aux travaux dirigés, accompagnez vos élèves vers la réussite.
          </p>
        </div>
        
        <button className="px-8 py-4 bg-sky-900 text-white rounded-[10px] text-xl font-semibold transition-all hover:bg-sky-950 hover:shadow-lg active:scale-95">
          Se déconnecter
        </button>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[366px] h-[366px] hidden xl:block">
        <Image 
          src="https://ik.imagekit.io/hwjv8hvj0/Whisk_233cd415af16997a64b4c17267a56082dr-removebg-preview%201.png?updatedAt=1772474060082" 
          alt="Dashboard Illustration" 
          width={366}
          height={366}
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </motion.section>
  );
}
