'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Play,
  RotateCcw,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HomeTab() {
  const {
    setActiveTab,
    ads,
    variations,
    activityLogs,
    emergencyStop,
    simulationMode,
    setIsWhatsAppModalOpen,
    approveVariation,
    rejectVariation,
    toggleEmergencyStop,
  } = useApp();

  const pendingVariations = variations.filter((v) => v.status === 'menunggu');

  return (
    <div className="space-y-4 pb-20 pt-2 animate-fadeIn">
      {/* Emergency Stop Active Warning */}
      {emergencyStop && (
        <div className="bg-rose-500 text-white p-3 rounded-2xl shadow-md flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>Semua Auto-Rules sedang dinonaktifkan (Emergency Stop Aktif)</span>
          </div>
          <button
            onClick={toggleEmergencyStop}
            className="text-[11px] bg-white text-rose-600 font-bold px-2.5 py-1 rounded-lg hover:bg-rose-50"
          >
            Pulihkan
          </button>
        </div>
      )}

      {/* Simulation Mode Notice */}
      {simulationMode && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-2.5 rounded-2xl flex items-center gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <div>
            <span className="font-semibold">Mode Simulasi Aktif:</span> Aturan hanya mencatat rekomendasi tanpa menyentuh Ads Manager nyata.
          </div>
        </div>
      )}

      {/* 1. Dark Card Total Spend (Mockup Gambar 1) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white p-5 shadow-lg border border-slate-800">
        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs text-slate-300 font-medium mb-1">
            <span className="tracking-wide">Total Spend — November 2026</span>
            <button
              onClick={() => setActiveTab('analitik')}
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer group"
            >
              Lihat detail
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white mt-1 mb-2">
            Rp18.452.700
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              ROAS gabungan 4,8x
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 text-[11px]">naik dari 4,1x bulan lalu</span>
          </div>
        </div>

        {/* Ambient gradient blur background */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Grid Statistik 2x2 (Mockup Gambar 1) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Iklan Aktif */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Iklan Aktif</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              12%
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            24 <span className="text-xs font-medium text-slate-500">iklan</span>
          </div>
        </div>

        {/* Campaign */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Campaign</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              <TrendingDown className="w-3 h-3" />
              8%
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            9 <span className="text-xs font-medium text-slate-500">campaign</span>
          </div>
        </div>

        {/* ROAS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">ROAS</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              15%
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            4,8x
          </div>
        </div>

        {/* Spend Hari Ini */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:border-slate-200 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Spend Hari Ini</span>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingDown className="w-3 h-3" />
              6%
            </span>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight">
            Rp612 <span className="text-xs font-medium text-slate-500">rb</span>
          </div>
        </div>
      </div>

      {/* 3. Kartu Laporan Pagi Ini (Mockup Gambar 1 & Lampiran A) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <MessageSquare className="w-4 h-4 fill-emerald-100" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Laporan Pagi Ini</h2>
              <p className="text-[10px] text-slate-400">Ringkasan otomatis ke WhatsApp</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Terkirim ke WhatsApp • 07.00
          </span>
        </div>

        {/* Three core findings from morning report */}
        <div className="space-y-2.5 text-xs">
          {/* Dimatikan */}
          <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span className="font-semibold text-slate-800">2 Iklan dimatikan</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-3.5">
                Spend lewat batas tanpa pembelian — aturan CPA aktif (Kopi Sanger & Tas Kulit)
              </p>
            </div>
            <span className="font-bold text-rose-600 text-xs whitespace-nowrap pl-2">
              -Rp386 rb
            </span>
          </div>

          {/* Dinaikkan */}
          <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="font-semibold text-slate-800">1 Iklan dinaikkan +20%</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-3.5">
                Serum Wajah — ROAS 6,1x, di atas target 4x
              </p>
            </div>
            <span className="font-bold text-blue-600 text-xs whitespace-nowrap pl-2">
              Rp150 rb/hari
            </span>
          </div>

          {/* Kreatif Mulai Lelah */}
          <div className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="font-semibold text-slate-800">1 Kreatif mulai lelah</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-3.5">
                Hijab Voal — CTR turun 31%, frekuensi 4,2
              </p>
            </div>
            <span className="font-bold text-amber-600 text-xs whitespace-nowrap pl-2">
              CTR 0,8%
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="w-full mt-2 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Lihat Format Pesan WhatsApp Lengkap
        </button>
      </div>

      {/* 4. Variasi Kreatif — Menunggu Persetujuan (Pilar 3: FR-19 to FR-21) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Variasi Kreatif Dari Pemenang</h2>
              <p className="text-[10px] text-slate-400">Pilar 3: Mencegah fatigue sebelum performa turun</p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-indigo-100/70 text-indigo-700 px-2 py-0.5 rounded-full">
            {pendingVariations.length} Menunggu Persetujuan
          </span>
        </div>

        {pendingVariations.length === 0 ? (
          <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
            <p className="text-xs font-semibold text-slate-700">Semua varian telah diproses!</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Iklan uji baru sudah otomatis dimasukkan ke tab Iklan.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingVariations.map((v) => (
              <div
                key={v.id}
                className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/20 space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Iklan Sumber: {v.sourceAdName}
                  </span>
                  <span className="font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px]">
                    ROAS {v.roasSource}x
                  </span>
                </div>

                {/* Hook Text */}
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs text-slate-800 font-medium italic">
                  {v.hook}
                </div>

                {/* Angle & Format */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-100/60 p-2 rounded-lg">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Usulan Format:</span>
                    <span className="font-semibold text-slate-800">{v.suggestedFormat}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Angle:</span>
                    <span className="font-medium text-slate-700 truncate block">{v.angle}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-700">Alasan: </span>
                  {v.rationale}
                </p>

                {/* Actions: Setujui vs Tolak */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => approveVariation(v.id)}
                    className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Setujui & Tayangkan
                  </button>
                  <button
                    onClick={() => rejectVariation(v.id)}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Tolak
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Aktivitas Terbaru Auto-Rules (Mockup Gambar 1 & FR-14) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">Aktivitas Terbaru Auto-Rules</h2>
              <p className="text-[10px] text-slate-400">Jejak audit eksekusi otomatis</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Auto-check tiap 30m</span>
        </div>

        <div className="divide-y divide-slate-100">
          {activityLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5">
              <div
                className={`mt-0.5 p-1 rounded-full flex-shrink-0 ${
                  log.actionType === 'dimatikan'
                    ? 'bg-rose-100 text-rose-600'
                    : log.actionType === 'dinaikkan'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-amber-100 text-amber-600'
                }`}
              >
                {log.actionType === 'dimatikan' ? (
                  <TrendingDown className="w-3.5 h-3.5" />
                ) : log.actionType === 'dinaikkan' ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 truncate">
                    {log.adName}
                  </span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {log.timestamp}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] text-slate-400">{log.adId}</span>
                  <span>•</span>
                  <span className="font-medium text-slate-700">{log.ruleName}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
