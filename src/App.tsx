/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, MapPin, User, Star, CheckSquare, Sparkles, Navigation, Camera,
  Map, Phone, Eye, Search, Plus, Filter, ArrowUpRight, BarChart3, Shield,
  Layers, Package, AlertCircle, Trash2, Edit2, CheckCircle, RefreshCw, Smartphone, 
  TrendingUp, Award, Clock, Laptop, Code, LogOut, Check, ChevronRight, ChevronLeft, Save, Send, Calendar, FileText, SendToBack, Key, AlertTriangle
} from 'lucide-react';

import { Prospect, SalesRep, FollowUp, Quotation, PicInfo, ExistingCondition, AudioNeeds, LeadScore } from './types';
import DMSystemLogo from './components/DMSystemLogo';
import FormKunjunganStepper from './components/FormKunjunganStepper';
import DashboardManager from './components/DashboardManager';
import LaravelExport from './components/LaravelExport';

// --- MOCK SEED DATA ---
const INITIAL_PROSPECTS: Prospect[] = [
  {
    id: 'PRSP-8091',
    companyName: 'Grand Clarion Ballroom',
    businessType: 'Hotel',
    address: 'Jl. Letjen S. Parman No.Kav 21, Slipi',
    city: 'Jakarta Barat',
    province: 'DKI Jakarta',
    phone: '021-56942000',
    email: 'info@clarionballroom.com',
    website: 'www.clarionballroom.com',
    instagram: 'clarion.ballroom',
    latitude: -6.20012,
    longitude: 106.79124,
    locationName: 'Grand Clarion Ballroom Wing Barat',
    gpsAccuracy: 12,
    photoUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=640',
    photoTimestamp: new Date().toISOString(),
    pic: {
      name: 'Bpk. Hendru Lukito',
      role: 'General Manager',
      whatsapp: '628123456789',
      email: 'hendru@clarionballroom.com',
      cardExchanged: true,
      influence: 'Decision Maker'
    },
    existing: {
      hasSoundSystem: true,
      brandUsed: 'Yamaha & TOA',
      systemAge: '4 tahun',
      condition: 'Cukup',
      issues: 'Speaker passive kanan sember, kurang nendang untuk event perkawinan besar.',
      hasUsedAudioOne: true
    },
    needs: {
      outdoorSystem: false,
      lineArray: true,
      subwoofer: true,
      powerAmplifier: true,
      mixerAudio: true,
      speakerActive: true,
      speakerPassive: false,
      bgMusic: false,
      pagingSystem: false,
      conferenceSystem: false,
      wirelessMic: true,
      customHardcase: true,
      installation: true,
      maintenance: true,
      notes: 'Request layout suara mengglegar tapi vokal murni jernih tanpa feedback.',
      timeline: 'Instant',
      budgetEst: '100-250 juta',
      hasNewProject: true,
      projectName: 'Renovasi Interior Ballroom Kencana',
      projectLocation: 'Slipi Barat',
      targetCompletion: 'Selesai Agustus 2026',
      specialRequirements: 'Minta penawaran dikirim via email H+3 audit ini'
    },
    leadScore: {
      picEasyToReach: 5,
      audioNeedPotential: 5,
      budgetPotential: 4,
      projectOpportunity: 5,
      relationCloseness: 4,
      score: 'Hot'
    },
    pipelineStatus: 'Survey',
    lastVisitDate: '09/06/2026',
    salesName: 'Asep Subandri'
  },
  {
    id: 'PRSP-4411',
    companyName: 'Kopi Nako Sunter',
    businessType: 'Cafe',
    address: 'Jl. Danau Sunter Utara No.33, Sunter',
    city: 'Jakarta Utara',
    province: 'DKI Jakarta',
    phone: '021-65301222',
    email: 'hello@kopinakosunter.co.id',
    website: 'www.kopinako.com',
    instagram: 'kopinako.sunter',
    latitude: -6.13621,
    longitude: 106.87742,
    locationName: 'Kopi Nako Sunter Boulevard',
    gpsAccuracy: 18,
    photoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=640',
    photoTimestamp: new Date().toISOString(),
    pic: {
      name: 'Ibu Sarah Amalia',
      role: 'Operational Manager',
      whatsapp: '6285641233211',
      email: 'sarah.amalia@kopinakosunter.co.id',
      cardExchanged: true,
      influence: 'Influencer'
    },
    existing: {
      hasSoundSystem: true,
      brandUsed: 'Bose Home Series',
      systemAge: '1 tahun',
      condition: 'Baik',
      issues: 'Volume tidak rata, area smoking luar tidak terdengar karena deru angin jalan.',
      hasUsedAudioOne: false
    },
    needs: {
      outdoorSystem: true,
      lineArray: false,
      subwoofer: false,
      powerAmplifier: true,
      mixerAudio: false,
      speakerActive: false,
      speakerPassive: true,
      bgMusic: true,
      pagingSystem: false,
      conferenceSystem: false,
      wirelessMic: false,
      customHardcase: false,
      installation: true,
      maintenance: false,
      notes: 'Butuh speaker outdoor weatherproof yang kuat cuaca panas hujan.',
      timeline: 'Medium',
      budgetEst: '25-50 juta',
      hasNewProject: false
    },
    leadScore: {
      picEasyToReach: 4,
      audioNeedPotential: 4,
      budgetPotential: 3,
      projectOpportunity: 3,
      relationCloseness: 3,
      score: 'Warm'
    },
    pipelineStatus: 'New Lead',
    lastVisitDate: '08/06/2026',
    salesName: 'Asep Subandri'
  },
  {
    id: 'PRSP-1090',
    companyName: 'Masjid Agung Al-Bani',
    businessType: 'Tempat Ibadah',
    address: 'Jl. Boulevard Bintaro Sektor 7',
    city: 'Tangerang Selatan',
    province: 'Banten',
    phone: '021-74861234',
    email: 'pengurus@masjidalbani.or.id',
    latitude: -6.27844,
    longitude: 106.69912,
    locationName: 'Kawasan Masjid Sektor 7',
    gpsAccuracy: 25,
    photoUrl: 'https://images.unsplash.com/photo-1590076215667-8737cc572bba?auto=format&fit=crop&q=80&w=640',
    photoTimestamp: new Date().toISOString(),
    pic: {
      name: 'H. Syamsudin',
      role: 'IT Manager', // Ketua DKM
      whatsapp: '628111222333',
      email: 'syamsudin@masjidalbani.or.id',
      cardExchanged: false,
      influence: 'Gatekeeper'
    },
    existing: {
      hasSoundSystem: true,
      brandUsed: 'TOA Corong',
      systemAge: '10 tahun',
      condition: 'Bermasalah',
      issues: 'Gema dalam kubah sangat kuat sehingga ceramah ustad tidak terdengar artikulasinya.',
      hasUsedAudioOne: false
    },
    needs: {
      outdoorSystem: true,
      lineArray: false,
      subwoofer: false,
      powerAmplifier: true,
      mixerAudio: true,
      speakerActive: false,
      speakerPassive: true,
      bgMusic: false,
      pagingSystem: true,
      conferenceSystem: false,
      wirelessMic: true,
      customHardcase: false,
      installation: true,
      maintenance: true,
      notes: 'Fokus meredam gema kubah (reverberation) agar suara khotbah jernih terdengar sampai parkiran.',
      timeline: 'Long'
    },
    leadScore: {
      picEasyToReach: 2,
      audioNeedPotential: 5,
      budgetPotential: 2,
      projectOpportunity: 2,
      relationCloseness: 1,
      score: 'Cold'
    },
    pipelineStatus: 'Qualified',
    lastVisitDate: '01/06/2026',
    salesName: 'Bambang Wijaya'
  }
];

const INITIAL_SALES: SalesRep[] = [
  {
    id: 'SLS-01',
    name: 'Asep Subandri',
    email: 'asep@digitalmusic.co.id',
    area: 'Jakarta Barat & Tangerang',
    status: 'Online',
    lastActive: 'Baru saja',
    todayVisits: 3,
    todayProspects: 2,
    todayFollowUps: 1,
    todayHotLeads: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastLat: -6.2088,
    lastLng: 106.8456,
    monthlyVisits: 34,
    monthlyProspects: 18,
    monthlyClosing: 9
  },
  {
    id: 'SLS-02',
    name: 'Bambang Wijaya',
    email: 'bambang@digitalmusic.co.id',
    area: 'Jakarta Pusat & Selatan',
    status: 'Di lokasi customer',
    lastActive: '5 mnt yang lalu',
    todayVisits: 2,
    todayProspects: 1,
    todayFollowUps: 0,
    todayHotLeads: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastLat: -6.2201,
    lastLng: 106.8456,
    monthlyVisits: 28,
    monthlyProspects: 12,
    monthlyClosing: 6
  },
  {
    id: 'SLS-03',
    name: 'Siti Rahma',
    email: 'siti@digitalmusic.co.id',
    area: 'Jakarta Utara & Timur',
    status: 'Offline',
    lastActive: 'Kemarin',
    todayVisits: 0,
    todayProspects: 0,
    todayFollowUps: 0,
    todayHotLeads: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastLat: -6.1362,
    lastLng: 106.8774,
    monthlyVisits: 21,
    monthlyProspects: 8,
    monthlyClosing: 3
  }
];

const INITIAL_FOLLOWUPS: FollowUp[] = [
  {
    id: 'FU-001',
    prospectId: 'PRSP-8091',
    prospectName: 'Grand Clarion Ballroom',
    date: '09/06/2026',
    method: 'WhatsApp',
    result: 'Mengirimkan brosur produk Digital Musik Line Array seri DM-210 ke WA Pak Hendru. Beliau merespon baik dan menjadwalkan telpon ulasan.',
    nextFollowUpDate: '11/06/2026',
    status: 'Done'
  },
  {
    id: 'FU-002',
    prospectId: 'PRSP-4411',
    prospectName: 'Kopi Nako Sunter',
    date: '10/06/2026',
    method: 'Telepon',
    result: 'Follow up perihal layout desain speaker outdoor cafe. Sarah meminta revisi skema amplifier agar budget di bawah 40 jt.',
    nextFollowUpDate: '14/06/2026',
    status: 'Pending'
  }
];

const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'QT-9901',
    prospectId: 'PRSP-8091',
    prospectName: 'Grand Clarion Ballroom',
    noPenawaran: 'DM/QT-BALLROOM-2026/004',
    date: '09/06/2026',
    value: 145000000,
    pdfFileName: 'Quotation_DM_Clarion_Ballroom.pdf',
    status: 'Negosiasi'
  }
];

export default function App() {
  // Viewport Perspective Master Manager state (switch between Mobile Simulator, Desktop Manager, and Code view)
  const [viewportMode, setViewportMode] = useState<'mobile' | 'desktop' | 'code'>('mobile');
  
  // Auth state
  const [userRole, setUserRole] = useState<'sales' | 'manager' | 'unauthenticated'>('sales');
  
  // Sales Mobile App Active view state
  const [mobileTab, setMobileTab] = useState<'home' | 'prospects' | 'followup' | 'profile'>('home');
  const [showVisitStepper, setShowVisitStepper] = useState<boolean>(false);
  
  // Canvasing status (Mulai Perjalanan)
  const [canvasingStatus, setCanvasingStatus] = useState<'Belum Mulai' | 'Sedang Canvasing' | 'Selesai'>('Belum Mulai');
  const [gpsLocked, setGpsLocked] = useState<boolean>(false);
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number; acc: number } | null>(null);

  // Core Data state
  const [prospects, setProspects] = useState<Prospect[]>(INITIAL_PROSPECTS);
  const [salesReps, setSalesReps] = useState<SalesRep[]>(INITIAL_SALES);
  const [followUps, setFollowUps] = useState<FollowUp[]>(INITIAL_FOLLOWUPS);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS);

  // Detail Prospect Selected modal state
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  
  // Inline modal additions
  const [showAddFollowUpModal, setShowAddFollowUpModal] = useState<boolean>(false);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState<boolean>(false);

  // New follow up inputs
  const [newFuMethod, setNewFuMethod] = useState<'WhatsApp' | 'Telepon' | 'Email' | 'Meeting' | 'Visit'>('WhatsApp');
  const [newFuResult, setNewFuResult] = useState('');
  const [newFuNextDate, setNewFuNextDate] = useState('');
  
  // New quote inputs
  const [newQuoteNo, setNewQuoteNo] = useState('');
  const [newQuoteValue, setNewQuoteValue] = useState('');
  
  // Search on mobile prospect tab
  const [mobileSearch, setMobileSearch] = useState('');
  const [mobileSearchType, setMobileSearchType] = useState('All');

  // TRIGGER REALTIME GPS SIMULATOR (Mulai Perjalanan)
  const handleStartCanvasing = () => {
    if (canvasingStatus === 'Belum Mulai') {
      setCanvasingStatus('Sedang Canvasing');
      setGpsLocked(true);
      // Simulate real GPS location updates
      setGpsData({
        lat: -6.208765,
        lng: 106.845592,
        acc: 8
      });
      // Set SLS-01 target online status
      setSalesReps(prev => prev.map(s => s.id === 'SLS-01' ? { ...s, status: 'Di lokasi customer' } : s));
    } else {
      setCanvasingStatus('Selesai');
      setGpsLocked(false);
      setGpsData(null);
      setSalesReps(prev => prev.map(s => s.id === 'SLS-01' ? { ...s, status: 'Online' } : s));
    }
  };

  // ADD NEW PROSPECT (from Stepper submission)
  const handleAddProspect = (newProspect: Prospect) => {
    // Inject and save to state
    setProspects([newProspect, ...prospects]);
    setShowVisitStepper(false);
    setSelectedProspect(newProspect);
    
    // Auto increment salesperson metrics for today
    setSalesReps(prev => prev.map(s => s.id === 'SLS-01' ? {
      ...s,
      todayVisits: s.todayVisits + 1,
      todayProspects: s.todayProspects + 1,
      todayHotLeads: newProspect.leadScore.score === 'Hot' ? s.todayHotLeads + 1 : s.todayHotLeads,
      monthlyVisits: s.monthlyVisits + 1,
      monthlyProspects: s.monthlyProspects + 1,
    } : s));

    alert(`🟢 Kunjungan & Prospek ${newProspect.companyName} BERHASIL dimasukkan ke server SalesManagement!`);
  };

  // PIPELINE STATE TRANSITIONS
  const handleUpdateProspectStatus = (id: string, newStatus: Prospect['pipelineStatus']) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, pipelineStatus: newStatus } : p));
    if (selectedProspect && selectedProspect.id === id) {
      setSelectedProspect(prev => prev ? { ...prev, pipelineStatus: newStatus } : null);
    }
  };

  // CREATE ADD FOLLOW UP REPORT IN DATABASE
  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProspect || !newFuResult) return;

    const newFU: FollowUp = {
      id: 'FU-' + Math.floor(100+Math.random()*900),
      prospectId: selectedProspect.id,
      prospectName: selectedProspect.companyName,
      date: new Date().toLocaleDateString('id-ID'),
      method: newFuMethod,
      result: newFuResult,
      nextFollowUpDate: newFuNextDate || new Date().toLocaleDateString('id-ID'),
      status: 'Pending'
    };

    setFollowUps([newFU, ...followUps]);
    setShowAddFollowUpModal(false);
    setNewFuResult('');
    setNewFuNextDate('');

    // Update sales rep metric count
    setSalesReps(prev => prev.map(s => s.id === 'SLS-01' ? { ...s, todayFollowUps: s.todayFollowUps + 1 } : s));
    alert('🟢 Log Follow-up Berhasil Ditandai & Disimpan!');
  };

  // CREATE PENAWARAN (QUOTATION) DRAFT
  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProspect || !newQuoteValue) return;

    const val = parseFloat(newQuoteValue.replace(/\D/g, '')) || 5000000;
    const newQT: Quotation = {
      id: 'QT-' + Math.floor(1000+Math.random()*9000),
      prospectId: selectedProspect.id,
      prospectName: selectedProspect.companyName,
      noPenawaran: newQuoteNo || `DM/QT-${selectedProspect.companyName.toUpperCase().slice(0,6)}-2026/001`,
      date: new Date().toLocaleDateString('id-ID'),
      value: val,
      pdfFileName: `Quotation_DM_${selectedProspect.companyName.replace(/\s+/g,'_')}.pdf`,
      status: 'Draft'
    };

    setQuotations([newQT, ...quotations]);
    setShowAddQuoteModal(false);
    setNewQuoteNo('');
    setNewQuoteValue('');

    // Auto promote prospect pipeline phase to 'Penawaran' automatically!
    handleUpdateProspectStatus(selectedProspect.id, 'Penawaran');

    alert(`🟢 Penawaran Baru bernilai Rp ${val.toLocaleString('id-ID')} dikeluarkan! Status pipeline Klien diupdate ke Tahap 'Penawaran'.`);
  };

  const getPipelineBadgeClass = (status: Prospect['pipelineStatus']) => {
    switch (status) {
      case 'New Lead': return 'bg-cyan-50 text-cyan-705 border border-cyan-150';
      case 'Qualified': return 'bg-sky-50 text-sky-700 border border-sky-150';
      case 'Survey': return 'bg-indigo-50 text-indigo-705 border border-indigo-150';
      case 'Follow Up': return 'bg-purple-50 text-purple-700 border border-purple-150';
      case 'Penawaran': return 'bg-amber-50 text-amber-700 border border-amber-150';
      case 'Negosiasi': return 'bg-amber-100 text-amber-800 border border-amber-205';
      case 'Closing Won': return 'bg-emerald-100 text-emerald-800 border border-emerald-205';
      case 'Closing Lost': return 'bg-rose-50 text-rose-600 border border-rose-150';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 select-none antialiased text-slate-800">
      
      {/* 🖥️ VIEWPORT EMULATOR CONTROLS HEADER (TOP SYSTEM RAIL) */}
      <div className="bg-[#0F172A] text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 sticky top-0 z-50 shadow-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary/10 text-brand-primary border border-brand-primary/30 p-1.5 rounded-md">
            <svg className="h-4.5 w-4.5 fill-[#1BA7B6]" viewBox="0 0 100 100">
              <path d="M50 15 L82 31 L50 47 L18 31 Z" />
              <path d="M50 20 L72 31 L50 42 L28 31 Z" />
              <path d="M18 36 L46 51 L46 82 L18 67 Z" />
              <path d="M54 51 L82 36 L82 67 L54 82 Z" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-[12px] font-display uppercase tracking-wide text-white block leading-none">Audio One CRM</span>
            <span className="text-[9px] font-mono text-slate-400 block mt-1 tracking-tight">SALES SYSTEM CONTROL BOARD</span>
          </div>
        </div>

        {/* Action Toggle Switchers */}
        <div className="flex bg-slate-905 p-0.5 rounded-lg border border-slate-800 gap-0.5 text-xs">
          <button 
            onClick={() => {
              setViewportMode('mobile');
              setUserRole('sales');
            }}
            className={`px-3 py-1.5 rounded-md font-medium tracking-tight flex items-center gap-1.5 transition-all text-xs ${
              viewportMode === 'mobile' ? 'bg-[#1BA7B6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            Sales Mobile (PWA)
          </button>

          <button 
            onClick={() => {
              setViewportMode('desktop');
              setUserRole('manager');
            }}
            className={`px-3 py-1.5 rounded-md font-medium tracking-tight flex items-center gap-1.5 transition-all text-xs ${
              viewportMode === 'desktop' ? 'bg-[#1BA7B6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            Manager Desktop
          </button>

          <button 
            onClick={() => setViewportMode('code')}
            className={`px-3 py-1.5 rounded-md font-medium tracking-tight flex items-center gap-1.5 transition-all text-xs ${
              viewportMode === 'code' ? 'bg-[#1BA7B6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            Laravel Blade Export
          </button>
        </div>

        {/* Current local clock (UTC synced) */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-[9.5px] text-slate-400 border border-slate-800 bg-slate-900/50 px-2.5 py-1 rounded-md">
          <Clock className="h-3 w-3 text-brand-primary" />
          <span>UTC : 2026-06-09 07:33:00</span>
        </div>
      </div>

      {/* PERSPECTIVE SWITCHBOARD ROUTES */}

      {/* PERSPECTIVE 1: LARAVEL BLADE EXPORT CODE VIEWER */}
      {viewportMode === 'code' && (
        <LaravelExport />
      )}

      {/* PERSPECTIVE 2: DESKTOP CONTROL PANEL MANAGER */}
      {viewportMode === 'desktop' && (
        <DashboardManager 
          prospects={prospects}
          salesReps={salesReps}
          followUps={followUps}
          quotations={quotations}
          onAddProspect={handleAddProspect}
          onSelectProspect={(p) => {
            setSelectedProspect(p);
            setViewportMode('mobile');
            setMobileTab('prospects');
          }}
          onUpdateProspectStatus={handleUpdateProspectStatus}
        />
      )}

      {/* PERSPECTIVE 3: MOBILE FIELD SALES (HP/PWA WINDOW PREVIEW) */}
      {viewportMode === 'mobile' && (
        <div className="flex-1 py-10 px-4 flex items-center justify-center bg-slate-900/10 min-h-[calc(100vh-56px)] select-none">
          
          {/* Simulated smartphone device facade casing wrapper */}
          <div className="w-full max-w-[420px] rounded-[32px] bg-slate-950 p-3 shadow-2xl border border-slate-800 relative flex flex-col overflow-hidden min-h-[820px] shadow-slate-900/30">
            
            {/* Phone notch overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-4.5 bg-slate-950 rounded-b-xl z-50 flex items-center justify-center">
              <span className="w-8 h-0.75 bg-slate-800 rounded-full"></span>
            </div>

            {/* Simulated app screen stage inside casing */}
            <div className="flex-1 bg-slate-50 rounded-[22px] overflow-hidden flex flex-col relative min-h-[700px]">
              
              {/* IF UNAUTHENTICATED SCREEN (Halaman 1: Login) */}
              {userRole === 'unauthenticated' ? (
                <div className="flex-1 flex flex-col justify-between p-6 bg-white animate-fade-in font-sans">
                  
                  {/* Top brand header */}
                  <div className="text-center space-y-3 pt-10">
                    <div className="flex justify-center">
                      <DMSystemLogo size="lg" showTagline={false} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black font-display text-slate-850">DM SalesManagement</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Field Sales CRM & Canvasing System</p>
                    </div>
                  </div>

                  {/* Form entries cards simulation */}
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex gap-1.5 text-[10px] text-amber-800 leading-normal">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <div>
                        <span className="font-bold">Mode Simulasi Aktif:</span> Tekan button profil di bawah untuk mengisi form login otomatis.
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Karyawan</label>
                      <input 
                        type="email" 
                        readOnly
                        value="asep@digitalmusic.co.id"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Sandi Akses</label>
                      <input 
                        type="password" 
                        readOnly
                        value="••••••••"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* Auto Account fast selectors */}
                    <div className="pt-2 space-y-1.5">
                      <label className="block text-[10.5px] uppercase font-bold text-slate-400 tracking-wider">Fast Login (Pilih Akun)</label>
                      <button
                        onClick={() => setUserRole('sales')}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-850 border border-slate-250 py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between"
                      >
                        <span>Asep Subandri (Field Sales)</span>
                        <ChevronRight className="h-4 w-4 text-[#1BA7B6]" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom details logo placeholder */}
                  <div className="text-center text-[9.5px] text-slate-400 py-2 border-t border-slate-100">
                    Sistem Otentikasi Digital Musik Central Asia © 2026
                  </div>

                </div>
              ) : (
                /* IF LOGGED IN PORTAL (Sales Viewports routing manager) */
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  
                  {/* APP TITLE BAR / HEADER (Top bar with corporate identity) */}
                  <header className="bg-white border-b border-slate-150 px-4 py-3 flex items-center justify-between shadow-xs sticky top-0 z-20 shrink-0 select-none">
                    <DMSystemLogo size="sm" showTagline={false} />
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-550 rounded-full animate-pulse"></span>
                      <span className="text-[10px] bg-[#1BA7B6]/15 hover:bg-[#1BA7B6]/25 cursor-pointer text-[#1BA7B6] font-bold px-2 py-0.5 rounded-full select-none" onClick={() => setMobileTab('profile')}>
                        SLS-01
                      </span>
                    </div>
                  </header>

                  {/* ACTIVE TAB STAGES */}
                  <div className="flex-1 overflow-y-auto pb-20 select-none">
                    
                    {/* SHOW STEP-BY-STEP STEPPER IF VISUALLY INITIATED */}
                    {showVisitStepper ? (
                      <FormKunjunganStepper 
                        salesName="Asep Subandri"
                        onCancel={() => setShowVisitStepper(false)}
                        onSubmit={handleAddProspect}
                      />
                    ) : (
                      <>
                        {/* TAB A: HOME DASHBOARD MOBILE */}
                        {mobileTab === 'home' && (
                          <div className="p-4 space-y-4 animate-fade-in text-sans select-none">
                            
                            {/* Greeting banner */}
                            <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between">
                              <span className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#1BA7B6]/10 rounded-full"></span>
                              <div className="relative space-y-0.5">
                                <span className="text-[10.5px] font-bold tracking-wider text-slate-400 uppercase">Field Sales Profile</span>
                                <h2 className="text-lg font-black font-display text-white">Halo, Asep Subandri!</h2>
                                <p className="text-[10.5px] text-slate-350 leading-relaxed max-w-[240px]">Area kerja aktif Anda hari ini di kawasan <span className="font-semibold text-brand-primary">{salesReps[0].area}</span>.</p>
                              </div>

                              {/* Canvasing status tracker display */}
                              <div className="mt-5 border-t border-slate-800 pt-4 flex justify-between items-center whitespace-normal">
                                <div className="space-y-0.75">
                                  <span className="text-[8.5px] uppercase tracking-wider text-slate-450 block font-mono">Realtime GPS Canvasing</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className={`w-2.5 h-2.5 rounded-full ${canvasingStatus === 'Sedang Canvasing' ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`}></span>
                                    <span className="text-xs font-bold text-white uppercase">{canvasingStatus}</span>
                                  </div>
                                </div>

                                <button
                                  onClick={handleStartCanvasing}
                                  className={`px-4 py-2.25 rounded-xl text-[10.5px] font-black tracking-semibold shadow transition-all ${
                                    canvasingStatus === 'Sedang Canvasing' 
                                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950' 
                                      : 'bg-[#1BA7B6] hover:bg-[#158C99] text-white shadow-cyan-950'
                                  }`}
                                >
                                  {canvasingStatus === 'Sedang Canvasing' ? 'Selesai Canvasing' : 'Mulai Canvasing'}
                                </button>
                              </div>
                            </div>

                            {/* CANVANSING STATUS ADVISORY: Halaman 3 Mulai Canvasing display */}
                            {canvasingStatus === 'Sedang Canvasing' && (
                              <div className="bg-cyan-50 border border-cyan-155 rounded-2xl p-4 space-y-2.5 text-xs animate-slide-in">
                                <div className="flex gap-2">
                                  <Navigation className="text-[#1BA7B6] h-5 w-5 shrink-0" />
                                  <div className="space-y-0.5">
                                    <h4 className="font-bold text-slate-800">Status GPS Canvasing Aktif</h4>
                                    <p className="text-[10.5px] text-slate-550 leading-normal">
                                      Lokasi koordinat Anda terkoneksi secara berkala ke database central, memvalidasi rute perjalanan.
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono text-slate-600 bg-white/70 p-2 rounded-xl border border-cyan-100">
                                  <div>LAT: {gpsData?.lat || -6.2088}</div>
                                  <div>LNG: {gpsData?.lng || 106.8456}</div>
                                  <div className="col-span-2 text-emerald-650 font-bold">📡 Accuracy: ±{gpsData?.acc || 8}m (Is Lapangan)</div>
                                </div>

                                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-150 text-[10px] text-amber-800 leading-normal italic flex gap-1.5">
                                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                                  <span>Catatan: Presensi absensi harian utama dilakukan secara terpisah di aplikasi SDM HR Digital Musik.</span>
                                </div>
                              </div>
                            )}

                            {/* Action Launcher row */}
                            <div className="flex gap-3">
                              <button
                                onClick={() => setShowVisitStepper(true)}
                                className="flex-1 bg-white border border-slate-200/80 hover:bg-slate-50 py-3 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xs transition-all pointer-events-auto"
                              >
                                <Plus className="text-[#1BA7B6] h-5 w-5 bg-[#1BA7B6]/10 p-0.5 rounded-full" />
                                <span className="text-[11px] font-extrabold text-slate-800">Kunjungan Baru</span>
                              </button>
                              
                              <button
                                onClick={() => setMobileTab('prospects')}
                                className="flex-1 bg-white border border-slate-200/80 hover:bg-slate-50 py-3 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xs transition-all pointer-events-auto"
                              >
                                <Building2 className="text-[#1BA7B6] h-5 w-5 bg-cyan-100 p-0.5 rounded-full" />
                                <span className="text-[11px] font-extrabold text-slate-800">Daftar Prospek</span>
                              </button>
                            </div>

                            {/* Today Summary metric row */}
                            <div className="space-y-2">
                              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aktivitas Anda Hari Ini</h3>
                              <div className="grid grid-cols-2 gap-2.5">
                                
                                <div className="bg-white border rounded-2xl p-3.5 shadow-xs">
                                  <span className="text-[9.5px] text-slate-450 uppercase font-mono">TOTAL VISIT</span>
                                  <p className="text-lg font-black text-slate-800 mt-1">{salesReps[0].todayVisits} Klien</p>
                                </div>

                                <div className="bg-white border rounded-2xl p-3.5 shadow-xs">
                                  <span className="text-[9.5px] text-slate-450 uppercase font-mono">PROSPEK BARU</span>
                                  <p className="text-lg font-black text-slate-805 mt-1">{salesReps[0].todayProspects} database</p>
                                </div>

                                <div className="bg-white border rounded-2xl p-3.5 shadow-xs">
                                  <span className="text-[9.5px] text-slate-450 uppercase font-mono">FOLLOW UP REPORT</span>
                                  <p className="text-lg font-black text-slate-805 mt-1">{salesReps[0].todayFollowUps} records</p>
                                </div>

                                <div className="bg-white border rounded-2xl p-3.5 shadow-xs">
                                  <span className="text-[9.5px] text-slate-450 uppercase font-mono">HOT PROSPEK</span>
                                  <p className="text-lg font-black text-rose-600 mt-1">{salesReps[0].todayHotLeads} client</p>
                                </div>

                              </div>
                            </div>

                            {/* Recent activities stack */}
                            <div className="space-y-2">
                              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aktivitas Terakhir</h3>
                              <div className="space-y-2">
                                {prospects.slice(0, 2).map(p => (
                                  <div key={p.id} className="bg-white border rounded-xl p-3 flex justify-between items-center text-xs">
                                    <div className="space-y-0.5">
                                      <span className="font-extrabold text-slate-800 block line-clamp-1">{p.companyName}</span>
                                      <p className="text-[10px] text-slate-500 leading-normal">🗺️ Status: <span className="font-bold text-slate-700">{p.pipelineStatus}</span></p>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-400">{p.lastVisitDate}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        )}

                        {/* TAB B: REGISTERED PROSPECT LISTINGS MOBILE */}
                        {mobileTab === 'prospects' && (
                          <div className="p-4 space-y-4 animate-fade-in select-none">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-extrabold text-slate-900">Registered Prospeks</h3>
                              <button 
                                onClick={() => setShowVisitStepper(true)}
                                className="bg-[#1BA7B6] hover:bg-[#158C99] text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1"
                              >
                                <Plus className="h-3.5 w-3.5" /> Kunjungan
                              </button>
                            </div>

                            {/* Mobile Filters */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                              <input 
                                type="text"
                                placeholder="Cari nama tempat klien..."
                                value={mobileSearch}
                                onChange={e => setMobileSearch(e.target.value)}
                                className="w-full text-slate-900 bg-white border rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none" 
                              />
                            </div>

                            {/* Client cards stack */}
                            <div className="space-y-3 pt-1">
                              {prospects
                                .filter(p => p.companyName.toLowerCase().includes(mobileSearch.toLowerCase()))
                                .map(p => (
                                  <div 
                                    key={p.id}
                                    onClick={() => setSelectedProspect(p)}
                                    className="bg-white border rounded-2xl p-4.5 space-y-3.5 shadow-inner cursor-pointer hover:border-slate-350 transition-all"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="space-y-0.5">
                                        <h4 className="font-extrabold text-xs text-slate-850 line-clamp-1">{p.companyName}</h4>
                                        <p className="text-[9.5px] uppercase font-mono tracking-wide text-slate-400">{p.businessType}</p>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                                        p.leadScore.score === 'Hot' ? 'bg-rose-50 text-rose-600' : p.leadScore.score === 'Warm' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                                      }`}>
                                        {p.leadScore.score.toUpperCase()}
                                      </span>
                                    </div>

                                    <p className="text-[11px] text-slate-600 leading-normal line-clamp-2">📍 {p.address}</p>

                                    <div className="border-t border-slate-50 pt-3 flex justify-between items-center text-[10.5px]">
                                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9.5px] ${getPipelineBadgeClass(p.pipelineStatus)}`}>
                                        {p.pipelineStatus}
                                      </span>
                                      <span className="text-[10px] text-slate-400 font-mono">visit: {p.lastVisitDate}</span>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* TAB C: FOLLOW UP & OFFERS */}
                        {mobileTab === 'followup' && (
                          <div className="p-4 space-y-4 animate-fade-in">
                            <h3 className="text-sm font-extrabold text-slate-900 border-b border-indigo-100 pb-2">Riwayat & Log Follow Up</h3>
                            
                            <div className="space-y-3">
                              {followUps.map(fu => (
                                <div key={fu.id} className="bg-white border rounded-2xl p-4 space-y-2 text-xs">
                                  <div className="flex justify-between items-center">
                                    <span className="font-extrabold text-slate-800 leading-normal">{fu.prospectName}</span>
                                    <span className="text-[9.5px] bg-[#1BA7B6]/15 hover:bg-[#1BA7B6]/25 text-[#1BA7B6] font-bold px-2 py-0.5 rounded">{fu.method}</span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed italic">"{fu.result}"</p>
                                  <div className="flex justify-between items-center text-[10.5px] text-slate-450 pt-2 border-t border-slate-50">
                                    <span>Next FU: {fu.nextFollowUpDate}</span>
                                    <span className={`px-2 py-0.5 rounded font-bold ${fu.status === 'Done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                      {fu.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* TAB D: PROFILE & CANVANSING METRICS MOBILE */}
                        {mobileTab === 'profile' && (
                          <div className="p-4 space-y-4 animate-fade-in select-none">
                            
                            {/* Profile Bio details card */}
                            <div className="bg-white border rounded-3xl p-5 text-center space-y-3 relative overflow-hidden">
                              <span className="absolute -right-8 -top-8 w-20 h-20 bg-[#1BA7B6]/10 rounded-full"></span>
                              
                              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#1BA7B6] p-0.5">
                                <img src={salesReps[0].avatar} alt="Sales Representative Avatar" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                              </div>

                              <div>
                                <h3 className="text-base font-extrabold text-slate-850 font-display">{salesReps[0].name}</h3>
                                <p className="text-[10.5px] text-slate-450 font-mono mt-0.5">{salesReps[0].email}</p>
                              </div>

                              <span className="inline-block py-1 px-3 bg-slate-100 text-slate-650 font-semibold rounded-full text-[10.5px]">
                                Zone: {salesReps[0].area}
                              </span>
                            </div>

                            {/* Monthly statistics summary */}
                            <div className="bg-slate-900 text-white rounded-2xl p-4.5 space-y-3">
                              <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-400 block font-mono">Performance Month-to-date (Bulan Ini)</span>
                              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                                <div className="space-y-0.5">
                                  <span className="text-[11px] text-slate-400 block font-semibold">Total Visit</span>
                                  <span className="font-extrabold text-base text-brand-primary font-mono">{salesReps[0].monthlyVisits}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[11px] text-slate-400 block font-semibold">Prospek</span>
                                  <span className="font-extrabold text-base text-white font-mono">{salesReps[0].monthlyProspects}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[11px] text-slate-400 block font-semibold">Closed Deals</span>
                                  <span className="font-extrabold text-base text-emerald-450 font-mono">{salesReps[0].monthlyClosing}</span>
                                </div>
                              </div>
                            </div>

                            {/* Simulated Logout button */}
                            <button
                              onClick={() => {
                                setUserRole('unauthenticated');
                                setMobileTab('home');
                              }}
                              className="w-full bg-rose-50 border border-rose-200 text-rose-600 font-bold py-3 px-4 rounded-xl text-xs hover:bg-rose-100 transition-all flex items-center justify-center gap-1.5"
                            >
                              <LogOut className="h-4 w-4" />
                              Keluar / Logout Akun
                            </button>

                          </div>
                        )}

                      </>
                    )}

                  </div>

                  {/* BOTTOM MOBILE TAB BAR NAVIGATION CONTROLLERS */}
                  <footer className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-150 px-4 flex items-center justify-between z-30 shrink-0">
                    <button
                      onClick={() => {
                        setMobileTab('home');
                        setShowVisitStepper(false);
                        setSelectedProspect(null);
                      }}
                      className={`flex flex-col items-center gap-0.75 flex-1 transition-all ${
                        mobileTab === 'home' && !showVisitStepper ? 'text-brand-primary scale-105' : 'text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      <Map className="h-4.5 w-4.5" />
                      <span className="text-[9.5px] font-bold font-sans">Home</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowVisitStepper(true);
                      }}
                      className={`flex flex-col items-center gap-0.75 flex-1 transition-all ${
                        showVisitStepper ? 'text-brand-primary scale-105' : 'text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      <Plus className="h-4.5 w-4.5 bg-[#1BA7B6]/10 text-[#1BA7B6] rounded-full p-0.5" />
                      <span className="text-[9.5px] font-bold font-sans">Kunjungan</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileTab('prospects');
                        setShowVisitStepper(false);
                        setSelectedProspect(null);
                      }}
                      className={`flex flex-col items-center gap-0.75 flex-1 transition-all ${
                        mobileTab === 'prospects' && !showVisitStepper ? 'text-brand-primary scale-105' : 'text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      <Building2 className="h-4.5 w-4.5" />
                      <span className="text-[9.5px] font-bold font-sans">Prospek</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileTab('followup');
                        setShowVisitStepper(false);
                        setSelectedProspect(null);
                      }}
                      className={`flex flex-col items-center gap-0.75 flex-1 transition-all ${
                        mobileTab === 'followup' && !showVisitStepper ? 'text-brand-primary scale-105' : 'text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      <Calendar className="h-4.5 w-4.5" />
                      <span className="text-[9.5px] font-bold font-sans">Follow Up</span>
                    </button>

                    <button
                      onClick={() => {
                        setMobileTab('profile');
                        setShowVisitStepper(false);
                        setSelectedProspect(null);
                      }}
                      className={`flex flex-col items-center gap-0.75 flex-1 transition-all ${
                        mobileTab === 'profile' && !showVisitStepper ? 'text-brand-primary scale-105' : 'text-slate-450 hover:text-slate-700'
                      }`}
                    >
                      <User className="h-4.5 w-4.5" />
                      <span className="text-[9.5px] font-bold font-sans">Profil</span>
                    </button>
                  </footer>

                </div>
              )}

              {/* DYNAMIC SELECTED PROSPECT DETAIL BOTTOM PANEL SHEET (Modal-like transition overlay) */}
              {selectedProspect && (
                <div className="absolute inset-x-0 bottom-0 top-[48px] bg-white z-40 flex flex-col justify-between shadow-2xl animate-slide-up select-none font-sans">
                  
                  {/* Detailed Sheet Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">{selectedProspect.companyName}</h4>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">Segment: {selectedProspect.businessType} • ID: {selectedProspect.id}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedProspect(null)}
                      className="text-xs px-2.5 py-1 bg-white border rounded-lg font-bold"
                    >
                      Tutup
                    </button>
                  </div>

                  {/* Scrollable details contents */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                    
                    {/* Pipeline Status slider dropdown card */}
                    <div className="border border-slate-150 p-3 bg-slate-50 rounded-xl space-y-1.5 font-sans">
                      <span className="text-[9.5px] text-slate-400 uppercase font-mono block">Pipelines Stage Tracker</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getPipelineBadgeClass(selectedProspect.pipelineStatus)}`}>
                          {selectedProspect.pipelineStatus}
                        </span>
                        
                        {/* Selector drop */}
                        <select
                          value={selectedProspect.pipelineStatus}
                          onChange={(e) => handleUpdateProspectStatus(selectedProspect.id, e.target.value as any)}
                          className="text-[10px] bg-white border border-slate-200 rounded px-2 py-0.5 focus:outline-none"
                        >
                          <option value="New Lead">🆕 New Lead</option>
                          <option value="Qualified">💎 Qualified</option>
                          <option value="Survey">🗺️ Survey</option>
                          <option value="Follow Up">📞 Follow Up</option>
                          <option value="Penawaran">📄 Penawaran</option>
                          <option value="Negosiasi">🤝 Negosiasi</option>
                          <option value="Closing Won">🎉 Closing Won</option>
                          <option value="Closing Lost">💔 Closing Lost</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-slate-655 leading-normal">📍 <span className="font-semibold text-slate-800">Alamat:</span> {selectedProspect.address}, {selectedProspect.city}</p>

                    {/* GPS specs panel */}
                    <div className="bg-slate-50 border p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-slate-750 block">📡 Geolocation GPS Coordinate Verified</span>
                      <p className="font-mono text-[10px] text-slate-550">Lat: {selectedProspect.latitude} | Lng: {selectedProspect.longitude}</p>
                      <p className="font-mono text-[10px] text-slate-550">Akurasi: ±{selectedProspect.gpsAccuracy} meter</p>
                      {selectedProspect.photoUrl && (
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 mt-2 pointer-events-none">
                          <img src={selectedProspect.photoUrl} alt="Watermark verification evidence" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>

                    {/* PIC stats */}
                    <div className="bg-slate-50 border p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-slate-750 block">👤 Kontak PIC Klien</span>
                      <p className="font-bold text-slate-800 text-[12px]">{selectedProspect.pic.name} ({selectedProspect.pic.role})</p>
                      <a href={`https://wa.me/${selectedProspect.pic.whatsapp}`} className="text-emerald-600 font-bold hover:underline flex items-center gap-1 mt-1 font-mono">
                        💬 WhatsApp Chat: {selectedProspect.pic.whatsapp}
                      </a>
                      <p className="text-slate-500 font-mono pt-1 text-[10px]">Email: {selectedProspect.pic.email || '(Tidak ada)'}</p>
                    </div>

                    {/* Existing environment status */}
                    <div className="bg-slate-50 border p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-slate-750 block">🔊 Kondisi Eksisting Audio</span>
                      <p className="font-semibold text-slate-700">Miliki sound system: {selectedProspect.existing.hasSoundSystem ? `Ya (${selectedProspect.existing.brandUsed})` : 'Belum'}</p>
                      {selectedProspect.existing.hasSoundSystem && (
                        <>
                          <p>Umur Sistem: {selectedProspect.existing.systemAge}</p>
                          <p className="text-rose-600">Kendala: "{selectedProspect.existing.issues}"</p>
                        </>
                      )}
                    </div>

                    {/* Detail needs audio */}
                    <div className="bg-slate-50 border p-3.5 rounded-xl space-y-1">
                      <span className="font-bold text-slate-750 block">🎵 Kebutuhan Audio Spesifik</span>
                      <p className="font-semibold text-slate-800">
                        Checklist: {Object.entries(selectedProspect.needs)
                          .filter(([_, checked]) => typeof checked === 'boolean' && checked)
                          .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim())
                          .join(', ') || 'Belum diisi'}
                      </p>
                      <p className="italic text-slate-600 font-medium">Notes: "{selectedProspect.needs.notes}"</p>
                      <p className="text-brand-primary font-bold">Timeline Belanja: {selectedProspect.needs.timeline === 'Instant' ? 'URGENT' : 'Medium-Term'}</p>
                    </div>

                  </div>

                  {/* Actions buttons sheet footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-150 grid grid-cols-2 gap-2.5 shrink-0">
                    <button
                      onClick={() => setShowAddFollowUpModal(true)}
                      className="bg-slate-800 hover:bg-slate-750 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <Plus className="h-4 w-4" />
                      Follow Up
                    </button>
                    
                    <button
                      onClick={() => setShowAddQuoteModal(true)}
                      className="bg-[#1BA7B6] hover:bg-brand-primary/95 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <FileText className="h-4 w-4" />
                      Buat Penawaran
                    </button>
                  </div>

                </div>
              )}

              {/* DYNAMIC MODAL: ADD FOLLOW UP */}
              {showAddFollowUpModal && selectedProspect && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateFollowUp} className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl font-sans text-xs">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <h4 className="font-extrabold text-sm text-slate-900">Catat Follow Up</h4>
                      <button type="button" onClick={() => setShowAddFollowUpModal(false)} className="text-slate-400 font-bold hover:text-slate-700">Tutup</button>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Metode Follow Up</label>
                      <select 
                        value={newFuMethod}
                        onChange={(e) => setNewFuMethod(e.target.value as any)}
                        className="w-full border rounded-lg px-2.5 py-1.5 bg-white text-slate-800"
                      >
                        <option value="WhatsApp">WhatsApp Chat</option>
                        <option value="Telepon">Panggilan Suara</option>
                        <option value="Email">Email Surat Resmi</option>
                        <option value="Meeting">Meeting Offline / Demo</option>
                        <option value="Visit">Kunjungan Ulang</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Hasil & Log Ringkasan *</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Tulis respon klien, item yang didiskusikan..."
                        value={newFuResult}
                        onChange={e => setNewFuResult(e.target.value)}
                        className="w-full text-slate-900 border rounded-lg p-2 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Jadwal Follow Up Berikutnya</label>
                      <input 
                        type="date"
                        value={newFuNextDate}
                        onChange={e => setNewFuNextDate(e.target.value)}
                        className="w-full text-slate-900 border rounded-lg p-2 focus:outline-none" 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#1BA7B6] text-white font-bold py-2.5 rounded-lg hover:bg-[#158C99]"
                    >
                      Simpan Log FollowUp
                    </button>
                  </form>
                </div>
              )}

              {/* DYNAMIC MODAL: ISSUE QUOTATION */}
              {showAddQuoteModal && selectedProspect && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleCreateQuotation} className="bg-white rounded-3xl p-5 w-full max-w-sm space-y-4 shadow-2xl font-sans text-xs">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                      <h4 className="font-extrabold text-sm text-slate-900">Buat Penawaran Harga</h4>
                      <button type="button" onClick={() => setShowAddQuoteModal(false)} className="text-slate-400 font-bold hover:text-slate-700">Tutup</button>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nomor Penawaran</label>
                      <input 
                        type="text"
                        placeholder="cth. DM/QT-CLARION-2026/001"
                        value={newQuoteNo}
                        onChange={e => setNewQuoteNo(e.target.value)}
                        className="w-full text-slate-900 border rounded-lg p-2 focus:outline-none" 
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nilai Penawaran (IDR Rupiah) *</label>
                      <input 
                        type="number"
                        required
                        placeholder="Harga total penawaran..."
                        value={newQuoteValue}
                        onChange={e => setNewQuoteValue(e.target.value)}
                        className="w-full text-slate-900 border rounded-lg p-2 focus:outline-none" 
                      />
                    </div>

                    <div className="bg-slate-50 border border-dashed rounded-lg p-3 text-center text-slate-500 font-mono text-[10px]">
                      📂 SIMULATED FILE: Quotation_DM_Generated_Draft.pdf
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#1BA7B6] text-white font-bold py-2.5 rounded-lg hover:bg-[#158C99]"
                    >
                      Keluarkan Surat Penawaran
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
