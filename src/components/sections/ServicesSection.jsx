import React from 'react';
import { Clock, Star, ArrowRight, Calendar, Scissors, Sparkles, Palette, Heart, Zap } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: Scissors,
      iconColor: 'text-beauty-pink',
      iconBg: 'bg-beauty-pink/10',
      title: 'Coafură profesională',
      description: 'Servicii complete de coafură de la tuns și vopsit la styling avansat cu produse premium.',
      duration: '60-120 min',
      price: 'De la 80 lei',
      rating: 4.9,
      reviews: 234,
      features: ['Consultanță personalizată', 'Produse premium', 'Styling inclus']
    },
    {
      id: 2,
      icon: Sparkles,
      iconColor: 'text-beauty-purple',
      iconBg: 'bg-beauty-purple/10',
      title: 'Îngrijire unghii',
      description: 'Manichiură și pedichiură profesională, extensii cu gel sau acril și nail art personalizat.',
      duration: '45-90 min',
      price: 'De la 60 lei',
      rating: 4.8,
      reviews: 189,
      features: ['Manichiură clasică', 'Extensii profesionale', 'Nail art']
    },
    {
      id: 3,
      icon: Star,
      iconColor: 'text-beauty-gold',
      iconBg: 'bg-beauty-gold/10',
      title: 'Îngrijire ten',
      description: 'Tratamente faciale personalizate, curățare profundă și terapii anti-aging cu tehnologie avansată.',
      duration: '75-90 min',
      price: 'De la 120 lei',
      rating: 4.9,
      reviews: 156,
      features: ['Analiză profesională', 'Tratamente personalizate', 'Produse bio']
    },
    {
      id: 4,
      icon: Palette,
      iconColor: 'text-beauty-rose',
      iconBg: 'bg-beauty-rose/10',
      title: 'Machiaj profesional',
      description: 'Machiaj pentru ocazii speciale, ședințe foto și evenimente cu produse de lux.',
      duration: '45-60 min',
      price: 'De la 100 lei',
      rating: 4.7,
      reviews: 98,
      features: ['Machiaj eveniment', 'Ședințe foto', 'Consultanță personalizată']
    },
    {
      id: 5,
      icon: Heart,
      iconColor: 'text-beauty-pink',
      iconBg: 'bg-beauty-pink/10',
      title: 'Relaxare și wellness',
      description: 'Sesiuni de relaxare, masaj facial și corporal pentru revitalizare completă.',
      duration: '60-90 min',
      price: 'De la 150 lei',
      rating: 4.8,
      reviews: 67,
      features: ['Masaj relaxant', 'Aromaterapie', 'Meditație ghidată']
    },
    {
      id: 6,
      icon: Zap,
      iconColor: 'text-beauty-purple',
      iconBg: 'bg-beauty-purple/10',
      title: 'Tratamente speciale',
      description: 'Servicii exclusive și tratamente personalizate pentru ocazii speciale.',
      duration: '90-120 min',
      price: 'De la 200 lei',
      rating: 5.0,
      reviews: 45,
      features: ['Consultație gratuită', 'Tratamente personalizate', 'Follow-up inclus']
    }
  ];

  return (
    <section id="services" className="relative section-padding">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/make-up-artists-shading-eyes-2025-03-16-07-53-24-utc-min.jpg"
          alt="Machiaj profesional"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <Star className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Serviciile noastre premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Experimentează
            <span className="block gradient-text">excelența în frumusețe</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă gama completă de servicii profesionale de frumusețe, realizate de experți
            cu produse de calitate premium și tehnici inovatoare.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id} 
                className="card-beauty group cursor-pointer animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Service Icon and Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-beauty-gold fill-current" />
                    <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                    <span className="text-xs text-gray-500">({service.reviews})</span>
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-beauty-pink transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-beauty-pink rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and Duration */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration}
                    </div>
                    <div className="text-lg font-semibold text-beauty-pink">
                      {service.price}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full mt-4 btn-secondary flex items-center justify-center group-hover:bg-beauty-pink group-hover:text-white transition-all duration-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    Programează
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="relative bg-gradient-to-r from-beauty-pink to-beauty-purple rounded-2xl p-8 text-white overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/images/makeup-artist-makes-makeup-to-a-girl-apply-beige-2025-03-13-10-07-09-utc-min.jpg"
                alt="Machiaj profesional"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-4">
                Nu găsești ce cauți?
              </h3>
              <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                Oferim consultanță personalizată pentru a crea experiența perfectă de frumusețe adaptată nevoilor tale specifice.
              </p>
              <button className="bg-white text-beauty-pink px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center mx-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Programează consultația gratuită
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;