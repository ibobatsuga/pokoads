'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdItem, AdAccount, AutoRule, CreativeVariation, ActivityLog, AdStatus } from '../types';
import {
  INITIAL_ACCOUNTS,
  INITIAL_ADS,
  INITIAL_RULES,
  INITIAL_VARIATIONS,
  INITIAL_ACTIVITY_LOGS,
} from '../data/mockData';

export type TabType = 'beranda' | 'iklan' | 'analitik' | 'pengaturan';

export interface FilterState {
  dateGroup: string; // 'semua', 'Hari Ini', 'Kemarin'
  minSpend: number;
  maxSpend: number;
  status: string; // 'semua', 'aktif', 'dinaikkan', 'dimatikan'
}

interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  accounts: AdAccount[];
  selectedAccountId: string;
  setSelectedAccountId: (id: string) => void;
  ads: AdItem[];
  rules: AutoRule[];
  variations: CreativeVariation[];
  activityLogs: ActivityLog[];
  emergencyStop: boolean;
  simulationMode: boolean;
  whatsappEnabled: boolean;
  whatsappTime: string;
  whatsappPhone: string;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  
  // Modals & Sheets
  isFilterSheetOpen: boolean;
  setIsFilterSheetOpen: (open: boolean) => void;
  selectedAdForDetail: AdItem | null;
  setSelectedAdForDetail: (ad: AdItem | null) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isNewRuleModalOpen: boolean;
  setIsNewRuleModalOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;

  // Filter
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  activeFilterCount: number;

  // Handlers
  toggleAdStatus: (adId: string) => void;
  updateAdBudget: (adId: string, newBudget: number) => void;
  approveVariation: (id: string) => void;
  rejectVariation: (id: string) => void;
  toggleRule: (id: string) => void;
  toggleEmergencyStop: () => void;
  toggleSimulationMode: () => void;
  setWhatsappEnabled: (enabled: boolean) => void;
  setWhatsappTime: (time: string) => void;
  setWhatsappPhone: (phone: string) => void;
  addNewRule: (rule: Omit<AutoRule, 'id'>) => void;
  runRuleCheckSimulator: () => void;
}

const defaultFilter: FilterState = {
  dateGroup: 'semua',
  minSpend: 0,
  maxSpend: 1000000,
  status: 'semua',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [accounts] = useState<AdAccount[]>(INITIAL_ACCOUNTS);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('semua');
  
  const [ads, setAds] = useState<AdItem[]>(INITIAL_ADS);
  const [rules, setRules] = useState<AutoRule[]>(INITIAL_RULES);
  const [variations, setVariations] = useState<CreativeVariation[]>(INITIAL_VARIATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  
  const [emergencyStop, setEmergencyStop] = useState<boolean>(false);
  const [simulationMode, setSimulationMode] = useState<boolean>(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState<boolean>(true);
  const [whatsappTime, setWhatsappTime] = useState<string>('07.00 WIB');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('+62 812-9882-9900');
  
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState<boolean>(false);
  const [selectedAdForDetail, setSelectedAdForDetail] = useState<AdItem | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState<boolean>(false);
  const [isNewRuleModalOpen, setIsNewRuleModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const [filterState, setFilterState] = useState<FilterState>(defaultFilter);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const resetFilters = () => {
    setFilterState(defaultFilter);
    showToast('Filter telah direset', 'info');
  };

  const activeFilterCount =
    (filterState.dateGroup !== 'semua' ? 1 : 0) +
    (filterState.status !== 'semua' ? 1 : 0) +
    (filterState.minSpend > 0 || filterState.maxSpend < 1000000 ? 1 : 0);

  // Toggle ad status (Nyalakan / Jeda manual)
  const toggleAdStatus = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id === adId) {
          const newStatus: AdStatus = ad.status === 'dimatikan' ? 'aktif' : 'dimatikan';
          const newReason =
            newStatus === 'aktif'
              ? 'Dinyalakan kembali secara manual oleh Bobi'
              : 'Dijeda secara manual oleh Bobi';

          // Add to activity log
          const newLog: ActivityLog = {
            id: `act-${Date.now()}`,
            adId: ad.id,
            adName: ad.name,
            platform: ad.platform,
            ruleName: 'Aksi Manual Buyer',
            actionType: newStatus === 'aktif' ? 'dinaikkan' : 'dimatikan',
            triggerValue: 'Manual Override',
            timestamp: 'Baru saja',
            details: `${ad.name} ${newStatus === 'aktif' ? 'diaktifkan kembali' : 'dijeda'}.`,
          };
          setActivityLogs((prevLogs) => [newLog, ...prevLogs]);

          showToast(`${ad.name} berhasil ${newStatus === 'aktif' ? 'diaktifkan kembali' : 'dijeda'}`);
          return { ...ad, status: newStatus, statusReason: newReason };
        }
        return ad;
      })
    );
  };

  const updateAdBudget = (adId: string, newBudget: number) => {
    setAds((prev) =>
      prev.map((ad) => {
        if (ad.id === adId) {
          return { ...ad, dailyBudget: newBudget };
        }
        return ad;
      })
    );
    showToast('Budget iklan berhasil diperbarui');
  };

  // Approve creative variation -> creates a test ad (Pilar 3)
  const approveVariation = (id: string) => {
    const variation = variations.find((v) => v.id === id);
    if (!variation) return;

    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'disetujui' } : v))
    );

    // Create new test ad in Ad list
    const newAdId = `#ADS_${Math.floor(2050 + Math.random() * 50)}`;
    const newTestAd: AdItem = {
      id: newAdId,
      name: `${variation.sourceAdName} (Uji: ${variation.suggestedFormat})`,
      platform: variation.platform,
      accountId: 'meta-8841',
      campaignName: 'Promo 11.11 [Pengujian]',
      format: variation.suggestedFormat.includes('Video') ? 'Video' : 'Carousel',
      variantCount: 1,
      time: 'Baru saja',
      dateGroup: 'Hari Ini',
      spend: 0,
      dailyBudget: 50000,
      roas: 0.0,
      purchases: 0,
      cpa: 0,
      ctr: 0.0,
      frequency: 1.0,
      status: 'aktif',
      statusReason: `Iklan uji baru dari variasi ${variation.angle} (Budget uji Rp50 rb/hari)`,
      initials: 'UJ',
    };

    setAds((prev) => [newTestAd, ...prev]);

    // Log the approval
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      adId: newAdId,
      adName: newTestAd.name,
      platform: variation.platform,
      ruleName: 'Persetujuan Variasi Kreatif',
      actionType: 'dinaikkan',
      triggerValue: 'Disetujui Buyer',
      timestamp: 'Baru saja',
      details: `Varian tayang sebagai iklan uji berdampingan dengan iklan aslinya.`,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    showToast('Variasi disetujui! Iklan uji telah ditayangkan dengan budget Rp50.000/hari');
  };

  const rejectVariation = (id: string) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'ditolak' } : v))
    );
    showToast('Variasi kreatif ditolak dan diarsipkan', 'info');
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((rule) => {
        if (rule.id === id) {
          const next = !rule.enabled;
          showToast(`Aturan "${rule.name}" ${next ? 'diaktifkan' : 'dinonaktifkan'}`);
          return { ...rule, enabled: next };
        }
        return rule;
      })
    );
  };

  const toggleEmergencyStop = () => {
    const next = !emergencyStop;
    setEmergencyStop(next);
    if (next) {
      setRules((prev) => prev.map((r) => ({ ...r, enabled: false })));
      showToast('BERHENTI DARURAT DIAKTIFKAN: Semua auto-rules dimatikan seketika!', 'error');
    } else {
      setRules((prev) => prev.map((r) => ({ ...r, enabled: true })));
      showToast('Berhenti darurat dinonaktifkan: Aturan bawaan diaktifkan kembali.', 'success');
    }
  };

  const toggleSimulationMode = () => {
    const next = !simulationMode;
    setSimulationMode(next);
    showToast(
      next
        ? 'Mode Simulasi Aktif: Aturan hanya mencatat rekomendasi tanpa menyentuh iklan sungguhan'
        : 'Mode Eksekusi Aktif: Aturan otomatis mengeksekusi ke Ads Manager'
    );
  };

  const addNewRule = (newRuleData: Omit<AutoRule, 'id'>) => {
    const newRule: AutoRule = {
      id: `rule-${Date.now()}`,
      ...newRuleData,
    };
    setRules((prev) => [...prev, newRule]);
    showToast(`Aturan baru "${newRule.name}" berhasil ditambahkan!`);
  };

  const runRuleCheckSimulator = () => {
    showToast('Memindai seluruh iklan aktif di Meta Ads & TikTok Ads...', 'info');
    setTimeout(() => {
      const newLog: ActivityLog = {
        id: `act-${Date.now()}`,
        adId: '#ADS_2036',
        adName: 'Sepatu Lari Aero Knit',
        platform: 'tiktok',
        ruleName: 'Pemeriksaan Rutin 30 Menit',
        actionType: 'peringatan',
        triggerValue: 'ROAS 4,2x (Sehat)',
        timestamp: 'Baru saja',
        details: 'Semua metrik dalam batas aman. Tidak ada aksi penjedaan diperlukan.',
      };
      setActivityLogs((prev) => [newLog, ...prev]);
      showToast('Pemeriksaan selesai: Semua metrik terpantau optimal.');
    }, 1200);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        accounts,
        selectedAccountId,
        setSelectedAccountId,
        ads,
        rules,
        variations,
        activityLogs,
        emergencyStop,
        simulationMode,
        whatsappEnabled,
        whatsappTime,
        whatsappPhone,
        toast,
        showToast,
        isFilterSheetOpen,
        setIsFilterSheetOpen,
        selectedAdForDetail,
        setSelectedAdForDetail,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isNewRuleModalOpen,
        setIsNewRuleModalOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        filterState,
        setFilterState,
        resetFilters,
        activeFilterCount,
        toggleAdStatus,
        updateAdBudget,
        approveVariation,
        rejectVariation,
        toggleRule,
        toggleEmergencyStop,
        toggleSimulationMode,
        setWhatsappEnabled,
        setWhatsappTime,
        setWhatsappPhone,
        addNewRule,
        runRuleCheckSimulator,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
