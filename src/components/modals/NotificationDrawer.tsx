'use client';

import React from 'react';
import { X, Bell, CheckCheck, TrendingUp, TrendingDown, MessageSquare, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationDrawer() {
  const { isNotificationOpen, setIsNotificationOpen, activityLogs, showToast } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-fadeIn">
      <div
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-all animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Notifikasi & Peringatan</h3>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of alerts */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-800 font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Laporan WhatsApp Terkirim
              </span>
              <span className="text-[10px] text-emerald-600">07.00 WIB</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Ringkasan harian pagi telah sukses dikirim ke nomor +62 812-9882-9900 via Meta Cloud API resmi.
            </p>
          </div>

          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  {log.actionType === 'dimatikan' ? (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                  ) : log.actionType === 'dinaikkan' ? (
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  {log.adName}
                </span>
                <span className="text-[10px] text-slate-400">{log.timestamp}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="font-semibold text-slate-700">{log.ruleName}</span>
                <span>•</span>
                <span className="text-slate-600">{log.triggerValue}</span>
              </div>
              <p className="text-[11px] text-slate-600">{log.details}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50">
          <button
            onClick={() => {
              setIsNotificationOpen(false);
              showToast('Semua notifikasi ditandai dibaca');
            }}
            className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai Semua Dibaca
          </button>
        </div>
      </div>
    </div>
  );
}
