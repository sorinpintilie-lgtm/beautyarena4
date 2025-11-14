import React from 'react';

// Hair Services Icon - Flowing hair with scissors
export const HairIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="100%" stopColor="#FF8B7A" />
      </linearGradient>
    </defs>
    {/* Hair strands */}
    <path d="M30 20 Q35 40 30 60 Q28 70 30 80" stroke="url(#hairGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M40 15 Q45 35 42 55 Q40 65 42 78" stroke="url(#hairGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M50 18 Q55 38 52 58 Q50 68 52 80" stroke="url(#hairGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M60 16 Q63 36 60 56 Q58 66 60 79" stroke="url(#hairGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M70 20 Q72 40 68 60 Q66 70 68 80" stroke="url(#hairGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* Scissors */}
    <g transform="translate(55, 25) rotate(-45)">
      <circle cx="0" cy="0" r="4" fill="#FF8B7A"/>
      <circle cx="0" cy="12" r="4" fill="#FF8B7A"/>
      <line x1="0" y1="0" x2="0" y2="12" stroke="#FF8B7A" strokeWidth="2"/>
      <line x1="0" y1="0" x2="-8" y2="-8" stroke="#FF8B7A" strokeWidth="2"/>
      <line x1="0" y1="12" x2="-8" y2="20" stroke="#FF8B7A" strokeWidth="2"/>
    </g>
  </svg>
);

// Skincare Icon - Face with botanical elements
export const SkincareIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glowGradient">
        <stop offset="0%" stopColor="#FFD5CC" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#FFAB9D" stopOpacity="0.2"/>
      </radialGradient>
    </defs>
    {/* Glow effect */}
    <circle cx="50" cy="50" r="35" fill="url(#glowGradient)"/>
    {/* Face outline */}
    <ellipse cx="50" cy="50" rx="25" ry="30" stroke="#FFAB9D" strokeWidth="2.5" fill="none"/>
    {/* Botanical leaves */}
    <path d="M25 45 Q20 40 25 35" stroke="#FF8B7A" strokeWidth="2" fill="none"/>
    <path d="M75 45 Q80 40 75 35" stroke="#FF8B7A" strokeWidth="2" fill="none"/>
    <path d="M50 75 Q45 80 50 85" stroke="#FF8B7A" strokeWidth="2" fill="none"/>
    {/* Sparkles */}
    <circle cx="35" cy="30" r="2" fill="#FFB6A3"/>
    <circle cx="65" cy="30" r="2" fill="#FFB6A3"/>
    <circle cx="50" cy="25" r="2" fill="#FFB6A3"/>
  </svg>
);

// Makeup Icon - Brush with palette
export const MakeupIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="100%" stopColor="#FF8B7A" />
      </linearGradient>
    </defs>
    {/* Brush handle */}
    <rect x="35" y="60" width="6" height="30" rx="3" fill="url(#brushGradient)"/>
    {/* Brush bristles */}
    <path d="M25 50 L38 60 L42 60 L55 50 Q50 40 40 40 Q30 40 25 50 Z" fill="#FFD5CC"/>
    {/* Color palette circles */}
    <circle cx="60" cy="30" r="8" fill="#FFAB9D"/>
    <circle cx="75" cy="35" r="7" fill="#FF8B7A"/>
    <circle cx="70" cy="50" r="6" fill="#FFB6A3"/>
    {/* Shimmer effect */}
    <path d="M45 35 L47 37 L45 39 L43 37 Z" fill="#FFD5CC" opacity="0.8"/>
    <path d="M55 45 L57 47 L55 49 L53 47 Z" fill="#FFD5CC" opacity="0.6"/>
  </svg>
);

// Nail Services Icon - Hand with decorated nails
export const NailIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="100%" stopColor="#FFB6A3" />
      </linearGradient>
    </defs>
    {/* Palm */}
    <ellipse cx="50" cy="60" rx="18" ry="22" fill="#FFD5CC"/>
    {/* Fingers with nails */}
    <rect x="32" y="30" width="6" height="25" rx="3" fill="#FFD5CC"/>
    <rect x="42" y="25" width="6" height="30" rx="3" fill="#FFD5CC"/>
    <rect x="52" y="28" width="6" height="27" rx="3" fill="#FFD5CC"/>
    <rect x="62" y="32" width="6" height="23" rx="3" fill="#FFD5CC"/>
    {/* Nail polish */}
    <ellipse cx="35" cy="30" rx="3" ry="4" fill="url(#nailGradient)"/>
    <ellipse cx="45" cy="25" rx="3" ry="4" fill="url(#nailGradient)"/>
    <ellipse cx="55" cy="28" rx="3" ry="4" fill="url(#nailGradient)"/>
    <ellipse cx="65" cy="32" rx="3" ry="4" fill="url(#nailGradient)"/>
    {/* Sparkles on nails */}
    <circle cx="35" cy="28" r="1" fill="#FFD5CC"/>
    <circle cx="45" cy="23" r="1" fill="#FFD5CC"/>
    <circle cx="55" cy="26" r="1" fill="#FFD5CC"/>
  </svg>
);

// Wellness Icon - Lotus flower
export const WellnessIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lotusGradient">
        <stop offset="0%" stopColor="#FFD5CC"/>
        <stop offset="100%" stopColor="#FFAB9D"/>
      </radialGradient>
    </defs>
    {/* Zen circle */}
    <circle cx="50" cy="50" r="35" stroke="#FFAB9D" strokeWidth="1.5" fill="none" opacity="0.3"/>
    {/* Lotus petals */}
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)" transform="rotate(60 50 55)"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)" transform="rotate(120 50 55)"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)" transform="rotate(180 50 55)"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)" transform="rotate(240 50 55)"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="url(#lotusGradient)" transform="rotate(300 50 55)"/>
    {/* Center */}
    <circle cx="50" cy="55" r="5" fill="#FF8B7A"/>
  </svg>
);

// Special Treatments Icon - Crown with stars
export const SpecialIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6A3" />
        <stop offset="100%" stopColor="#FFAB9D" />
      </linearGradient>
    </defs>
    {/* Crown base */}
    <path d="M25 60 L30 40 L40 50 L50 35 L60 50 L70 40 L75 60 Z" fill="url(#crownGradient)"/>
    <rect x="25" y="60" width="50" height="8" rx="2" fill="#FF8B7A"/>
    {/* Jewels */}
    <circle cx="35" cy="50" r="3" fill="#FFD5CC"/>
    <circle cx="50" cy="42" r="4" fill="#FFD5CC"/>
    <circle cx="65" cy="50" r="3" fill="#FFD5CC"/>
    {/* Stars */}
    <path d="M50 20 L52 26 L58 26 L53 30 L55 36 L50 32 L45 36 L47 30 L42 26 L48 26 Z" fill="#FFB6A3"/>
    <circle cx="30" cy="25" r="2" fill="#FFB6A3" opacity="0.6"/>
    <circle cx="70" cy="25" r="2" fill="#FFB6A3" opacity="0.6"/>
  </svg>
);

export default {
  HairIcon,
  SkincareIcon,
  MakeupIcon,
  NailIcon,
  WellnessIcon,
  SpecialIcon
};