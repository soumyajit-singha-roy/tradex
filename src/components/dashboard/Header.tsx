'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LogOut, Menu, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center relative max-w-md flex-1">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search accounts, reports..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#91c46b]/50 focus:ring-1 focus:ring-[#91c46b]/20 transition-all"
            />
          </div>
        </div>

        {/* Right: Profile only */}
        <div className="flex items-center gap-2">
          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#91c46b]/20 to-[#3b82f6]/20 border border-[#91c46b]/30 flex items-center justify-center">
                <User className="w-4 h-4 text-[#91c46b]" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-gray-900">{user?.name || 'Client'}</p>
              </div>
              <ChevronDown className="hidden md:block w-3 h-3 text-gray-400" />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
