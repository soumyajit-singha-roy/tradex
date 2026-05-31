'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Moon, Sun, Eye, EyeOff, CheckCircle2, Shield, Mail, Phone, CreditCard, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { CLIENT_DATA } from '@/lib/data';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    trading: true,
    statements: true,
    promotions: false,
  });
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage your account preferences and security</p>
        </div>
      </AnimatedContainer>

      {/* Profile Section */}
      <AnimatedContainer delay={0.1}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
              <User className="w-4 h-4 text-[#3b82f6]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Profile Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">Full Name</label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-900">{CLIENT_DATA.name}</div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">Client ID</label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-[#3b82f6] font-mono">{CLIENT_DATA.clientId}</div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3 h-3" /> Email
              </label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">{CLIENT_DATA.email}</div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">{CLIENT_DATA.phone}</div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <CreditCard className="w-3 h-3" /> PAN
              </label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">{CLIENT_DATA.pan}</div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3 h-3" /> Member Since
              </label>
              <div className="px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">{CLIENT_DATA.joinDate}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            <StatusBadge status="Active" />
            <span className="text-[11px] text-gray-500">{CLIENT_DATA.membership}</span>
          </div>
        </GlassCard>
      </AnimatedContainer>

      {/* Password Change */}
      <AnimatedContainer delay={0.2}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>
          </div>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">Current Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/30 transition-all"
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/30 transition-all"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider block mb-1.5">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/30 transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => showToast('Password change is a UI demo only.')}
              className="px-4 py-2.5 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium hover:bg-[#F59E0B]/15 transition-colors"
            >
              Update Password
            </motion.button>
          </div>
        </GlassCard>
      </AnimatedContainer>

      {/* Notifications */}
      <AnimatedContainer delay={0.3}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#91c46b]/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#91c46b]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-gray-900 capitalize">{key === 'sms' ? 'SMS' : key} Notifications</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Receive {key} notifications for account activity
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                    enabled ? 'bg-[#7ED957]' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: enabled ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </AnimatedContainer>

      {/* Theme */}
      <AnimatedContainer delay={0.4}>
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Appearance</h2>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-gray-900">Dark Mode</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                darkMode ? 'bg-[#00C2FF]' : 'bg-gray-700'
              }`}
            >
              <motion.div
                animate={{ x: darkMode ? 20 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center"
              >
                {darkMode ? <Moon className="w-2.5 h-2.5 text-[#3b82f6]" /> : <Sun className="w-2.5 h-2.5 text-[#F59E0B]" />}
              </motion.div>
            </button>
          </div>
        </GlassCard>
      </AnimatedContainer>

      {/* Toast */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#91c46b]/20 shadow-2xl shadow-black/40 z-50"
        >
          <CheckCircle2 className="w-4 h-4 text-[#91c46b]" />
          <span className="text-sm text-gray-900">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

