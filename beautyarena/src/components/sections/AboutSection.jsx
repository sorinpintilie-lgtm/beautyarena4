import React from 'react';
import { Award, Users, Clock, MapPin, Calendar } from 'lucide-react';

const AboutSection = () => {
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Peste 15 ani',
      description: 'De experiență în domeniul frumuseții'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Echipă de experți',
      description: 'Profesioniști certificați și pasionați'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Program flexibil',
      description: 'Deschis 7 zile din 7 pentru tine'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Locație premium',
      description: 'Centrul orașului, acces facil'
    }
  ];

  const teamMembers = [
    {
      name: 'Elena Popescu',
      role: 'Fondator & Stylist principal',
      specialty: 'Coafură & Machiaj',
      experience: '15+ ani',
      image: 'professional-1'
    },
    {
      name: 'Maria Ionescu',
      role: 'Specialist Îngrijire ten',
      specialty: 'Tratamente faciale',
      experience: '10+ ani',
      image: 'professional-2'
    },
    {
      name: 'Ana Marinescu',
      role: 'Expert Unghii',
      specialty: 'Manichiură & Nail art',
      experience: '8+ ani',
      image: 'professional-3'
    }
  ];

  const getTeamIcon = (imageType) => {
    const iconClass = "w-20 h-20 text-white";
    switch (imageType) {
      case 'professional-1':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4C13.1 4 14 4.9 14 6V8H15V10H9V8H10V6C10 4.9 10.9 4 12 4ZM12 12C14.2 12 16 13.8 16 16V18H8V16C8 13.8 9.8 12 12 12ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V12H6V19Z"/>
          </svg>
        );
      case 'professional-2':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V8H10V4C10 2.9 10.9 2 12 2ZM6 10V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V10H6ZM4 12C4 10.9 4.9 10 6 10V19H4V12ZM20 10V19H18V10C19.1 10 20 10.9 20 12Z"/>
          </svg>
        );
      case 'professional-3':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4C8.7 4 6 6.7 6 10V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V10C18 6.7 15.3 4 12 4ZM12 6C13.7 6 15 7.3 15 9V10H9V9C9 7.3 10.3 6 12 6Z"/>
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
    <section id="about" className="relative section-padding bg-white">
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <Users className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Despre noi</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-black mb-6">
            Povestea noastră de
            <span className="block text-beauty-pink">succes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            De peste 15 ani, BeautyArena este sinonimul excelenței în frumusețe. Echipa noastră de experți 
            pasionați transformă visele de frumusețe în realitate, oferind servicii personalizate și rezultate excepționale.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Story Content */}
          <div className="space-y-6">
            <div className="prose prose-lg">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-4">
                Misiunea noastră
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                La BeautyArena, credem că frumusețea vine din interiorul fiecărei persoane. Misiunea noastră este 
                să scoatem la iveală această frumusețe naturală prin servicii de cea mai înaltă calitate, 
                produse premium și o abordare personalizată.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                În fiecare zi, ne străduim să oferim o experiență de wellness completă - de la tratamente 
                de rejuvenare facială până la sesiuni de relaxare și stilizare profesională.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-beauty-pink/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-beauty-pink" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Excelență</h4>
                <p className="text-sm text-gray-600">Standardele cele mai înalte</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-beauty-pink-dark/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-beauty-pink-dark" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Caring</h4>
                <p className="text-sm text-gray-600">Grija pentru fiecare client</p>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/imaginisite/attractive-young-woman-with-beautiful-hair-in-hair-2024-11-19-03-43-53-utc.jpg"
                alt="Echipa noastră de profesioniști la lucru"
                className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-beauty-pink rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-elegant font-bold">15+ ani de excelență</h3>
                    <p className="text-beauty-pink-light">Profesiști pasionați în fiecare sesiune</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4 leading-relaxed">
                  În acești ani am servit peste 5.000 de clienți și am construit o reputație solidă
                  bazată pe încredere și rezultate excepționale.
                </p>
                <button className="px-6 py-3 bg-beauty-pink hover:bg-beauty-pink-dark text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  Vezi realizările noastre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group card-beauty p-6">
              <div className="w-16 h-16 bg-beauty-pink/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-beauty-pink">
                  {achievement.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h4>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-elegant font-bold text-gray-900 mb-4">
            Echipa noastră de experți
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesiști pasionați și dedicați, mereu la curent cu ultimele tendințe și tehnici 
            din industria frumuseții.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center group hover:border-beauty-pink transition-colors">
              {/* Profile Image */}
              <div className="w-20 h-20 bg-beauty-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-beauty-pink">
                  {getTeamIcon(member.image)}
                </div>
              </div>
              
              {/* Info */}
              <h4 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h4>
              <p className="text-beauty-pink font-medium mb-1">{member.role}</p>
              <p className="text-gray-600 text-sm mb-2">{member.specialty}</p>
              <p className="text-gray-500 text-xs">{member.experience} experiență</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="rounded-2xl p-8" style={{ backgroundColor: '#FFB6A3' }}>
            <h3 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-4">
              Fă cunoștință cu specialiștii noștri!
            </h3>
            <p className="text-gray-800 mb-6 max-w-2xl mx-auto">
              Vino să ne vezi la lucru! Descoperă calitatea serviciilor noastre și întâlnește echipa
              noastră de experți pasionați care îți vor oferi o experiență de frumusețe de neuitat.
            </p>
            <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center mx-auto">
              <Calendar className="w-5 h-5 mr-2" />
              Programează o vizită
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;