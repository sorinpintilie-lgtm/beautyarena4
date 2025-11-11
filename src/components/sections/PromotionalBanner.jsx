import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';

const PromotionalBanner = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-beauty-pink via-beauty-purple to-beauty-rose">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">Ofertă specială</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-elegant font-bold leading-tight">
              Până la 50% reducere
              <span className="block mt-2">la produse selectate</span>
            </h2>

            <p className="text-lg text-pink-100 max-w-md">
              Descoperă oferte fantastice la produse premium de frumusețe de la brand-uri de top. Ofertă limitată în timp!
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-white text-beauty-pink px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg group"
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
              <div className="absolute inset-0 bg-gradient-to-br from-beauty-pink/80 via-beauty-purple/60 to-beauty-rose/80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Sparkles className="w-24 h-24 text-white mx-auto" />
                  <div className="text-6xl font-bold text-white">50%</div>
                  <div className="text-xl text-pink-100">REDUCERE</div>
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