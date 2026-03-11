"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  ChevronDown,
  Trash2, // Added Trash2 icon
} from 'lucide-react';
import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import Pagination from '@/components/dashboard/admin/Pagination';
import AccountantTable, { Accountant } from '@/components/dashboard/admin/AccountantTable';
import AddAccountantModal from '@/components/dashboard/admin/AddAccountantModal';
import AccountantDetailModal from '@/components/dashboard/admin/AccountantDetailModal';
import { useSelection } from '@/hooks/useSelection'; // Imported useSelection hook

const mockAccountants: Accountant[] = [
  { id: '1', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
  { id: '2', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
  { id: '3', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'inactif' },
  { id: '4', lastName: 'VIGAN', firstName: 'Pauline', email: 'lino@gmail.com', phone: '01 95 45 12 23', status: 'actif' },
];

export default function AdminAccountantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Tous' | 'Actif' | 'Inactif'>('Tous');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAccountant, setSelectedAccountant] = useState<Accountant | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAccountants = mockAccountants.filter(acc => {
    const matchesSearch = (acc.firstName + ' ' + acc.lastName).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Tous' || acc.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const { isSelected, toggleSelectOne, isAllSelected, toggleSelectAll, hasSelection, selectionCount } = useSelection(filteredAccountants);

  return (
    <div className="flex min-h-screen bg-slate-50 font-montserrat">
      <AdminSidebar />

      <main className="flex-1 ml-72 p-10 space-y-10">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-black font-montserrat">Comptables</h1>
          <p className="text-xl font-normal text-black/60 font-montserrat">Gérez tous les comptables répertoriés sur la plateforme</p>
        </header>

        {/* Advanced Search Card */}
        <section className="bg-white rounded-[10px] p-8 space-y-8 shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] relative">
          <h2 className="text-xl font-semibold text-black font-montserrat">Recherche avancée</h2>
          
          <div className="space-y-6">
            {/* Full-width Search Bar */}
            <div className="w-full h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-6 gap-4 focus-within:border-sky-900 transition-colors">
              <Search className="text-neutral-400" size={24} />
              <input 
                type="text" 
                placeholder="Rechercher....." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400 text-black font-montserrat"
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Status Filter Container */}
              <div className="flex flex-col gap-2">
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center justify-between h-14 w-44 px-6 bg-white rounded-lg border border-neutral-300 shadow-sm group hover:border-sky-900 transition-all font-montserrat"
                  >
                    <span className="text-black text-xl font-medium">{selectedStatus === 'Tous' ? 'Statut' : selectedStatus}</span>
                    <motion.div
                      animate={{ rotate: showStatusDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="text-black" size={24} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showStatusDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-16 left-0 w-44 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
                      >
                        {['Tous', 'Actif', 'Inactif'].map((status, idx, arr) => (
                          <button
                            key={status}
                            onClick={() => {
                              setSelectedStatus(status as any);
                              setShowStatusDropdown(false);
                            }}
                            className={`w-full px-6 py-4 text-left text-base font-medium font-montserrat transition-colors hover:bg-sky-900/5 ${
                              selectedStatus === status ? 'text-sky-900 font-semibold' : 'text-black'
                            } ${idx < arr.length - 1 ? 'border-b border-zinc-100' : ''}`}
                          >
                            {status}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Bulk Delete Button */}
              <AnimatePresence>
                {hasSelection && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-2 h-14 bg-red-600 text-white px-6 rounded-lg shadow-lg hover:bg-red-700 transition-all font-montserrat active:scale-95"
                  >
                    <Trash2 size={20} />
                    <span className="text-lg font-semibold whitespace-nowrap">
                      Supprimer ({selectionCount})
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Add Button */}
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-4 h-14 bg-sky-900 text-white px-8 rounded-lg shadow-lg hover:bg-sky-950 transition-all font-montserrat group"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md group-hover:scale-110 transition-transform">
                  <Plus size={20} className="text-sky-900 stroke-[3px]" />
                </div>
                <span className="text-xl font-semibold">Nouveau comptable</span>
              </button>
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="bg-white rounded-lg shadow-[0px_0px_8.33px_0.83px_rgba(0,0,0,0.10)] p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black font-montserrat">Comptables</h2>
          </div>

          <AnimatePresence mode="wait">
            {filteredAccountants.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-black/40 text-xl py-12 font-montserrat"
              >
                Aucun comptable trouvé.
              </motion.p>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <AccountantTable 
                  accountants={filteredAccountants} 
                  onView={(acc) => {
                    setSelectedAccountant(acc);
                    setIsDetailModalOpen(true);
                  }}
                  isSelected={isSelected}
                  toggleSelectOne={toggleSelectOne}
                  isAllSelected={isAllSelected}
                  toggleSelectAll={toggleSelectAll}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table Footer / Pagination */}
          <div className="flex items-center justify-between pt-10 border-t border-stone-300">
            <span className="text-2xl font-normal text-black font-montserrat">Total {filteredAccountants.length}</span>
            <Pagination currentPage={1} totalPages={2} />
          </div>
        </section>

      </main>

      <AddAccountantModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <AccountantDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        accountant={selectedAccountant}
      />
    </div>
  );
}
