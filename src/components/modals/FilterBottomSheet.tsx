'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FilterBottomSheet() {
  const {
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    filterState,
    setFilterState,
    resetFilters,
    showToast,
  } = useApp();

  // Local draft state
  const [draftDateGroup, setDraftDateGroup] = useState(filterState.dateGroup);
  const [draftStatus, setDraftStatus] = useState(filterState.status);
  const [draftMaxSpend, setDraftMaxSpend] = useState(filterState.maxSpend);

  if (!isFilterSheetOpen) return null;

  const draftActiveCount =
    (draftDateGroup !== 'semua' ? 1 : 0) +
    (draftStatus !== 'semua' ? 1 : 0) +
    (draftMaxSpend < 1000000 ? 1 : 0);

  const handleApply = () => {
    setFilterState({
      dateGroup: draftDateGroup,
      status: draftStatus,
      minSpend: 0,
      maxSpend: draftMaxSpend,
    });
    setIsFilterSheetOpen(false);
    showToast(`Filter diterapkan (${draftActiveCount} filter)`);
  };

  const handleReset = () => {
    setDraftDateGroup('semua');
    setDraftStatus('semua');
    setDraftMaxSpend(1000000);
    resetFilters();
    setIsFilterSheetOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity animate-fadeIn">
      {/* Bottom Sheet Modal Container */}
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull handle bar on top (Mockup Gambar 5 & Bab 14) */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Filter Iklan</h3>
            <p className="text-[11px] text-slate-400">Saring daftar iklan sesuai kriteria</p>
          </div>
          <button
            onClick={() => setIsFilterSheetOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Body */}
        <div className="px-5 py-4 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* 1. Rentang Tanggal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              Rentang Tanggal
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'semua', label: 'Semua Tanggal' },
                { id: 'Hari Ini', label: 'Hari Ini' },
                { id: 'Kemarin', label: 'Kemarin' },
              ].map((item) => {
                const isSelected = draftDateGroup === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setDraftDateGroup(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chip Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 block">
              Status Iklan
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'semua', label: 'Semua Status' },
                { id: 'aktif', label: 'Aktif', color: 'emerald' },
                { id: 'dinaikkan', label: 'Dinaikkan', color: 'sky' },
                { id: 'dimatikan', label: 'Dimatikan', color: 'amber' },
              ].map((item) => {
                const isSelected = draftStatus === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setDraftStatus(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Rentang Budget / Spend Iklan */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Batas Maksimum Spend
              </label>
              <span className="font-bold text-blue-600">
                {draftMaxSpend >= 1000000
                  ? 'Tanpa Batas'
                  : `≤ Rp${(draftMaxSpend / 1000).toLocaleString('id-ID')} rb`}
              </span>
            </div>

            <input
              type="range"
              min="100000"
              max="1000000"
              step="50000"
              value={draftMaxSpend}
              onChange={(e) => setDraftMaxSpend(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rp100 rb</span>
              <span>Rp500 rb</span>
              <span>≥ Rp1 Juta</span>
            </div>
          </div>
        </div>

        {/* Footer Actions (Mockup Bab 14: Tombol Reset di kiri, Terapkan berwarna gelap di kanan) */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="py-2.5 px-4 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Reset
          </button>

          <button
            onClick={handleApply}
            className="flex-1 py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Terapkan</span>
            {draftActiveCount > 0 && (
              <span className="bg-slate-700 text-white px-2 py-0.5 rounded-full text-[10px]">
                {draftActiveCount} filter
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
