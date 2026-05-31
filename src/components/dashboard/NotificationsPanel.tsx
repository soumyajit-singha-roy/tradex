'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X, Bell } from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/data';

interface NotificationsPanelProps {
  onClose: () => void;
}

const iconMap = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: AlertTriangle,
};

const colorMap = {
  success: 'text-[#91c46b] bg-[#91c46b]/10',
  info: 'text-[#3b82f6] bg-[#3b82f6]/10',
  warning: 'text-[#f59e0b] bg-[#f59e0b]/10',
  error: 'text-[#ef4444] bg-[#ef4444]/10',
};

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {NOTIFICATIONS.map((notification, index) => {
          const Icon = iconMap[notification.type];
          const colors = colorMap[notification.type];

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-gray-900">{notification.title}</p>
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-[#3b82f6] flex-shrink-0 mt-1" />
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{notification.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{notification.timestamp}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-gray-100 text-center">
        <button className="text-xs text-[#3b82f6] hover:text-[#3b82f6]/80 font-medium transition-colors">
          View All Notifications
        </button>
      </div>
    </motion.div>
  );
}
