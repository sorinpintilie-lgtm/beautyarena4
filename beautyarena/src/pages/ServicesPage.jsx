import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, ArrowRight, Check, Sparkles, Award } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useRealProducts } from '../hooks/useRealProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ServicesPage = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const { products, loading: productsLoading, error: productsError } = useRealProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const serviceCategories = [
    {
      id: 1,
      title: 'COAFURĂ',
      image: '/imaginisite/hairdresser-brushing-hair-of-attractive-woman-in-b-2024-11-19-16-03-04-utc.jpg',
      services: [
        { name: 'Spălat păr', details: 'Kerastase - 48 lei, L\'oreal - 31-36 lei, Wella - 28-37 lei' },
        { name: 'Uscat păr', details: '25-31 lei' },
        { name: 'Masaj capilar', details: '32-41 lei' },
        { name: 'Tuns', details: 'Femei - 37-46 lei, Bărbați - 33-44 lei, Breton - 18-24 lei, Barbă - 21-27 lei' },
        { name: 'Coafat', details: 'Lung - 56-73 lei, Mediu - 50-65 lei, Scurt - 44-58 lei' },
        { name: 'Coafat Special (60-75 min)', details: '133-195 lei' },
        { name: 'Coafat Afro', details: 'F. Lung - 209-306 lei, Lung - 160-238 lei, Mediu - 103-166 lei, Scurt - 94-116 lei, Creponat/Conic - 57-73 lei' },
        { name: 'Impletitură', details: '29-38 lei' },
        { name: 'Impletitură Specială', details: '56-71 lei' },
        { name: 'Coafat Extensii', details: '81-98 lei' },
        { name: 'Scos extensii Tape-on', details: '272 lei' },
        { name: 'Manoperă aplicat extensii Tape-on', details: '406-501 lei' },
        { name: 'Manoperă meșe Clip-on', details: '33-42 lei' },
        { name: 'Manoperă Balayage', details: 'Lung - 94-116 lei, Mediu - 76-111 lei, Scurt - 61-78 lei' },
        { name: 'Manoperă vopsit păr', details: 'Lung - 51-69 lei, Mediu - 48-59 lei, Scurt - 45-56 lei' },
        { name: 'Manoperă vopsit păr bărbat', details: 'Mediu - 43-54 lei, Scurt - 39-48 lei' },
        { name: 'Pudră (decolorare)', details: 'Wella - 22 lei/cupa, L\'oreal - 30 lei/cupa, Wella Plex Pudră - 30 lei/cupa' },
        { name: 'Pudră cremă Wella 200g (decolorare)', details: '124 lei/tub' },
        { name: 'Tub vopsea', details: 'Wella Color Touch - 69 lei, Wella Create Color - 73 lei, Wella Ilumina - 81 lei, Wella Koleston - 73 lei, Wella Shinefinity - 65 lei, L\'oreal Dialight - 65 lei, L\'oreal Inoa - 69 lei, L\'oreal Majirel - 65 lei' },
        { name: 'Ser reparator', details: '12 lei' },
        { name: 'Tratament par', details: 'Kerastase Fusio Dose - 91 lei, Kerastase Fusio Scrub - 71 lei, Wella 100% Repair - 63-80 lei, Wella Perfect Hair - 47-62 lei, L\'oreal Masca - 28-31 lei, L\'oreal Absolute Molecular - 85-93 lei' },
        { name: 'Tratament păr premium', details: 'Kerastase Premiere - 135-144 lei, Kerastase Chronologiste - 90 lei, Kerastase Masca - 71 lei, L\'oreal Metal Detox - 91 lei, Wella Masca - 26-32 lei' }
      ]
    },
    {
      id: 2,
      title: 'COSMETICA',
      image: '/imaginisite/beautiful-woman-hands-with-fresh-french-manicure-2025-02-12-22-39-13-utc.jpg',
      services: [
        { name: 'Make-up profesional', details: '162-217 lei' },
        { name: 'Aplicat gene cu adeziv', details: '19-24 lei' },
        { name: 'Scos oja semi-permanenta', details: '23-29 lei' },
        { name: 'Demontat gel', details: '27-36 lei' },
        { name: 'Oja clasica', details: '16-20 lei' },
        { name: 'Oja semi-permanenta', details: '50-66 lei' },
        { name: 'Oja semi-permanenta cu apex', details: '86 lei' },
        { name: 'Tratament unghii slabe și deteriorate', details: '19-25 lei' },
        { name: 'Manichiura clasica', details: '38-49 lei' },
        { name: 'Manichiura barbați', details: '43-54 lei' },
        { name: 'Pedichiura clasica', details: 'Femei - 49-68 lei, Barbați - 55-70 lei' },
        { name: 'Pedichiura dificila', details: '72-82 lei' },
        { name: 'Protecție cu gel', details: 'Gel pe unghia naturala - 90-112 lei' },
        { name: 'Constructie gel', details: '133-149 lei' },
        { name: 'Constructie slim', details: '165-181 lei' },
        { name: 'Constructie french din gel', details: '29-33 lei' },
        { name: 'Baby Boomer', details: '29-33 lei' },
        { name: 'Tips + Gel', details: '112-140 lei' },
        { name: 'Tips simplu', details: '10-14 lei/unghie' },
        { name: 'Model french', details: '9-12 lei' },
        { name: 'Design nivel 1', details: 'Foițe de transfer, punctulețe - 4 lei/unghie' },
        { name: 'Design nivel 2', details: 'Puncte, linii, design-uri minimaliste - 10 lei/unghie' },
        { name: 'Design nivel 3', details: 'Pictat pe unghii, design-uri complexe - 17 lei/unghie' },
        { name: 'Sclipici', details: '3 lei/unghie' },
        { name: 'Ştrasuri', details: '4 lei/unghie' },
        { name: 'Intretinere gel', details: '90-112 lei' },
        { name: 'Intretinere slim', details: '135-151 lei' },
        { name: 'Intretinere cu schimbarea arhitecturii in slim', details: '165-181 lei' }
      ]
    },
    {
      id: 3,
      title: 'EPILARE DEFINITIVĂ',
      image: '/imaginisite/photo-epilation-close-up-of-hair-removal-procedu-2025-03-14-05-57-47-utc.jpg',
      services: [
        { name: 'Epilare definitiva femei - Altesse Nanolaser Trilogy', details: 'S - 64-79 lei (areola, barbie, inghinal partial, interfesier, linie abdomen, mustața, perciuni, pomeți), M - 120-136 lei (antebraț, axila, ceafa, fața integral, gât, inghinal integral, labe picior, lombar, mâini), L - 175-191 lei (abdomen, brațe integral, coapse, dorsali, fese, omoplați, picioare parțial, piept, umeri), XL - 282-312 lei (picioare integral, spate integral)' },
        { name: 'Epilare definitiva barbați - Altesse Nanolaser Trilogy', details: 'S - 85-95 lei (areola, barbie, inghinal partial, interfesier, linie abdomen, mustața, perciuni, pomeți), M - 169-209 lei (antebraț, axila, ceafa, fața integral, gât, inghinal integral, labe picior, lombar, mâini), L - 252-285 lei (abdomen, brațe integral, coapse, dorsali, fese, omoplați, picioare parțial, piept, umeri), XL - 415-468 lei (picioare integral, spate integral)' }
      ]
    },
    {
      id: 4,
      title: 'TRATAMENTE FACIALE',
      image: '/imaginisite/beauty-face-of-young-adult-woman-with-makeup-perf-2025-10-16-04-02-24-utc.jpg',
      services: [
        { name: 'Anubis Barcelona Adio Acnee', details: '242-270 lei' },
        { name: 'Anubis Barcelona Booster Frumusete', details: '242-270 lei' },
        { name: 'Anubis Barcelona Contur Facial Perfect', details: '242-270 lei' },
        { name: 'Anubis Barcelona Ten de Vedeta', details: '242-270 lei' },
        { name: 'Mezoterapie Virtuala', details: '108-149 lei' },
        { name: 'Microdermo-abraziune', details: '108-149 lei' },
        { name: 'Oxigen Hiperbaric', details: '108-149 lei' },
        { name: 'Oxygenera Pro', details: '301-344 lei' },
        { name: 'Hydradermie Jeuness', details: '277 lei' },
        { name: 'Guinot Skinovage Beautiful Eyes', details: '134 lei' },
        { name: 'Guinot Skinovage Hydraboost', details: '190 lei' },
        { name: 'Guinot Skynovage System Care', details: '190 lei' },
        { name: 'Guinot Soin Age Summum', details: '382 lei' },
        { name: 'Guinot Soin Eye Lift', details: '277 lei' },
        { name: 'Guinot Soin Hydradermie Jeun Age Logic', details: '402 lei' },
        { name: 'Guinot Soin Hydradermie Lift', details: '402 lei' },
        { name: 'Extracție puncte negre', details: '39-45 lei' }
      ]
    },
    {
      id: 5,
      title: 'LAMINAȚII ȘI VOPSIT SPRÂNCENE/GENE',
      image: '/images/make-up-artists-shading-eyes-2025-03-16-07-53-24-utc-min.jpg',
      services: [
        { name: 'Laminare gene', details: '135-143 lei' },
        { name: 'Laminare sprancene', details: '181-197 lei' },
        { name: 'Vopsit gene sau sprancene', details: '22-26 lei' },
        { name: 'Aplicat gene fir cu fir', details: '177-207 lei' },
        { name: 'Aplicat gene fir cu fir 2D/3D', details: '202-232 lei' },
        { name: 'Scos gene false fir cu fir', details: '38-42 lei' }
      ]
    },
    {
      id: 6,
      title: 'MICROPIGMENTARE',
      image: '/images/top-view-of-tools-for-permanent-makeup-on-black-ta-2024-11-17-13-20-03-utc-min.jpg',
      services: [
        { name: 'Pensat', details: 'Femeie - 30-36 lei, Barbat - 34-40 lei' },
        { name: 'Micro-pigmentare buze sau sprancene', details: '781-851 lei' },
        { name: 'Micro-pigmentare buze Make-up', details: '625-763 lei' },
        { name: 'Retuș micro-pigmentare', details: '292-322 lei' }
      ]
    },
    {
      id: 7,
      title: 'MASAJ',
      image: '/imaginisite/cute-woman-looking-happy-after-getting-professiona-2024-10-18-08-14-22-utc.jpg',
      services: [
        { name: 'Relaxare', details: '95-131 lei' },
        { name: 'Anticelulitic', details: '110-138 lei' },
        { name: 'Relaxare si Anticelulitic', details: '149-207 lei' },
        { name: 'Bețe de bambus', details: '112-128 lei' },
        { name: 'Facial', details: '50-56 lei' },
        { name: 'Facial Dermoled', details: '49 lei' }
      ]
    },
    {
      id: 8,
      title: 'EPILARE CEARĂ',
      image: '/imaginisite/photo-epilation-close-up-of-hair-removal-procedu-2025-03-31-03-42-49-utc.jpg',
      services: [
        { name: 'Epilare ceara - abdomen', details: 'Femeie - 17-21 lei, Barbat - 28-34 lei' },
        { name: 'Epilare ceara - axila', details: 'Femeie - 22-26 lei, Barbat - 24-30 lei' },
        { name: 'Epilare ceara - barbie', details: '17-21 lei' },
        { name: 'Epilare ceara - brate', details: 'Femeie - 32-36 lei, Barbat - 32-38 lei' },
        { name: 'Epilare ceara - fața', details: 'Femeie - 27-33 lei, Barbat - 37-43 lei' },
        { name: 'Epilare ceara - fese', details: '22-26 lei' },
        { name: 'Epilare ceara - inghinal parțial', details: '29-33 lei' },
        { name: 'Epilare ceara - inghinal total', details: '40-46 lei' },
        { name: 'Epilare ceara - inghinal barbați', details: '66-80 lei' },
        { name: 'Epilare ceara - interfesieri', details: '17-21 lei' },
        { name: 'Epilare ceara - linie abdomen', details: '10-14 lei' },
        { name: 'Epilare ceara - picioare partial', details: '33-37 lei' },
        { name: 'Epilare ceara - picioare integral', details: 'Femeie - 40-46 lei, Barbat - 51-57 lei' },
        { name: 'Epilare ceara - mustata', details: '16-20 lei' },
        { name: 'Epilare ceara - nari', details: '9-12 lei' },
        { name: 'Epilare ceara - perciuni', details: '9-12 lei' },
        { name: 'Epilare ceara - piept barbati', details: '33-37 lei' },
        { name: 'Epilare ceara - pomeți', details: '12-15 lei' },
        { name: 'Epilare ceara - spate', details: 'Femeie - 22-26 lei, Barbat - 39-45 lei' },
        { name: 'Epilare ceara - urechi', details: '11-15 lei' },
        { name: 'Epilare ceara - zona lombara', details: '12-16 lei' }
      ]
    },
    {
      id: 9,
      title: 'TRATAMENTE CORPORALE - SCULPTOR',
      image: '/imaginisite/young-woman-undergoing-laser-epilation-for-smooth-2025-05-02-06-04-28-utc.jpg',
      services: [
        { name: 'Pachet Body Supreme', details: '822 lei' },
        { name: 'Himfu + CryoRH + Drenaj Limfatic', details: 'CryoRH - 361 lei, Fermitate/elasticitate Himfu - 411 lei, Slabire localizata - 361 lei, Fermitate/elasticitate - 361 lei' }
      ]
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




  return (
    <>
      <SEO
        title="Servicii Profesionale de Frumusețe - BeautyArena"
        description="Descoperă gama completă de servicii profesionale de frumusețe: coafură, machiaj, îngrijire ten, manichiură, pedichiură și tratamente de relaxare."
        keywords="servicii frumusețe, coafură, machiaj profesional, îngrijire ten, manichiură, pedichiură, salon frumusețe Cluj"
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-beauty-pink-light/10 to-white pt-16">
        {/* Enhanced Hero Section with Full-Width Banner */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-end">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <img
              src="/imaginisite/woman-sitting-at-beauty-salon-making-hairdo-2025-03-18-17-52-06-utc.jpg"
              alt="Servicii profesionale de frumusețe"
              className="w-full h-full object-cover"
              style={{ objectPosition: '30% center' }}
            />
            {/* Softer gradient from bottom for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          </div>

          {/* Content card, aligned left, airy */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 flex justify-start">
            <div className="max-w-xl bg-black/30 sm:bg-black/25 backdrop-blur-sm rounded-2xl px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
                <Sparkles className="w-4 h-4 text-beauty-pink-light" />
                <span className="text-[11px] sm:text-xs font-medium text-white/90 uppercase tracking-[0.12em]">
                  Servicii premium de frumusețe
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-elegant font-bold text-white leading-tight text-left"
                style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 1px 1px 3px rgba(0,0,0,0.5)' }}
              >
                <span className="block">
                  Transformă-ți
                </span>
                <span
                  className="block text-beauty-pink-light"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.7)' }}
                >
                  frumusețea naturală
                </span>
              </h1>

              <p
                className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed text-left"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.6)' }}
              >
                Servicii profesionale realizate de experți cu produse premium, adaptate nevoilor tale.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link
                  to="/programare"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-beauty-pink text-white rounded-full font-semibold text-sm sm:text-base hover:bg-beauty-pink-dark hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Programează-te acum
                </Link>
                <Link
                  to="#servicii"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/85 backdrop-blur-sm text-gray-900 border border-white/80 rounded-full font-semibold text-sm sm:text-base hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  Vezi serviciile
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Services Categories Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
                Categoriile noastre de servicii
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Alege categoria care te interesează și descoperă serviciile disponibile.
              </p>
            </div>

            {/* Category Carousel */}
            <div className="relative mb-12">
              <div className="flex overflow-x-auto gap-6 pb-4 px-4 snap-x snap-mandatory scrollbar-hide">
                {serviceCategories.map((category, index) => (
                  <div
                    key={category.id}
                    onClick={() => setActiveCategoryIndex(index)}
                    className={`relative flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 snap-center ${
                      index === activeCategoryIndex
                        ? 'ring-4 ring-beauty-pink scale-105'
                        : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/envato-labs-image-edit-34.png';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center pb-6">
                      <h3 className="text-white font-bold text-center px-4 text-base md:text-lg">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services List for Active Category */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {serviceCategories[activeCategoryIndex].title}
                </h3>
                <div className="space-y-4">
                  {serviceCategories[activeCategoryIndex].services.map((service, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Enhanced CTA Section with Split Layout */}
        <section className="py-20 relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Left Side - Images Grid */}
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {/* Top Left Image */}
                  <div className="relative h-[180px] md:h-[250px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/photo-epilation-close-up-of-hair-removal-procedu-2025-03-14-05-57-47-utc.jpg"
                      alt="Epilare profesională"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Top Right Image */}
                  <div className="relative h-[180px] md:h-[250px] rounded-2xl overflow-hidden shadow-xl mt-4 md:mt-8">
                    <img
                      src="/imaginisite/pink-manicure-hand-with-stamping-nail-art-design-2025-02-22-16-17-43-utc.jpg"
                      alt="Nail art design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Bottom Left Image */}
                  <div className="relative h-[180px] md:h-[250px] rounded-2xl overflow-hidden shadow-xl -mt-2 md:-mt-4">
                    <img
                      src="/imaginisite/summer-manicure-and-nail-color-samples-multicolor-2025-02-10-09-47-08-utc.jpg"
                      alt="Mostre culori unghii"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Bottom Right Image */}
                  <div className="relative h-[180px] md:h-[250px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/young-woman-undergoing-laser-epilation-for-smooth-2025-05-02-06-04-28-utc.jpg"
                      alt="Tratament laser"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-beauty-pink/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-beauty-peach/20 rounded-full blur-3xl"></div>
              </div>

              {/* Right Side - CTA Content */}
              <div className="text-center lg:text-left order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-beauty-pink/10 rounded-full mb-6">
                  <Sparkles className="w-5 h-5 text-beauty-pink" />
                  <span className="text-sm font-semibold text-beauty-pink">Ofertă specială</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
                  Gata să începi
                  <span className="block gradient-text">transformarea ta?</span>
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 leading-relaxed">
                  Programează-te și descoperă cum te putem ajuta să arăți și să te simți extraordinar.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/programare"
                    className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-beauty-pink text-white rounded-full font-semibold hover:bg-beauty-pink-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg"
                  >
                    <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                    Programează-te acum
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white border-2 border-beauty-pink text-beauty-pink rounded-full font-semibold hover:bg-beauty-pink hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 text-base md:text-lg"
                  >
                    Contactează-ne
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;