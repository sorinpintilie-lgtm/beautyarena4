import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Andreea Munteanu',
      location: 'Cluj-Napoca',
      service: 'Tratament facial anti-aging',
      rating: 5,
      review: 'Experiența la BeautyArena a fost absolut minunată! Echipa de profesioniști m-a ajutat să îmi redobândesc încrederea în sine. Rezultatele sunt vizibile și de lungă durată. Recomand cu încredere!',
      avatar: 'client-1'
    },
    {
      id: 2,
      name: 'Maria Pop',
      location: 'Cluj-Napoca',
      service: 'Coafură & Machiaj pentru nuntă',
      rating: 5,
      review: 'Pentru ziua cea mai importantă din viața mea, am ales BeautyArena și nu am regretat deloc! Am fost transformată complet și m-am simțit ca o adevărată prințesă. Mulțumesc Elena pentru profesionalismul tău!',
      avatar: 'client-2'
    },
    {
      id: 3,
      name: 'Elena Dragomir',
      location: 'Floresti',
      service: 'Tratamente pentru păr',
      rating: 5,
      review: 'Îmi place mult să vin la BeautyArena pentru îngrijirea părului. Maria are o mână magică și mereu ies de aici cu o coafură perfectă. Serviciile sunt de cea mai înaltă calitate.',
      avatar: 'client-3'
    },
    {
      id: 4,
      name: 'Simona Ionescu',
      location: 'Cluj-Napoca',
      service: 'Îngrijire unghii',
      rating: 5,
      review: 'Ana este o expertă veritabilă! Nail art-ul meu este mereu impecabil și rezistă mult timp. Este o adevărată artă ceea ce face ea. Foarte mulțumită de rezultate!',
      avatar: 'client-4'
    },
    {
      id: 5,
      name: 'Irina Georgescu',
      location: 'Baciu',
      service: 'Pachet complet frumusețe',
      rating: 5,
      review: 'BeautyArena oferă cele mai complete servicii de frumusețe din oraș. Am beneficiat de tratamente multiple și fiecare a fost la un nivel de excelență. Îmi place foarte mult atmosfera relaxantă!',
      avatar: 'client-5'
    }
  ];

  const stats = [
    { number: '4.9', label: 'Rating mediu', suffix: '/5' },
    { number: '500', label: 'Recenzii', suffix: '+' },
    { number: '95', label: 'Clienți mulțumiți', suffix: '%' },
    { number: '2000', label: 'Tratamente', suffix: '+' }
  ];

  const getClientIcon = (imageType) => {
    const iconClass = "w-8 h-8 text-gray-900";
    switch (imageType) {
      case 'client-1':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V8H10V4C10 2.9 10.9 2 12 2ZM6 10V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V10H6ZM4 12C4 10.9 4.9 10 6 10V19H4V12ZM20 10V19H18V10C19.1 10 20 10.9 20 12Z"/>
          </svg>
        );
      case 'client-2':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4C9.8 4 8 5.8 8 8V10H16V8C16 5.8 14.2 4 12 4ZM4 12C4 9.8 5.8 8 8 8V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V8C18.2 8 20 9.8 20 12S18.2 16 16 16H8C5.8 16 4 14.2 4 12Z"/>
          </svg>
        );
      case 'client-3':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C10.9 2 10 2.9 10 4V6H14V4C14 2.9 13.1 2 12 2ZM6 8V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V8H6ZM4 10C4 8.9 4.9 8 6 8V19H4V10ZM20 8V19H18V8C19.1 8 20 8.9 20 10Z"/>
          </svg>
        );
      case 'client-4':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4C8.7 4 6 6.7 6 10V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V10C18 6.7 15.3 4 12 4ZM12 6C13.7 6 15 7.3 15 9V10H9V9C9 7.3 10.3 6 12 6Z"/>
          </svg>
        );
      case 'client-5':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V8H15V10H9V8H10V4C10 2.9 10.9 2 12 2ZM6 12V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V12H6ZM4 14C4 12.9 4.9 12 6 12V20H4V14ZM20 12V20H18V12C19.1 12 20 12.9 20 14Z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V8H10V4C10 2.9 10.9 2 12 2Z"/>
          </svg>
        );
    }
  };

  return (
    <section id="testimonials" className="relative section-padding bg-white">
      {/* Background Images */}
      <div className="absolute top-1/4 left-0 w-1/3 h-2/3">
        <img
          src="/images/hairdresser-doing-haircut-for-women-in-hairdressin-2025-10-16-23-09-35-utc-min.jpg"
          alt="Frizerie profesională"
          className="w-full h-full object-cover rounded-r-3xl opacity-15"
        />
      </div>
      
      {/* Additional Background Image */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2">
        <img
          src="/imaginisite/cute-woman-looking-happy-after-getting-professiona-2024-10-18-08-14-22-utc.jpg"
          alt="Clientă mulțumită după tratament"
          className="w-full h-full object-cover rounded-l-3xl opacity-10"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <Star className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Ce spun clienții</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Experiențe de
            <span className="block gradient-text">Excelență</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experiența fiecărui client este importantă pentru noi. Citește ce spun clienții
            noștri despre serviciile și transformările lor la BeautyArena.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                {stat.number}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid - Staggered Layout */}
        <div className="mb-16">
          {/* First Row - 3 Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.id}
                className="card-beauty group relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <Quote className="w-8 h-8 text-beauty-pink" />
                </div>

                {/* Client Avatar */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-beauty-pink/20 rounded-full flex items-center justify-center mr-3">
                    {getClientIcon(testimonial.avatar)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-beauty-peach fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.service}</span>
                </div>

                {/* Review */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>

          {/* Second Row - 2 Reviews Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.slice(3, 5).map((testimonial) => (
              <div
                key={testimonial.id}
                className="card-beauty group relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <Quote className="w-8 h-8 text-beauty-pink" />
                </div>

                {/* Client Avatar */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-beauty-pink/20 rounded-full flex items-center justify-center mr-3">
                    {getClientIcon(testimonial.avatar)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-beauty-peach fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.service}</span>
                </div>

                {/* Review */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;