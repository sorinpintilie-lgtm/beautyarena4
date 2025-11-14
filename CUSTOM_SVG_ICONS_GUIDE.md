# Custom SVG Icons & Graphics Guide - BeautyArena Services Page

## Overview

This guide provides detailed specifications for creating custom SVG icons and graphics to replace generic icon libraries. These custom illustrations will give the Services page a unique, sophisticated, and brand-aligned visual identity.

---

## Icon Design Philosophy

### Core Principles
1. **Elegant & Sophisticated**: Reflect luxury beauty industry aesthetics
2. **Detailed but Scalable**: Rich details that work at multiple sizes
3. **Consistent Style**: Unified visual language across all icons
4. **Animated Elements**: Subtle animations for engagement
5. **Brand Colors**: Use peach pink palette (#FFAB9D, #FFD5CC, #FF8B7A, #FFB6A3)

### Style Guidelines
- **Line Weight**: 2-3px for main elements, 1-2px for details
- **Rounded Corners**: 2-4px radius for softer feel
- **Gradients**: Use brand color gradients for depth
- **Shadows**: Subtle drop shadows for dimension
- **Sparkles**: Add shimmer effects for luxury feel

---

## Custom SVG Icon Library

### 1. Hair Services Icon - "Flowing Elegance"

**Concept**: Elegant scissors with flowing hair strands and sparkle effects

```jsx
// components/icons/HairServiceIcon.jsx
export const HairServiceIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Gradient definitions */}
      <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="50%" stopColor="#FFB6A3" />
        <stop offset="100%" stopColor="#FF8B7A" />
      </linearGradient>
      
      <linearGradient id="scissorsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8B7A" />
        <stop offset="100%" stopColor="#FFAB9D" />
      </linearGradient>
      
      {/* Glow filter */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Flowing hair strands - curved paths */}
    <g className={animated ? "animate-float" : ""}>
      <path
        d="M 60 40 Q 50 80 55 120 T 60 160"
        stroke="url(#hairGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 80 35 Q 75 75 80 115 T 85 155"
        stroke="url(#hairGradient)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 100 30 Q 95 70 100 110 T 105 150"
        stroke="url(#hairGradient)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 120 35 Q 125 75 120 115 T 115 155"
        stroke="url(#hairGradient)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 140 40 Q 150 80 145 120 T 140 160"
        stroke="url(#hairGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
    
    {/* Elegant scissors */}
    <g transform="translate(100, 100)">
      {/* Left blade */}
      <ellipse
        cx="-15"
        cy="-15"
        rx="8"
        ry="8"
        fill="url(#scissorsGradient)"
        filter="url(#glow)"
      />
      <path
        d="M -15 -15 L -35 -45"
        stroke="url(#scissorsGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      
      {/* Right blade */}
      <ellipse
        cx="15"
        cy="-15"
        rx="8"
        ry="8"
        fill="url(#scissorsGradient)"
        filter="url(#glow)"
      />
      <path
        d="M 15 -15 L 35 -45"
        stroke="url(#scissorsGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      
      {/* Center pivot */}
      <circle
        cx="0"
        cy="-15"
        r="5"
        fill="#FFD5CC"
        filter="url(#glow)"
      />
    </g>
    
    {/* Sparkle effects */}
    <g className={animated ? "animate-pulse" : ""}>
      <circle cx="45" cy="50" r="2" fill="#FFD5CC" opacity="0.8" />
      <circle cx="155" cy="55" r="2" fill="#FFD5CC" opacity="0.8" />
      <circle cx="70" cy="140" r="2" fill="#FFB6A3" opacity="0.8" />
      <circle cx="130" cy="145" r="2" fill="#FFB6A3" opacity="0.8" />
      
      {/* Star sparkles */}
      <path d="M 50 60 L 52 62 L 50 64 L 48 62 Z" fill="#FFAB9D" opacity="0.9" />
      <path d="M 150 65 L 152 67 L 150 69 L 148 67 Z" fill="#FFAB9D" opacity="0.9" />
    </g>
  </svg>
);
```

---

### 2. Skincare Icon - "Radiant Glow"

**Concept**: Face silhouette with botanical elements and radial glow

```jsx
// components/icons/SkincareIcon.jsx
export const SkincareIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="glowGradient">
        <stop offset="0%" stopColor="#FFD5CC" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FFAB9D" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FF8B7A" stopOpacity="0" />
      </radialGradient>
      
      <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB6A3" />
        <stop offset="100%" stopColor="#FFAB9D" />
      </linearGradient>
    </defs>
    
    {/* Radial glow background */}
    <circle 
      cx="100" 
      cy="100" 
      r="80" 
      fill="url(#glowGradient)"
      className={animated ? "animate-pulse" : ""}
    />
    
    {/* Face silhouette */}
    <g>
      {/* Face outline */}
      <ellipse
        cx="100"
        cy="105"
        rx="35"
        ry="45"
        fill="none"
        stroke="#FF8B7A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Neck */}
      <path
        d="M 85 145 Q 100 155 115 145"
        fill="none"
        stroke="#FF8B7A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Closed eyes */}
      <path
        d="M 85 95 Q 90 98 95 95"
        fill="none"
        stroke="#FF8B7A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 105 95 Q 110 98 115 95"
        fill="none"
        stroke="#FF8B7A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Serene smile */}
      <path
        d="M 88 120 Q 100 125 112 120"
        fill="none"
        stroke="#FF8B7A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    
    {/* Botanical elements - leaves */}
    <g className={animated ? "animate-float" : ""}>
      {/* Left leaf */}
      <path
        d="M 40 80 Q 35 90 40 100 Q 45 95 40 80"
        fill="url(#leafGradient)"
        opacity="0.7"
      />
      <path
        d="M 40 80 L 40 100"
        stroke="#FF8B7A"
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Right leaf */}
      <path
        d="M 160 80 Q 165 90 160 100 Q 155 95 160 80"
        fill="url(#leafGradient)"
        opacity="0.7"
      />
      <path
        d="M 160 80 L 160 100"
        stroke="#FF8B7A"
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Top leaves */}
      <path
        d="M 90 40 Q 85 50 90 60 Q 95 55 90 40"
        fill="url(#leafGradient)"
        opacity="0.6"
      />
      <path
        d="M 110 40 Q 115 50 110 60 Q 105 55 110 40"
        fill="url(#leafGradient)"
        opacity="0.6"
      />
    </g>
    
    {/* Sparkle particles */}
    <g className={animated ? "animate-pulse" : ""}>
      <circle cx="70" cy="70" r="2" fill="#FFD5CC" />
      <circle cx="130" cy="75" r="2" fill="#FFD5CC" />
      <circle cx="75" cy="135" r="2" fill="#FFB6A3" />
      <circle cx="125" cy="140" r="2" fill="#FFB6A3" />
    </g>
  </svg>
);
```

---

### 3. Makeup Icon - "Artistic Beauty"

**Concept**: Makeup brush with color palette and shimmer effects

```jsx
// components/icons/MakeupIcon.jsx
export const MakeupIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="100%" stopColor="#FF8B7A" />
      </linearGradient>
      
      <linearGradient id="bristlesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD5CC" />
        <stop offset="100%" stopColor="#FFB6A3" />
      </linearGradient>
    </defs>
    
    {/* Makeup brush */}
    <g transform="rotate(-45 100 100)">
      {/* Brush handle */}
      <rect
        x="90"
        y="40"
        width="20"
        height="80"
        rx="10"
        fill="url(#brushGradient)"
      />
      
      {/* Ferrule (metal part) */}
      <rect
        x="88"
        y="115"
        width="24"
        height="15"
        rx="2"
        fill="#FFB6A3"
      />
      
      {/* Bristles */}
      <g>
        <path d="M 92 130 L 90 150" stroke="url(#bristlesGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 96 130 L 95 152" stroke="url(#bristlesGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 100 130 L 100 155" stroke="url(#bristlesGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 104 130 L 105 152" stroke="url(#bristlesGradient)" strokeWidth="2" strokeLinecap="round" />
        <path d="M 108 130 L 110 150" stroke="url(#bristlesGradient)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
    
    {/* Color palette circles */}
    <g className={animated ? "animate-pulse" : ""}>
      <circle cx="50" cy="120" r="12" fill="#FFAB9D" opacity="0.8" />
      <circle cx="75" cy="135" r="12" fill="#FFD5CC" opacity="0.8" />
      <circle cx="100" cy="145" r="12" fill="#FFB6A3" opacity="0.8" />
      <circle cx="125" cy="150" r="12" fill="#FF8B7A" opacity="0.8" />
      <circle cx="150" cy="145" r="12" fill="#FFAB9D" opacity="0.8" />
    </g>
    
    {/* Shimmer effects */}
    <g className={animated ? "animate-float" : ""}>
      <path d="M 60 80 L 62 85 L 60 90 L 58 85 Z" fill="#FFD5CC" opacity="0.9" />
      <path d="M 140 70 L 142 75 L 140 80 L 138 75 Z" fill="#FFD5CC" opacity="0.9" />
      <path d="M 45 100 L 47 105 L 45 110 L 43 105 Z" fill="#FFB6A3" opacity="0.8" />
      <path d="M 155 120 L 157 125 L 155 130 L 153 125 Z" fill="#FFB6A3" opacity="0.8" />
    </g>
    
    {/* Powder particles */}
    <g className={animated ? "animate-pulse" : ""} opacity="0.6">
      <circle cx="70" cy="90" r="1.5" fill="#FFAB9D" />
      <circle cx="130" cy="95" r="1.5" fill="#FFB6A3" />
      <circle cx="85" cy="110" r="1.5" fill="#FFD5CC" />
      <circle cx="145" cy="105" r="1.5" fill="#FF8B7A" />
    </g>
  </svg>
);
```

---

### 4. Nail Services Icon - "Elegant Hands"

**Concept**: Graceful hand with decorated nails and sparkles

```jsx
// components/icons/NailServiceIcon.jsx
export const NailServiceIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD5CC" />
        <stop offset="100%" stopColor="#FFAB9D" />
      </linearGradient>
      
      <linearGradient id="nailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8B7A" />
        <stop offset="100%" stopColor="#FFAB9D" />
      </linearGradient>
    </defs>
    
    {/* Hand silhouette */}
    <g>
      {/* Palm */}
      <ellipse
        cx="100"
        cy="130"
        rx="35"
        ry="40"
        fill="url(#handGradient)"
        opacity="0.3"
      />
      
      {/* Fingers */}
      {/* Thumb */}
      <path
        d="M 70 120 Q 65 100 68 80"
        stroke="url(#handGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Index finger */}
      <path
        d="M 85 130 L 85 60"
        stroke="url(#handGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Middle finger */}
      <path
        d="M 100 130 L 100 50"
        stroke="url(#handGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Ring finger */}
      <path
        d="M 115 130 L 115 60"
        stroke="url(#handGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      
      {/* Pinky */}
      <path
        d="M 130 120 L 130 70"
        stroke="url(#handGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </g>
    
    {/* Decorated nails */}
    <g className={animated ? "animate-pulse" : ""}>
      {/* Thumb nail */}
      <ellipse cx="68" cy="75" rx="6" ry="8" fill="url(#nailGradient)" />
      <circle cx="68" cy="75" r="2" fill="#FFD5CC" />
      
      {/* Index nail */}
      <ellipse cx="85" cy="55" rx="5" ry="7" fill="url(#nailGradient)" />
      <circle cx="85" cy="55" r="1.5" fill="#FFD5CC" />
      
      {/* Middle nail */}
      <ellipse cx="100" cy="45" rx="5" ry="7" fill="url(#nailGradient)" />
      <circle cx="100" cy="45" r="1.5" fill="#FFD5CC" />
      
      {/* Ring nail */}
      <ellipse cx="115" cy="55" rx="5" ry="7" fill="url(#nailGradient)" />
      <circle cx="115" cy="55" r="1.5" fill="#FFD5CC" />
      
      {/* Pinky nail */}
      <ellipse cx="130" cy="65" rx="4" ry="6" fill="url(#nailGradient)" />
      <circle cx="130" cy="65" r="1.5" fill="#FFD5CC" />
    </g>
    
    {/* Nail art details - tiny gems */}
    <g className={animated ? "animate-float" : ""}>
      <circle cx="100" cy="42" r="1" fill="#FFD5CC" opacity="0.9" />
      <circle cx="103" cy="44" r="0.8" fill="#FFB6A3" opacity="0.9" />
      <circle cx="97" cy="44" r="0.8" fill="#FFB6A3" opacity="0.9" />
    </g>
    
    {/* Sparkles around nails */}
    <g className={animated ? "animate-pulse" : ""} opacity="0.8">
      <path d="M 75 50 L 76 52 L 75 54 L 74 52 Z" fill="#FFD5CC" />
      <path d="M 125 60 L 126 62 L 125 64 L 124 62 Z" fill="#FFD5CC" />
      <path d="M 90 40 L 91 42 L 90 44 L 89 42 Z" fill="#FFB6A3" />
      <path d="M 110 40 L 111 42 L 110 44 L 109 42 Z" fill="#FFB6A3" />
    </g>
    
    {/* Polish bottle silhouette */}
    <g transform="translate(150, 140)" opacity="0.4">
      <rect x="0" y="0" width="15" height="25" rx="2" fill="url(#nailGradient)" />
      <rect x="2" y="-5" width="11" height="6" rx="1" fill="#FF8B7A" />
      <circle cx="7.5" cy="12" r="3" fill="#FFD5CC" opacity="0.5" />
    </g>
  </svg>
);
```

---

### 5. Wellness Icon - "Zen Harmony"

**Concept**: Lotus flower with zen circle and flowing water elements

```jsx
// components/icons/WellnessIcon.jsx
export const WellnessIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="lotusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD5CC" />
        <stop offset="50%" stopColor="#FFAB9D" />
        <stop offset="100%" stopColor="#FFB6A3" />
      </linearGradient>
      
      <radialGradient id="zenGlow">
        <stop offset="0%" stopColor="#FFAB9D" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FF8B7A" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Zen circle (Enso) */}
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke="#FFAB9D"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="430 10"
      opacity="0.4"
      className={animated ? "animate-spin-slow" : ""}
      style={{ animationDuration: '20s' }}
    />
    
    {/* Radial glow */}
    <circle cx="100" cy="100" r="60" fill="url(#zenGlow)" />
    
    {/* Lotus flower */}
    <g transform="translate(100, 100)">
      {/* Center */}
      <circle cx="0" cy="0" r="8" fill="#FFB6A3" />
      <circle cx="0" cy="0" r="5" fill="#FFD5CC" />
      
      {/* Inner petals */}
      <g className={animated ? "animate-pulse" : ""}>
        {/* Top petal */}
        <ellipse
          cx="0"
          cy="-15"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
        />
        
        {/* Top-right petal */}
        <ellipse
          cx="13"
          cy="-7"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
          transform="rotate(60 13 -7)"
        />
        
        {/* Bottom-right petal */}
        <ellipse
          cx="13"
          cy="7"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
          transform="rotate(120 13 7)"
        />
        
        {/* Bottom petal */}
        <ellipse
          cx="0"
          cy="15"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
          transform="rotate(180 0 15)"
        />
        
        {/* Bottom-left petal */}
        <ellipse
          cx="-13"
          cy="7"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
          transform="rotate(240 -13 7)"
        />
        
        {/* Top-left petal */}
        <ellipse
          cx="-13"
          cy="-7"
          rx="8"
          ry="15"
          fill="url(#lotusGradient)"
          opacity="0.9"
          transform="rotate(300 -13 -7)"
        />
      </g>
      
      {/* Outer petals */}
      <g opacity="0.7">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-25"
            rx="6"
            ry="18"
            fill="url(#lotusGradient)"
            transform={`rotate(${angle} 0 0)`}
            opacity="0.6"
          />
        ))}
      </g>
    </g>
    
    {/* Flowing water elements */}
    <g className={animated ? "animate-float" : ""} opacity="0.5">
      <path
        d="M 30 140 Q 50 135 70 140"
        stroke="#FFAB9D"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 130 140 Q 150 135 170 140"
        stroke="#FFAB9D"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 40 155 Q 60 150 80 155"
        stroke="#FFB6A3"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 120 155 Q 140 150 160 155"
        stroke="#FFB6A3"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
    
    {/* Meditation sparkles */}
    <g className={animated ? "animate-pulse" : ""}>
      <circle cx="50" cy="50" r="2" fill="#FFD5CC" opacity="0.8" />
      <circle cx="150" cy="50" r="2" fill="#FFD5CC" opacity="0.8" />
      <circle cx="50" cy="150" r="2" fill="#FFB6A3" opacity="0.8" />
      <circle cx="150" cy="150" r="2" fill="#FFB6A3" opacity="0.8" />
    </g>
  </svg>
);
```

---

### 6. Special Treatments Icon - "Luxury Crown"

**Concept**: Elegant crown with stars and luxury details

```jsx
// components/icons/SpecialTreatmentIcon.jsx
export const SpecialTreatmentIcon = ({ className = "w-24 h-24", animated = true }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFAB9D" />
        <stop offset="50%" stopColor="#FFB6A3" />
        <stop offset="100%" stopColor="#FF8B7A" />
      </linearGradient>
      
      <filter id="luxuryGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Crown base */}
    <g transform="translate(100, 110)">
      {/* Crown band */}
      <path
        d="M -60 20 L -50 -10 L -30 0 L 0 -20 L 30 0 L 50 -10 L 60 20 Z"
        fill="url(#crownGradient)"
        filter="url(#luxuryGlow)"
      />
      
      {/* Crown points */}
      <g>
        {/* Left point */}
        <path
          d="M -50 -10 L -55 -35 L -45 -35 Z"
          fill="url(#crownGradient)"
          filter="url(#luxuryGlow)"
        />
        
        {/* Center-left point */}
        <path
          d="M -30 0 L -35 -25 L -25 -25 Z"
          fill="url(#crownGradient)"
          filter="url(#luxuryGlow)"
        />
        
        {/* Center point (tallest) */}
        <path
          d="M 0 -20 L -5 -50 L 5 -50 Z"
          fill="url(#crownGradient)"
          filter="url(#luxuryGlow)"
        />
        
        {/* Center-right point */}
        <path
          d="M 30 0 L 25 -25 L 35 -25 Z"
          fill="url(#crownGradient)"
          filter="url(#luxuryGlow)"
        />
        
        {/* Right point */}
        <path
          d="M 50 -10 L 45 -35 L 55 -35 Z"
          fill="url(#crownGradient)"
          filter="url(#luxuryGlow)"
        />
      </g>
      
      {/* Jewels on crown */}
      <g className={animated ? "animate-pulse" : ""}>
        <circle cx="-50" cy="-35" r="3" fill="#FFD5CC" />
        <circle cx="-30" cy="-25" r="3" fill="#FFD5CC" />
        <circle cx="0" cy="-50" r="4" fill="#FFD5CC" />
        <circle cx="30" cy="-25" r="3" fill="#FFD5CC" />
        <circle cx="50" cy="-35" r="3" fill="#FFD5CC" />
      </g>
      
      {/* Decorative gems on band */}
      <g>
        <circle cx="-40" cy="5" r="2.5" fill="#FFB6A3" opacity="0.8" />
        <circle cx="-20" cy="8" r="2.5" fill="#FFB6A3" opacity="0.8" />
        <circle cx="0" cy="5" r="2.5" fill="#FFB6A3" opacity="0.8" />
        <circle cx="20" cy="8" r="2.5" fill="#FFB6A3" opacity="0.8" />
        <circle cx="40" cy="5" r="2.5" fill="#FFB6A3" opacity="0.8" />
      </g>
    </g>
    
    {/* Star accents */}
    <g className={animated ? "animate-float" : ""}>
      {/* Left star */}
      <g transform="translate(40, 60)">
        <path
          d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
          fill="#FFD5CC"
          opacity="0.9"
        />
        <circle cx="0" cy="0" r="2" fill="#FFAB9D" />
      </g>
      
      {/* Right star */}
      <g transform="translate(160, 60)">
        <path
          d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
          fill="#FFD5CC"
          opacity="0.9"
        />
        <circle cx="0" cy="0" r="2" fill="#FFAB9D" />
      </g>
      
      {/* Top star */}
      <g transform="translate(100, 30)">
        <path
          d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
          fill="#FFB6A3"
          opacity="0.8"
        />
      </g>
    </g>
    
    {/* Sparkle particles */}
    <g className={animated ? "animate-pulse" : ""} opacity="0.7">
      <circle cx="60" cy="90" r="1.5" fill="#FFD5CC" />
      <circle cx="140" cy="90" r="1.5" fill="#FFD5CC" />
      <circle cx="80" cy="140" r="1.5" fill="#FFB6A3" />
      <circle cx="120" cy="140" r="1.5" fill="#FFB6A3" />
      <circle cx="100" cy="160" r="1.5" fill="#FFAB9D" />
    </g>
    
    {/* Luxury rays */}
    <g opacity="0.3">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + Math.cos((angle * Math.PI) / 180) * 80}
          y2={100 + Math.sin((angle * Math.PI) / 180) * 80}
          stroke="#FFAB9D"
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
    </g>
  </svg>
);
```

---

## Icon Usage Examples

### Basic Usage

```jsx
import { HairServiceIcon, SkincareIcon, MakeupIcon } from '@/components/icons/ServiceIcons';

// In your component
<div className="flex gap-8">
  <HairServiceIcon className="w-32 h-32" animated={true} />
  <SkincareIcon className="w-32 h-32" animated={true} />
  <MakeupIcon className="w-32 h-32" animated={true} />
</div>
```

### With Hover Effects

```jsx
<div className="group cursor-pointer">
  <div className="transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
    <HairServiceIcon 
      className="w-24 h-24" 
      animated={true}
    />
  </div>
</div>
```

### In Service Cards

```jsx
<div className="card-beauty group">
  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
    <HairServiceIcon className="w-20 h-20" animated={true} />
  </div>
  <h3 className="text-2xl font-elegant">Coafură profesională</h3>
  {/* Rest of card content */}
</div>
```

---

## Animation Classes

Add these to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};
```

---

## Icon Export Component

```jsx
// components/icons/ServiceIcons.jsx
export { HairServiceIcon } from './HairServiceIcon';
export { SkincareIcon } from './SkincareIcon';
export { MakeupIcon } from './MakeupIcon';
export { NailServiceIcon } from './NailServiceIcon';
export { WellnessIcon } from './WellnessIcon';
export { SpecialTreatmentIcon } from './SpecialTreatmentIcon';

// Icon map for easy access
export const SERVICE_ICONS = {
  hair: HairServiceIcon,
  skincare: SkincareIcon,
  makeup: MakeupIcon,
  nails: NailServiceIcon,
  wellness: WellnessIcon,
  special: SpecialTreatmentIcon,
};

// Helper component
export const ServiceIcon = ({ type, ...props }) => {
  const IconComponent = SERVICE_ICONS[type];
  return IconComponent ? <IconComponent {...props} /> : null;
};
```

---

## Benefits of Custom SVG Icons

1. **Unique Brand Identity**: No other site will have these exact icons
2. **Perfect Color Integration**: Uses exact brand colors
3. **Scalable**: Works at any size without quality loss
4. **Animated**: Built-in animation support
5. **Lightweight**: Pure SVG, no external dependencies
6. **Customizable**: Easy to modify colors, sizes, animations
7. **Accessible**: Can add proper ARIA labels
8. **Performance**: No icon library overhead

---

## Next Steps

1. Create individual icon component files
2. Test icons at different sizes
3. Verify animations work smoothly
4. Ensure accessibility compliance
5. Integrate into service cards
6. Add hover states and interactions

---

**Document Version**: 1.0  
**Created**: 2025-11-13  
**Status**: Ready for Implementation