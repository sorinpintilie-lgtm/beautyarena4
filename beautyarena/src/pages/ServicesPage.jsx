import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Calendar, ArrowRight, Check, Sparkles, Award, ShoppingCart, Heart } from 'lucide-react';
import SEO from '../components/common/SEO';
import InfiniteCarousel from '../components/common/InfiniteCarousel';
import { HairIcon, SkincareIcon, MakeupIcon, NailIcon, WellnessIcon, SpecialIcon } from '../components/icons/CustomServiceIcons';
import { useRealProducts } from '../hooks/useRealProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ServicesPage = () => {
  const { products, loading: productsLoading, error: productsError } = useRealProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
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

  // Get top 6 products for the carousel
  const topProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.slice(0, 6);
  }, [products]);

  const getProductImage = (product) => {
    if (product.localImages && product.localImages.length > 0) {
      return product.localImages[0];
    }
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return null;
  };

  const renderProductCard = (product) => {
    const productImage = getProductImage(product);
    
    return (
      <div className="group h-full">
        <Link
          to={`/product/${product.slug}`}
          className="block bg-white border-2 border-gray-100 rounded-3xl p-6 hover:border-beauty-pink hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-beauty-pink/10 rounded-2xl mb-4 overflow-hidden flex-shrink-0">
            {productImage ? (
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Fallback placeholder */}
            <div className={`${productImage ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
              <div className="text-4xl text-gray-400">🎨</div>
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group/wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isInWishlist(product.id)
                    ? 'fill-beauty-pink text-beauty-pink'
                    : 'text-gray-600 group-hover/wishlist:text-beauty-pink'
                }`}
              />
            </button>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-beauty-pink text-white text-xs px-2 py-1 rounded-full">Nou</span>
              )}
              {product.discount > 0 && (
                <span className="bg-beauty-pink-dark text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{product.brand?.name}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-beauty-peach fill-current" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-beauty-pink transition-colors duration-300 flex-grow">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-beauty-pink">
                {product.price.toFixed(2)} lei
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toFixed(2)} lei
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-medium transition-all duration-300 text-sm ${
                product.inStock
                  ? 'bg-beauty-pink text-white hover:bg-beauty-pink-dark hover:scale-105'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
            </button>
          </div>
        </Link>
      </div>
    );
  };

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
            Programează-te acum
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
        {/* Enhanced Hero Section with Full-Width Banner */}
        <section className="relative overflow-hidden">
          {/* Full-Width Hero Banner */}
          <div className="relative w-full h-[500px] md:h-[550px] lg:h-[600px]">
            <img
              src="/imaginisite/woman-sitting-at-beauty-salon-making-hairdo-2025-03-18-17-52-06-utc.jpg"
              alt="Servicii profesionale de frumusețe"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
            
            {/* Hero Content Centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-full mb-6 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="text-sm font-semibold text-white">Servicii premium</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-elegant font-bold text-white mb-6 drop-shadow-lg">
                  Transformă-ți
                  <span className="block text-beauty-pink-light">frumusețea naturală</span>
                </h1>
                <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                  Descoperă gama completă de servicii profesionale de frumusețe, realizate de experți cu produse de calitate premium și tehnici inovatoare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/programare"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-beauty-pink text-white rounded-full font-semibold hover:bg-beauty-pink-dark hover:shadow-xl hover:scale-105 transition-all duration-300 text-base"
                  >
                    <Calendar className="w-5 h-5" />
                    Programează-te acum
                  </Link>
                  <Link
                    to="#servicii"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/40 rounded-full font-semibold hover:bg-white/30 hover:shadow-xl hover:scale-105 transition-all duration-300 text-base"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Vezi serviciile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Carousel Section - NEW */}
        <section className="py-16 bg-gradient-to-b from-white to-beauty-pink-light/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
                Atmosfera salonului nostru
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descoperă mediul profesional și relaxant în care îți oferim serviciile
              </p>
            </div>

            {/* Horizontal Scrolling Carousel */}
            <div className="relative">
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {/* Image 1 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/hairdresser-brushing-hair-of-attractive-woman-in-b-2024-11-19-16-03-04-utc.jpg"
                      alt="Servicii profesionale de coafură"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 2 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/beautiful-woman-hands-with-fresh-french-manicure-2025-02-12-22-39-13-utc.jpg"
                      alt="Manichiură profesională"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 3 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/closeup-finger-nail-care-by-manicure-specialist-in-2025-01-10-00-16-57-utc.jpg"
                      alt="Tratamente unghii"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 4 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/joyful-woman-experiencing-a-relaxing-hair-wash-bef-2025-03-10-02-10-48-utc.jpg"
                      alt="Tratamente relaxante"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 5 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/portrait-of-beautiful-young-woman-getting-haircut-2025-03-14-16-38-29-utc.jpg"
                      alt="Tuns profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 6 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/hairdresser-drying-hair-of-young-attractive-woman-2024-11-19-01-02-14-utc.jpg"
                      alt="Styling profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Image 7 */}
                <div className="flex-shrink-0 w-[300px] md:w-[400px] snap-center">
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src="/imaginisite/happy-woman-dyeing-her-hair-at-the-hairdresser-2025-10-16-23-42-15-utc.jpg"
                      alt="Vopsit păr profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Carousel Section */}
        <section id="servicii" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
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