/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant Peach Rose Palette
        'beauty-pink': '#FFAB9D',        // Primary - rose peach
        'beauty-pink-light': '#FFD5CC',  // Light - blush peach
        'beauty-pink-dark': '#FF8B7A',   // Dark - terracotta peach
        'beauty-peach': '#FFB6A3',       // Accent - dusty peach
        
        // Supporting colors (kept from original)
        'beauty-rose': '#f43f5e',        // Sale badges, urgent actions
        'beauty-purple': '#8b5cf6',      // Secondary accents
        'beauty-gold': '#f59e0b',        // Star ratings, premium
      },
      fontFamily: {
        'elegant': ['Playfair Display', 'serif'],
        'modern': ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      backdropBlur: {
        'beauty': '12px',
      }
    },
  },
  plugins: [],
}