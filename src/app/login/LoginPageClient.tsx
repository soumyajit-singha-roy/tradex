'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/login/LoginForm';
import { isAuthenticated } from '@/lib/auth';
import { motion } from 'framer-motion';

export function LoginPageClient() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fafdfa]">
      {/* Left Panel: Desktop Only (Showcase Panel) */}
      <div className="hidden md:flex md:w-[42%] lg:w-[38%] bg-gradient-to-br from-[#064e3b] to-[#032e22] relative overflow-hidden flex-col justify-between p-12 text-white shadow-[r-2xl_rgba(6,78,59,0.1)]">
        {/* Soft decorative glows */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-400/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Brand Logo */}
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight font-[family-name:var(--font-poppins)]">
            Trade<span className="text-emerald-400 font-black">X</span>
          </h1>
        </div>

        {/* Content Showcase */}
        <div className="relative z-10 my-auto pr-6">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase font-[family-name:var(--font-poppins)]">
              Institutional Platform
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight font-[family-name:var(--font-poppins)]">
            The Modern Workspace for Trading Teams
          </h2>
          
          {/* Key Value Props */}
          <div className="space-y-6">
            {[
              { title: 'Real-time P&L Analytics', desc: 'Monitor net earnings, charges, and payouts instantly.' },
              { title: 'Comprehensive Ledger Reports', desc: 'Detailed subledger sheets, trial balances, and logs.' },
              { title: 'Multi-Account Integration', desc: 'Securely switch and track metrics across multiple client accounts.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mt-1 flex-shrink-0 text-emerald-400 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-50">{item.title}</h4>
                  <p className="text-xs text-emerald-300/70 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-emerald-400/40 font-medium">
          © 2023 TradeX. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Both Mobile and Desktop (Login Card Panel) */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden bg-gradient-to-tr from-[#f4faf6] via-[#ffffff] to-[#f7fbf8]">
        {/* Soft background glows for light panel */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-200/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-200/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Only Header (hidden on desktop) */}
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#064e3b] font-[family-name:var(--font-poppins)]">
              Trade<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 font-black">X</span>
            </h1>
            <p className="text-xs font-semibold text-[#064e3b]/60 mt-1 font-[family-name:var(--font-poppins)]">
              Your Premium Trading Companion
            </p>
          </div>

          {/* Form Card */}
          <LoginForm />
          
          {/* Mobile Only Footer */}
          <div className="text-center mt-8 md:hidden text-[10px] text-slate-400 font-medium tracking-wide">
            © 2023 TradeX. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
