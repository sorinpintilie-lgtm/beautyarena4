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

  const achievements = [
    { number: '17', label: 'Ani de Experiență' },
    { number: '5000+', label: 'Clienți Mulțumiți' },
    { number: '50+', label: 'Servicii Disponibile' },
    { number: '100%', label: 'Satisfacție Garantată' }
  ];

  return (
    <>
      <SEO
        title="Despre Noi - Beauty Arena"
        description="Descoperă povestea Beauty Arena: 17 ani de experiență, profesionalism și pasiune pentru frumusețe în București. Echipa noastră de specialiști îți oferă servicii complete de coafură, manichiură și epilare laser."
        keywords="despre Beauty Arena, istoric salon, echipa Beauty Arena, 17 ani experienta, salon frumusete Bucuresti"
      />

      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-beauty-pink/10 to-beauty-pink-light/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-black mb-6">
                Despre Noi
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-beauty-pink to-beauty-pink-dark mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Povestea Beauty Arena - unde frumusețea întâlnește profesionalismul
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Story Section */}
            <div className="mb-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                  <strong className="text-beauty-pink-dark">Beauty Arena a luat naștere acum 17 ani</strong> din dorința de a crea un spațiu în care frumusețea să fie tratată cu profesionalism, grijă și pasiune. De atunci, salonul nostru din București a crescut alături de clienți, devenind un loc în care oamenii vin nu doar pentru servicii, ci pentru experiență, încredere și rezultate pe măsura așteptărilor.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Specializați în <strong className="text-beauty-pink-dark">coafură și manichiură</strong>, am construit în timp o echipă stabilă de profesioniști care își perfecționează constant tehnicile și înțeleg importanța fiecărui detaliu. Credem în calitate, în evoluție și în relații autentice cu cei care ne trec pragul.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
            <div className="bg-gradient-to-r from-beauty-pink/5 to-beauty-pink-light/10 rounded-3xl p-8 md:p-12 mb-16">
              <div className="flex items-center mb-6">
                <Zap className="w-8 h-8 text-beauty-pink mr-3" />
                <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black">
                  Inovație și Dezvoltare
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Pentru a duce experiența Beauty Arena la un nivel superior, am introdus <strong>serviciile de epilare definitivă cu laser</strong>, realizate cu tehnologie performantă și standarde ridicate de siguranță. În plus, am lansat propriul <strong>magazin online cu produse premium</strong> de îngrijire, selectate cu atenție pentru a oferi rezultate profesionale și acasă.
              </p>
              <div className="flex items-center text-beauty-pink-dark">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">Tehnologie de ultimă generație și siguranță maximă</span>
              </div>
            </div>

            {/* New Website Section */}
            <div className="mb-16">
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

            {/* Values Section */}
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-elegant font-bold text-black mb-8">
                Valorile Noastre
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Tradiție', desc: 'Peste 17 ani de experiență și încredere' },
                  { title: 'Profesionalism', desc: 'Echipă de specialiști dedicați' },
                  { title: 'Inovație', desc: 'Tehnologie modernă și servicii noi' }
                ].map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-beauty-pink to-beauty-pink-dark rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">{value.title[0]}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="text-center bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white rounded-3xl p-8 md:p-12">
              <Heart className="w-12 h-12 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-elegant font-bold mb-6">
                Misiunea Noastră
              </h2>
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                <strong>Beauty Arena înseamnă tradiție, profesionalism și inovație.</strong> 
                Suntem aici pentru a-ți oferi frumusețe fără compromisuri — ieri, azi și în anii care vin.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-black mb-4">
                Realizările Noastre
              </h2>
              <p className="text-lg text-gray-600">
                Cifrele care vorbesc despre experiența noastră
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white border-2 border-beauty-pink/20 rounded-2xl p-6 hover:border-beauty-pink transition-colors">
                    <div className="text-3xl md:text-4xl font-bold text-beauty-pink-dark mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-700 font-medium text-sm md:text-base">
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