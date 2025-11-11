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
    <section id="about" className="section-padding bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-rose/10 rounded-full border border-beauty-rose/20 mb-6">
            <Users className="w-4 h-4 text-beauty-rose mr-2" />
            <span className="text-sm font-medium text-beauty-rose">Despre noi</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Povestea noastră de
            <span className="block gradient-text">Succese</span>
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
                <div className="w-12 h-12 bg-beauty-purple/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-beauty-purple" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Caring</h4>
                <p className="text-sm text-gray-600">Grija pentru fiecare client</p>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-beauty-pink via-beauty-purple to-beauty-rose rounded-2xl p-8 text-white h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-elegant font-bold mb-4">15+ ani de excelență</h3>
                <p className="text-pink-100 mb-6">
                  În acești ani am servit peste 5.000 de clienți și am construit o reputație solidă 
                  bazată pe încredere și rezultate excepționale.
                </p>
                <button className="btn-secondary bg-white text-beauty-pink hover:bg-gray-50">
                  Vezi realizările noastre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
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
            <div key={index} className="card-beauty text-center group">
              {/* Profile Image */}
              <div className="w-20 h-20 bg-gradient-to-br from-beauty-pink to-beauty-purple rounded-full flex items-center justify-center mx-auto mb-4">
                {getTeamIcon(member.image)}
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
          <div className="bg-gradient-to-r from-beauty-navy to-beauty-purple rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-4">
              Vrei să ne cunoști personal?
            </h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              Te invităm la o consultație gratuită în salonul nostru. Aici vei întâlni echipa noastră 
              și vei vedea de ce BeautyArena este alegerea celor mai exigenți clienți.
            </p>
            <button className="bg-white text-beauty-navy px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center mx-auto">
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