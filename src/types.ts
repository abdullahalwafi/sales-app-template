/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PicInfo {
  name: string;
  role: string; // Owner, Director, etc.
  whatsapp: string;
  email: string;
  cardExchanged: boolean;
  influence: 'Decision Maker' | 'Influencer' | 'User' | 'Gatekeeper';
}

export interface ExistingCondition {
  hasSoundSystem: boolean;
  brandUsed: string;
  systemAge: string;
  condition: 'Baik' | 'Cukup' | 'Bermasalah';
  issues: string;
  hasUsedAudioOne: boolean;
}

export interface AudioNeeds {
  // Checklist
  outdoorSystem: boolean;
  lineArray: boolean;
  subwoofer: boolean;
  powerAmplifier: boolean;
  mixerAudio: boolean;
  speakerActive: boolean;
  speakerPassive: boolean;
  bgMusic: boolean;
  pagingSystem: boolean;
  conferenceSystem: boolean;
  wirelessMic: boolean;
  customHardcase: boolean;
  installation: boolean;
  maintenance: boolean;
  
  // Text & timeframe
  notes: string;
  timeline: 'Instant' | 'Medium' | 'Long'; // Cepat 1-3 bln, Medium 4-6 bln, Lama >6 bln
  
  // Extension for Instant / Medium
  currentBrand?: string;
  existingVendor?: string;
  existingIntegrator?: string;
  budgetEst?: string; // <25jt, 25-50jt, 50-100jt, 100-250jt, >250jt
  hasNewProject?: boolean;
  projectName?: string;
  projectLocation?: string;
  targetCompletion?: string;
  specialRequirements?: string; // Replaces 'komisi PIC'
}

export interface LeadScore {
  picEasyToReach: number; // 1-5
  audioNeedPotential: number; // 1-5
  budgetPotential: number; // 1-5
  projectOpportunity: number; // 1-5
  relationCloseness: number; // 1-5
  score: 'Cold' | 'Warm' | 'Hot';
}

export interface Prospect {
  id: string;
  companyName: string;
  businessType: string; // Hotel, Masjid, Cafe, etc.
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  
  // GPS
  latitude: number;
  longitude: number;
  locationName?: string;
  gpsAccuracy: number;
  
  // Image
  photoUrl?: string;
  photoTimestamp?: string;
  
  // Linked forms
  pic: PicInfo;
  existing: ExistingCondition;
  needs: AudioNeeds;
  leadScore: LeadScore;
  
  // Activity Status
  pipelineStatus: 'New Lead' | 'Qualified' | 'Survey' | 'Follow Up' | 'Penawaran' | 'Negosiasi' | 'Closing Won' | 'Closing Lost';
  lastVisitDate: string;
  salesName: string;
}

export interface FollowUp {
  id: string;
  prospectId: string;
  prospectName: string;
  date: string;
  method: 'WhatsApp' | 'Telepon' | 'Email' | 'Meeting' | 'Visit';
  result: string;
  nextFollowUpDate: string;
  status: 'Pending' | 'Done' | 'Reschedule';
}

export interface Quotation {
  id: string;
  prospectId: string;
  prospectName: string;
  noPenawaran: string;
  date: string;
  value: number;
  pdfFileName: string;
  status: 'Draft' | 'Dikirim' | 'Negosiasi' | 'Disetujui' | 'Ditolak';
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  area: string;
  status: 'Online' | 'Di lokasi customer' | 'Offline';
  lastActive: string;
  todayVisits: number;
  todayProspects: number;
  todayFollowUps: number;
  todayHotLeads: number;
  avatar: string;
  lastLat?: number;
  lastLng?: number;
  monthlyVisits: number;
  monthlyProspects: number;
  monthlyClosing: number;
}
