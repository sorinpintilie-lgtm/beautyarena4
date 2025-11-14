import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

const PromotionalBanner = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-beauty-pink-light to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-gray-900 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-beauty-pink/20 backdrop-blur-sm rounded-full border border-beauty-pink/30">
              <Tag className="w-4 h-4 text-beauty-pink-dark" />
              <span className="text-sm font-medium text-beauty-pink-dark">Ofertă specială</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-elegant font-bold leading-tight text-gray-900">
              Până la 50% reducere
              <span className="block mt-2">la produse selectate</span>
            </h2>

            <p className="text-lg text-gray-700 max-w-md">
              Descoperă oferte fantastice la produse premium de frumusețe de la brand-uri de top. Ofertă limitată în timp!
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg group active:scale-95 text-white"
              style={{ backgroundColor: '#FFAB9D' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8B7A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFAB9D'}
            >
              Cumpără reducerile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative aspect-square bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
              <img
                src="/images/a-woman-at-the-beauty-salon-2025-10-14-10-53-53-utc-min.jpg"
                alt="Salon de frumusețe"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-beauty-pink-dark/90 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-24 h-24 text-white mx-auto" />
                  <div className="text-6xl font-bold text-white">50%</div>
                  <div className="text-xl text-white">REDUCERE</div>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;