'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = await login(userId, password);
    if (!result.success) {
      setError(result.error || 'Invalid Username or Password');
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full mx-auto bg-white border border-[#064e3b]/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(6,78,59,0.06)]"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#064e3b] font-[family-name:var(--font-poppins)] tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-emerald-800/60 mt-1 font-[family-name:var(--font-inter)] font-medium">
          Please sign in to access your trading dashboard
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-50 border border-red-200"
        >
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-xs text-red-700 font-semibold font-[family-name:var(--font-inter)]">{error}</span>
        </motion.div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#064e3b]/60" />
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter Username"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50/50 border border-slate-200/80 text-slate-800 placeholder:text-slate-400 text-base focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 transition-all duration-200 font-[family-name:var(--font-inter)]"
            required
            autoComplete="username"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#064e3b]/60" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50/50 border border-slate-200/80 text-slate-800 placeholder:text-slate-400 text-base focus:outline-none focus:border-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/10 transition-all duration-200 font-[family-name:var(--font-inter)]"
            required
            autoComplete="current-password"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-start px-1">
          <button
            type="button"
            className="text-xs font-bold text-[#064e3b] hover:text-[#047857] hover:underline transition-all duration-200"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#064e3b] to-[#047857] hover:from-[#047857] hover:to-[#065f46] text-white font-bold text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(6,78,59,0.18)] hover:shadow-[0_4px_22px_rgba(6,78,59,0.28)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
