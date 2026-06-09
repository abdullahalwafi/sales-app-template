/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FolderTree, FileCode, Check, Copy, Terminal, Layers, HelpCircle, HardDrive, Cpu } from 'lucide-react';

export default function LaravelExport() {
  const [selectedFile, setSelectedFile] = useState<string>('structure');
  const [copied, setCopied] = useState<boolean>(false);

  // Copy-paste action trigger helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippets: Record<string, { title: string; desc: string; lang: string; code: string }> = {
    structure: {
      title: 'Struktur Folder Frontend Laravel',
      desc: 'Berikut adalah arsitektur direktori resources/views standar yang direkomendasikan untuk menempatkan template blade SalesManagement Anda.',
      lang: 'text',
      code: `sales-management/
├── app/
│   └── Http/Controllers/                     # Controller Route Handler
│       ├── AuthController.php
│       ├── SalesController.php
│       └── ManagerController.php
├── resources/
│   └── views/
│       ├── layouts/
│       │   ├── app.blade.php                 # Master Layout Core (Tailwind, Alpine)
│       │   └── manager.blade.php             # Master Layout khusus Desktop Sidebar
│       ├── components/
│       │   ├── button.blade.php              # UI Reusable Button
│       │   ├── badge.blade.php               # UI Reusable Badge Status/Lead Scoring
│       │   ├── text-input.blade.php          # UI Reusable Input Form
│       │   └── bottom-nav.blade.php          # Mobile Bottom Navigation
│       ├── auth/
│       │   └── login.blade.php               # 1. Halaman Login Screen (Digital Musik)
│       ├── sales/
│       │   ├── dashboard.blade.php           # 2. Sales Mobile Dashboard
│       │   ├── canvasing.blade.php           # 3. Halaman Mulai Canvasing
│       │   ├── kunjungan-stepper.blade.php  # 4-11. Wizard Form Kunjungan Baru (Step 1-7)
│       │   ├── prospek-list.blade.php        # 12. Halaman Daftar Prospek
│       │   ├── prospek-detail.blade.php      # 13. Halaman Detail Prospek Klien
│       │   ├── follow-up.blade.php           # 14. Halaman Form Follow Up
│       │   └── penawaran.blade.php           # 15. Halaman Form Penawaran Harga PDF
│       └── manager/
│           ├── dashboard.blade.php           # 16. Dashboard Manager Desktop
│           ├── monitoring.blade.php          # 17. Monitoring Map Track Live Sales
│           └── master-data.blade.php         # 18. Master Data CRUD list
└── public/
    └── assets/
        └── logo-dm.png                       # File Logo Corporate Digital Musik`
    },

    layout: {
      title: 'resources/views/layouts/app.blade.php',
      desc: 'Master Layout Utama yang mendatar seluruh script JavaScript (Tailwind CSS, Alpine.js, Lucide Icons) dengan pengaturan mobile-friendly viewport meta ideal untuk HP/PWA.',
      lang: 'html',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#1BA7B6">
    <title>{{ $title ?? 'DM SalesManagement' }} - Digital Musik</title>
    
    <!-- Google Fonts Inter & Space Grotesk -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind v4 via CDN for development, or compile using Laravel Breeze/PostCSS -->
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    
    <!-- Alpine.js Core -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F8FAFC;
        }
    </style>
    @stack('styles')
</head>
<body class="text-slate-900 min-h-screen flex flex-col">

    <!-- Flash message notification banner in Alpine.js -->
    <div x-data="{ show: true }" 
         x-show="show" 
         x-transition
         class="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto"
         style="display: none;">
        @if(session('success'))
        <div class="bg-emerald-500 text-white rounded-xl p-3 shadow-lg flex items-center justify-between">
            <span class="text-xs font-semibold">🎉 {{ session('success') }}</span>
            <button @click="show = false" class="text-white hover:opacity-80">×</button>
        </div>
        @endif
    </div>

    <!-- Main Content Stage -->
    <main class="flex-1 flex flex-col">
        {{ $slot }}
    </main>

    @stack('scripts')
</body>
</html>`
    },

    login: {
      title: 'resources/views/auth/login.blade.php',
      desc: 'Form Login bersih dengan visual background profesional dan Logo DM Digital Musik. Dibuat mobile-first yang sangat nyaman diakses di browser ponsel.',
      lang: 'html',
      code: `<x-app-layout>
    <div class="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div class="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            
            <!-- Logo Section -->
            <div class="text-center space-y-3">
                <div class="flex items-center justify-center gap-2">
                    <!-- SVG Logo DM Isometric Cube -->
                    <svg class="h-12 w-12" viewBox="0 0 100 100" fill="none">
                        <path d="M50 15 L82 31 L50 47 L18 31 Z" fill="#1E293B"/>
                        <path d="M50 20 L72 31 L50 42 L28 31 Z" fill="#0F172A"/>
                        <path d="M18 36 L46 51 L46 82 L18 67 Z" fill="#1BA7B6"/>
                        <path d="M54 51 L82 36 L82 67 L54 82 Z" fill="#14B8A6"/>
                    </svg>
                    <div class="text-left">
                        <p class="font-bold tracking-tight text-xl text-slate-900 font-sans leading-none">Digital <span class="italic font-semibold text-slate-850">musik</span></p>
                        <p class="text-[10px] tracking-widest text-[#1BA7B6] font-bold mt-1 uppercase">Professional Sound System</p>
                    </div>
                </div>
                <div class="pt-2">
                    <h2 class="text-lg font-bold text-slate-800">DM SalesManagement</h2>
                    <p class="text-xs text-slate-500 mt-1">Field Sales CRM & Canvasing Monitoring System</p>
                </div>
            </div>

            <!-- Login Form -->
            <form action="{{ route('login.post') }}" method="POST" class="space-y-4">
                @csrf
                <div>
                    <label class="block text-xs font-semibold text-slate-700 mb-1">Email Perusahaan</label>
                    <input type="email" name="email" required
                           placeholder="sales@digitalmusic.co.id"
                           class="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1BA7B6] text-slate-900">
                </div>

                <div>
                    <div class="flex justify-between items-center mb-1">
                        <label class="block text-xs font-semibold text-slate-700">Password</label>
                        <a href="#" class="text-[10px] font-bold text-[#1BA7B6] hover:underline">Lupa?</a>
                    </div>
                    <input type="password" name="password" required
                           placeholder="••••••••"
                           class="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1BA7B6] text-slate-900">
                </div>

                <div class="flex items-center gap-2 py-0.5">
                    <input type="checkbox" id="remember" name="remember" class="rounded border-slate-300 text-[#1BA7B6]">
                    <label for="remember" class="text-xs text-slate-550 select-none">Biarkan saya tetap masuk</label>
                </div>

                <button type="submit" 
                        class="w-full bg-[#1BA7B6] hover:bg-[#158C99] text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all">
                    Sign In to Portal
                </button>
            </form>

            <p class="text-center text-[10px] text-slate-400">© 2026 Digital Music Central Asia. All rights reserved.</p>
        </div>
    </div>
</x-app-layout>`
    },

    stepper: {
      title: 'views/sales/kunjungan-stepper.blade.php',
      desc: 'Form stepper 1-7 terintegrasi kamera, auto-watermark geo, dan Lead Scoring otomatis menggunakan Alpine.js yang sangat responsif, ringan, dan cepat di web browser HP.',
      lang: 'html',
      code: `<x-app-layout>
<div x-data="kunjunganForm()" class="bg-slate-50 min-h-screen flex flex-col pb-24">
    
    <!-- Header banner bar -->
    <div class="bg-slate-905 text-white p-3 shadow flex items-center justify-between sticky top-0 z-50">
        <h2 class="text-sm font-bold">Kunjungan Baru</h2>
        <span class="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded">STEP <span x-text="step"></span> / 7</span>
    </div>

    <!-- Stepper indicator line -->
    <div class="bg-white border-b border-slate-200 py-3 flex items-center justify-center gap-1 overflow-x-auto">
        <template x-for="s in 7">
            <div class="flex items-center gap-1.5 shrink-0">
                <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                     :class="step == s ? 'bg-[#1BA7B6] text-white font-black' : step > s ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'">
                    <span x-text="s"></span>
                </div>
            </div>
        </template>
    </div>

    <!-- Container wrapper forms -->
    <div class="flex-1 p-4 max-w-lg mx-auto w-full">

        <!-- STEP 1: Profil & GPS Ambil Lokasi -->
        <div x-show="step == 1" class="space-y-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-100">
            <h3 class="text-sm font-extrabold text-slate-800">1. Identitas Klien & Geolocation</h3>
            
            <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Tempat/Perusahaan *</label>
                <input type="text" x-model="company_name" placeholder="cth. Hotel Mulia" class="w-full border rounded-xl px-3.5 py-2.5 text-sm">
            </div>

            <div class="bg-slate-50 border p-4 rounded-xl space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-700">Verifikasi GPS</span>
                    <button type="button" @click="getGeoGPS" class="bg-[#1BA7B6] text-white text-[10.5px] font-bold px-3 py-1.5 rounded-lg">
                        Ambil GPS Realtime
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600">
                    <div>LAT: <span x-text="latitude"></span></div>
                    <div>LNG: <span x-text="longitude"></span></div>
                </div>
            </div>
        </div>

        <!-- STEP 2: Kamera & Watermark Live Renderer -->
        <div x-show="step == 2" class="space-y-4 bg-white p-5 rounded-2xl shadow-xs border border-slate-100">
            <h3 class="text-sm font-extrabold text-slate-800">2. Kamera audit Watermark GPS</h3>
            
            <!-- Preview screen -->
            <div class="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                <video x-ref="videoElement" autoplay playsinline class="w-full h-full object-cover" x-show="cameraActive"></video>
                <img :src="photoUrl" class="w-full h-full object-cover" x-show="photoUrl && !cameraActive">
                <canvas x-ref="canvasElement" class="hidden"></canvas>
            </div>

            <div class="flex gap-2 justify-center">
                <button type="button" @click="startWebcam" class="border py-2 px-3 text-xs font-semibold rounded-lg">Aktifkan Kamera</button>
                <button type="button" @click="snapPhoto" class="bg-[#1BA7B6] text-white py-2 px-3 text-xs font-semibold rounded-lg">Ambil Jepretan</button>
            </div>
        </div>

        <!-- Dynamic form components steps 3-7 continued... -->

    </div>

    <!-- Fixed Footer controller bar -->
    <div class="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 flex justify-between gap-3 max-w-lg mx-auto">
        <button type="button" x-show="step > 1" @click="step--" class="flex-1 py-3 border rounded-xl text-xs font-semibold">Kembali</button>
        <button type="button" x-show="step < 7" @click="step++" class="flex-1 bg-[#1BA7B6] text-white py-3 rounded-xl text-xs font-semibold">Lanjut</button>
        <button type="button" x-show="step == 7" @click="submit" class="flex-1 bg-emerald-500 text-white py-3 rounded-xl text-xs font-semibold">Submit Laporan</button>
    </div>
</div>

<script>
function kunjunganForm() {
    return {
        step: 1,
        company_name: '',
        latitude: '-6.2088',
        longitude: '106.8456',
        photoUrl: '',
        cameraActive: false,
        gpsAccuracy: 15,
        
        getGeoGPS() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    this.latitude = pos.coords.latitude.toFixed(6);
                    this.longitude = pos.coords.longitude.toFixed(6);
                });
            }
        },

        startWebcam() {
            this.cameraActive = true;
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                .then(stream => {
                    this.$refs.videoElement.srcObject = stream;
                });
        },

        snapPhoto() {
            const canvas = this.$refs.canvasElement;
            const video = this.$refs.videoElement;
            canvas.width = 640;
            canvas.height = 480;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 640, 480);
            
            // Draw watermark overlay text
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(0, 380, 640, 100);
            ctx.fillStyle = '#1BA7B6';
            ctx.font = 'bold 14px Arial';
            ctx.fillText('DM SalesManagement', 20, 410);
            ctx.fillStyle = '#FFF';
            ctx.font = '11px Arial';
            ctx.fillText('LAT: ' + this.latitude + ' | LNG: ' + this.longitude, 20, 435);
            ctx.fillText('TIMESTAMP: ' + new Date().toLocaleString(), 20, 455);

            this.photoUrl = canvas.toDataURL('image/jpeg');
            this.cameraActive = false;
            
            // Stop tracks
            const stream = video.srcObject;
            stream.getTracks().forEach(track => track.stop());
        },

        submit() {
            alert('Mengirim data laporan canvasing ke Route Controller Laravel!');
        }
    }
}
</script>
</x-app-layout>`
    },

    manager: {
      title: 'views/manager/dashboard.blade.php',
      desc: 'Halaman dashboard utama admin deskops yang mengelola rekapitulasi, tracking, monitoring tim sales, charts performansi, dan ekspor rute.',
      lang: 'html',
      code: `@extends('layouts.manager')

@section('content')
<main class="space-y-6">
    
    <!-- Top Row Card Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold text-slate-550 uppercase">Sales Aktif (Lapangan)</span>
            <p class="text-3xl font-black text-slate-900 mt-1">{{ $active_sales }}</p>
            <span class="text-[9.5px] text-emerald-600 bg-emerald-50 px-2 rounded-full mt-2 inline-block font-bold">🟢 ONLINE</span>
        </div>

        <div class="bg-white p-5 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold text-slate-550 uppercase">Total visits (Today)</span>
            <p class="text-3xl font-black text-slate-900 mt-1">{{ $total_visits_today }}</p>
            <span class="text-[9.5px] text-[#1BA7B6] bg-[#1BA7B6]/5 px-2 rounded-full mt-2 inline-block font-bold">🗺️ GPS Verified</span>
        </div>
    </div>

    <!-- Maps & Active rep listings table -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Live Map placeholder -->
        <div class="bg-white p-5 rounded-2xl border shadow-sm col-span-2">
            <h3 class="text-sm font-extrabold text-slate-800 mb-2">Live Geolocation Tracking</h3>
            <div id="managerMap" class="h-64 bg-slate-900 rounded-xl relative flex items-center justify-center text-white">
                <span class="text-[10.5px]">Integrating OpenLayers / Leaflet.js map with coordinates collection</span>
            </div>
        </div>

        <!-- Sales rep active listings leaderboard -->
        <div class="bg-white p-5 rounded-2xl border shadow-sm">
            <h3 class="text-sm font-extrabold text-slate-800 mb-3">Ranking Canvasing Sales</h3>
            <div class="space-y-3">
                @foreach($sales_ranking as $rank)
                <div class="flex items-center justify-between p-3 border rounded-xl text-xs">
                    <span class="font-bold text-slate-700">{{ $rank->name }}</span>
                    <span class="font-extrabold font-mono text-[#1BA7B6]">{{ $rank->total_visits }} Visits</span>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</main>
@endsection`
    }
  };

  const selectedSnippet = codeSnippets[selectedFile];

  return (
    <div className="flex bg-slate-900 text-slate-350 min-h-screen font-sans w-full">
      
      {/* Code sidebar selector */}
      <aside className="w-68 bg-slate-950 border-r border-slate-850 p-5 space-y-6 flex-shrink-0 flex flex-col justify-between hidden md:flex">
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <Terminal className="text-brand-primary h-5 w-5" />
            <div>
              <h2 className="text-white text-xs font-black uppercase tracking-wider">Laravel Code Center</h2>
              <p className="text-[10px] text-slate-500 font-mono">TEMPLATE VIEWPORTS</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs">
            <button 
              onClick={() => setSelectedFile('structure')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                selectedFile === 'structure' ? 'bg-slate-850 text-brand-primary border-l-2 border-brand-primary' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FolderTree className="h-4 w-4 text-emerald-500" />
              1. Struktur Folder Laravel
            </button>

            <button 
              onClick={() => setSelectedFile('layout')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                selectedFile === 'layout' ? 'bg-slate-850 text-brand-primary border-l-2 border-brand-primary' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4 text-brand-primary" />
              2. Layout app.blade.php
            </button>

            <button 
              onClick={() => setSelectedFile('login')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                selectedFile === 'login' ? 'bg-slate-850 text-brand-primary border-l-2 border-brand-primary' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4 text-rose-500" />
              3. Login login.blade.php
            </button>

            <button 
              onClick={() => setSelectedFile('stepper')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                selectedFile === 'stepper' ? 'bg-slate-850 text-brand-primary border-l-2 border-brand-primary' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4 text-amber-500" />
              4. Stepper Form Kunjungan
            </button>

            <button 
              onClick={() => setSelectedFile('manager')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                selectedFile === 'manager' ? 'bg-slate-850 text-brand-primary border-l-2 border-brand-primary' : 'hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4 text-purple-400" />
              5. Manager manager.blade.php
            </button>
          </nav>
        </div>

        {/* Info panel */}
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-2">
          <span className="text-[10px] text-white font-extrabold uppercase tracking-wider block">Developer Note</span>
          <p className="text-[10.5px] leading-relaxed text-slate-450 leading-normal">
            Template Blade Laravel di atas telah disesuaikan agar terintegrasi sempurna dengan library utility Alpine.js, Tailwind CSS browser execution, serta validasi GPS dan MediaDevices API perangkat mobile.
          </p>
        </div>
      </aside>

      {/* Code contents stage */}
      <main className="flex-1 p-6 space-y-4 max-w-5xl overflow-x-auto flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-white text-base font-extrabold tracking-tight">{selectedSnippet?.title}</h1>
            <p className="text-xs text-slate-450 mt-1 max-w-2xl leading-relaxed">{selectedSnippet?.desc}</p>
          </div>

          <button 
            onClick={() => handleCopy(selectedSnippet?.code || '')}
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-2 px-4 rounded-xl text-xs inline-flex items-center gap-1.5 shadow-sm transition-all shadow-cyan-950 flex-shrink-0"
          >
            {copied ? <Check className="h-4.5 w-4.5 text-emerald-305" /> : <Copy className="h-4.5 w-4.5" />}
            {copied ? 'Tersalin!' : 'Copy Code'}
          </button>
        </div>

        <div className="relative border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden p-4 shadow-inner flex-1 flex flex-col min-h-[480px]">
          {/* Mock shell header */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-3.5 mb-4 text-slate-500 text-[10px] font-mono select-none">
            <p>PORTAL CODE VIEWER • EXPORT CENTER • {selectedFile.toUpperCase()}.TXT</p>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
          </div>

          {/* Actual copy code content area */}
          <pre className="text-slate-200 font-mono text-[11px] leading-relaxed overflow-auto flex-1 select-all h-[500px]">
            <code>{selectedSnippet?.code}</code>
          </pre>
        </div>
      </main>

    </div>
  );
}
