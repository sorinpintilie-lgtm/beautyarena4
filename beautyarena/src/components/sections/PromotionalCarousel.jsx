import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Sparkles, Percent, Clock } from 'lucide-react';
import InfiniteCarousel from '../common/InfiniteCarousel';

const PromotionalCarousel = () => {
  // Promotional slides data
  const promotionalSlides = [
    {
      id: 1,
      image: '/imaginisite/1.JPG',
      title: 'REDUCERI DE IARNĂ',
      subtitle: 'Până la 50% reduction',
      description: 'Produse premium pentru îngrijirea frumuseții',
      buttonText: 'Descoperă Oferte',
      buttonLink: '/shop',
      badge: '50% OFF',
      badgeColor: 'bg-red-500'
    },
    {
      id: 2,
      image: '/imaginisite/2.jpg',
      title: 'TRATAMENTE PREMIUM',
      subtitle: 'Servicii profesionale',
      description: 'Servicii de înaltă calitate pentru frumusețea ta',
      buttonText: 'Rezervă Acum',
      buttonLink: '/servicii',
      badge: 'NOU',
      badgeColor: 'bg-beauty-pink'
    },
    {
      id: 3,
      image: '/imaginisite/3.jpg',
      title: 'COSMETICE PROFESIONALE',
      subtitle: 'Calitate garantată',
      description: 'Gama completă de produse profesionale',
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
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 md:px-12">
        <div className="max-w-lg space-y-8">
          {/* Title */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-elegant font-bold text-white leading-tight drop-shadow-2xl">
            {slide.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-lg">
            {slide.subtitle}
          </p>
          
          {/* CTA Button */}
          <Link
            to={slide.buttonLink}
            className="inline-flex items-center gap-3 px-10 py-5 bg-beauty-pink hover:bg-beauty-pink-dark text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl group/btn text-lg"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 171, 157, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 171, 157, 0.3)';
            }}
          >
            {slide.buttonText}
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
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
            <span className="text-sm font-medium text-beauty-pink-dark">Oferte Speciale</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-4">
            Descoperă
            <span className="block text-beauty-pink">Oferte Incredible</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profitați de ofertele noastre exclusive și descoperiți produse și servicii de cea mai înaltă calitate
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Reduceri Până la 50%</h3>
            <p className="text-sm text-gray-600">Produse selectate cu prețuri speciale</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Calitate Premium</h3>
            <p className="text-sm text-gray-600">Produse și servicii de înaltă calitate</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-beauty-pink/20">
            <div className="bg-beauty-pink/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-beauty-pink-dark" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Livrare Rapidă</h3>
            <p className="text-sm text-gray-600">Livrare gratuită pentru comenzi peste 200 RON</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalCarousel;