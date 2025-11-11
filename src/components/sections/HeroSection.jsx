import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/what-makes-you-different-makes-you-beautiful-2025-04-06-09-43-35-utc-min.jpg"
            alt="Frumusețea ta unică"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-beauty-pink/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-beauty-purple/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* Main Headline - Large and Bold */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-elegant font-bold text-gray-900 mb-6 leading-tight">
          Descoperă
          <span className="block gradient-text mt-2">frumusețea naturală</span>
        </h1>

        {/* Subtitle - Minimal */}
        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-light">
          Explorează cosmetice premium și tratamente profesionale de frumusețe
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/shop"
            className="group bg-gradient-to-r from-beauty-pink to-beauty-rose text-white px-8 py-4 rounded-full font-medium hover:from-beauty-rose hover:to-beauty-pink transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center gap-2"
          >
            Cumpără acum
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a
            href="#services"
            className="group bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2"
          >
            Serviciile noastre
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Trust Indicators - Minimal */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-beauty-pink rounded-full"></div>
            <span>5.000+ clienți fericiți</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-beauty-purple rounded-full"></div>
            <span>15+ ani experiență</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-beauty-gold rounded-full"></div>
            <span>500+ produse</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;