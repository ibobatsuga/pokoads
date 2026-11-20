'use client';

import React from 'react';
import { Home, Layers, BarChart3, Settings } from 'lucide-react';
import { useApp, TabType } from '../context/AppContext';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'iklan',
      label: 'Iklan',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      id: 'analitik',
      label: 'Analitik',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-slate-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600 font-normal'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-colors ${
                  isActive ? 'text-slate-950 font-bold' : 'text-slate-400'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[11px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 bg-slate-900 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
