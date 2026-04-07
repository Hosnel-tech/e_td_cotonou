"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Search, ChevronDown, SearchSlash
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import StatCard from '@/components/dashboard/enseignant/StatCard';
import AccountantTable from '@/components/dashboard/admin/AccountantTable';
import AccountantDetailsModal from '@/components/dashboard/admin/AccountantDetailsModal';
import AddAccountantModal from '@/components/dashboard/admin/AddAccountantModal';
import Pagination from '@/components/dashboard/admin/Pagination';
import { exportToCSV } from '@/lib/export.utils';
import { accountantService } from '@/services/accountant.service';
import { Accountant } from '@/types/user.types';

const STATUS_FILTERS = ['Tous', 'Actif', 'Inactif'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

const ITEMS_PER_PAGE = 10;

export default function AccountantsPage() {
  const [accountants, setAccountants] = useState<Accountant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('Tous');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // creation modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Details Modal State
  const [selectedAccountant, setSelectedAccountant] = useState<Accountant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    accountantService.getAccountants().then(setAccountants);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredAccountants = accountants.filter((acc) => {
    const matchesSearch = 
      acc.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      activeFilter === 'Tous' || 
      acc.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredAccountants.length / ITEMS_PER_PAGE));
  const paginatedAccountants = filteredAccountants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );



  const handleViewAccountant = (acc: Accountant) => {
    setSelectedAccountant(acc);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: string, status: any) => {
    try {
      await accountantService.updateStatus(id, status);
      const updated = await accountantService.getAccountants();
      setAccountants(updated);
    } catch (error) {
       console.error('Error updating status:', error);
       alert('Erreur lors de la mise à jour du statut.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await accountantService.deleteAccountant(id);
      const updated = await accountantService.getAccountants();
      setAccountants(updated);
    } catch (error) {
       console.error('Error deleting accountant:', error);
       alert('Erreur lors de la suppression.');
    }
  };



  return (
    <div className="p-10 space-y-10">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Comptables</h1>
            <p className="text-xl font-normal text-gray-600">Gérez les comptes des comptables et leurs accès</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-8 py-4 bg-sky-900 text-white rounded-xl font-bold shadow-lg hover:bg-sky-950 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
          >
            <Users size={20} />
            Créer un compte
          </button>
        </header>

        {/* Stats Grid */}
        <section className="flex flex-wrap gap-8">
          <StatCard label="Total Comptables" value={accountants.length.toString()} icon={Users} variant="green" trend={accountants.length > 0 ? "Actualisé" : "Initialisé"} staggerIndex={0} />
          <StatCard label="Actifs" value={accountants.filter(a => a.status === 'actif').length.toString()} icon={Users} variant="sky" trend={accountants.filter(a => a.status === 'actif').length > 0 ? "Actif" : "Aucun"} staggerIndex={1} />
          <StatCard label="Inactifs" value={accountants.filter(a => a.status === 'inactif').length.toString()} icon={Users} variant="orange" trend={accountants.filter(a => a.status === 'inactif').length > 0 ? "À voir" : "Aucun"} staggerIndex={2} />
        </section>

        {/* Search & Filters */}
        <section className="bg-white rounded-[10px] p-8 shadow-sm border border-stone-100 space-y-6 text-black">
          <h2 className="text-xl font-semibold">Recherche avancée</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-14 bg-white rounded-lg border border-neutral-300 flex items-center px-5 gap-3">
              <Search className="text-neutral-400 shrink-0" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { 
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Rechercher par nom, prénom ou email..."
                className="flex-1 bg-transparent outline-none text-base font-semibold placeholder:text-neutral-400"
              />
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 h-14 px-6 bg-white rounded-lg border border-neutral-300 shadow-sm transition-all hover:border-sky-900/50 min-w-[200px] justify-between cursor-pointer"
              >
                <span className="text-lg font-medium">
                  {activeFilter === 'Tous' ? 'Tous les statuts' : activeFilter}
                </span>
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }}>
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-2 w-full bg-white rounded-lg shadow-xl z-30 overflow-hidden border border-stone-100"
                  >
                    {STATUS_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => { 
                          setActiveFilter(f); 
                          setDropdownOpen(false); 
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-5 py-4 text-base font-medium hover:bg-sky-900/5 transition-colors ${activeFilter === f ? 'text-sky-900 font-semibold' : 'text-gray-700'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Accountants Table Area */}
        <section className="bg-white rounded-lg shadow-sm border border-stone-100 p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Liste des comptables</h2>
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
             >
               <AccountantTable 
                 accountants={paginatedAccountants}
                 onView={handleViewAccountant}
                 onStatusUpdate={handleStatusUpdate}
                 onDelete={handleDelete}
                 hideSelection={true}
               />
             </motion.div>
          </AnimatePresence>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredAccountants.length}
          />
        </section>
        

      {/* Accountant Details Modal */}
      <AccountantDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        accountant={selectedAccountant}
      />

      {/* Add Accountant Modal */}
      <AddAccountantModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => accountantService.getAccountants().then(setAccountants)}
      />
    </div>
  );
}
