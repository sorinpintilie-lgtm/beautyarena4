import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mt-16 lg:mt-16">
      {/* Full Background Image with Subtle Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/imaginisite/envato-labs-image-edit-37.png"
            alt="Frumusețea ta unică"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Enhanced gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>
        {/* Additional dark overlay for extra contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Hero Content - Positioned at 2/3 from Left */}
      <div className="absolute top-[42%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 px-4 sm:px-8 pr-4 md:pr-8 lg:pr-12">
        <div className="w-full max-w-3xl text-left animate-slide-up" style={{animationDelay: '0.3s'}}>

          {/* Main Headline - Enhanced for Better Visibility */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-white leading-tight" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.6)'}}>
            <span className="block sm:inline">
              Descoperă{' '}
            </span>
            <span className="block sm:inline text-beauty-pink-light" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7)'}}>
              frumusețea naturală
            </span>
          </h1>

          {/* Subtitle - Enhanced for Better Visibility - Hidden on mobile */}
          <p className="hidden sm:block text-base sm:text-lg text-white mt-4 sm:mt-6 font-medium leading-relaxed text-center text-justify" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)'}}>
            Explorează cosmetice premium și tratamente profesionale de frumusețe pentru a-ți evidenția frumusețea naturală
          </p>

          {/* Spacer for mobile to maintain button position */}
          <div className="h-8 sm:h-12"></div>

          {/* CTA Buttons - Hero Style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
            <Link
              to="/shop"
              className="group text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm whitespace-nowrap"
              style={{ backgroundColor: '#FFAB9D' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8B7A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB9D'}
            >
              Cumpără acum
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/servicii"
              className="group bg-white/95 backdrop-blur-sm border-2 border-white text-gray-900 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-beauty-pink hover:text-gray-900 hover:border-beauty-pink transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm whitespace-nowrap active:scale-95"
            >
              Serviciile noastre
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
