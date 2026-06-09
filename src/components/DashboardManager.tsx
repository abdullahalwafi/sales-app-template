/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, MapPin, Eye, Search, Plus, Filter, ArrowUpRight, BarChart3, Shield,
  Layers, Package, AlertCircle, Trash2, Edit2, CheckCircle, RefreshCw, Smartphone, TrendingUp, Award, Clock
} from 'lucide-react';
import { Prospect, SalesRep, FollowUp, Quotation } from '../types';
import DMSystemLogo from './DMSystemLogo';

interface DashboardManagerProps {
  prospects: Prospect[];
  salesReps: SalesRep[];
  followUps: FollowUp[];
  quotations: Quotation[];
  onAddProspect: (p: Prospect) => void;
  onSelectProspect: (prospect: Prospect) => void;
  onUpdateProspectStatus: (prospectId: string, status: Prospect['pipelineStatus']) => void;
}

export default function DashboardManager({ 
  prospects, 
  salesReps, 
  followUps, 
  quotations,
  onAddProspect,
  onSelectProspect,
  onUpdateProspectStatus
}: DashboardManagerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'pipeline' | 'master' | 'leaderboard'>('overview');
  
  // Search & Filter state for prospect dashboard
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterLead, setFilterLead] = useState('All');
  
  // Selected sales for "Monitoring" map tracer
  const [selectedMonitoringSales, setSelectedMonitoringSales] = useState<SalesRep | null>(salesReps[0]);
  
  // Master data lists for mock CRUD
  const [masterUsaha, setMasterUsaha] = useState([
    'Hotel', 'Masjid', 'Sekolah', 'Cafe', 'Restoran', 'Corporate', 'Universitas', 'Tempat Ibadah', 'Pabrik', 'Gudang'
  ]);
  const [newUsaha, setNewUsaha] = useState('');
  
  const [masterCompetitors, setMasterCompetitors] = useState([
    'JBL Professional', 'Bose Premium', 'TOA Systems', 'Yamaha Commercial Audio', 'Electro-Voice', 'Harman Audio'
  ]);
  const [newCompetitor, setNewCompetitor] = useState('');

  const [masterAudioNeeds, setMasterAudioNeeds] = useState([
    'Sound System Outdoor', 'Line Array', 'Subwoofer', 'Power Amplifier', 'Mixer Audio', 'Speaker Aktif'
  ]);
  const [newAudioNeed, setNewAudioNeed] = useState('');

  // Handle mock insert master Category
  const handleAddUsaha = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsaha.trim() && !masterUsaha.includes(newUsaha.trim())) {
      setMasterUsaha([...masterUsaha, newUsaha.trim()]);
      setNewUsaha('');
    }
  };

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCompetitor.trim() && !masterCompetitors.includes(newCompetitor.trim())) {
      setMasterCompetitors([...masterCompetitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const handleAddAudioNeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAudioNeed.trim() && !masterAudioNeeds.includes(newAudioNeed.trim())) {
      setMasterAudioNeeds([...masterAudioNeeds, newAudioNeed.trim()]);
      setNewAudioNeed('');
    }
  };

  // Analytics helper metrics
  const activeSalesCount = salesReps.filter(s => s.status !== 'Offline').length;
  const totalVisitsToday = prospects.length + followUps.length;
  const totalProspectsToday = prospects.length;
  const totalHotLeads = prospects.filter(p => p.leadScore?.score === 'Hot').length;
  const totalQuotationsCount = quotations.length;
  const totalQuotationValue = quotations.reduce((acc, q) => acc + q.value, 0);
  const closingWonCount = prospects.filter(p => p.pipelineStatus === 'Closing Won').length;

  // Filter prospects
  const filteredProspects = prospects.filter(p => {
    const matchesSearch = p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.pic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || p.businessType === filterType;
    const matchesLead = filterLead === 'All' || p.leadScore?.score === filterLead;
    return matchesSearch && matchesType && matchesLead;
  });

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans w-full overflow-x-hidden">
      
      {/* 16. DESKTOP SIDEBAR NAVIGATION */}
      <aside className="w-68 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <DMSystemLogo size="sm" showTagline={false} />
        </div>

        {/* Console info info */}
        <div className="px-4 py-3 bg-slate-800/40 mx-4 mt-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">Admin Console Active</span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono mt-1">ROLE: MANAGER / ADMIN</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 pt-6 text-sm">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'overview' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="h-4.5 w-4.5" />
            Ringkasan Utama
          </button>

          <button 
            onClick={() => setActiveTab('monitoring')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'monitoring' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <MapPin className="h-4.5 w-4.5" />
            Monitoring Sales Map
          </button>

          <button 
            onClick={() => setActiveTab('pipeline')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'pipeline' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Smartphone className="h-4.5 w-4.5" />
            Daftar Prospek Field
          </button>

          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'leaderboard' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="h-4.5 w-4.5" />
            Rangking Performa Sales
          </button>

          <button 
            onClick={() => setActiveTab('master')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'master' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Shield className="h-4.5 w-4.5" />
            Kelola Master Data
          </button>
        </nav>

        {/* Sidebar Footer credit details */}
        <div className="p-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex flex-col gap-0.5">
          <p>Digital Music © 2026</p>
          <p>System Version v1.0.4-LTS</p>
        </div>
      </aside>

      {/* RIGHT MAIN VIEW WRAPPER */}
      <main className="flex-1 ml-68 p-8 min-h-screen relative pb-16">
        
        {/* Header Desktop */}
        <header className="flex justify-between items-center mb-6 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-xl font-bold font-display text-slate-800 flex items-center gap-2">
              📋 Control Panel Manager
              <span className="text-xs font-mono font-normal py-1 px-2.5 bg-slate-200 text-slate-700 rounded-full">
                CENTRAL OFFICE
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Sistem monitoring aktivitas sales canvasing & penawaran digital.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">Admin Manager Office</p>
              <p className="text-[10px] text-slate-500 font-mono">manager@digitalmusic.co.id</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-sm shrink-0 uppercase border border-slate-300">
              AD
            </div>
          </div>
        </header>

        {/* TAB 1: OVERVIEW PANEL */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              
              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Sales Aktif</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-slate-900">{activeSalesCount}</span>
                  <span className="text-xs text-slate-450">/ {salesReps.length}</span>
                </div>
                <span className="text-[9.5px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block font-sans w-max">🟢 Lapangan</span>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Kunjungan Hari Ini</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-slate-900">{totalVisitsToday}</span>
                  <span className="text-xs text-slate-450">klien</span>
                </div>
                <span className="text-[9.5px] text-[#1BA7B6] bg-[#1BA7B6]/10 px-2 py-0.5 rounded-full inline-block font-bold w-max">↗️ Visit & Follow</span>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Prospek Baru</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-slate-900">{totalProspectsToday}</span>
                  <span className="text-xs text-slate-450">prospek</span>
                </div>
                <span className="text-[9.5px] text-teal-600 bg-teal-55 px-2 py-0.5 rounded-full inline-block font-sans w-max">🆕 Lead Database</span>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Hot Lead Priority</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-rose-600">{totalHotLeads}</span>
                  <span className="text-xs text-slate-450">prospek</span>
                </div>
                <span className="text-[9.5px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block font-sans w-max">🔥 High Target</span>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Total Penawaran</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-slate-900">{totalQuotationsCount}</span>
                  <span className="text-xs text-slate-450">issued</span>
                </div>
                <span className="text-[9.5px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full inline-block font-sans w-max">📈 Pipeline Proposal</span>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Total Lead Closing</span>
                <div className="flex items-baseline gap-1 mt-2 mb-1">
                  <span className="text-2xl font-black text-emerald-600">{closingWonCount}</span>
                  <span className="text-xs text-slate-450">deals</span>
                </div>
                <span className="text-[9.5px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block font-bold w-max">🎉 Closing Won</span>
              </div>

            </div>

            {/* Custom chart + Quick Monitoring Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Graphic Performance Sales (Custom Reusable Column SVG Chart) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 font-display">
                      <BarChart3 className="text-brand-primary h-4.5 w-4.5" />
                      Statistik Canvasing Mingguan
                    </h3>
                    <p className="text-[10px] text-slate-500">Volume akumulasi kunjungan lapangan harian</p>
                  </div>
                  <TrendingUp className="text-emerald-550 h-5 w-5" />
                </div>

                <div className="h-52 flex items-end justify-between px-2 pt-6">
                  {[
                    { day: 'Sen', val: 12, max: 20 },
                    { day: 'Sel', val: 18, max: 20 },
                    { day: 'Rab', val: 22, max: 25 },
                    { day: 'Kam', val: 15, max: 25 },
                    { day: 'Jum', val: 26, max: 30 },
                    { day: 'Sab', val: 8, max: 30 },
                    { day: 'Min', val: 2, max: 10 },
                  ].map((bar, idx) => {
                    const pct = (bar.val / bar.max) * 100;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 group flex-1">
                        <div className="relative w-7 bg-slate-100 rounded-lg h-36 flex items-end overflow-hidden border border-slate-200">
                          <div 
                            style={{ height: `${pct}%` }} 
                            className="bg-brand-primary w-full rounded-b-lg transition-all duration-700 ease-out flex items-start justify-center"
                          >
                            <span className="text-[9px] text-white font-bold font-mono pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {bar.val}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 font-mono">{bar.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Map monitoring layout */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 font-display flex items-center gap-1.5">
                      <MapPin className="text-brand-primary h-4.5 w-4.5" />
                      Visual Lokasi Sales Hari Ini
                    </h3>
                    <p className="text-[10px] text-slate-500">Pemetaan tracking realtime koordinat GPS</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('monitoring')}
                    className="text-[10.5px] font-bold text-brand-primary hover:underline bg-[#1BA7B6]/5 px-2.5 py-1.5 rounded-lg flex items-center gap-0.5"
                  >
                    Buka Map Utuh
                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Simulated Geolocation Map box */}
                <div className="relative h-52 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                  
                  {/* Grid lines map simulator background */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="gridLarge" width="80" height="80" patternUnits="userSpaceOnUse">
                          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#22D3EE" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#gridLarge)" />
                    </svg>
                  </div>

                  {/* SVG routes & markers representing sales reps */}
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Simulated road map lines */}
                    <path d="M -50 80 Q 200 40 400 120 T 900 14" fill="none" stroke="#334155" strokeWidth="4" />
                    <path d="M 100 -20 L 150 300" fill="none" stroke="#334155" strokeWidth="4" />
                    <path d="M 320 -10 Q 250 150 200 320" fill="none" stroke="#334155" strokeWidth="3" />
                    
                    {/* Simulated route lines */}
                    <path d="M 115 110 L 250 150 L 320 80" fill="none" stroke="#1BA7B6" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
                  </svg>

                  {/* Live Markers of Active Sales reps on the map */}
                  {salesReps.map((rep, idx) => {
                    const coords = [
                      { left: '35%', top: '50%' },
                      { left: '60%', top: '35%' },
                      { left: '20%', top: '75%' },
                    ];
                    const pos = coords[idx % coords.length];
                    return (
                      <div 
                        key={rep.id} 
                        style={{ left: pos.left, top: pos.top }} 
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                      >
                        {rep.status !== 'Offline' ? (
                          <div className="relative">
                            <span className="absolute inline-flex h-6 w-6 rounded-full bg-cyan-400 opacity-60 animate-ping -left-1.5 -top-1.5"></span>
                            <div className="w-3.5 h-3.5 bg-brand-primary border-2 border-white rounded-full shadow-md"></div>
                            
                            {/* Pin details onHover */}
                            <div className="absolute left-1/2 bottom-5 -translate-x-1/2 bg-slate-950 text-white rounded-lg p-2 text-[9.5px] w-40 shadow-xl opacity-80 group-hover:opacity-100 transition-opacity whitespace-normal pointer-events-none border border-slate-700 font-sans">
                              <p className="font-extrabold text-cyan-400">{rep.name}</p>
                              <p className="text-slate-300 font-mono mt-0.5">🟢 {rep.status.toUpperCase()}</p>
                              <p className="text-slate-400 italic">Area: {rep.area}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-3 h-3 bg-slate-450 border-2 border-white rounded-full shadow"></div>
                        )}
                      </div>
                    );
                  })}

                  {/* Compass HUD decoration */}
                  <div className="absolute right-4 bottom-4 bg-slate-950/80 border border-slate-800 px-2 py-1.5 rounded-lg text-white font-mono text-[9px]">
                    <p>RADAR ACCURACY: ONLINE</p>
                    <p>TOTAL NODES: {salesReps.length}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section: Active Sales Activity Table */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 font-display">Aktivitas Sales Canvasing Hari Ini</h3>
                  <p className="text-[10px] text-slate-500">Daftar tim penjualan yang aktif melakukan kunjungan di lapangan</p>
                </div>
                <span className="text-xs py-1 px-3 bg-slate-50 border border-slate-200 font-bold rounded-lg text-slate-700">
                  Total Tim: {salesReps.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-205">
                    <tr>
                      <th className="py-4 px-6">Nama Sales</th>
                      <th className="py-4 px-4">Status realtime</th>
                      <th className="py-4 px-4">Area Canvasing</th>
                      <th className="py-4 px-4">Kunjungan (Day)</th>
                      <th className="py-4 px-4">Prospek Baru</th>
                      <th className="py-4 px-4">Follow Up</th>
                      <th className="py-4 px-4 font-mono">Last Active</th>
                      <th className="py-4 px-6 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {salesReps.map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-50/50 transition-all font-sans">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                            <img src={rep.avatar} alt="Sales Representative" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-800">{rep.name}</p>
                            <p className="text-[10px] text-slate-450 font-mono">{rep.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-bold ${
                            rep.status === 'Online' 
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-250' 
                              : rep.status === 'Di lokasi customer' 
                                ? 'bg-cyan-50 text-cyan-705 ring-1 ring-cyan-200' 
                                : 'bg-slate-100 text-slate-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              rep.status === 'Online' ? 'bg-emerald-500' : rep.status === 'Di lokasi customer' ? 'bg-[#1BA7B6]' : 'bg-slate-400'
                            }`} />
                            {rep.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-700">{rep.area}</td>
                        <td className="py-4 px-4 font-mono font-bold text-slate-900">{rep.todayVisits} visit</td>
                        <td className="py-4 px-4 font-mono font-semibold text-slate-700">{rep.todayProspects} prospek</td>
                        <td className="py-4 px-4 font-mono text-slate-600">{rep.todayFollowUps} done</td>
                        <td className="py-4 px-4 font-mono text-slate-500">{rep.lastActive}</td>
                        <td className="py-4 px-6 text-center">
                          <button 
                            onClick={() => {
                              setSelectedMonitoringSales(rep);
                              setActiveTab('monitoring');
                            }}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-[10.5px] inline-flex items-center gap-1 shadow-sm transition-all"
                          >
                            <MapPin className="h-3.5 w-3.5 text-brand-primary" />
                            Pantau rute
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: DETAILED SALES MONITORING MAP */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Sales Rep selection lists */}
              <div className="w-full lg:w-80 bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden flex-shrink-0">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-800">Daftar Tim Lapangan</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Pilih sales untuk melacak jalur rute GPS hari ini</p>
                </div>

                <div className="divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
                  {salesReps.map((rep) => (
                    <button
                      key={rep.id}
                      onClick={() => setSelectedMonitoringSales(rep)}
                      className={`w-full p-4 flex items-start gap-3 text-left transition-all hover:bg-slate-50/60 ${
                        selectedMonitoringSales?.id === rep.id ? 'bg-brand-primary/5 border-l-4 border-brand-primary' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                        <img src={rep.avatar} alt="Reps Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-extrabold text-xs text-slate-800 leading-normal">{rep.name}</p>
                        <p className="text-[10.5px] font-semibold text-slate-650">{rep.area}</p>
                        
                        <div className="flex items-center gap-2 pt-1">
                          <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                            rep.status !== 'Offline' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {rep.status}
                          </span>
                          <span className="text-[10px] text-slate-450 font-mono">📍 {rep.todayVisits} kunjungi</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Simulated GPS Radar map trace panel */}
              <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl shadow-sm p-5 space-y-4">
                <div className="flex justify-between items-start gap-4 flex-wrap border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-display">
                      Peta Jalur Canvasing: <span className="text-[#1BA7B6]">{selectedMonitoringSales?.name}</span>
                    </h3>
                    <p className="text-[10.5px] text-slate-500 leading-normal mt-0.5">
                      Tracing log GPS koordinat lapangan untuk sales representative area <span className="font-bold">{selectedMonitoringSales?.area}</span>.
                    </p>
                  </div>

                  <div className="bg-slate-900 text-white rounded-xl px-3.5 py-2 text-right font-mono text-[9px] min-w-[150px]">
                    <p className="text-cyan-400 font-semibold font-sans">COORDINATES TRACE</p>
                    <p className="text-[10.5px] font-bold text-white mt-1">Lat: {selectedMonitoringSales?.lastLat || -6.2201}</p>
                    <p className="text-[10.5px] font-bold text-white">Lng: {selectedMonitoringSales?.lastLng || 106.8456}</p>
                  </div>
                </div>

                {/* Simulated Geolocation high-fidelity dashboard window map */}
                <div className="relative h-[420px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-850 shadow-inner">
                  
                  {/* Grid lines map simulator background */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="gridMapOuter" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22D3EE" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#gridMapOuter)" />
                    </svg>
                  </div>

                  {/* Vectors representing roads and route nodes */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Road Network simulation lines */}
                    <path d="M 0 100 L 900 350" fill="none" stroke="#1E293B" strokeWidth="8" />
                    <path d="M 200 0 L 250 500" fill="none" stroke="#1E293B" strokeWidth="8" />
                    <path d="M 500 -50 L 350 480" fill="none" stroke="#1E293B" strokeWidth="6" />
                    <path d="M -10 280 Q 400 150 900 280" fill="none" stroke="#1E293B" strokeWidth="6" />

                    {/* Sales Representative active breadcrumb route path line */}
                    <path d="M 120 180 L 230 220 L 410 160 Q 520 280 640 220" fill="none" stroke="#22D3EE" strokeWidth="3" strokeDasharray="8 6" className="animate-pulse" />
                    <path d="M 120 180 L 230 220 L 410 160 Q 520 280 640 220" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.6" />
                  </svg>

                  {/* Route stop node bullets (Visited Customer Locations) */}
                  {[
                    { left: '120px', top: '180px', name: 'Hotel Grand Clarion (H+1)', time: '09:12' },
                    { left: '230px', top: '220px', name: 'Masjid Agung Al-Bani (H+2)', time: '11:30' },
                    { left: '410px', top: '160px', name: 'Kopi Nako Sunter (H+3)', time: '14:15' },
                    { left: '640px', top: '220px', name: 'Grand Ballroom Slipi (Current)', time: '16:02', active: true },
                  ].map((node, idx) => (
                    <div 
                      key={idx} 
                      style={{ left: node.left, top: node.top }} 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                    >
                      {node.active ? (
                        <div className="relative">
                          {/* Pulsing beacon representing current visit in progress */}
                          <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-cyan-400 opacity-60 animate-ping"></div>
                          <div className="w-5 h-5 bg-[#1BA7B6] border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[8px] text-white font-bold">{idx + 1}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-4.5 h-4.5 bg-slate-800 border-2 border-cyan-400 rounded-full flex items-center justify-center shadow">
                          <span className="text-[7.5px] text-cyan-300 font-bold">{idx + 1}</span>
                        </div>
                      )}

                      {/* Map Node Popover info bubble */}
                      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-slate-900 border border-slate-705 text-white rounded-lg p-2 text-[9px] w-48 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-sans z-30">
                        <p className="font-extrabold text-cyan-400">{node.name}</p>
                        <p className="text-slate-350 mt-0.5">⏱️ Jam Visit: {node.time}</p>
                        <p className="text-[8px] text-slate-500 font-mono">NODE REFERENCE: #{idx + 1}</p>
                      </div>
                    </div>
                  ))}

                  {/* Map overlay dashboard statistics panel summary */}
                  <div className="absolute bottom-5 left-5 bg-slate-900/90 backdrop-blur-sm border border-slate-800 p-4 rounded-xl text-white font-sans text-xs space-y-1.5 w-64">
                    <p className="font-extrabold text-[#1BA7B6] text-xs flex items-center gap-1">🧭 ROUTE TELEMETRY REPORT</p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 font-mono">
                      <div>
                        <p>TOTAL VISITS</p>
                        <p className="font-bold text-white text-xs mt-0.5">{selectedMonitoringSales?.todayVisits} Clients</p>
                      </div>
                      <div>
                        <p>PROSPEKS</p>
                        <p className="font-bold text-emerald-450 text-xs mt-0.5">{selectedMonitoringSales?.todayProspects} Leads</p>
                      </div>
                      <div>
                        <p>COMPLETED</p>
                        <p className="font-bold text-cyan-400 text-xs mt-0.5">{selectedMonitoringSales?.todayFollowUps} Visits</p>
                      </div>
                      <div>
                        <p>STREAK AREA</p>
                        <p className="font-bold text-white text-[10.5px] mt-0.5">{selectedMonitoringSales?.area}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PROSPECT MANAGEMENT AND PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Filter Row card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row md:items-end gap-4 justify-between">
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold uppercase text-slate-500">Cari Prospek / PIC</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-405 h-4 w-4" />
                    <input 
                      type="text" 
                      placeholder="Cari perusahaan..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full text-slate-900 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:border-brand-primary bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold uppercase text-slate-500">Jenis Usaha</label>
                  <select 
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-900 focus:outline-none"
                  >
                    <option value="All">Semua Kategori</option>
                    {masterUsaha.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold uppercase text-slate-500">Klasifikasi Lead Score</label>
                  <select 
                    value={filterLead}
                    onChange={e => setFilterLead(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-[#0F172A]"
                  >
                    <option value="All">Semua Lead</option>
                    <option value="Hot">🔥 Hot Lead</option>
                    <option value="Warm">⭐ Warm Lead</option>
                    <option value="Cold">❄️ Cold Lead</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Prospects lists grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProspects.map((prospect) => (
                <div 
                  key={prospect.id}
                  className="bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  
                  {/* Card Header information */}
                  <div className="p-5 border-b border-slate-100 space-y-3 flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] bg-slate-100 text-slate-650 font-bold px-2 py-0.75 rounded font-mono uppercase">
                        {prospect.id}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${
                        prospect.leadScore?.score === 'Hot' ? 'bg-rose-50 text-rose-600' : prospect.leadScore?.score === 'Warm' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {prospect.leadScore?.score === 'Hot' ? '🔥 HOT' : prospect.leadScore?.score === 'Warm' ? '⭐ WARM' : '❄️ COLD'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-850 hover:text-brand-primary cursor-pointer line-clamp-1" onClick={() => onSelectProspect(prospect)}>
                        {prospect.companyName}
                      </h4>
                      <p className="text-[10px] text-slate-450 italic mt-0.5">Sektor: {prospect.businessType}</p>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-normal line-clamp-2">📍 {prospect.address}, {prospect.city}</p>

                    <div className="text-[11px] space-y-1 text-slate-550 border-t border-slate-50 pt-3">
                      <p><span className="font-bold text-slate-700">PIC:</span> {prospect.pic.name} ({prospect.pic.role})</p>
                      <p><span className="font-bold text-slate-700">Timeline Klien:</span> <span className="font-bold text-brand-primary">{prospect.needs.timeline === 'Instant' ? 'Immediate' : prospect.needs.timeline === 'Medium' ? 'Medium-term' : 'Long-term'}</span></p>
                    </div>
                  </div>

                  {/* Card Actions Bottom drawer */}
                  <div className="bg-slate-50/70 p-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-left">
                      <span className="text-[9.5px] text-slate-400 block font-mono">STATUS PIPELINE</span>
                      <select
                        value={prospect.pipelineStatus}
                        onChange={(e) => onUpdateProspectStatus(prospect.id, e.target.value as any)}
                        className="text-[10.5px] font-extrabold text-[#1BA7B6] bg-transparent border-0 p-0 focus:ring-0 cursor-pointer hover:underline"
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

                    <button
                      onClick={() => onSelectProspect(prospect)}
                      className="bg-white border border-slate-200 hover:bg-slate-100 font-bold px-3 py-1.5 rounded-lg text-[10.5px] text-slate-750 inline-flex items-center gap-1 shadow-xs transition-all"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Detail Klien
                    </button>
                  </div>

                </div>
              ))}

              {filteredProspects.length === 0 && (
                <div className="col-span-full bg-white border border-slate-202 p-12 rounded-2xl text-center">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Prospek Tidak Ditemukan</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">Sesuaikan kata kunci pencarian atau filter kategori lainnya.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: LEADERBOARD & PERFORMANCE CHARTS */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top metrics rank row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Leaderboard visits card */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="text-amber-500 w-5 h-5 fill-amber-300" />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-800">Top Sales Kunjungan (Bulan Ini)</h3>
                      <p className="text-[10px] text-slate-500">Ranking berdasarkan volume visit terbanyak</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {salesReps.map((rep, idx) => (
                    <div key={rep.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100/50 hover:bg-slate-50/40 transition-all text-xs">
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-black ${
                          idx === 0 ? 'bg-amber-100 text-amber-700' : idx === 1 ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0">
                          <img src={rep.avatar} alt="Representative avatar photo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800">{rep.name}</p>
                          <p className="text-[9.5px] text-slate-455 font-mono">Area: {rep.area}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-900 font-mono text-sm">{rep.monthlyVisits} Kunjungan</p>
                        <p className="text-[9px] text-[#1BA7B6] font-semibold">100% On Route</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard prospects card */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-emerald-500 w-5 h-5" />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-800">Performance Closing & Deals</h3>
                      <p className="text-[10px] text-slate-500">Ranking volume prospek closing terbanyak</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {salesReps.map((rep, idx) => (
                    <div key={rep.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100/50 hover:bg-slate-50/40 transition-all text-xs font-sans">
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-black ${
                          idx === 0 ? 'bg-emerald-100 text-emerald-800' : idx === 1 ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0">
                          <img src={rep.avatar} alt="Representative avatar photo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-800">{rep.name}</p>
                          <p className="text-[9.5px] text-slate-455 font-mono">Area: {rep.area}</p>
                        </div>
                      </div>
                      <div className="text-right font-sans">
                        <p className="font-black text-emerald-600 font-mono text-sm">{rep.monthlyClosing} Deals Won</p>
                        <p className="text-[9px] text-slate-500 font-normal">Conversion Rate: {Math.round((rep.monthlyClosing/rep.monthlyProspects) * 100)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: kelola MASTER DATA */}
        {activeTab === 'master' && (
          <div className="space-y-6 animate-fade-in text-xs font-sans">
            
            {/* Grid 3 column of key Master listings */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Box 1: Sektor Usaha categories */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-850">Kategori Jenis Usaha</h3>
                    <p className="text-[10px] text-slate-500">Master penggolongan tipe korporasi prospek</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-150 text-slate-700 font-bold rounded">
                    {masterUsaha.length} item
                  </span>
                </div>

                <form onSubmit={handleAddUsaha} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Tambah kategori..." 
                    value={newUsaha}
                    onChange={e => setNewUsaha(e.target.value)}
                    className="flex-1 text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  />
                  <button type="submit" className="bg-brand-primary text-white p-1.5 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto pt-1 font-sans">
                  {masterUsaha.map((usaha) => (
                    <div key={usaha} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="font-semibold text-[11px]">{usaha}</span>
                      <button 
                        type="button" 
                        onClick={() => setMasterUsaha(masterUsaha.filter(u => u !== usaha))}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Competitor Brands listings */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-855">Competitor Brand</h3>
                    <p className="text-[10px] text-slate-500">Master data kompetitor penentu benchmarking</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-150 text-slate-700 font-bold rounded">
                    {masterCompetitors.length} item
                  </span>
                </div>

                <form onSubmit={handleAddCompetitor} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Tambah kompetitor..." 
                    value={newCompetitor}
                    onChange={e => setNewCompetitor(e.target.value)}
                    className="flex-1 text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                  />
                  <button type="submit" className="bg-brand-primary text-white p-1.5 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto pt-1">
                  {masterCompetitors.map((comp) => (
                    <div key={comp} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-slate-700">
                      <span className="font-semibold text-[11px]">{comp}</span>
                      <button 
                        type="button" 
                        onClick={() => setMasterCompetitors(masterCompetitors.filter(c => c !== comp))}
                        className="text-slate-400 hover:text-rose-605 transition-colors font-sans"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Master Audio Lineup Products */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-1">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-850 font-display">Kebutuhan Audio Item</h3>
                    <p className="text-[10px] text-slate-500">Master checklist spesifikasi produk Audio One</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-150 text-slate-700 font-bold rounded">
                    {masterAudioNeeds.length} item
                  </span>
                </div>

                <form onSubmit={handleAddAudioNeed} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Tambah lineup..." 
                    value={newAudioNeed}
                    onChange={e => setNewAudioNeed(e.target.value)}
                    className="flex-1 text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white"
                  />
                  <button type="submit" className="bg-brand-primary text-white p-1.5 rounded-lg">
                    <Plus className="h-4 w-4" />
                  </button>
                </form>

                <div className="space-y-2 max-h-60 overflow-y-auto pt-1">
                  {masterAudioNeeds.map((need) => (
                    <div key={need} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-slate-705">
                      <span className="font-semibold text-[11px]">{need}</span>
                      <button 
                        type="button" 
                        onClick={() => setMasterAudioNeeds(masterAudioNeeds.filter(n => n !== need))}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
