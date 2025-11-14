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
              <span className="text-sm font-medium text-beauty-pink-dark">Magazin online</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-elegant font-bold leading-tight text-gray-900">
              Magazinul nostru online
              <span className="block mt-2">cu produse premium</span>
            </h2>

            <p className="text-lg text-gray-700 max-w-md">
              Descoperiți gama completă de produse premium de frumusețe în magazinul nostru online! Oferim cosmetice și îngrijire.
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
                src="/imaginisite/beauty-hairstyle-and-people-concept-happy-young-2025-10-11-23-49-26-utc.jpg"
                alt="Magazin online de produse premium"
                className="w-full h-full object-cover"
              />
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