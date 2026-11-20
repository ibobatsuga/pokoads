'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Info,
  Layers,
  MapPin,
  Sparkles,
  AlertTriangle,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import {
  DAILY_SPEND_CHART_30D,
  DAILY_SPEND_CHART_7D,
  PROVINCE_DATA,
  CAMPAIGN_PERFORMANCE,
} from '../../data/mockData';
import { PlatformType } from '../../types';

export default function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState<'7H' | '30H'>('30H');
  const [platformFilter, setPlatformFilter] = useState<'semua' | PlatformType>('semua');
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(5); // default to Nov 14 point

  const chartData = timeRange === '30H' ? DAILY_SPEND_CHART_30D : DAILY_SPEND_CHART_7D;
  const currentPoint = chartData[selectedPointIndex] || chartData[chartData.length - 1];

  // SVG dimensions for chart
  const svgWidth = 320;
  const svgHeight = 110;
  const paddingX = 16;
  const paddingY = 14;

  const minSpend = Math.min(...chartData.map((d) => d.spend)) * 0.9;
  const maxSpend = Math.max(...chartData.map((d) => d.spend)) * 1.05;

  const points = chartData.map((d, index) => {
    const x = paddingX + (index / (chartData.length - 1)) * (svgWidth - paddingX * 2);
    const y =
      svgHeight -
      paddingY -
      ((d.spend - minSpend) / (maxSpend - minSpend)) * (svgHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cpx1 = prev.x + (curr.x - prev.x) / 2;
    const cpx2 = cpx1;
    return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  // Filter campaigns
  const filteredCampaigns =
    platformFilter === 'semua'
      ? CAMPAIGN_PERFORMANCE
      : CAMPAIGN_PERFORMANCE.filter((c) => c.platform === platformFilter);

  return (
    <div className="space-y-4 pb-20 pt-1 animate-fadeIn">
      {/* Title & Platform Separation Tabs (FR-24 & Bab 12) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Analitik & Laporan Performa
          </h2>
          <span className="text-[10px] text-slate-400 font-medium">Zona Waktu: WIB</span>
        </div>

        {/* Platform Filter Tabs with Attribution Notice */}
        <div className="flex bg-slate-200/80 p-0.5 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setPlatformFilter('semua')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              platformFilter === 'semua'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Platform
          </button>
          <button
            onClick={() => setPlatformFilter('meta')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              platformFilter === 'meta'
                ? 'bg-white text-blue-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meta Ads
          </button>
          <button
            onClick={() => setPlatformFilter('tiktok')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              platformFilter === 'tiktok'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            TikTok Ads
          </button>
        </div>

        {platformFilter === 'semua' && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg">
            <Info className="w-3 h-3 text-slate-400 flex-shrink-0" />
            <span>
              Catatan PRD: Atribusi Meta dan TikTok dihitung berbeda; metrik di bawah disajikan transparan per platform.
            </span>
          </div>
        )}
      </div>

      {/* 1. Main Spend Card with Line Chart (Mockup Gambar 3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[26px] font-black text-slate-950 tracking-tight">
              Rp18.452.700
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Total spend {timeRange === '30H' ? '30 hari' : '7 hari'} terakhir
            </p>
          </div>

          {/* Timeframe Toggle (7H | 30H) */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-[11px] font-bold">
            <button
              onClick={() => {
                setTimeRange('7H');
                setSelectedPointIndex(4);
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                timeRange === '7H' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              7H
            </button>
            <button
              onClick={() => {
                setTimeRange('30H');
                setSelectedPointIndex(5);
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                timeRange === '30H' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              30H
            </button>
          </div>
        </div>

        {/* Selected Data Point Pill (Mockup Gambar 3: "14 Nov 2026 Rp624 rb +10%") */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              {currentPoint.date} 2026
            </span>
            <span className="font-bold text-slate-900">
              Rp{Math.round(currentPoint.spend / 1000)} rb
            </span>
          </div>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
            <TrendingUp className="w-3 h-3" />
            {currentPoint.change || '+6%'}
          </span>
        </div>

        {/* Interactive SVG Chart */}
        <div className="pt-2">
          <div className="relative w-full h-[120px]">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area gradient */}
              <path d={areaD} fill="url(#spendGradient)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, idx) => {
                const isSelected = idx === selectedPointIndex;
                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => setSelectedPointIndex(idx)}
                  >
                    {/* Hit area */}
                    <circle cx={pt.x} cy={pt.y} r={12} fill="transparent" />

                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={6}
                        fill="#10b981"
                        fillOpacity="0.25"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 4 : 2.5}
                      fill={isSelected ? '#059669' : '#10b981'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 2 : 1}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1 mt-1">
            {chartData.map((d, i) => (
              <span
                key={i}
                onClick={() => setSelectedPointIndex(i)}
                className={`cursor-pointer transition-colors ${
                  i === selectedPointIndex ? 'font-bold text-slate-900' : 'hover:text-slate-700'
                }`}
              >
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ROAS per Campaign (Mockup Gambar 3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            ROAS per Campaign
          </h3>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            30 hari
          </span>
        </div>

        <div className="space-y-3">
          {filteredCampaigns.map((camp) => {
            const widthPercent = (camp.roas / 7.0) * 100;
            const isTop = camp.roas >= 4.0;

            return (
              <div key={camp.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    {camp.name}
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                        camp.platform === 'meta'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {camp.platform === 'meta' ? 'Meta' : 'TikTok'}
                    </span>
                  </span>
                  <span className="font-extrabold text-slate-950">
                    {camp.roas.toFixed(1).replace('.', ',')}x
                  </span>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isTop ? 'bg-slate-900' : 'bg-slate-400'
                    }`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Spend Rp{Math.round(camp.spend / 1000)} rb</span>
                  <span>{camp.purchases} pembelian • CPA Rp{Math.round(camp.cpa / 1000)} rb</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Pembelian per Provinsi — Top 5 Indonesia (Mockup Gambar 3 & Bab 10) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Pembelian per Provinsi
            </h3>
            <p className="text-[10px] text-slate-400">Breakdown pasar Indonesia</p>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            30 hari
          </span>
        </div>

        <div>
          <div className="text-2xl font-black text-slate-900">3.842</div>
          <p className="text-[10px] text-slate-400">Total pembelian dari 5 provinsi teratas</p>
        </div>

        <div className="space-y-2.5 pt-1">
          {PROVINCE_DATA.map((prov) => (
            <div key={prov.province} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {prov.province}
                </span>
                <span className="font-bold text-slate-900">
                  {prov.percentage}% ({prov.purchases.toLocaleString('id-ID')})
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-slate-800 h-full rounded-full transition-all duration-500"
                  style={{ width: `${prov.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Daftar Kreatif Teratas & Deteksi Fatigue (Bab 10 & FR-18) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Daftar Kreatif Teratas
            </h3>
            <p className="text-[10px] text-slate-400">Deteksi CTR, frekuensi & kejenuhan audiens</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            ROAS Tertinggi
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Creative 1: Serum Wajah */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-bold text-xs text-slate-900">
                  Serum Wajah — Hook Testimoni
                </span>
                <span className="text-[10px] text-slate-400 block">Video • Meta Ads</span>
              </div>
              <span className="font-extrabold text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                ROAS 6,1x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1">
              <div>
                CTR: <span className="font-bold text-slate-800">2,4%</span>
              </div>
              <div>
                Frekuensi: <span className="font-bold text-slate-800">1,8</span>
              </div>
              <div className="text-right text-emerald-600 font-semibold">
                Sangat Sehat
              </div>
            </div>
          </div>

          {/* Creative 2: Hijab Voal (Fatigued / Mulai Lelah) */}
          <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900">
                    Hijab Voal Premium
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                    <AlertTriangle className="w-2.5 h-2.5" />
                    Mulai Lelah
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">Gambar • Meta Ads</span>
              </div>
              <span className="font-extrabold text-xs text-slate-700 bg-slate-200/70 px-1.5 py-0.5 rounded">
                ROAS 3,4x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1">
              <div>
                CTR: <span className="font-bold text-rose-600">0,8% (↓31%)</span>
              </div>
              <div>
                Frekuensi: <span className="font-bold text-amber-600">4,2</span>
              </div>
              <div className="text-right text-amber-700 font-semibold">
                Perlu Variasi Baru
              </div>
            </div>
          </div>

          {/* Creative 3: Sepatu Lari Aero Knit */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-150 space-y-1.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-bold text-xs text-slate-900">
                  Sepatu Lari Aero Knit
                </span>
                <span className="text-[10px] text-slate-400 block">Video • TikTok Ads</span>
              </div>
              <span className="font-extrabold text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                ROAS 4,2x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-1">
              <div>
                CTR: <span className="font-bold text-slate-800">1,9%</span>
              </div>
              <div>
                Frekuensi: <span className="font-bold text-slate-800">1,5</span>
              </div>
              <div className="text-right text-emerald-600 font-semibold">
                Sehat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
