'use client';

import { motion } from 'framer-motion';
import { User, Shield } from 'lucide-react';
import { CLIENT_DATA } from '@/lib/data';

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-white backdrop-blur-xl border border-gray-100 p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]"
    >
      {/* Background decorative gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#91c46b]/[0.08] to-transparent rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/[0.08] to-transparent rounded-full translate-y-8 -translate-x-8" />

      <div className="relative flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#91c46b]/20 to-[#3b82f6]/20 border border-[#91c46b]/20 flex items-center justify-center">
            <User className="w-7 h-7 text-[#91c46b]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#91c46b] flex items-center justify-center border-2 border-white">
            <Shield className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-900">{CLIENT_DATA.name}</h2>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Account Active
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
