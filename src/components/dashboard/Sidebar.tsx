'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  BookOpen,
  FileText,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Table,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Trading Accounts', href: '/dashboard/trading-accounts', icon: Briefcase },
  { label: 'Ledger', href: '/dashboard/ledger', icon: BookOpen },
  { label: 'Subledger', href: '/dashboard/subledger', icon: Table },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({ isOpen, onToggle, isMobile }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl border-r border-gray-200">
      {/* Logo Area */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#91c46b]/20 to-[#3b82f6]/20 border border-[#91c46b]/30 flex items-center justify-center">
            <span className="text-sm font-bold bg-gradient-to-r from-[#91c46b] to-[#3b82f6] bg-clip-text text-transparent">
              D
            </span>
          </div>
          {(isOpen || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h2 className="text-gray-900 font-bold text-sm">Dharmesh</h2>
              <p className="text-[#91c46b] text-[10px] tracking-widest font-semibold">#TradeX</p>
            </motion.div>
          )}
        </Link>
        {isMobile && (
          <button onClick={onToggle} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? onToggle : undefined}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
                ${isActive
                  ? 'bg-[#91c46b]/10 text-[#91c46b]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#91c46b]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[#91c46b]' : 'text-gray-400 group-hover:text-gray-600'}`} />
              {(isOpen || isMobile) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button (desktop only) */}
      {!isMobile && (
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all text-xs"
          >
            {isOpen ? (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Mobile overlay
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 68 }}
      transition={{ duration: 0.2 }}
      className="hidden lg:block flex-shrink-0 h-screen sticky top-0"
    >
      {sidebarContent}
    </motion.aside>
  );
}
