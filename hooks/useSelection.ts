"use client";

import { useState, useCallback, useMemo } from 'react';

export function useSelection<T extends { id: string }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  const isAllSelected = useMemo(() => {
    return items.length > 0 && selectedIds.size === items.length;
  }, [items, selectedIds]);

  const isIndeterminate = useMemo(() => {
    return selectedIds.size > 0 && selectedIds.size < items.length;
  }, [items, selectedIds]);

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map((item) => item.id)));
    }
    setLastSelectedId(null);
  }, [items, isAllSelected]);

  const toggleSelectOne = useCallback((id: string, isShiftKey: boolean = false) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      
      if (isShiftKey && lastSelectedId) {
        const lastIndex = items.findIndex(item => item.id === lastSelectedId);
        const currentIndex = items.findIndex(item => item.id === id);
        
        if (lastIndex !== -1 && currentIndex !== -1) {
          const start = Math.min(lastIndex, currentIndex);
          const end = Math.max(lastIndex, currentIndex);
          
          const itemsToSelect = items.slice(start, end + 1);
          const shouldAdd = !prev.has(id);
          
          itemsToSelect.forEach(item => {
            if (shouldAdd) newSet.add(item.id);
            else newSet.delete(item.id);
          });
          
          return newSet;
        }
      }

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      
      setLastSelectedId(id);
      return newSet;
    });
  }, [items, lastSelectedId]);

  const isSelected = useCallback((id: string) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setLastSelectedId(null);
  }, []);

  return {
    selectedIds: Array.from(selectedIds),
    isAllSelected,
    isIndeterminate,
    toggleSelectAll,
    toggleSelectOne,
    isSelected,
    clearSelection,
    hasSelection: selectedIds.size > 0,
    selectionCount: selectedIds.size,
  };
}
