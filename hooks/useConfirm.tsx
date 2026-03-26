"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AlertTriangle, Info, Trash2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'success' | 'info';
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  resolve: (value: boolean) => void;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

// ─── Context ─────────────────────────────────────────────────────────────────

const ConfirmContext = createContext<ConfirmFn | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  danger: {
    icon: Trash2,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    confirmBg: 'bg-red-600 hover:bg-red-700 shadow-red-200',
    ring: 'focus-visible:ring-red-500',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    confirmBg: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200',
    ring: 'focus-visible:ring-amber-500',
  },
  success: {
    icon: CheckCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    confirmBg: 'bg-green-700 hover:bg-green-800 shadow-green-200',
    ring: 'focus-visible:ring-green-600',
  },
  info: {
    icon: Info,
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    confirmBg: 'bg-sky-900 hover:bg-sky-950 shadow-sky-200',
    ring: 'focus-visible:ring-sky-700',
  },
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    state?.resolve(true);
    setState(null);
  };

  const handleCancel = () => {
    state?.resolve(false);
    setState(null);
  };

  const variant = state?.variant ?? 'info';
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <AnimatePresence>
        {state?.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="confirm-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
              onClick={handleCancel}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              key="confirm-modal"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              aria-describedby="confirm-description"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6 font-montserrat"
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${config.iconBg}`}>
                  <Icon size={28} className={config.iconColor} />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h2 id="confirm-title" className="text-xl font-bold text-gray-900 leading-snug">
                    {state.title}
                  </h2>
                  {state.description && (
                    <p id="confirm-description" className="text-sm text-gray-500 leading-relaxed">
                      {state.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  {state.cancelLabel ?? 'Annuler'}
                </button>
                <button
                  onClick={handleConfirm}
                  autoFocus
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${config.confirmBg} ${config.ring}`}
                >
                  {state.confirmLabel ?? 'Confirmer'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}
