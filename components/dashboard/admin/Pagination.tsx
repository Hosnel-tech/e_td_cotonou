"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between py-6 px-2 font-montserrat bg-transparent border-t border-gray-100">
      {/* Total Count - Smaller, more subtle as in the image */}
      <span className="text-xl font-medium text-[#1A1A1A]">
        Total {totalItems}
      </span>

      {/* Pagination Controls */}
      <div className="flex items-center gap-4">
        {/* Previous */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="text-[#CCCCCC] disabled:cursor-not-allowed hover:text-[#046c3c] transition-colors"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Page Numbers - Exact match to image */}
        <div className="flex items-center gap-2">
          {getPages().map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-[34px] h-[34px] flex items-center justify-center rounded-[4px] font-bold text-base transition-all ${
                  isActive
                    ? 'bg-[#046c3c] text-white' // Dark Forest Green
                    : 'border border-[#046c3c] text-[#046c3c] hover:bg-green-50'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="text-[#1A1A1A] disabled:text-[#CCCCCC] disabled:cursor-not-allowed hover:text-[#046c3c] transition-colors"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
