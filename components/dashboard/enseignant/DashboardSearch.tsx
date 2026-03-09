"use client";

import { Search } from 'lucide-react';

interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DashboardSearch({ 
  value, 
  onChange, 
  placeholder = "Rechercher.....",
  className = ""
}: DashboardSearchProps) {
  return (
    <div className={`relative flex-1 group w-full ${className}`}>
      <Search 
        className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${
          value ? 'text-sky-900' : 'text-zinc-300'
        } group-focus-within:text-sky-900`} 
        size={20} 
      />
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 pl-14 pr-6 bg-white rounded-lg border border-neutral-300 outline-none font-semibold font-montserrat text-black placeholder:text-neutral-400 transition-shadow focus:border-sky-900/40 focus:ring-4 focus:ring-sky-900/5"
      />
    </div>
  );
}
