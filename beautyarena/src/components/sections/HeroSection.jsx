import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Full Background Image with Subtle Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/envato-labs-image-edit-34.png"
            alt="Frumusețea ta unică"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40"></div>
      </div>

      {/* Hero Content - Positioned at 2/3 from Left */}
      <div className="absolute top-[42%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 z-10 px-4 sm:px-8 pr-8 md:pr-12">
        <div className="max-w-md text-left animate-slide-up" style={{animationDelay: '0.3s'}}>

          {/* Main Headline - Hero Style */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-elegant font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl text-center whitespace-nowrap">
            <span className="block">
              Descoperă
            </span>
            <span className="block text-beauty-pink-light text-justify whitespace-nowrap">
              frumusețea naturală
            </span>
          </h1>

          {/* Subtitle - Hero Style */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 font-light leading-relaxed drop-shadow-lg max-w-md text-center text-justify">
            Explorează cosmetice premium și tratamente profesionale de frumusețe pentru a-ți evidenția frumusețea naturală
          </p>

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