'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Play,
  Pause,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdItem } from '../../types';

export default function AdsTab() {
  const {
    ads,
    accounts,
    selectedAccountId,
    setSelectedAccountId,
    setIsFilterSheetOpen,
    activeFilterCount,
    filterState,
    setSelectedAdForDetail,
    toggleAdStatus,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter ads based on account, search, and bottom sheet filter
  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      // 1. Account filter
      if (selectedAccountId !== 'semua' && ad.accountId !== selectedAccountId) {
        return false;
      }

      // 2. Search query
      if (
        searchQuery.trim() !== '' &&
        !ad.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ad.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ad.campaignName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 3. Status filter
      if (filterState.status !== 'semua' && ad.status !== filterState.status) {
        return false;
      }

      // 4. Date filter
      if (filterState.dateGroup !== 'semua' && ad.dateGroup !== filterState.dateGroup) {
        return false;
      }

      // 5. Spend filter
      if (ad.spend < filterState.minSpend || ad.spend > filterState.maxSpend) {
        return false;
      }

      return true;
    });
  }, [ads, selectedAccountId, searchQuery, filterState]);

  // Group by dateGroup: "Hari Ini", "Kemarin", etc.
  const groupedAds = useMemo(() => {
    const groups: { [key: string]: AdItem[] } = {};
    filteredAds.forEach((ad) => {
      if (!groups[ad.dateGroup]) {
        groups[ad.dateGroup] = [];
      }
      groups[ad.dateGroup].push(ad);
    });
    return groups;
  }, [filteredAds]);

  const dateOrder = ['Hari Ini', 'Kemarin', '20 Sep 2026'];

  const getStatusBadge = (status: AdItem['status']) => {
    switch (status) {
      case 'dinaikkan':
        return (
          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
            Dinaikkan
          </span>
        );
      case 'aktif':
        return (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Aktif
          </span>
        );
      case 'dimatikan':
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            Dimatikan
          </span>
        );
    }
  };

  const getInitialsBg = (status: AdItem['status']) => {
    switch (status) {
      case 'dinaikkan':
        return 'bg-sky-500 text-white';
      case 'aktif':
        return 'bg-emerald-500 text-white';
      case 'dimatikan':
        return 'bg-amber-600 text-white';
    }
  };

  return (
    <div className="space-y-4 pb-20 pt-1 animate-fadeIn">
      {/* 1. Account Selector Header (Gambar 2 PRD) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs">
        <label className="text-[10px] font-semibold text-slate-400 block mb-1 uppercase tracking-wider">
          Akun Iklan Terhubung
        </label>
        <div className="relative">
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-900 pr-8 cursor-pointer"
          >
            <option value="semua">Semua Akun (Meta Ads & TikTok Ads)</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} (Akun {acc.accountNumber} - Terhubung)
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari iklan..."
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Button with Active Filter Count Badge */}
        <button
          onClick={() => setIsFilterSheetOpen(true)}
          className={`relative p-2.5 rounded-xl border transition-all flex items-center justify-center shadow-2xs active:scale-95 ${
            activeFilterCount > 0
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
          }`}
          title="Buka Filter Bottom Sheet"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Active filter reminder pill */}
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between text-[11px] bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
          <span>
            {activeFilterCount} filter aktif diterapkan ({filteredAds.length} iklan ditampilkan)
          </span>
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Ubah
          </button>
        </div>
      )}

      {/* 3. Grouped Ads List */}
      {Object.keys(groupedAds).length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-150">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="text-xs font-bold text-slate-700">Tidak ada iklan yang sesuai</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Coba ubah kata kunci pencarian atau reset filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dateOrder.map((groupTitle) => {
            const items = groupedAds[groupTitle];
            if (!items || items.length === 0) return null;

            return (
              <div key={groupTitle} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-slate-800 tracking-tight">
                    {groupTitle}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {items.length} iklan
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map((ad) => {
                    return (
                      <div
                        key={ad.id}
                        className="bg-white rounded-2xl p-3.5 border border-slate-150 shadow-2xs hover:border-slate-300 transition-all flex items-start gap-3 cursor-pointer group"
                        onClick={() => setSelectedAdForDetail(ad)}
                      >
                        {/* Initials Avatar Box */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs tracking-wider flex-shrink-0 shadow-xs ${getInitialsBg(
                            ad.status
                          )}`}
                        >
                          {ad.initials || ad.name.slice(0, 2).toUpperCase()}
                        </div>

                        {/* Middle Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                              {ad.name}
                            </h4>
                            {getStatusBadge(ad.status)}
                          </div>

                          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                            <span className="font-semibold text-slate-700">
                              {ad.variantCount} {ad.variantCount > 1 ? 'varian' : 'iklan'}
                            </span>
                            <span>•</span>
                            <span className="text-slate-400">{ad.time}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-800">
                              Spend Rp{Math.round(ad.spend / 1000)} rb
                            </span>
                          </div>

                          {/* Platform & Campaign & ID tags */}
                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100/80 text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-1.5 py-0.5 rounded font-medium ${
                                  ad.platform === 'meta'
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'bg-slate-100 text-slate-900'
                                }`}
                              >
                                {ad.platform === 'meta' ? 'Meta Ads' : 'TikTok Ads'}
                              </span>
                              <span className="text-slate-400 truncate max-w-[110px]">
                                {ad.campaignName}
                              </span>
                            </div>

                            <span className="font-mono text-slate-400 tracking-wider">
                              {ad.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
