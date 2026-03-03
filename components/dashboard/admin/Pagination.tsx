"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex items-center gap-4">
      <button className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
        <ChevronLeft size={24} />
      </button>
      
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              className={`w-12 h-12 flex items-center justify-center rounded-md text-2xl font-semibold transition-all shadow-sm ${
                isActive 
                  ? 'bg-green-800 text-white' 
                  : 'bg-white text-green-800 border border-green-800 hover:bg-green-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button className="w-8 h-8 flex items-center justify-center text-black hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
