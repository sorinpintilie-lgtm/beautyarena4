import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PromotionalBanner = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-beauty-pink-light to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Text Content */}
          <div className="text-gray-900 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant font-bold leading-tight text-gray-900">
              Magazinul online Beauty Arena
            </h2>

            <p className="text-sm sm:text-base text-gray-700 max-w-md">
              Accesează gama completă de cosmetice premium și produse de îngrijire selectate de experții noștri. Calitate de salon, livrată direct acasă.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg group active:scale-95 text-sm sm:text-base text-white"
                style={{ backgroundColor: '#FFAB9D' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FF8B7A')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFAB9D')}
              >
                Magazin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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