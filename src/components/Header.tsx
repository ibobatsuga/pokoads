'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { isNotificationOpen, setIsNotificationOpen, activityLogs } = useApp();
  const unreadCount = activityLogs.length;

  return (
    <header className="sticky top-0 z-30 bg-[#f8fafc]/95 backdrop-blur-md px-4 pt-3 pb-3 border-b border-slate-200/70 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
              Copilot Media Buyer
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
            Selamat datang kembali, <span className="text-slate-950 font-extrabold">Bobi</span>
          </h1>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="relative p-2 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs active:scale-95 cursor-pointer"
          aria-label="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
