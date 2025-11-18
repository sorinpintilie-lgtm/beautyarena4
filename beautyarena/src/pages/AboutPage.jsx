import React from 'react';
import { Users, Award, Heart, Clock, Star, Zap } from 'lucide-react';
import SEO from '../components/common/SEO';

const AboutPage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Echipă de Profesioniști',
      description: 'O echipă stabilă de specialiști care își perfecționează constant tehnicile'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: '17 Ani de Experiență',
      description: 'Peste 17 ani de experiență în domeniul frumuseții și profesionalismului'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Grijă și Pasiune',
      description: 'Frumusețea este tratată cu profesionalism, grijă și pasiune'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Tehnologie Modernă',
      description: 'Epilare definitivă cu laser, realizată cu tehnologie performantă'
    }
  ];

  const teamMembers = [
    {
      name: 'Loredana',
      role: 'Servicii coafor',
      image: '/workers/attractive-girl-portrait-in-a-white-shirt-2024-10-19-10-54-55-utc-min.jpg'
    },
    {
      name: 'Camelia',
      role: 'Servicii coafor',
      image: '/workers/blond-female-in-a-white-t-shirt-2025-01-26-15-44-10-utc-min.jpg'
    },
    {
      name: 'Dana',
      role: 'Servicii coafor',
      image: '/workers/portrait-of-young-woman-2025-01-08-23-09-54-utc-min.jpg'
    },
    {
      name: 'Valentina',
      role: 'Servicii manichiură / pedichiură',
      image: '/workers/redhead-girl-at-green-grass-at-village-outdoor-2024-09-26-02-13-33-utc-min.jpg'
    },
    {
      name: 'Teo',
      role: 'Servicii manichiură / pedichiură',
      image: '/workers/portrait-of-a-blonde-girl-2024-12-02-22-39-43-utc-min.jpg'
    },
    {
      name: 'Camelia',
      role: 'Servicii manichiură / pedichiură',
      image: '/workers/portrait-of-a-young-teenager-girl-in-the-park-spr-2025-03-10-12-31-17-utc-min.jpg'
    },
    {
      name: 'Geo',
      role: 'Servicii cosmetică / epilare definitivă',
      image: '/workers/caucasian-woman-2025-03-24-09-04-54-utc-min.jpg'
    },
    {
      name: 'Mihaela',
      role: 'Servicii cosmetică / epilare definitivă',
      image: '/workers/happy-woman-emotional-face-woman-portrait-beautif-2025-02-10-13-14-15-utc-min.jpg'
    }
  ];

  const achievements = [
    { number: '17', label: 'Ani de Experiență' },
    { number: '5000+', label: 'Clienți Mulțumiți' },
    { number: '50+', label: 'Servicii Disponibile' },
    { number: '100%', label: 'Satisfacție Garantată' }
  ];

  return (
    <>
      <SEO
        title="Despre Noi - Salon Beauty Arena"
        description="Descoperă povestea Salon Beauty Arena: 17 ani de experiență, profesionalism și pasiune pentru frumusețe în București. Echipa noastră de specialiști îți oferă servicii complete de coafură, manichiură și epilare laser."
        keywords="despre Salon Beauty Arena, istoric salon, echipa Salon Beauty Arena, 17 ani experienta, salon frumusete Bucuresti"
      />

      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section – full-bleed with image */}
        <section className="relative overflow-hidden min-h-[70vh] flex items-end">
          <div className="absolute inset-0">
            <img
              src="/images/hairdresser-doing-haircut-for-women-in-hairdressin-2025-10-16-23-09-35-utc-min.jpg"
              alt="Echipa Salon Beauty Arena în salon"
              className="w-full h-full object-cover"
              style={{ objectPosition: '30% center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 flex justify-center lg:justify-start">
            <div className="max-w-xl bg-black/35 sm:bg-black/25 backdrop-blur-sm rounded-2xl px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-elegant font-bold text-white leading-tight text-left"
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 1px 1px 3px rgba(0,0,0,0.5)' }}
              >
                Despre Salon Beauty Arena
              </h1>
              <p
                className="mt-3 text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed text-left"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)' }}
              >
                Peste 17 ani de experiență, o echipă stabilă de specialiști și o singură promisiune:
                frumusețe cu grijă și profesionalism, de fiecare dată.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Story Section with image */}
            <div className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-center">
              <div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                  <strong className="text-beauty-pink-dark">Salon Beauty Arena a luat naștere acum 17 ani</strong>{' '}
                  din dorința de a crea un spațiu în care frumusețea să fie tratată cu profesionalism, grijă și
                  pasiune. De atunci, salonul nostru din București a crescut alături de clienți, devenind un loc
                  în care oamenii vin nu doar pentru servicii, ci pentru experiență, încredere și rezultate pe
                  măsura așteptărilor.
                </p>

                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  Specializați în <strong className="text-beauty-pink-dark">coafură, manichiură și cosmetică</strong>,
                  am construit în timp o echipă stabilă de profesioniști care își perfecționează constant
                  tehnicile și înțeleg importanța fiecărui detaliu. Credem în calitate, în evoluție și în relații
                  autentice cu cei care ne trec pragul.
                </p>
              </div>

              <div className="relative h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/a-woman-at-the-beauty-salon-2025-10-14-10-53-53-utc-min.jpg"
                  alt="Clientă în Salonul Beauty Arena"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-beauty-pink transition-all duration-300 hover:shadow-lg">
                  <div className="w-16 h-16 bg-beauty-pink/10 rounded-full flex items-center justify-center mb-6 text-beauty-pink">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Innovation Section */}
            <div className="bg-gradient-to-r from-beauty-pink/5 to-beauty-pink-light/10 rounded-3xl p-6 md:p-10 mb-10">
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 text-beauty-pink mr-3" />
                <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black">
                  Inovație și Dezvoltare
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Pentru a duce experiența Salon Beauty Arena la un nivel superior, am introdus <strong>serviciile de epilare definitivă cu laser</strong>, realizate cu tehnologie performantă și standarde ridicate de siguranță. În plus, am lansat propriul <strong>magazin online cu produse premium</strong> de îngrijire, selectate cu atenție pentru a oferi rezultate profesionale și acasă.
              </p>
              <div className="flex items-center text-beauty-pink-dark">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">Tehnologie de ultimă generație și siguranță maximă</span>
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-14">
              <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-6 text-center">
                Echipa Salon Beauty Arena
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto text-center mb-8">
                În spatele fiecărei transformări reușite se află oameni dedicați. Echipa noastră reunește
                specialiști cu experiență în coafor, manichiură / pedichiură și cosmetică / epilare definitivă.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {teamMembers.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 bg-gradient-to-br from-beauty-pink to-beauty-pink-dark flex items-center justify-center">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={`${member.name} - ${member.role} la Salon Beauty Arena`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xl sm:text-2xl font-bold">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {member.name}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-snug">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* New Website Section */}
            <div className="mb-14">
              <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-6 text-center">
                Noul Site Web
              </h2>
              <div className="bg-white border-2 border-beauty-pink/20 rounded-2xl p-8 text-center">
                <Star className="w-12 h-12 text-beauty-pink mx-auto mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed">
                  Noul site reflectă direcția noastră de dezvoltare: <strong>simplu, modern și intuitiv</strong>, construit pentru a-ți oferi acces rapid la informații și la toate serviciile noastre. Programările se pot face acum online, rapid și convenabil, oricând ai nevoie.
                </p>
              </div>
            </div>

            {/* Values + Mission – compact */}
            <div className="mt-4 mb-4">
              <div className="text-center mb-4">
                <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-2">
                  Valorile noastre
                </h2>
                <p className="text-xs md:text-sm text-gray-600 max-w-xl mx-auto">
                  Ce ne ghidează în fiecare zi în salon.
                </p>
              </div>

              {/* 2 cards on primul rând, 1 card pe al doilea rând care span‑uiește 2 coloane */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {/* Tradiție */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center shadow-sm">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-beauty-pink mb-2" />
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                    Tradiție
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    17 ani de experiență și încredere
                  </p>
                </div>

                {/* Profesionalism */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center shadow-sm">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-beauty-pink mb-2" />
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                    Profesionalism
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Echipă de specialiști dedicați
                  </p>
                </div>

                {/* Inovație – spans full width on second row on mobile */}
                <div className="bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center shadow-sm col-span-2 md:col-span-1">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-beauty-pink mb-2" />
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                    Inovație
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Tehnologie modernă și servicii noi
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-beauty-pink to-beauty-pink-dark rounded-3xl p-4 sm:p-5">
                <h2
                  className="text-lg md:text-xl font-elegant font-bold mb-2"
                  style={{ color: '#000' }}
                >
                  Misiunea noastră
                </h2>
                <p
                  className="text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#000' }}
                >
                  <strong>Salon Beauty Arena înseamnă tradiție, profesionalism și inovație.</strong> Suntem aici
                  pentru a-ți oferi frumusețe fără compromisuri — ieri, azi și în anii care vin.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="pt-4 pb-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-2">
                Realizările noastre
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Cifrele care vorbesc despre experiența noastră
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white border-2 border-beauty-pink/20 rounded-2xl p-4 hover:border-beauty-pink transition-colors">
                    <div className="text-2xl md:text-3xl font-bold text-beauty-pink-dark mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                      {achievement.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;