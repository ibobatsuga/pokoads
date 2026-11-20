'use client';

import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Eye,
  Activity,
  Layers,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdDetailModal() {
  const {
    selectedAdForDetail,
    setSelectedAdForDetail,
    toggleAdStatus,
    updateAdBudget,
    showToast,
  } = useApp();

  const ad = selectedAdForDetail;
  const [budgetInput, setBudgetInput] = useState<number>(ad?.dailyBudget || 200000);

  if (!ad) return null;

  const isPaused = ad.status === 'dimatikan';

  const handleBudgetSave = () => {
    updateAdBudget(ad.id, budgetInput);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ad.platform === 'meta'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-slate-900 text-white'
                }`}
              >
                {ad.platform === 'meta' ? 'Meta Ads' : 'TikTok Ads'}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{ad.id}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{ad.name}</h3>
            <p className="text-[11px] text-slate-500">
              Campaign: <span className="font-semibold text-slate-700">{ad.campaignName}</span>
            </p>
          </div>

          <button
            onClick={() => setSelectedAdForDetail(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Status Bar & Quick Toggle */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Status Saat Ini
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    ad.status === 'aktif'
                      ? 'bg-emerald-500'
                      : ad.status === 'dinaikkan'
                      ? 'bg-sky-500'
                      : 'bg-amber-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900 capitalize">
                  {ad.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleAdStatus(ad.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95 ${
                isPaused
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{isPaused ? 'Nyalakan Kembali' : 'Jeda Iklan'}</span>
            </button>
          </div>

          {/* Reason Note (if any) */}
          {ad.statusReason && (
            <div className="p-3 rounded-xl bg-slate-100/90 text-xs text-slate-700 space-y-1">
              <span className="font-semibold text-[11px] text-slate-500 block">
                Catatan Auto-Rules / Sistem:
              </span>
              <p className="text-[11px] text-slate-800 leading-relaxed">
                {ad.statusReason}
              </p>
            </div>
          )}

          {/* Metrics Grid 3x2 */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">ROAS</span>
              <span className="text-sm font-extrabold text-slate-900">
                {ad.roas > 0 ? `${ad.roas.toFixed(1).replace('.', ',')}x` : '-'}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">Pembelian</span>
              <span className="text-sm font-extrabold text-slate-900">
                {ad.purchases} order
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">Biaya/Hasil</span>
              <span className="text-sm font-extrabold text-slate-900">
                {ad.cpa > 0 ? `Rp${Math.round(ad.cpa / 1000)} rb` : '-'}
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">Spend</span>
              <span className="text-sm font-extrabold text-slate-900">
                Rp{Math.round(ad.spend / 1000)} rb
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">CTR</span>
              <span className="text-sm font-extrabold text-slate-900">
                {ad.ctr.toFixed(1).replace('.', ',')}%
              </span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
              <span className="text-[10px] text-slate-400 block font-medium">Frekuensi</span>
              <span className="text-sm font-extrabold text-slate-900">
                {ad.frequency.toFixed(1).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Budget Setting Slider */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Pagu Budget Harian
              </label>
              <span className="font-extrabold text-slate-900 text-sm">
                Rp{budgetInput.toLocaleString('id-ID')} / hari
              </span>
            </div>

            <input
              type="range"
              min="50000"
              max="1000000"
              step="25000"
              value={budgetInput}
              onChange={(e) => setBudgetInput(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp50 rb</span>
              <span>Rp500 rb</span>
              <span>Rp1 Juta</span>
            </div>

            <button
              onClick={handleBudgetSave}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer mt-1"
            >
              Simpan Budget Baru
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setSelectedAdForDetail(null)}
            className="py-2 px-5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
