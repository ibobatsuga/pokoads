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
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

function AppContent() {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Full mobile web application layout */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#f8fafc] flex flex-col relative sm:border-x sm:border-slate-200/70">
        {/* Top Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-3 overflow-y-auto no-scrollbar">
          {activeTab === 'beranda' && <HomeTab />}
          {activeTab === 'iklan' && <AdsTab />}
          {activeTab === 'analitik' && <AnalyticsTab />}
          {activeTab === 'pengaturan' && <SettingsTab />}
        </main>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Global Toast Alert */}
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm pointer-events-none animate-fadeIn">
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
