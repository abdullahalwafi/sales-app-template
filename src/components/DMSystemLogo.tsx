/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export default function DMSystemLogo({ className = '', size = 'md', showTagline = true }: LogoProps) {
  // Dimensions based on size preset
  const sizes = {
    sm: { symbol: 'h-8 w-8', text: 'text-sm', subText: 'text-[9px]', spacing: 'gap-2' },
    md: { symbol: 'h-10 w-10', text: 'text-lg', subText: 'text-[11px]', spacing: 'gap-2.5' },
    lg: { symbol: 'h-16 w-16', text: 'text-2xl', subText: 'text-xs', spacing: 'gap-3.5' },
    xl: { symbol: 'h-24 w-24', text: 'text-4xl', subText: 'text-sm', spacing: 'gap-5' },
  };

  const selectedSize = sizes[size];

  return (
    <div className={`flex items-center ${selectedSize.spacing} ${className}`}>
      {/* 3D Isometric DM Cube Symbol */}
      <div className={`relative flex-shrink-0 ${selectedSize.symbol}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Top Face of Cube: stylized 'D' in dark steel/black (#0F172A) */}
          <path
            d="M50 15 L82 31 L50 47 L18 31 Z"
            fill="#1E293B"
          />
          {/* Accent layer on Top Face to define 'D' cutout */}
          <path
            d="M50 20 L72 31 L50 42 L28 31 Z"
            fill="#0F172A"
          />
          <path
            d="M38 31 L50 37 L62 31 L50 25 Z"
            fill="#1E293B"
          />

          {/* Left Face of Cube: forming left leg of 'M' in vibrant teal (#1BA7B6) */}
          <path
            d="M18 36 L46 51 L46 82 L18 67 Z"
            fill="#1BA7B6"
          />
          {/* Custom shading for Left Face split */}
          <path
            d="M18 36 L32 43 L32 74 L18 67 Z"
            fill="#148E9B"
          />

          {/* Right Face of Cube: forming right leg of 'M' in vibrant dark-teal/teal (#14B8A6) */}
          <path
            d="M54 51 L82 36 L82 67 L54 82 Z"
            fill="#14B8A6"
          />
          {/* Custom shading for Right Face split */}
          <path
            d="M68 43 L82 36 L82 67 L68 74 Z"
            fill="#0F9F8F"
          />

          {/* Center Connector: bottom fold connecting the 'M' legs */}
          <path
            d="M46 51 L50 49 L54 51 L50 85 Z"
            fill="#0F172A"
            opacity="0.15"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center select-none font-display">
        <div className="flex items-baseline leading-none">
          <span className="font-bold tracking-tight text-slate-900 font-sans text-[1.15em] mr-0.5" style={{ fontSize: 'inherit' }}>
            Digital
          </span>
          <span className="font-semibold italic text-slate-800 font-sans tracking-wide text-[1.1em] relative" style={{ fontSize: 'inherit' }}>
            mus<span>i</span>k
            {/* Styled teal dot or flag over 'i' */}
            <span className="absolute top-[28%] left-[71.5%] w-[4px] h-[4px] bg-brand-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
          </span>
        </div>

        {showTagline && (
          <span className={`font-medium tracking-widest text-brand-primary ${selectedSize.subText} mt-0.5 uppercase`}>
            Professional Sound System
          </span>
        )}
      </div>
    </div>
  );
}
