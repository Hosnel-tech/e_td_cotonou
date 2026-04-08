import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSaturday, 
  format 
} from 'date-fns';

/**
 * Returns an array of formatted date strings (YYYY-MM-DD) for all Saturdays 
 * in the current month.
 */
export function getSaturdaysOfCurrentMonth(): string[] {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  const days = eachDayOfInterval({ start, end });
  
  return days
    .filter(date => isSaturday(date))
    .map(date => format(date, 'yyyy-MM-dd'));
}
