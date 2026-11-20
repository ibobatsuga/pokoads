'use client';

import React, { useState } from 'react';
import {
  User,
  MessageSquare,
  Shield,
  Globe,
  Sliders,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  ChevronRight,
  Plus,
  Check,
  Edit2,
  Lock,
  Phone,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsTab() {
  const {
    rules,
    toggleRule,
    emergencyStop,
    toggleEmergencyStop,
    simulationMode,
    toggleSimulationMode,
    whatsappEnabled,
    setWhatsappEnabled,
    whatsappTime,
    setWhatsappTime,
    whatsappPhone,
    setWhatsappPhone,
    accounts,
    setIsWhatsAppModalOpen,
    setIsNewRuleModalOpen,
    runRuleCheckSimulator,
    showToast,
  } = useApp();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWhatsAppConfigOpen, setIsWhatsAppConfigOpen] = useState(false);

  return (
    <div className="space-y-4 pb-20 pt-1 animate-fadeIn">
      {/* Title */}
      <h2 className="text-sm font-bold text-slate-900 tracking-tight">
        Pengaturan & Konfigurasi
      </h2>

      {/* 1. Profile Box (Mockup Gambar 4) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-150 shadow-xs flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-xl flex items-center justify-center shadow-md mb-2">
          B
        </div>
        <h3 className="text-sm font-bold text-slate-900">Bobi</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Media buyer • 3 akun iklan terhubung
        </p>

        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit profil
        </button>
      </div>

      {/* 2. Bagian Umum (Mockup Gambar 4) */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Umum
        </span>

        <div className="bg-white rounded-2xl border border-slate-150 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* Laporan WhatsApp Switch */}
          <div className="p-3.5 flex items-center justify-between">
            <div
              className="flex items-start gap-3 cursor-pointer flex-1"
              onClick={() => setIsWhatsAppConfigOpen(true)}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">
                    Laporan WhatsApp
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold underline">
                    Ubah
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Ringkasan harian pukul {whatsappTime} ({whatsappPhone})
                </p>
              </div>
            </div>

            {/* Switch */}
            <button
              onClick={() => {
                setWhatsappEnabled(!whatsappEnabled);
                showToast(
                  `Laporan WhatsApp ${!whatsappEnabled ? 'diaktifkan' : 'dinonaktifkan'}`
                );
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                whatsappEnabled ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  whatsappEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Akun Iklan Terhubung */}
          <div
            onClick={() => setIsAccountModalOpen(true)}
            className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Akun Iklan Terhubung
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Meta Ads • 2 akun | TikTok Ads • 1 akun
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Keamanan */}
          <div className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Keamanan</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Verifikasi dua langkah aktif • Token terenkripsi
                </p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Aktif
            </span>
          </div>

          {/* Bahasa & Mata Uang */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Bahasa & Mata Uang
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bahasa Indonesia • Rupiah (IDR)
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700">IDR</span>
          </div>
        </div>
      </div>

      {/* 3. Bagian Aturan Otomatis (Mockup Gambar 4 & Lampiran B) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Aturan Otomatis (Auto-Rules)
          </span>
          <button
            onClick={() => setIsNewRuleModalOpen(true)}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Aturan Kustom
          </button>
        </div>

        {/* Emergency Kill Switch Button */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-800">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-bold">Tombol Berhenti Darurat</span>
            </div>
            <button
              onClick={toggleEmergencyStop}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                emergencyStop
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-95'
              }`}
            >
              {emergencyStop ? 'Nyalakan Kembali Semua' : 'Matikan Semua Sekarang'}
            </button>
          </div>
          <p className="text-[10px] text-rose-600 leading-relaxed">
            Hentikan seluruh eksekusi auto-rules di Meta Ads dan TikTok Ads seketika jika terjadi kendala pada campaign Anda.
          </p>
        </div>

        {/* Mode Simulasi Toggle */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-150 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">Mode Simulasi (Dry Run)</span>
              <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                FR-17
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Pantau 3 hari pertama: Catat rekomendasi tanpa eksekusi langsung.
            </p>
          </div>
          <button
            onClick={toggleSimulationMode}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              simulationMode ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                simulationMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Rule Cards List */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {rules.map((rule) => (
            <div key={rule.id} className="p-3.5 flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{rule.name}</span>
                  {rule.isDefault && (
                    <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      Bawaan PRD
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {rule.description}
                </p>
              </div>

              {/* Rule toggle switch */}
              <button
                disabled={emergencyStop}
                onClick={() => toggleRule(rule.id)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors flex-shrink-0 mt-1 ${
                  rule.enabled && !emergencyStop ? 'bg-slate-900' : 'bg-slate-300'
                } ${emergencyStop ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    rule.enabled && !emergencyStop ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Live Simulator Actions */}
      <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200/80 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Aksi Interaktif & Pengujian</span>
        </div>
        <p className="text-[11px] text-slate-600">
          Simulasikan loop pemeriksaan aturan berkala atau uji format laporan WhatsApp ke nomor buyer.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={runRuleCheckSimulator}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
            Cek Auto-Rules
          </button>
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Format WA PRD
          </button>
        </div>
      </div>

      {/* Modal: Ubah WhatsApp Config */}
      {isWhatsAppConfigOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Konfigurasi Laporan WhatsApp
            </h3>
            <p className="text-xs text-slate-500">
              Pengiriman memakai WhatsApp Cloud API resmi dengan template opt-in.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nomor WhatsApp (Opt-In):
                </label>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Jam Pengiriman (Bawaan 07.00 WIB):
                </label>
                <select
                  value={whatsappTime}
                  onChange={(e) => setWhatsappTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="06.00 WIB">06.00 WIB (Pagi Awal)</option>
                  <option value="07.00 WIB">07.00 WIB (Bawaan PRD)</option>
                  <option value="08.00 WIB">08.00 WIB (Jam Kerja)</option>
                  <option value="09.00 WIB">09.00 WIB</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setIsWhatsAppConfigOpen(false);
                  showToast('Pengaturan WhatsApp berhasil disimpan!');
                }}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Simpan
              </button>
              <button
                onClick={() => setIsWhatsAppConfigOpen(false)}
                className="py-2 px-4 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Akun Iklan Terhubung */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Akun Iklan Terhubung
            </h3>
            <p className="text-xs text-slate-500">
              Token tersimpan terenkripsi dan diperbarui otomatis sebelum kedaluwarsa (FR-08).
            </p>

            <div className="space-y-2.5">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {acc.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Terhubung
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ID: {acc.accountNumber} • Token berlaku: {acc.tokenExpiresIn}
                  </div>
                  <div className="text-[10px] text-slate-600 font-medium">
                    Pagu kenaikan harian: Rp{acc.dailyIncreaseLimit.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setIsAccountModalOpen(false);
                showToast('Otorisasi akun diperiksa: Semua token valid.');
              }}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal: Edit Profil */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">Edit Profil Media Buyer</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama:</label>
                <input
                  type="text"
                  defaultValue="Bobi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Role:</label>
                <input
                  type="text"
                  defaultValue="Media Buyer Berpengalaman (Freelance)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  showToast('Profil berhasil disimpan');
                }}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="py-2 px-4 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
