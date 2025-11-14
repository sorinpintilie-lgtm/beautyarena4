import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Calendar, ArrowRight, Check, Sparkles, Award } from 'lucide-react';
import SEO from '../components/common/SEO';
import InfiniteCarousel from '../components/common/InfiniteCarousel';
import { HairIcon, SkincareIcon, MakeupIcon, NailIcon, WellnessIcon, SpecialIcon } from '../components/icons/CustomServiceIcons';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      icon: HairIcon,
      title: 'Coafură profesională',
      description: 'Servicii complete de coafură de la tuns și vopsit până la styling avansat cu produse premium.',
      duration: '60-120 min',
      price: 'De la 80 lei',
      rating: 4.9,
      reviews: 234,
      features: ['Consultanță personalizată', 'Produse premium', 'Styling inclus', 'Tratamente speciale'],
      color: 'from-beauty-pink-light to-beauty-pink'
    },
    {
      id: 2,
      icon: NailIcon,
      title: 'Îngrijire unghii',
      description: 'Manichiură și pedichiură profesională, extensii cu gel sau acril și nail art personalizat.',
      duration: '45-90 min',
      price: 'De la 60 lei',
      rating: 4.8,
      reviews: 189,
      features: ['Manichiură clasică', 'Extensii profesionale', 'Nail art', 'Tratamente întărire'],
      color: 'from-beauty-peach to-beauty-pink-light'
    },
    {
      id: 3,
      icon: SkincareIcon,
      title: 'Îngrijire ten',
      description: 'Tratamente faciale personalizate, curățare profundă și terapii anti-aging cu tehnologie avansată.',
      duration: '75-90 min',
      price: 'De la 120 lei',
      rating: 4.9,
      reviews: 156,
      features: ['Analiză profesională', 'Tratamente personalizate', 'Produse bio', 'Masaj facial'],
      color: 'from-beauty-pink to-beauty-pink-dark'
    },
    {
      id: 4,
      icon: MakeupIcon,
      title: 'Machiaj profesional',
      description: 'Machiaj pentru ocazii speciale, ședințe foto și evenimente cu produse de lux.',
      duration: '45-60 min',
      price: 'De la 100 lei',
      rating: 4.7,
      reviews: 98,
      features: ['Machiaj eveniment', 'Ședințe foto', 'Consultanță personalizată', 'Produse premium'],
      color: 'from-beauty-pink-dark to-beauty-pink'
    },
    {
      id: 5,
      icon: WellnessIcon,
      title: 'Relaxare și wellness',
      description: 'Sesiuni de relaxare, masaj facial și corporal pentru revitalizare completă.',
      duration: '60-90 min',
      price: 'De la 150 lei',
      rating: 4.8,
      reviews: 67,
      features: ['Masaj relaxant', 'Aromaterapie', 'Meditație ghidată', 'Terapie holistică'],
      color: 'from-beauty-peach to-beauty-pink'
    },
    {
      id: 6,
      icon: SpecialIcon,
      title: 'Tratamente speciale',
      description: 'Servicii exclusive și tratamente personalizate pentru ocazii speciale.',
      duration: '90-120 min',
      price: 'De la 200 lei',
      rating: 5.0,
      reviews: 45,
      features: ['Consultație gratuită', 'Tratamente personalizate', 'Follow-up inclus', 'Pachete exclusive'],
      color: 'from-beauty-pink-light to-beauty-peach'
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: 'Experți certificați',
      description: 'Echipa noastră este formată din profesioniști cu certificări internaționale',
      iconColor: 'text-[#FFB6A3]'
    },
    {
      icon: Sparkles,
      title: 'Produse premium',
      description: 'Folosim doar produse de cea mai înaltă calitate de la branduri de top',
      iconColor: 'text-[#FFAB9D]'
    },
    {
      icon: Check,
      title: 'Abordare personalizată',
      description: 'Fiecare tratament este adaptat nevoilor și preferințelor tale',
      iconColor: 'text-[#FFD5CC]'
    },
    {
      icon: Award,
      title: 'Rezultate garantate',
      description: 'Suntem dedicați să îți oferim rezultate excepționale de fiecare dată',
      iconColor: 'text-[#FF8B7A]'
    }
  ];

  const renderServiceCard = (service) => {
    const IconComponent = service.icon;
    return (
      <div className="group h-full">
        <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-beauty-pink hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
          {/* Decorative background gradient */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-500`}></div>
          
          {/* Icon with animation */}
          <div className="relative mb-6 flex justify-center">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
              <div className="relative bg-gradient-to-br from-beauty-pink-light/50 to-white rounded-2xl p-6 group-hover:scale-110 transition-transform duration-500">
                <IconComponent className="w-20 h-20 group-hover:animate-float" />
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-beauty-peach fill-current" />
              <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({service.reviews} recenzii)</span>
          </div>

          {/* Service Info */}
          <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-3 text-center group-hover:text-beauty-pink transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center flex-grow">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-700">
                <div className="w-5 h-5 rounded-full bg-beauty-pink/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-beauty-pink" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          {/* Price and Duration */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-beauty-pink-light/30 to-transparent rounded-xl mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-beauty-pink" />
              {service.duration}
            </div>
            <div className="text-xl font-bold text-beauty-pink">
              {service.price}
            </div>
          </div>

          {/* Action Button */}
          <Link
            to="/programare"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FFB6A3] text-white rounded-full font-semibold hover:bg-[#FFAB9D] hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-5 h-5" />
            Programează acum
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        title="Servicii Profesionale de Frumusețe - BeautyArena"
        description="Descoperă gama completă de servicii profesionale de frumusețe: coafură, machiaj, îngrijire ten, manichiură, pedichiură și tratamente de relaxare."
        keywords="servicii frumusețe, coafură, machiaj profesional, îngrijire ten, manichiură, pedichiură, salon frumusețe Cluj"
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-beauty-pink-light/10 to-white pt-16">
        {/* Enhanced Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-beauty-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-beauty-peach/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-beauty-pink/20 rounded-full mb-6 shadow-lg">
                <Sparkles className="w-5 h-5 text-beauty-pink" />
                <span className="text-sm font-semibold text-beauty-pink">Servicii premium</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 mb-6">
                Transformă-ți
                <span className="block gradient-text">frumusețea naturală</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
                Descoperă gama completă de servicii profesionale de frumusețe, realizate de experți cu produse de calitate premium și tehnici inovatoare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/programare"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB6A3] text-white rounded-full font-semibold hover:bg-[#FFAB9D] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Programează-te acum
                </Link>
                <Link
                  to="/servicii"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB6A3] text-white rounded-full font-semibold hover:bg-[#FFAB9D] hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  Vezi serviciile
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Services Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
                Explorează serviciile noastre
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fiecare serviciu este conceput pentru a-ți evidenția frumusețea naturală
              </p>
            </div>

            {/* Desktop Carousel - 3 items */}
            <div className="hidden lg:block">
              <InfiniteCarousel
                items={services}
                renderItem={renderServiceCard}
                autoPlay={true}
                interval={4000}
                itemsPerView={3}
              />
            </div>

            {/* Tablet Carousel - 2 items */}
            <div className="hidden md:block lg:hidden">
              <InfiniteCarousel
                items={services}
                renderItem={renderServiceCard}
                autoPlay={true}
                interval={4000}
                itemsPerView={2}
              />
            </div>

            {/* Mobile Carousel - 1 item */}
            <div className="block md:hidden">
              <InfiniteCarousel
                items={services}
                renderItem={renderServiceCard}
                autoPlay={true}
                interval={4000}
                itemsPerView={1}
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us - Bento Grid Style */}
        <section className="py-16 bg-gradient-to-br from-beauty-pink-light/20 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
                De ce să ne alegi?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ne dedicăm să oferim cele mai bune servicii de frumusețe cu o abordare profesională și personalizată.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-beauty-pink transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative z-10"
                  >
                    <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <IconComponent className={`w-8 h-8 ${benefit.iconColor} drop-shadow-sm`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 text-center group-hover:text-beauty-pink transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700 text-sm text-center leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-beauty-pink-light via-white to-beauty-peach/20"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-beauty-pink/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-beauty-peach/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 text-center border-2 border-beauty-pink/20 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-beauty-pink/10 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-beauty-pink" />
                <span className="text-sm font-semibold text-beauty-pink">Ofertă specială</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-elegant font-bold text-gray-900 mb-6">
                Gata să începi
                <span className="block gradient-text">transformarea ta?</span>
              </h2>
              <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                Programează o consultație gratuită și descoperă cum te putem ajuta să arăți și să te simți extraordinar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/programare"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FFB6A3] text-white rounded-full font-semibold hover:bg-[#FFAB9D] hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
                >
                  <Calendar className="w-6 h-6" />
                  Programează consultație gratuită
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FFB6A3] text-white rounded-full font-semibold hover:bg-[#FFAB9D] hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg"
                >
                  Contactează-ne
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;