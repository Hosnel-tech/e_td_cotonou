"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, startOfDay, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
}

export default function DateRangePicker({ startDate, endDate, onChange, onClose }: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const interval = eachDayOfInterval({ start, end });
    
    // Add padding days for start of week (Monday start)
    const firstDay = start.getDay();
    const paddingStart = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonthDays = Array.from({ length: paddingStart }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() - (paddingStart - i));
      return d;
    });

    return [...prevMonthDays, ...interval];
  }, [currentMonth]);

  const handleDateClick = (date: Date) => {
    const day = startOfDay(date);
    if (!startDate || (startDate && endDate)) {
      onChange(day, null);
    } else {
      if (isBefore(day, startDate)) {
        onChange(day, null);
      } else {
        onChange(startDate, day);
      }
    }
  };

  const isInRange = (date: Date) => {
    if (!startDate) return false;
    if (endDate) return isWithinInterval(date, { start: startDate, end: endDate });
    if (hoverDate && isBefore(startDate, hoverDate)) {
      return isWithinInterval(date, { start: startDate, end: hoverDate });
    }
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-16 left-0 z-[60] bg-white rounded-2xl shadow-2xl border border-stone-100 p-6 min-w-[340px]"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-black font-montserrat">
          {format(currentMonth, 'MMMM yyyy', { locale: fr })}
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
          <span key={d} className="text-[10px] font-bold text-neutral-400 uppercase text-center py-2">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          const isSelected = (startDate && isSameDay(date, startDate)) || (endDate && isSameDay(date, endDate));
          const inRange = isInRange(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);

          return (
            <button
              key={idx}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoverDate(date)}
              onMouseLeave={() => setHoverDate(null)}
              className={`
                relative h-10 w-full rounded-lg text-sm font-semibold transition-all flex items-center justify-center
                ${!isCurrentMonth ? 'text-neutral-300' : 'text-black'}
                ${isSelected ? 'bg-sky-900 text-white shadow-md z-10' : ''}
                ${inRange && !isSelected ? 'bg-sky-900/10 text-sky-900' : ''}
                ${!isSelected && !inRange ? 'hover:bg-slate-100' : ''}
              `}
            >
              {format(date, 'd')}
              {inRange && !isSelected && (
                <div className="absolute inset-0 bg-sky-900/5 -z-10" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-stone-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-neutral-400 uppercase">Période</span>
          <span className="text-xs font-semibold text-black">
            {startDate ? format(startDate, 'dd MMM yyyy', { locale: fr }) : '...'} - {endDate ? format(endDate, 'dd MMM yyyy', { locale: fr }) : '...'}
          </span>
        </div>
        <button 
          onClick={() => { onChange(null, null); onClose(); }}
          className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </motion.div>
  );
}
