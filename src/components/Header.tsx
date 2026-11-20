'use client';

import React from 'react';
import { Bell, Wifi, Battery, Signal, Smartphone, Monitor } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header() {
  const { isNotificationOpen, setIsNotificationOpen, activityLogs, deviceMode, setDeviceMode } = useApp();

  const unreadCount = activityLogs.length;

  return (
    <header className="sticky top-0 z-30 bg-[#f8fafc]/90 backdrop-blur-md px-5 pt-3 pb-2 border-b border-slate-200/60 transition-all">
      {/* Simulated Mobile Status Bar (iOS style) */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pb-2">
        <span className="tracking-tight font-medium text-xs">09:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
          <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
          <Battery className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>

      {/* Main Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium tracking-wide uppercase text-slate-400">
              Copilot Media Buyer
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h1 className="text-[17px] font-bold text-slate-900 tracking-tight leading-tight">
            Selamat datang kembali, <span className="text-slate-900 font-extrabold">Bobi</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Device Toggle for desktop/tablet users */}
          <div className="hidden sm:flex items-center bg-slate-200/70 p-0.5 rounded-full text-slate-600 text-xs">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-full transition-all ${
                deviceMode === 'mobile' ? 'bg-white text-slate-900 shadow-xs font-medium' : 'hover:text-slate-900'
              }`}
              title="Tampilan HP (Mockup Phone Frame)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`p-1.5 rounded-full transition-all ${
                deviceMode === 'responsive' ? 'bg-white text-slate-900 shadow-xs font-medium' : 'hover:text-slate-900'
              }`}
              title="Tampilan Responsif Lebar"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2.5 rounded-full bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs active:scale-95"
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
      </div>
    </header>
  );
}
