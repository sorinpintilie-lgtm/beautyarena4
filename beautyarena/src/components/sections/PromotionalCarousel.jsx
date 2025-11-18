import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Sparkles, Percent, Clock } from 'lucide-react';
import InfiniteCarousel from '../common/InfiniteCarousel';

const PromotionalCarousel = () => {
  // Promotional slides data
  const promotionalSlides = [
    {
      id: 1,
      image: '/imaginisite/beauty-hairstyle-and-people-concept-happy-young-2025-10-09-19-09-23-utc.jpg',
      title: 'Frumusețe la nivel profesional',
      subtitle: 'Coafor, cosmetică, manichiură — 17 ani de experiență pentru rezultate impecabile.',
      description: 'Coafor, cosmetică, manichiură — 17 ani de experiență pentru rezultate impecabile.',
      buttonText: 'Descoperă Oferte',
      buttonLink: '/shop',
      badge: '50% OFF',
      badgeColor: 'bg-red-500'
    },
    {
      id: 2,
      image: '/imaginisite/2.jpg',
      title: 'NOU: Epilare definitivă cu laser',
      subtitle: 'Tehnologie avansată pentru o piele fină, fără efort. Programări disponibile acum.',
      description: 'Tehnologie avansată pentru o piele fină, fără efort. Programări disponibile acum.',
      buttonText: 'Rezervă Tratament',
      buttonLink: '/servicii',
      badge: 'POPULAR',
      badgeColor: 'bg-beauty-pink'
    },
    {
      id: 3,
      image: '/imaginisite/3.jpg',
      title: 'Produse premium, livrate la tine',
      subtitle: 'Descoperă în shop gama noastră de îngrijire profesională — selectată de experți.',
      description: 'Descoperă în shop gama noastră de îngrijire profesională — selectată de experți.',
      buttonText: 'Explorează',
      buttonLink: '/shop',
      badge: 'PRO',
      badgeColor: 'bg-purple-600'
    }
  ];

  const renderPromoSlide = (slide) => (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end justify-center px-4 sm:px-8 pb-6 sm:pb-10">
        <div className="w-full max-w-md space-y-2 sm:space-y-3 text-left sm:text-center">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-elegant font-bold text-white leading-tight drop-shadow-2xl">
            {slide.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium drop-shadow-lg">
            {slide.subtitle}
          </p>
          
          {/* CTA Button */}
          <Link
            to={slide.buttonLink}
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 bg-beauty-pink hover:bg-beauty-pink-dark text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl group/btn text-xs sm:text-sm"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 16px 32px rgba(255, 171, 157, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 171, 157, 0.3)';
            }}
          >
            {slide.buttonText}
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-6 right-6 opacity-20">
        <Sparkles className="w-12 h-12 text-white animate-pulse" />
      </div>
      
      {/* Left Side Gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-beauty-pink/30 to-transparent"></div>
    </div>
  );

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-beauty-pink/20 backdrop-blur-sm rounded-full border border-beauty-pink/30 mb-4">
            <Tag className="w-4 h-4 text-beauty-pink-dark" />
            <span className="text-sm font-medium text-beauty-pink-dark">Serviciu nou</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-4">
            Serviciu nou:
            <span className="block text-beauty-pink">Epilare definitivă cu laser</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Piele fină, fără compromis
          </p>
        </div>

        {/* Promotional Carousel */}
        <div className="relative">
          <InfiniteCarousel
            items={promotionalSlides}
            renderItem={renderPromoSlide}
            autoPlay={true}
            interval={5000}
            itemsPerView={1}
            showDots={false}
          />
        </div>

        {/* Additional Info Bar */}
        {/* Mobile layout: 2 cards on first row, third spanning full width under them */}
        <div className="mt-12 md:hidden">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-beauty-pink/20">
              <div className="bg-beauty-pink/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Percent className="w-5 h-5 text-beauty-pink-dark" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Servicii Profesionale</h3>
              <p className="text-xs text-gray-600">Îngrijire realizată de specialiști cu peste 17 ani de experiență</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-beauty-pink/20">
              <div className="bg-beauty-pink/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5 text-beauty-pink-dark" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Programare Online</h3>
              <p className="text-xs text-gray-600">Rezervă rapid, la orice oră — direct de pe website</p>
            </div>

            {/* Second row: spans both columns so it aligns with the two above */}
            <div className="col-span-2 bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-beauty-pink/20">
              <div className="bg-beauty-pink/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-beauty-pink-dark" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Produse Verificate de Experți</h3>
              <p className="text-xs text-gray-600">O selecție atentă de cosmetice profesionale pentru rezultate reale</p>
            </div>
          </div>
        </div>

        {/* Desktop / tablet layout: original 3 in a row */}
        <div className="mt-12 hidden md:grid md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Servicii Profesionale</h3>
            <p className="text-sm text-gray-600">Îngrijire realizată de specialiști cu peste 17 ani de experiență</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Programare Online</h3>
            <p className="text-sm text-gray-600">Rezervă rapid, la orice oră — direct de pe website</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Produse Verificate de Experți</h3>
            <p className="text-sm text-gray-600">O selecție atentă de cosmetice profesionale pentru rezultate reale</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;