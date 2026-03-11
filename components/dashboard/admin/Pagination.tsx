"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors disabled:opacity-30">
        <ChevronLeft size={28} />
      </button>
      
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              className={`w-12 h-12 flex items-center justify-center rounded-md text-2xl font-semibold font-montserrat transition-all ${
                isActive 
                  ? 'bg-green-800 text-white shadow-md transition-transform hover:scale-105' 
                  : 'bg-white text-green-800 border border-green-800 hover:bg-green-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button className="w-10 h-10 flex items-center justify-center text-black/60 hover:text-black transition-colors disabled:opacity-30">
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
