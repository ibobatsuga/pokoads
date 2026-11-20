export type PlatformType = 'meta' | 'tiktok';

export type AdStatus = 'aktif' | 'dinaikkan' | 'dimatikan';

export interface AdItem {
  id: string; // e.g. '#ADS_2041'
  name: string;
  platform: PlatformType;
  accountId: string;
  campaignName: string;
  format: 'Gambar' | 'Video' | 'Carousel';
  variantCount: number;
  time: string; // '07.42', '09.20'
  dateGroup: 'Hari Ini' | 'Kemarin' | '20 Sep 2026';
  spend: number; // in IDR
  dailyBudget: number; // in IDR
  roas: number;
  purchases: number;
  cpa: number; // Biaya per hasil
  ctr: number; // Click Through Rate in %
  frequency: number;
  status: AdStatus;
  statusReason?: string;
  isFatigued?: boolean; // Kreatif lelah flag
  lastActionTime?: string;
  initials?: string;
}

export interface AdAccount {
  id: string;
  name: string;
  platform: PlatformType;
  accountNumber: string;
  connected: boolean;
  tokenExpiresIn: string;
  dailyIncreaseLimit: number; // Pagu harian kenaikan budget
}

export interface AutoRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  metric: 'spend' | 'pembelian' | 'cpa' | 'roas' | 'ctr' | 'frekuensi';
  operator: '>' | '<' | '>=';
  threshold: number;
  timeframeHours: number;
  action: 'jeda' | 'naikkan_budget' | 'peringatan';
  budgetIncreasePercent?: number;
  isDefault?: boolean;
}

export interface CreativeVariation {
  id: string;
  sourceAdId: string;
  sourceAdName: string;
  platform: PlatformType;
  hook: string;
  angle: string;
  rationale: string;
  suggestedFormat: 'Gambar' | 'Video 9:16' | 'Carousel';
  status: 'menunggu' | 'disetujui' | 'ditolak';
  roasSource: number;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  adId: string;
  adName: string;
  platform: PlatformType;
  ruleName: string;
  actionType: 'dinaikkan' | 'dimatikan' | 'peringatan';
  triggerValue: string;
  timestamp: string;
  details: string;
  isSimulated?: boolean;
}

export interface ProvinceSpend {
  province: string;
  purchases: number;
  percentage: number;
  spend: number;
}

export interface CampaignPerformance {
  name: string;
  platform: PlatformType;
  roas: number;
  spend: number;
  purchases: number;
  cpa: number;
}
