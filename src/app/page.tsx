'use client';

import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import HomeTab from '../components/tabs/HomeTab';
import AdsTab from '../components/tabs/AdsTab';
import AnalyticsTab from '../components/tabs/AnalyticsTab';
import SettingsTab from '../components/tabs/SettingsTab';
import FilterBottomSheet from '../components/modals/FilterBottomSheet';
import WhatsAppReportModal from '../components/modals/WhatsAppReportModal';
import AdDetailModal from '../components/modals/AdDetailModal';
import NewRuleModal from '../components/modals/NewRuleModal';
import NotificationDrawer from '../components/modals/NotificationDrawer';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

function AppContent() {
  const { activeTab, toast, deviceMode } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start sm:p-4 md:p-6 lg:p-8 font-sans selection:bg-slate-900 selection:text-white transition-all">
      {/* Device wrapper: If deviceMode is mobile, we render a phone mockup on desktop */}
      <div
        className={`w-full bg-[#f8fafc] text-slate-900 min-h-screen flex flex-col relative transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'sm:max-w-[420px] sm:min-h-[860px] sm:my-auto sm:rounded-[42px] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl sm:overflow-hidden sm:ring-1 sm:ring-slate-700/50'
            : 'max-w-2xl sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl'
        }`}
      >
        {/* Dynamic Island / Speaker Pill for iPhone Mockup on Desktop */}
        {deviceMode === 'mobile' && (
          <div className="hidden sm:flex absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full z-50 pointer-events-none items-center justify-end pr-2">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
          </div>
        )}

        {/* Top Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
          {activeTab === 'beranda' && <HomeTab />}
          {activeTab === 'iklan' && <AdsTab />}
          {activeTab === 'analitik' && <AnalyticsTab />}
          {activeTab === 'pengaturan' && <SettingsTab />}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Global Toast Alert */}
        {toast && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm pointer-events-none animate-fadeIn">
            <div
              className={`p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md pointer-events-auto border ${
                toast.type === 'error'
                  ? 'bg-rose-500 text-white border-rose-600'
                  : toast.type === 'info'
                  ? 'bg-slate-900 text-white border-slate-800'
                  : 'bg-emerald-600 text-white border-emerald-700'
              }`}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="flex-1 leading-snug">{toast.message}</span>
            </div>
          </div>
        )}

        {/* Modals & Drawers */}
        <FilterBottomSheet />
        <WhatsAppReportModal />
        <AdDetailModal />
        <NewRuleModal />
        <NotificationDrawer />
      </div>

      {/* Desktop Helper Note below phone frame */}
      <div className="hidden sm:flex items-center gap-2 text-slate-500 text-xs mt-4">
        <span>PokoAds Versi 1.1 • Desain Mockup Disetujui 20 Nov 2026</span>
        <span>•</span>
        <span className="text-slate-400">Meta Ads & TikTok Ads Copilot</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
