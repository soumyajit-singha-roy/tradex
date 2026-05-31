'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderColor?: string;
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className = '', 
  hoverEffect = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { 
        scale: 1.01, 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl
        bg-white backdrop-blur-xl
        border border-gray-100
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function GlassCardSuccess({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-xl
        bg-white backdrop-blur-xl
        border border-[#91c46b]/40
        shadow-[0_8px_30px_rgba(145,196,107,0.12)]
        ${className}
      `}
    >
      {/* Success gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#91c46b]/[0.08] to-transparent pointer-events-none" />
      {/* Animated pulse ring */}
      <div className="absolute top-4 right-4 w-3 h-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#91c46b]/40 animate-ping" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#91c46b]" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
