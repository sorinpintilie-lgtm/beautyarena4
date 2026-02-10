import { useEffect } from 'react';
import { Tag } from 'lucide-react';

const DiscountBanner = () => {

  useEffect(() => {}, []);

  return (
    <>
      {/* Full banner */}
      <div className="relative z-[60] w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-3">
              {/* Icon and text */}
              <div className="bg-white/20 rounded-full p-2 hidden sm:block">
                <Tag size={20} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-sm sm:text-base">
                  AI 10% REDUCERE CU CODUL: <span className="bg-white text-rose-700 px-2 py-0.5 rounded font-mono font-bold">ARENA10</span>
                </p>
                <p className="text-xs sm:text-sm text-white/90 hidden sm:block">
                  Valabil pentru toate produsele din magazin! Expediere gratuită pentru comenzi peste 200 lei.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative gradient line */}
          <div className="h-px bg-white/30"></div>
        </div>

      {/* Add padding to body when banner is visible to prevent content overlap */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default DiscountBanner;
