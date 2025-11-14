import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Clock, Calendar, ArrowRight, Scissors, Sparkles, Palette } from 'lucide-react';
import { useRealProducts } from '../../hooks/useRealProducts';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ShopAndServicesSection = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, loading, error } = useRealProducts();

  // Get top 3 products
  const topProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.slice(0, 3);
  }, [products]);

  // Top 3 services
  const topServices = [
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
    },
    {
      id: 2,
      icon: Sparkles,
      iconColor: 'text-beauty-pink',
      iconBg: 'bg-beauty-pink/10',
      title: 'Îngrijire unghii',
      description: 'Manichiură și pedichiură profesională, extensii cu gel sau acril și nail art personalizat.',
      duration: '45-90 min',
      price: 'De la 60 lei',
      rating: 4.8,
      reviews: 189,
    },
    {
      id: 3,
      icon: Palette,
      iconColor: 'text-beauty-pink-dark',
      iconBg: 'bg-beauty-pink-dark/10',
      title: 'Machiaj profesional',
      description: 'Machiaj pentru ocazii speciale, ședințe foto și evenimente cu produse de lux.',
      duration: '45-60 min',
      price: 'De la 100 lei',
      rating: 4.7,
      reviews: 98,
    }
  ];

  const getProductIcon = (imageType) => {
    const iconClass = "w-16 h-16 text-beauty-pink";
    return (
      <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
      </svg>
    );
  };

  const getProductImage = (product) => {
    if (product.localImages && product.localImages.length > 0) {
      return product.localImages[0];
    }
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    if (product.thumbnail) {
      return product.thumbnail;
    }
    return null;
  };

  return (
    <section className="relative overflow-hidden">
      {/* Banner-style Header with Full-Width Image */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <img
          src="/imaginisite/envato-labs-image-edit-37.png"
          alt="BeautyArena - Experiență completă de frumusețe"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Banner Title Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/20 backdrop-blur-sm rounded-full border border-beauty-pink/30 mb-6">
              <Star className="w-4 h-4 text-beauty-pink-light mr-2" />
              <span className="text-sm font-medium text-white">Produse & Servicii</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-elegant font-bold text-white mb-6">
              Descoperă frumusețea
              <span className="block text-beauty-pink-light mt-2">la BeautyArena</span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Explorează produsele noastre premium și serviciile profesionale pentru o experiență completă de frumusețe.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="section-padding bg-gradient-to-b from-white to-beauty-pink/5">
        <div className="max-w-7xl mx-auto">

        {/* 50/50 Split Layout - Always 2 columns on all devices */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:gap-12 items-start">
          
          {/* LEFT SIDE - SHOP PRODUCTS (50%) */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-white flex items-center">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-beauty-pink mr-1 md:mr-2" />
                <span className="text-xs md:text-base lg:text-xl">Magazin</span>
              </h3>
              <Link
                to="/shop"
                className="text-white hover:text-beauty-pink-light transition-colors duration-300 flex items-center text-xs md:text-sm font-medium"
              >
                Vezi toate
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Link>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <div className="text-center py-8 text-red-500">
                <p>Eroare la încărcarea produselor</p>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-2 md:space-y-3 flex flex-col">
                {topProducts.map((product) => {
                  const productImage = getProductImage(product);
                  
                  return (
                    <div
                      key={product.id}
                      className="card-beauty group cursor-pointer flex p-2 md:p-4 h-[120px] md:h-[140px] overflow-hidden"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative bg-beauty-pink/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 md:mr-3">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        
                        <div className={`${productImage ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                          {getProductIcon(product.image)}
                        </div>
                        
                        {/* Wishlist Button */}
                        <button
                          className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors duration-300"
                          onClick={() => toggleWishlist(product)}
                        >
                          <Heart className={`w-2 h-2 md:w-3 md:h-3 ${isInWishlist(product.id) ? 'text-beauty-pink fill-current' : 'text-gray-600'}`} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
                        <div className="overflow-hidden">
                          <h4 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 mb-2 group-hover:text-beauty-pink transition-colors duration-300 line-clamp-3 overflow-hidden">
                            {product.name}
                          </h4>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs md:text-sm lg:text-base font-bold text-beauty-pink truncate">{product.price} lei</span>
                          <button
                            disabled={!product.inStock}
                            onClick={() => addToCart(product)}
                            className={`w-full px-2 py-1 md:px-3 md:py-1.5 rounded-lg font-medium transition-all duration-300 text-xs flex items-center justify-center gap-1 ${
                              product.inStock
                                ? 'btn-primary hover:scale-105'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline text-xs">{product.inStock ? 'Adaugă' : 'Indisponibil'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View All Products Button */}
            <Link to="/shop" className="block mt-2 md:mt-3">
              <button className="w-full btn-secondary text-xs md:text-sm py-2 md:py-3">
                Vezi toate produsele
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 inline" />
              </button>
            </Link>
          </div>

          {/* RIGHT SIDE - SERVICES (50%) */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-white flex items-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-beauty-pink mr-1 md:mr-2" />
                <span className="text-xs md:text-base lg:text-xl">Servicii</span>
              </h3>
              <Link
                to="/services"
                className="text-white hover:text-beauty-pink-light transition-colors duration-300 flex items-center text-xs md:text-sm font-medium"
              >
                Vezi toate
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-2 md:space-y-3 flex flex-col">
              {topServices.map((service) => {
                const IconComponent = service.icon;
                
                return (
                  <div
                    key={service.id}
                    className="card-beauty group cursor-pointer p-2 md:p-4 h-[120px] md:h-[140px] flex overflow-hidden"
                  >
                    <div className="flex gap-2 md:gap-3 flex-1">
                      {/* Service Icon */}
                      <div className="flex flex-col items-center justify-center flex-shrink-0">
                        <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ${service.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${service.iconColor}`} />
                        </div>
                      </div>

                      {/* Service Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-beauty-pink transition-colors duration-300 mb-2">
                            {service.title}
                          </h4>
                          
                          {/* Hide description on mobile */}
                          <p className="hidden md:block text-gray-600 text-xs md:text-sm line-clamp-2">
                            {service.description}
                          </p>
                        </div>

                        {/* Price at bottom center */}
                        <div className="flex justify-center md:justify-end">
                          <div className="text-xs md:text-sm lg:text-base font-semibold text-beauty-pink whitespace-nowrap">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Services Button */}
            <Link to="/services" className="block mt-2 md:mt-3">
              <button className="w-full btn-secondary text-xs md:text-sm py-2 md:py-3">
                Vezi toate serviciile
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 inline" />
              </button>
            </Link>
          </div>
        </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="relative bg-beauty-pink rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src="/images/makeup-artist-makes-makeup-to-a-girl-apply-beige-2025-03-13-10-07-09-utc-min.jpg"
                  alt="BeautyArena"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-elegant font-bold mb-4 text-black">
                  Experiență completă de frumusețe
                </h3>
                <p className="text-black/80 mb-6 max-w-2xl mx-auto">
                  Combină produsele premium cu serviciile noastre profesionale pentru rezultate extraordinare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/shop">
                    <button className="px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center text-gray-800" style={{ backgroundColor: '#FFB6A3' }}>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Explorează magazinul
                    </button>
                  </Link>
                  <Link to="/booking">
                    <button className="px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center text-gray-800" style={{ backgroundColor: '#FFB6A3' }}>
                      <Calendar className="w-5 h-5 mr-2" />
                      Programează acum
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopAndServicesSection;
