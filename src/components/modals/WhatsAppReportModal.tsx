'use client';

import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Copy,
  Check,
  Send,
  CheckCheck,
  ShieldCheck,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WhatsAppReportModal() {
  const {
    isWhatsAppModalOpen,
    setIsWhatsAppModalOpen,
    whatsappPhone,
    whatsappTime,
    showToast,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isWhatsAppModalOpen) return null;

  const rawMessage = `*PokoAds - Laporan Pagi, Jumat 20 November 2026*

Total spend kemarin Rp612 ribu. ROAS gabungan 4,8x, naik dari 4,1x bulan lalu. Spend bulan ini Rp18.452.700.

*Dimatikan (2):* Kopi Sanger dan Tas Kulit. Keduanya melewati batas spend tanpa pembelian sesuai aturan biaya per hasil. Estimasi spend yang dicegah Rp386 ribu.

*Dinaikkan (1):* Serum Wajah naik 20 persen menjadi Rp150 ribu per hari. ROAS 6,1x, di atas target 4x.

*Kreatif mulai lelah (1):* Hijab Voal. CTR turun 31 persen menjadi 0,8 persen dan frekuensi 4,2.

*Rekomendasi hari ini:* buat 3 variasi dari Serum Wajah sebelum kreatifnya lelah. Buka aplikasi untuk menyetujui variasi yang sudah disiapkan.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    showToast('Teks laporan berhasil disalin ke clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendSimulation = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      showToast(`Laporan simulasi terkirim ke WhatsApp ${whatsappPhone}!`);
      setTimeout(() => setSentSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-fadeIn">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">PokoAds Copilot</span>
                <span className="text-[9px] bg-emerald-700/80 px-1.5 py-0.2 rounded text-emerald-100">
                  Resmi WA Cloud API
                </span>
              </div>
              <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Kirim harian pukul {whatsappTime} ke {whatsappPhone}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Authentic WhatsApp Chat Background & Bubble */}
        <div className="p-4 bg-[#efeae2] min-h-[300px] flex flex-col justify-center space-y-3">
          {/* WhatsApp message bubble */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/70 text-slate-800 text-xs space-y-2.5 relative">
            {/* Title */}
            <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
              <span>PokoAds - Laporan Pagi, Jumat 20 November 2026</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                Pilar 1
              </span>
            </div>

            <p className="leading-relaxed text-slate-700">
              Total spend kemarin <span className="font-bold">Rp612 ribu</span>. ROAS gabungan{' '}
              <span className="font-bold text-emerald-700">4,8x</span>, naik dari 4,1x bulan lalu. Spend bulan ini{' '}
              <span className="font-bold">Rp18.452.700</span>.
            </p>

            {/* Dimatikan */}
            <div className="bg-rose-50/80 p-2 rounded-xl border border-rose-100">
              <span className="font-bold text-rose-700 block mb-0.5">
                🛑 Dimatikan (2): Kopi Sanger dan Tas Kulit
              </span>
              <p className="text-[11px] text-slate-600">
                Keduanya melewati batas spend tanpa pembelian sesuai aturan biaya per hasil. Estimasi spend yang dicegah{' '}
                <span className="font-bold text-rose-600">Rp386 ribu</span>.
              </p>
            </div>

            {/* Dinaikkan */}
            <div className="bg-blue-50/80 p-2 rounded-xl border border-blue-100">
              <span className="font-bold text-blue-700 block mb-0.5">
                🚀 Dinaikkan (1): Serum Wajah (+20%)
              </span>
              <p className="text-[11px] text-slate-600">
                Naik 20% menjadi <span className="font-bold">Rp150 ribu per hari</span>. ROAS{' '}
                <span className="font-bold text-blue-600">6,1x</span>, di atas target 4x.
              </p>
            </div>

            {/* Kreatif mulai lelah */}
            <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-100">
              <span className="font-bold text-amber-800 block mb-0.5">
                ⚠️ Kreatif mulai lelah (1): Hijab Voal
              </span>
              <p className="text-[11px] text-slate-600">
                CTR turun 31% menjadi <span className="font-bold">0,8%</span> dan frekuensi{' '}
                <span className="font-bold">4,2</span>.
              </p>
            </div>

            {/* Rekomendasi */}
            <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-100">
              <span className="font-bold text-emerald-800 block mb-0.5">
                💡 Rekomendasi hari ini:
              </span>
              <p className="text-[11px] text-slate-600">
                Buat 3 variasi dari Serum Wajah sebelum kreatifnya lelah. Buka aplikasi untuk menyetujui variasi yang sudah disiapkan.
              </p>
            </div>

            {/* Timestamp & read ticks */}
            <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
              <span>07:00</span>
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleCopy}
            className="w-full sm:flex-1 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin!' : 'Salin Teks WhatsApp'}</span>
          </button>

          <button
            onClick={handleSendSimulation}
            disabled={isSending}
            className="w-full sm:flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSending ? (
              <span className="animate-spin text-xs">⏳</span>
            ) : sentSuccess ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{sentSuccess ? 'Terkirim!' : 'Kirim Simulasi WA'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
