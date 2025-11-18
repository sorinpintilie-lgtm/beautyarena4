import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] mt-16 lg:mt-16 flex items-end justify-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/imaginisite/envato-labs-image-edit-37.png"
          alt="Frumusețea ta unică"
          className="w-full h-full object-cover"
          style={{ objectPosition: '30% center' }}
        />
        {/* Softer gradient focused at the bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8 pb-6 sm:pb-10 flex justify-center sm:justify-start">
        {/* On mobile: full-width, low-height bar; on desktop: narrower card on the left */}
        <div className="w-full sm:max-w-xl bg-black/35 sm:bg-black/25 backdrop-blur-sm rounded-t-2xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-5 md:px-8 md:py-6">
          {/* Small label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-3">
            <Sparkles className="w-4 h-4 text-beauty-pink-light" />
            <span className="text-[10px] sm:text-[11px] font-medium text-white/90 uppercase tracking-[0.16em]">
              Salon & magazin de frumusețe
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-elegant font-bold text-white leading-tight text-left"
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 1px 1px 3px rgba(0,0,0,0.5)' }}
          >
            <span className="block">
              Strălucește{' '}
            </span>
            <span
              className="block text-beauty-pink-light"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7)' }}
            >
              în fiecare zi
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/90 font-medium leading-relaxed text-left"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)' }}
          >
            Alege îngrijirea care te pune în valoare.
          </p>

          {/* CTA Buttons */}
          <div className="mt-4 sm:mt-5 flex flex-col xs:flex-row gap-2.5 sm:gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl"
              style={{ backgroundColor: '#FFAB9D' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF8B7A')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFAB9D')}
            >
              Cumpără acum
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/servicii"
              className="group inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm border border-white/80 text-gray-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm hover:bg-beauty-pink hover:text-gray-900 hover:border-beauty-pink transition-all duration-300 shadow-2xl"
            >
              Serviciile noastre
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
