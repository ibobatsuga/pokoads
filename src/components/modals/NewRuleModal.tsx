'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutoRule } from '../../types';

export default function NewRuleModal() {
  const { isNewRuleModalOpen, setIsNewRuleModalOpen, addNewRule, showToast } = useApp();

  const [name, setName] = useState('');
  const [metric, setMetric] = useState<AutoRule['metric']>('spend');
  const [operator, setOperator] = useState<AutoRule['operator']>('>');
  const [threshold, setThreshold] = useState<number>(250000);
  const [timeframeHours, setTimeframeHours] = useState<number>(24);
  const [action, setAction] = useState<AutoRule['action']>('jeda');
  const [budgetIncreasePercent, setBudgetIncreasePercent] = useState<number>(20);

  if (!isNewRuleModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Mohon masukkan nama aturan', 'error');
      return;
    }

    const description =
      action === 'jeda'
        ? `${metric.toUpperCase()} ${operator} ${threshold.toLocaleString(
            'id-ID'
          )} dalam ${timeframeHours} jam terakhir, lalu jeda iklan.`
        : action === 'naikkan_budget'
        ? `${metric.toUpperCase()} ${operator} ${threshold} dalam ${timeframeHours} jam, naikkan budget ${budgetIncreasePercent}%.`
        : `${metric.toUpperCase()} ${operator} ${threshold} dalam ${timeframeHours} jam, kirim peringatan WhatsApp.`;

    addNewRule({
      name,
      description,
      enabled: true,
      metric,
      operator,
      threshold,
      timeframeHours,
      action,
      budgetIncreasePercent: action === 'naikkan_budget' ? budgetIncreasePercent : undefined,
    });

    setIsNewRuleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Buat Aturan Otomatis Baru (FR-11)
            </h3>
            <p className="text-[11px] text-slate-400">
              Kombinasikan metrik, ambang batas, dan aksi otomatis
            </p>
          </div>
          <button
            onClick={() => setIsNewRuleModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {/* Rule Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Aturan:</label>
            <input
              type="text"
              required
              placeholder="Contoh: Matikan Jika CPA > Rp50.000"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Metric & Operator */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Pilih Metrik:</label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="spend">Spend (Rp)</option>
                <option value="pembelian">Pembelian (Orders)</option>
                <option value="cpa">Biaya Per Hasil (CPA)</option>
                <option value="roas">ROAS</option>
                <option value="ctr">CTR (%)</option>
                <option value="frekuensi">Frekuensi</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Operator:</label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value=">">Lebih besar dari (&gt;)</option>
                <option value="<">Lebih kecil dari (&lt;)</option>
                <option value=">=">Lebih besar sama dengan (&gt;=)</option>
              </select>
            </div>
          </div>

          {/* Threshold & Timeframe */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nilai Ambang:</label>
              <input
                type="number"
                required
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Jendela Waktu:</label>
              <select
                value={timeframeHours}
                onChange={(e) => setTimeframeHours(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value={24}>24 Jam Terakhir</option>
                <option value={48}>48 Jam (2 Hari)</option>
                <option value={72}>72 Jam (3 Hari)</option>
                <option value={168}>7 Hari Terakhir</option>
              </select>
            </div>
          </div>

          {/* Action */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Aksi Otomatis:</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="jeda">Jeda Iklan Otomatis (Matikan)</option>
              <option value="naikkan_budget">Naikkan Budget Iklan</option>
              <option value="peringatan">Kirim Notifikasi Peringatan Saja</option>
            </select>
          </div>

          {action === 'naikkan_budget' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Persentase Kenaikan (%):
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={budgetIncreasePercent}
                onChange={(e) => setBudgetIncreasePercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Simpan & Aktifkan Aturan
            </button>
            <button
              type="button"
              onClick={() => setIsNewRuleModalOpen(false)}
              className="py-2.5 px-4 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
