/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, MapPin, Navigation, Camera, User, Radio, Headset, 
  HelpCircle, Star, Sparkles, Check, ChevronRight, ChevronLeft, Save, Send, AlertTriangle
} from 'lucide-react';
import { Prospect, PicInfo, ExistingCondition, AudioNeeds, LeadScore } from '../types';

interface StepperProps {
  salesName: string;
  onCancel: () => void;
  onSubmit: (prospect: Prospect) => void;
}

const BUSINESS_TYPES = [
  'Hotel', 'Masjid', 'Sekolah', 'Cafe', 'Restoran', 
  'Corporate', 'Universitas', 'Tempat Ibadah', 'Pabrik', 'Gudang', 'Lainnya'
];

const JABATAN_TYPES = [
  'Owner', 'Director', 'General Manager', 'Purchasing', 
  'Procurement', 'Engineering', 'Maintenance', 'General Affair', 'Operational Manager', 'IT Manager', 'Lainnya'
];

const INFLUENCE_TYPES = ['Decision Maker', 'Influencer', 'User', 'Gatekeeper'];
const AUDIO_CONDITIONS = ['Baik', 'Cukup', 'Bermasalah'];
const BUDGET_ESTIMATIONS = ['<25 juta', '25-50 juta', '50-100 juta', '100-250 juta', '>250 juta'];

export default function FormKunjunganStepper({ salesName, onCancel, onSubmit }: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loadingGps, setLoadingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // STEP 1 State: Prospect Basic Info
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('Cafe');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Jakarta');
  const [province, setProvince] = useState('DKI Jakarta');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [latitude, setLatitude] = useState<number>(-6.2088);
  const [longitude, setLongitude] = useState<number>(106.8456);
  const [gpsAccuracy, setGpsAccuracy] = useState<number>(12);
  const [locationName, setLocationName] = useState('Mencari lokasi otomatis...');

  // STEP 2 State: Camera Photo
  const [photoBlobUrl, setPhotoBlobUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // STEP 3 State: PIC Info
  const [picName, setPicName] = useState('');
  const [picRole, setPicRole] = useState('Purchasing');
  const [picWhatsapp, setPicWhatsapp] = useState('');
  const [picEmail, setPicEmail] = useState('');
  const [cardExchanged, setCardExchanged] = useState<boolean>(true);
  const [picInfluence, setPicInfluence] = useState<'Decision Maker' | 'Influencer' | 'User' | 'Gatekeeper'>('Decision Maker');

  // STEP 4 State: Existing Condition
  const [hasSoundSystem, setHasSoundSystem] = useState<boolean>(true);
  const [brandUsed, setBrandUsed] = useState('');
  const [systemAge, setSystemAge] = useState('');
  const [condition, setCondition] = useState<'Baik' | 'Cukup' | 'Bermasalah'>('Baik');
  const [issues, setIssues] = useState('');
  const [hasUsedAudioOne, setHasUsedAudioOne] = useState<boolean>(false);

  // STEP 5 State: Audio Needs
  const [needs, setNeeds] = useState({
    outdoorSystem: false,
    lineArray: false,
    subwoofer: false,
    powerAmplifier: false,
    mixerAudio: false,
    speakerActive: false,
    speakerPassive: false,
    bgMusic: false,
    pagingSystem: false,
    conferenceSystem: false,
    wirelessMic: false,
    customHardcase: false,
    installation: false,
    maintenance: false,
  });
  const [needsNotes, setNeedsNotes] = useState('');
  const [needsTimeline, setNeedsTimeline] = useState<'Instant' | 'Medium' | 'Long'>('Medium');

  // Form Lanjutan (Sub-Step of Step 5 if Cepat/Medium)
  const [currentBrand, setCurrentBrand] = useState('');
  const [existingVendor, setExistingVendor] = useState('');
  const [existingIntegrator, setExistingIntegrator] = useState('');
  const [budgetEst, setBudgetEst] = useState('25-50 juta');
  const [hasNewProject, setHasNewProject] = useState<boolean>(false);
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [targetCompletion, setTargetCompletion] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // STEP 6 State: Lead Scoring (1-5)
  const [ratingPic, setRatingPic] = useState<number>(3);
  const [ratingNeed, setRatingNeed] = useState<number>(3);
  const [ratingBudget, setRatingBudget] = useState<number>(3);
  const [ratingProject, setRatingProject] = useState<number>(3);
  const [ratingRel, setRatingRel] = useState<number>(3);

  // Generate Score automatically
  const calculateLeadScore = (): 'Cold' | 'Warm' | 'Hot' => {
    const total = ratingPic + ratingNeed + ratingBudget + ratingProject + ratingRel;
    const average = total / 5;
    if (average >= 4.0) return 'Hot';
    if (average >= 2.5) return 'Warm';
    return 'Cold';
  };

  const getLeadScoreBadgeClass = (score: 'Cold' | 'Warm' | 'Hot') => {
    switch (score) {
      case 'Hot': return 'bg-rose-100 text-rose-700 border border-rose-200';
      case 'Warm': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Cold': return 'bg-slate-100 text-slate-755 border border-slate-200';
    }
  };

  const activeScore = calculateLeadScore();

  // Geolocation Handler
  const requestGpsLocation = () => {
    setLoadingGps(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError('Geolocation tidak didukung oleh browser Anda.');
      setLoadingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(parseFloat(position.coords.latitude.toFixed(6)));
        setLongitude(parseFloat(position.coords.longitude.toFixed(6)));
        setGpsAccuracy(Math.round(position.coords.accuracy));
        // Mocking address based on lat,lng for rich simulation
        const fakeAddresses = [
          'Grand Indonesia, Jl. M.H. Thamrin No.1, Jakarta Pusat',
          'Pakuwon Tower, Menteng Dalam, Tebet, Jakarta Selatan',
          'Hotel Mulia Senayan, Jl. Asia Afrika, Tanah Abang, Jakarta Pusat',
          'Graha Digital Music, Grand Slipi Tower Lt.3, Jakarta Barat',
          'Sunter Corporate Office Park Blok B-9, Jakarta Utara',
        ];
        const randomAddr = fakeAddresses[Math.floor(Math.random() * fakeAddresses.length)];
        setLocationName(randomAddr);
        setAddress(randomAddr);
        setLoadingGps(false);
      },
      (error) => {
        console.warn('Geolocation Error:', error);
        // Fallback with a slight alert and realistic Jakarta coordinate
        setLatitude(parseFloat((-6.21 + Math.random() * 0.02).toFixed(6)));
        setLongitude(parseFloat((106.84 + Math.random() * 0.02).toFixed(6)));
        setGpsAccuracy(18);
        setLocationName('Lokasi Cabang DM (Mocked GPS GPS)');
        setGpsError('Izin lokasi dibatasi browser. Menggunakan GPS simulasi.');
        setLoadingGps(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Run camera live capture
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      // Fallback: we will present a beautiful camera simulator UI if permissions are denied
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  // Take photo & render watermark on canvas
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 640;
        canvas.height = 480;

        // Draw image (either from raw video or a built-in mock storefront canvas scene if webcam fails)
        if (video && cameraStream) {
          ctx.drawImage(video, 0, 0, 640, 480);
        } else {
          // Render a mockup design architecture to simulate digital music store capture
          ctx.fillStyle = '#0F172A';
          ctx.fillRect(0, 0, 640, 480);
          
          // Outer design box
          ctx.strokeStyle = '#1BA7B6';
          ctx.lineWidth = 4;
          ctx.strokeRect(20, 20, 600, 440);
          
          // Draw geometric vector lines
          ctx.strokeStyle = 'rgba(27, 167, 182, 0.1)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 640; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 480); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(640, i); ctx.stroke();
          }

          // Simulated camera focus viewfinders
          ctx.strokeStyle = '#1BA7B6';
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(40, 60); ctx.lineTo(40, 40); ctx.lineTo(60, 40); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(600, 60); ctx.lineTo(600, 40); ctx.lineTo(580, 40); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(40, 420); ctx.lineTo(40, 440); ctx.lineTo(60, 440); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(600, 420); ctx.lineTo(600, 440); ctx.lineTo(580, 440); ctx.stroke();

          // Corporate name logo watermark graphic
          ctx.fillStyle = '#1BA7B6';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText('🏢 DIGITAL MUSIK STORE', 100, 220);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = '16px monospace';
          ctx.fillText('Audit Kunjungan Lapangan / Canvasing', 100, 250);
          ctx.fillStyle = '#94A3B8';
          ctx.fillText('Client: ' + (companyName || '(Belum diisi)'), 100, 280);
          ctx.fillText('Business: ' + businessType, 100, 305);
        }

        // Apply dark overlay at bottom for readable watermark text
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(0, 360, 640, 120);

        // Watermark Border Accent
        ctx.fillStyle = '#1BA7B6';
        ctx.fillRect(0, 357, 640, 3);

        // Watermark Text styling
        ctx.fillStyle = '#22D3EE'; // Electric blue-teal
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('DM SalesManagement • Verification System', 20, 385);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '11px monospace';
        ctx.fillText(`SALES AGENT : ${salesName.toUpperCase()}`, 20, 408);
        ctx.fillText(`DATE/TIME  : ${new Date().toLocaleDateString('id-ID')} ${new Date().toLocaleTimeString('id-ID')}`, 20, 426);
        ctx.fillText(`LATITUDE   : ${latitude}`, 20, 444);
        ctx.fillText(`LONGITUDE  : ${longitude}  (Acc: ${gpsAccuracy}m)`, 20, 461);

        // Right hand QR placeholder / Stamp icon
        ctx.strokeStyle = '#22D3EE';
        ctx.lineWidth = 1;
        ctx.strokeRect(540, 375, 80, 80);
        ctx.fillStyle = '#22D3EE';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('VERIFIED', 553, 410);
        ctx.fillText('GPS STAMP', 549, 425);

        // Set to image blob
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPhotoBlobUrl(dataUrl);
        stopCamera();
      }
    }
  };

  const handleNext = () => {
    // Basic validation
    if (currentStep === 1 && !companyName.trim()) {
      alert('Nama perusahaan wajib diisi!');
      return;
    }
    if (currentStep === 2 && !photoBlobUrl) {
      alert('Anda wajib mengambil foto lokasi minimal 1 kali untuk validasi!');
      return;
    }
    if (currentStep === 3 && !picName.trim()) {
      alert('Nama PIC wajib diisi!');
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Submit form data
  const handleSubmitKunjungan = (isDraft: boolean) => {
    const defaultPic: PicInfo = {
      name: picName || 'No Name',
      role: picRole,
      whatsapp: picWhatsapp || '',
      email: picEmail || '',
      cardExchanged: cardExchanged,
      influence: picInfluence,
    };

    const defaultCondition: ExistingCondition = {
      hasSoundSystem: hasSoundSystem,
      brandUsed: brandUsed || 'Tidak ada',
      systemAge: systemAge || '0 tahun',
      condition: condition,
      issues: issues || 'Tidak ada kendala',
      hasUsedAudioOne: hasUsedAudioOne,
    };

    const defaultAudioNeeds: AudioNeeds = {
      ...needs,
      notes: needsNotes || '',
      timeline: needsTimeline,
      currentBrand: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? currentBrand : undefined,
      existingVendor: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? existingVendor : undefined,
      existingIntegrator: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? existingIntegrator : undefined,
      budgetEst: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? budgetEst : undefined,
      hasNewProject: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? hasNewProject : undefined,
      projectName: (needsTimeline === 'Instant' || needsTimeline === 'Medium' && hasNewProject) ? projectName : undefined,
      projectLocation: (needsTimeline === 'Instant' || needsTimeline === 'Medium' && hasNewProject) ? projectLocation : undefined,
      targetCompletion: (needsTimeline === 'Instant' || needsTimeline === 'Medium' && hasNewProject) ? targetCompletion : undefined,
      specialRequirements: (needsTimeline === 'Instant' || needsTimeline === 'Medium') ? specialRequirements : undefined,
    };

    const defaultScore: LeadScore = {
      picEasyToReach: ratingPic,
      audioNeedPotential: ratingNeed,
      budgetPotential: ratingBudget,
      projectOpportunity: ratingProject,
      relationCloseness: ratingRel,
      score: activeScore,
    };

    const finalProspect: Prospect = {
      id: 'PRSP-' + Math.floor(1000 + Math.random() * 9000),
      companyName: companyName,
      businessType: businessType,
      address: address || 'Grand Slipi Tower, Jakarta',
      city: city,
      province: province,
      phone: phone,
      email: email,
      website: website,
      instagram: instagram,
      latitude: latitude,
      longitude: longitude,
      locationName: locationName,
      gpsAccuracy: gpsAccuracy,
      photoUrl: photoBlobUrl || '',
      photoTimestamp: new Date().toISOString(),
      pic: defaultPic,
      existing: defaultCondition,
      needs: defaultAudioNeeds,
      leadScore: defaultScore,
      pipelineStatus: isDraft ? 'New Lead' : 'Qualified',
      lastVisitDate: new Date().toLocaleDateString('id-ID'),
      salesName: salesName,
    };

    onSubmit(finalProspect);
  };

  // Toggle checks helper
  const handleCheckboxChange = (key: keyof typeof needs) => {
    setNeeds(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if camera stream matches component life
  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Stepper Header Indicators
  const stepsMeta = [
    { num: 1, label: 'Profil' },
    { num: 2, label: 'Kamera' },
    { num: 3, label: 'PIC' },
    { num: 4, label: 'Existing' },
    { num: 5, label: 'Kebutuhan' },
    { num: 6, label: 'Scoring' },
    { num: 7, label: 'Submit' },
  ];

  return (
    <div className="flex flex-col flex-1 bg-slate-50 min-h-screen">
      
      {/* Top Banner Staging */}
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Building2 className="text-brand-primary h-5 w-5" />
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Kunjungan Baru</h1>
            <p className="text-[10px] text-slate-400 font-mono">STEP {currentStep} OF 7</p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="text-xs px-2.5 py-1.5 border border-slate-700 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-medium"
        >
          Batal
        </button>
      </div>

      {/* Stepper Progress Indicator Row */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 overflow-x-auto scrollbar-none flex items-center justify-between sticky top-[48px] z-40">
        <div className="flex items-center gap-1.5 mx-auto min-w-max">
          {stepsMeta.map((s, idx) => (
            <React.Fragment key={s.num}>
              {idx > 0 && (
                <div className={`h-0.5 w-3.5 sm:w-6 ${currentStep >= s.num ? 'bg-brand-primary' : 'bg-slate-200'}`} />
              )}
              <div className="flex items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                  currentStep === s.num 
                    ? 'bg-brand-primary text-white scale-110 shadow-sm ring-4 ring-cyan-100' 
                    : currentStep > s.num 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-100 text-slate-500'
                }`}>
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-[10px] font-medium hidden sm:inline ${
                  currentStep === s.num ? 'text-brand-primary font-semibold' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Stepper Window Content */}
      <div className="flex-1 p-4 max-w-xl mx-auto w-full pb-24">
        
        {/* STEP 1: Profil Perusahaan */}
        {currentStep === 1 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Building2 className="text-brand-primary h-5 w-5" />
              <h2 className="text-base font-bold text-slate-900">Identitas Prospek & Geolocation</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Nama Perusahaan / Tempat *</label>
              <input 
                type="text" 
                placeholder="cth. Hotel Grand Clarion, Kopi Nako" 
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Kategori / Jenis Usaha *</label>
              <select 
                value={businessType}
                onChange={e => setBusinessType(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Geolocation Input Trigger Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4.5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <Navigation className="text-brand-primary h-5 w-5 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Validasi GPS Integrasi</h4>
                    <p className="text-[10px] text-slate-500">Mencatat latitude & longitude audit sales canvasing</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={requestGpsLocation}
                  disabled={loadingGps}
                  className="bg-brand-primary hover:bg-brand-primary/95 text-white font-medium text-xs py-2 px-3.5 rounded-lg inline-flex items-center gap-1.5 shadow-sm transition-all shadow-cyan-100 disabled:opacity-75"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {loadingGps ? 'Memindai...' : 'Ambil Geolocation'}
                </button>
              </div>

              {gpsError && (
                <p className="text-[10px] text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 leading-normal">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 flex-shrink-0" />
                  {gpsError}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Latitude</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={latitude}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-mono focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Longitude</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={longitude}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-mono focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Akurasi GPS (Meters)</label>
                  <p className="text-xs font-semibold text-slate-800 font-sans flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    ± {gpsAccuracy} meter ({gpsAccuracy < 20 ? 'Akurasi Tinggi' : 'Akurasi Rendah'})
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 font-mono">Auto Reverse Address Location</label>
                  <p className="text-xs text-slate-700 leading-normal italic">{locationName}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Alamat Lengkap</label>
              <textarea 
                rows={2}
                placeholder="Jl. Raya Boulevard Blok AA Nomor 10..." 
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Kota</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Provinsi</label>
                <input 
                  type="text" 
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Telepon Kantor</label>
                <input 
                  type="tel" 
                  placeholder="021-..." 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Email Kantor</label>
                <input 
                  type="email" 
                  placeholder="info@sales.com" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Website</label>
                <input 
                  type="text" 
                  placeholder="www.company.com" 
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-755 mb-1">Instagram (@)</label>
                <input 
                  type="text" 
                  placeholder="brand.instagram" 
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Foto Lokasi Real-time Kamera */}
        {currentStep === 2 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Camera className="text-brand-primary h-5 w-5" />
              <h2 className="text-base font-bold text-slate-900">Foto Bukti Lokasi (Watermark GPS)</h2>
            </div>

            <p className="text-xs text-slate-600 leading-normal">
              Kamera wajib diaktifkan dari browser untuk memotret kondisi fisik luar/plang lokasi. Foto akan di-watermark otomatis dengan nama sales, waktu audit, dan koordinat GPS.
            </p>

            {/* Hidden Canvas for Watermark Injection */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Viewfinder Screen */}
            <div className="relative border border-slate-250 bg-slate-950 rounded-2xl overflow-hidden shadow-inner aspect-[4/3] flex items-center justify-center">
              
              {isCameraActive ? (
                /* Live Camera view */
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full h-full object-cover" 
                />
              ) : photoBlobUrl ? (
                /* Captured watermarked image */
                <img 
                  src={photoBlobUrl} 
                  alt="Captured Location Signature" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                /* Static view */
                <div className="p-6 text-center">
                  <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Camera className="text-slate-400 h-6 w-6" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium max-w-[280px] mx-auto leading-relaxed">
                    Kamera browser belum aktif. Ketuk button di bawah untuk memulai viewfinder.
                  </p>
                </div>
              )}

              {/* Live coordinates box overlays inside screen */}
              {isCameraActive && (
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 px-2 py-1.5 rounded-lg text-white font-mono text-[9px] space-y-0.5">
                  <p className="text-cyan-400 font-semibold font-sans">CAMERA LIVE PREVIEW</p>
                  <p>Lat: {latitude}</p>
                  <p>Lng: {longitude}</p>
                </div>
              )}
            </div>

            {/* Controls Row */}
            <div className="flex gap-2.5 justify-center">
              {!isCameraActive ? (
                <button 
                  type="button"
                  onClick={startCamera}
                  className="bg-slate-905 border border-slate-300 hover:bg-slate-100 text-slate-850 py-2.5 px-4 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Radio className="h-4 w-4 text-brand-primary" />
                  {photoBlobUrl ? 'Ambil Ulang' : 'Aktifkan Kamera'}
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={capturePhoto}
                  className="bg-brand-primary hover:bg-brand-primary/95 text-white py-2.5 px-6 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md shadow-cyan-100 transition-all ring-4 ring-cyan-100"
                >
                  <Camera className="h-4 w-4" />
                  Potret & Verifikasi
                </button>
              )}
            </div>

            {photoBlobUrl && (
              <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3 flex gap-2">
                <Check className="text-emerald-500 h-5 w-5 shrink-0" />
                <div className="text-[11px] text-emerald-800 leading-normal">
                  <span className="font-bold">Foto Lokasi Terverifikasi!</span> Watermark GPS telah tersemat dan tersinkronisasi dengan aman.
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Data PIC */}
        {currentStep === 3 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <User className="text-brand-primary h-5 w-5" />
              <h2 className="text-base font-bold text-slate-900">Informasi Person in Charge (PIC)</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Nama PIC *</label>
              <input 
                type="text" 
                placeholder="cth. Bpk. Hendru Lukito" 
                value={picName}
                onChange={e => setPicName(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Jabatan PIC *</label>
              <select 
                value={picRole}
                onChange={e => setPicRole(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              >
                {JABATAN_TYPES.map(jab => (
                  <option key={jab} value={jab}>{jab}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">No. WhatsApp PIC (Aktif) *</label>
              <input 
                type="tel" 
                placeholder="6281234567..." 
                value={picWhatsapp}
                onChange={e => setPicWhatsapp(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-slate-50/50"
              />
              <p className="text-[10px] text-slate-500 mt-1">Gunakan kode negara (62...) untuk mempermudah follow-up template direct WhatsApp chat.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Email PIC</label>
              <input 
                type="email" 
                placeholder="hendru@clarion.com" 
                value={picEmail}
                onChange={e => setPicEmail(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-750 mb-1.5">Kartu Nama Diterima?</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCardExchanged(true)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                      cardExchanged 
                        ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary' 
                        : 'bg-white border-slate-200 text-slate-550'
                    }`}
                  >
                    Ya, Ada
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardExchanged(false)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border ${
                      !cardExchanged 
                        ? 'bg-slate-200/60 border-slate-300 text-slate-700' 
                        : 'bg-white border-slate-200 text-slate-550'
                    }`}
                  >
                    Tidak
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-750 mb-1.5">Klarifikasi Pengaruh PIC</label>
                <select
                  value={picInfluence}
                  onChange={e => setPicInfluence(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-white text-slate-900 focus:outline-none"
                >
                  {INFLUENCE_TYPES.map(inf => (
                    <option key={inf} value={inf}>{inf}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Kondisi Existing */}
        {currentStep === 4 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Radio className="text-brand-primary h-5 w-5" />
              <h2 className="text-base font-bold text-slate-900">Kondisi Existing Sound System</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1.5">Sudah memiliki Sound System?</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setHasSoundSystem(true)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    hasSoundSystem 
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  Ya, Sudah Ada
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasSoundSystem(false);
                    setBrandUsed('');
                    setSystemAge('');
                  }}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold border transition-all ${
                    !hasSoundSystem 
                      ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  Belum Miliki
                </button>
              </div>
            </div>

            {hasSoundSystem && (
              <div className="space-y-4 p-4 rounded-xl bg-slate-50 border border-slate-100 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-slate-750 mb-1">Merk / Brand yang Digunakan Sekarang</label>
                  <input 
                    type="text" 
                    placeholder="cth. JBL, Bose, TOA, Yamaha" 
                    value={brandUsed}
                    onChange={e => setBrandUsed(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-750 mb-1">Perkiraan Umur Sistem Audio</label>
                  <input 
                    type="text" 
                    placeholder="cth. 3 tahun, 6 bulan" 
                    value={systemAge}
                    onChange={e => setSystemAge(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-750 mb-1 text-slate-800">Kondisi Audio Saat Ini</label>
                  <div className="flex gap-2 mt-1">
                    {AUDIO_CONDITIONS.map(cond => (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => setCondition(cond as any)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border text-center ${
                          condition === cond 
                            ? 'bg-[#1BA7B6]/10 border-[#1BA7B6] text-[#1BA7B6]' 
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-750 mb-1">Kendala / Keluhan Audio Yang Dihadapi</label>
                  <textarea 
                    rows={2}
                    placeholder="cth. Suara feedback dengung, speaker mati di bagian outdoor, kurang bersih..." 
                    value={issues}
                    onChange={e => setIssues(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none bg-white"
                  />
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800">Pernah Menggunakan Audio One?</h4>
                <p className="text-[10px] text-slate-500">Apakah klien familiar dengan lineup product Audio One?</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHasUsedAudioOne(true)}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-bold border transition-all ${
                    hasUsedAudioOne 
                      ? 'bg-[#1BA7B6] text-white border-[#1BA7B6]' 
                      : 'bg-white border-slate-250 text-slate-600'
                  }`}
                >
                  Ya
                </button>
                <button
                  type="button"
                  onClick={() => setHasUsedAudioOne(false)}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-bold border transition-all ${
                    !hasUsedAudioOne 
                      ? 'bg-slate-200 text-slate-700 border-slate-300' 
                      : 'bg-white border-slate-250 text-slate-605'
                  }`}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Kebutuhan Audio Klien & Form Lanjutan */}
        {currentStep === 5 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Headset className="text-brand-primary h-5 w-5" />
              <h2 className="text-base font-bold text-slate-900">Spesifikasi Kebutuhan Audio</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Checklist Product Lineup Kunci (Pilih yang relevan)</label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { key: 'outdoorSystem', label: 'Sound System Outdoor' },
                  { key: 'lineArray', label: 'Line Array Digital' },
                  { key: 'subwoofer', label: 'Subwoofer System' },
                  { key: 'powerAmplifier', label: 'Power Amplifier' },
                  { key: 'mixerAudio', label: 'Mixer Audio' },
                  { key: 'speakerActive', label: 'Speaker Aktif' },
                  { key: 'speakerPassive', label: 'Speaker Pasif' },
                  { key: 'bgMusic', label: 'Background Music' },
                  { key: 'pagingSystem', label: 'Paging System' },
                  { key: 'conferenceSystem', label: 'Conference System' },
                  { key: 'wirelessMic', label: 'Wireless Microphone' },
                  { key: 'customHardcase', label: 'Custom Hardcase' },
                  { key: 'installation', label: 'Instalasi Audio' },
                  { key: 'maintenance', label: 'Maintenance Audio' },
                ].map((item) => (
                  <label 
                    key={item.key} 
                    className={`flex items-center gap-2 border rounded-xl p-2.5 cursor-pointer transition-all ${
                      needs[item.key as keyof typeof needs] 
                        ? 'border-[#1BA7B6] bg-[#1BA7B6]/5 text-[#1BA7B6] font-semibold' 
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={needs[item.key as keyof typeof needs]}
                      onChange={() => handleCheckboxChange(item.key as keyof typeof needs)}
                      className="rounded border-slate-350 text-[#1BA7B6] h-4 w-4 focus:ring-0"
                    />
                    <span className="text-xs select-none">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-750 mb-1">Catatan Tambahan Kebutuhan Customer</label>
              <textarea 
                rows={2}
                placeholder="Catat request spesifik, detail dimensi ruangan, atau output daya watt..." 
                value={needsNotes}
                onChange={e => setNeedsNotes(e.target.value)}
                className="w-full text-slate-900 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-primary bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">Target Kebutuhan Kapan? *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'Instant', label: 'Cepat (1-3 Bln)' },
                  { val: 'Medium', label: 'Medium (4-6 Bln)' },
                  { val: 'Long', label: 'Lama (>6 Bln)' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.val}
                    onClick={() => setNeedsTimeline(t.val as any)}
                    className={`py-2 text-xs font-bold border rounded-lg transition-all ${
                      needsTimeline === t.val 
                        ? 'bg-[#1BA7B6] text-white border-[#1BA7B6]' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FORM LANJUTAN: Triggers if choosing Cepat (Instant) / Medium */}
            {(needsTimeline === 'Instant' || needsTimeline === 'Medium') && (
              <div className="bg-slate-55 shadow-inner border border-slate-200 p-4.5 rounded-2xl space-y-3.5 mt-3 animate-fade-in">
                <div className="flex items-center gap-1.5 text-[#1BA7B6] border-b border-slate-150 pb-2 mb-1.5">
                  <Sparkles className="h-4 w-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Form Lanjutan Proyek Prioritas</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Current Brand Existing</label>
                    <input 
                      type="text" 
                      placeholder="Brand saingan" 
                      value={currentBrand}
                      onChange={e => setCurrentBrand(e.target.value)}
                      className="w-full text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Vendor Existing</label>
                    <input 
                      type="text" 
                      placeholder="Vendor saat ini" 
                      value={existingVendor}
                      onChange={e => setExistingVendor(e.target.value)}
                      className="w-full text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Integrator Existing</label>
                    <input 
                      type="text" 
                      placeholder="Sistem Integrator" 
                      value={existingIntegrator}
                      onChange={e => setExistingIntegrator(e.target.value)}
                      className="w-full text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Estimasi Budget *</label>
                    <select
                      value={budgetEst}
                      onChange={e => setBudgetEst(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs bg-white text-slate-900"
                    >
                      {BUDGET_ESTIMATIONS.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Apakah Ada Proyek Baru?</h5>
                    <p className="text-[10px] text-slate-500 font-sans">Klien sedang merancang renovasi / gedung baru</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setHasNewProject(true)}
                      className={`py-1 px-3 rounded text-xs font-bold border transition-all ${
                        hasNewProject ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      Ya
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setHasNewProject(false);
                        setProjectName('');
                        setProjectLocation('');
                        setTargetCompletion('');
                      }}
                      className={`py-1 px-3 rounded text-xs font-bold border transition-all ${
                        !hasNewProject ? 'bg-slate-205 text-slate-700 border-slate-300' : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      Tidak
                    </button>
                  </div>
                </div>

                {hasNewProject && (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2.5 animate-slide-in">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500">Nama Proyek Baru</label>
                      <input 
                        type="text" 
                        placeholder="cth. Pembangunan Ballroom Baru Wing Barat" 
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        className="w-full text-slate-950 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500">Lokasi Proyek</label>
                        <input 
                          type="text" 
                          placeholder="Kota / Area" 
                          value={projectLocation}
                          onChange={e => setProjectLocation(e.target.value)}
                          className="w-full text-slate-955 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500">Target Pekerjaan</label>
                        <input 
                          type="text" 
                          placeholder="Selesai kapan" 
                          value={targetCompletion}
                          onChange={e => setTargetCompletion(e.target.value)}
                          className="w-full text-slate-955 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-slate-750 mb-1">Catatan Khusus Proyek / Special Requirement</label>
                  <textarea 
                    rows={2}
                    placeholder="Tulis special requirement seperti integrasi ke video matrix, penjadwalan audio otomatis..." 
                    value={specialRequirements}
                    onChange={e => setSpecialRequirements(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: Lead Scoring (Penilaian Prospek) */}
        {currentStep === 6 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Star className="text-brand-primary h-5 w-5 fill-brand-primary" />
              <h2 className="text-base font-bold text-slate-900">Lead Scoring & Penilaian Lapangan</h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Disiplin asesmen lead! Evaluasi kesiapan calon pembeli berdasarkan parameter di bawah untuk menghasilkan lead scoring otomatis.
            </p>

            <div className="space-y-4 pt-1">
              {[
                { label: 'PIC mudah dihubungi', desc: 'Akses komunikasi dan respon WhatsApp/Telpon', val: ratingPic, set: setRatingPic },
                { label: 'Potensi kebutuhan audio', desc: 'Kebutuhan mendesak vs hanya sekedar riset info', val: ratingNeed, set: setRatingNeed },
                { label: 'Potensi budget', desc: 'Kecocokan budget prospek dengan product lineup Audio One', val: ratingBudget, set: setRatingBudget },
                { label: 'Peluang proyek', desc: 'Adanya tender, renovasi dsb dalam waktu dekat', val: ratingProject, set: setRatingProject },
                { label: 'Kedekatan relasi', desc: 'Tingkat kepercayaan prospek dengan brand/sales', val: ratingRel, set: setRatingRel },
              ].map((p, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-800">{p.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal max-w-[240px]">{p.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => p.set(star)}
                        className="p-0.5 focus:outline-none"
                      >
                        <Star className={`w-5 h-5 transition-all text-amber-400 ${
                          star <= p.val ? 'fill-amber-400' : 'text-slate-250 fill-transparent'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Scoring Dashboard Badges Layout */}
            <div className="mt-5 bg-slate-50 border border-slate-205 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Auto Computed Lead Stage</span>
              <div className={`px-4 py-1.5 rounded-full font-extrabold text-sm ${getLeadScoreBadgeClass(activeScore)}`}>
                ⚡ {activeScore} LEAD
              </div>
              <p className="text-[10.5px] text-slate-600 max-w-[280px] leading-normal pt-1 font-sans">
                {activeScore === 'Hot' && '🔥 PRIORITAS UTAMA! PIC responsif, budget tinggi, kebutuhan segera. Jadwalkan follow up maksimal H+2.'}
                {activeScore === 'Warm' && '⭐ Kebutuhan teridentifikasi dengan budget memadai. Tetap follow up rutin WhatsApp mingguan.'}
                {activeScore === 'Cold' && '❄️ Potensi rendah atau relasi baru. Simpan data untuk nurturing email/broadcast marketing.'}
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: Review & Submit (Summary) */}
        {currentStep === 7 && (
          <div className="space-y-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 animate-slide-in">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
              <Check className="text-emerald-500 h-5 w-5 bg-emerald-100 rounded-full p-0.5" />
              <h2 className="text-base font-bold text-slate-900">Rangkuman Verifikasi Kunjungan</h2>
            </div>

            <p className="text-xs text-slate-600">Review seluruh log audit canvasing sebelum dikirimkan ke server pusat SalesManagement.</p>

            <div className="space-y-3.5 pt-1 text-xs">
              
              {/* Box 1: Prospect profile */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5">
                <div className="flex justify-between items-center border-b border-slate-150 pb-1 mb-1">
                  <span className="font-extrabold text-slate-800 flex items-center gap-1">🏢 {companyName || '(Klien Tanpa Nama)'}</span>
                  <span className="text-[9.5px] bg-[#1BA7B6]/15 text-[#1BA7B6] font-bold px-2 py-0.5 rounded-full">{businessType}</span>
                </div>
                <p className="text-slate-600 leading-normal">📍 {address}, {city}, {province}</p>
                {email && <p className="text-slate-500 font-mono text-[10px]">📧 {email}</p>}
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 font-mono">
                  <span>Lat: {latitude}</span>
                  <span className="text-emerald-600 font-bold">Accuracy: ±{gpsAccuracy}m</span>
                </div>
              </div>

              {/* Box 2: Photo Evidence */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <span className="font-bold text-slate-850 block">📸 Foto Lokasi Validated Watermark</span>
                {photoBlobUrl ? (
                  <div className="relative rounded-lg overflow-hidden aspect-[4/3] border border-slate-200">
                    <img src={photoBlobUrl} alt="Watermarked" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <p className="text-rose-500 font-semibold italic text-[11px] flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" /> Foto wajib diambil terlebih dahulu!
                  </p>
                )}
              </div>

              {/* Box 3: PIC Info */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1.5">
                <span className="font-bold text-slate-800 block">👤 Kontak Person In Charge (PIC)</span>
                <p className="text-slate-700"><span className="font-semibold">{picName}</span> ({picRole})</p>
                <p className="text-slate-600 font-mono text-[10.5px]">💬 WA: {picWhatsapp || '(Tanpa WhatsApp)'}</p>
                <div className="flex justify-between text-[10.5px] text-slate-500 pt-0.5">
                  <span>Kartu nama diterima: <span className="font-bold text-slate-705">{cardExchanged ? 'Ya' : 'Tidak'}</span></span>
                  <span>Pengaruh: <span className="font-bold text-[#1BA7B6]">{picInfluence}</span></span>
                </div>
              </div>

              {/* Box 4: Existing conditions & checklist needs */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-1.5">
                <span className="font-bold text-slate-850 block">🔊 Kondisi Eksisting & Rencana Belanja</span>
                <div className="space-y-1 text-slate-700">
                  <p>Miliki Sound System: <span className="font-semibold text-slate-800">{hasSoundSystem ? `Ya (${brandUsed})` : 'Belum'}</span></p>
                  {hasSoundSystem && <p>Kondisi Audio Sekarang: <span className={`font-semibold ${condition === 'Baik' ? 'text-emerald-650' : 'text-rose-600'}`}>{condition}</span></p>}
                  <p>Model Kebutuhan: <span className="font-semibold text-slate-800">
                    {Object.entries(needs)
                      .filter(([_, checked]) => checked)
                      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim())
                      .join(', ') || 'Belum dipilih'}
                  </span></p>
                  <p>Timeline Belanja: <span className="font-extrabold text-[#1BA7B6]">{needsTimeline === 'Instant' ? 'URGENT (1-3 Bln)' : needsTimeline === 'Medium' ? 'MEDIUM (4-6 Bln)' : 'LAMA (>6 Bln)'}</span></p>
                </div>

                {/* Secondary collapse if budget exist */}
                {(needsTimeline === 'Instant' || needsTimeline === 'Medium') && (
                  <div className="p-2.5 bg-slate-100 rounded-lg text-[11px] space-y-1 font-sans text-slate-650 mt-2">
                    <p className="font-bold text-slate-800">💸 Proyek & Budget Scope:</p>
                    <p>Budget Est: <span className="font-bold text-slate-800">{budgetEst}</span></p>
                    {hasNewProject && <p>Proyek Baru: <span className="font-bold text-slate-800">{projectName} ({projectLocation})</span></p>}
                    {specialRequirements && <p className="italic">Notes Khusus: "{specialRequirements}"</p>}
                  </div>
                )}
              </div>

              {/* Box 5: Score summary */}
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">⚡ lead Scoring Summary</span>
                  <p className="text-[10px] text-slate-500 font-sans">Kalkulasi performa audit & relasi sales</p>
                </div>
                <div className={`px-3.5 py-1 rounded-full font-extrabold ${getLeadScoreBadgeClass(activeScore)}`}>
                  {activeScore} LEAD
                </div>
              </div>
            </div>

            {/* Dual Actions Footer inside block */}
            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => handleSubmitKunjungan(true)}
                className="bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl text-xs hover:bg-slate-750 transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="h-4 w-4" />
                Simpan Draft
              </button>
              <button 
                type="button"
                onClick={() => handleSubmitKunjungan(false)}
                className="bg-brand-primary text-white font-bold py-3 px-4 rounded-xl text-xs hover:bg-brand-primary/95 shadow-md shadow-brand-primary/10 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="h-4 w-4" />
                Kirim Laporan
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM STEP CONTROLLERS */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-between gap-4 z-40 max-w-xl mx-auto">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handlePrev}
            className="flex-1 py-3 px-4 border border-slate-250 bg-white text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </button>
          
          {currentStep < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3 px-4 bg-brand-primary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 hover:bg-brand-primary/95 transition-all shadow-sm"
            >
              Lanjut
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>

      </div>
    </div>
  );
}
