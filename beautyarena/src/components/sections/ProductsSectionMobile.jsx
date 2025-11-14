import React, { useState, useRef } from 'react';
import { Search, Filter, ShoppingCart, Heart, Star, Grid, List, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductsSectionMobile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Toate produsele' },
    { id: 'hair', name: 'Îngrijire păr' },
    { id: 'skin', name: 'Îngrijire ten' },
    { id: 'makeup', name: 'Machiaj' },
    { id: 'nails', name: 'Unghii' },
    { id: 'fragrance', name: 'Parfumuri' }
  ];

  const products = [
    {
      id: 1,
      name: 'Șampon profesional pentru păr gras',
      price: 45,
      originalPrice: 60,
      rating: 4.8,
      reviews: 124,
      category: 'hair',
      image: 'shampoo',
      description: 'Șampon blând care curăță în profunzime și reglează excesul de sebum.',
      inStock: true,
      isNew: false,
      isOnSale: true
    },
    {
      id: 2,
      name: 'Ser anti-aging cu vitamina C',
      price: 89,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      category: 'skin',
      image: 'serum',
      description: 'Ser intens anti-aging care iluminează și revitalizează tenul matur.',
      inStock: true,
      isNew: true,
      isOnSale: false
    },
    {
      id: 3,
      name: 'Trusă machiaj completă',
      price: 120,
      originalPrice: 150,
      rating: 4.7,
      reviews: 67,
      category: 'makeup',
      image: 'makeup',
      description: 'Trusă profesională cu toate esențialele pentru machiaj perfect.',
      inStock: true,
      isNew: false,
      isOnSale: true
    },
    {
      id: 4,
      name: 'Lac de unghii premium',
      price: 25,
      originalPrice: null,
      rating: 4.6,
      reviews: 156,
      category: 'nails',
      image: 'nail',
      description: 'Lac de unghii cu rezistență mare și culori intense.',
      inStock: true,
      isNew: false,
      isOnSale: false
    },
    {
      id: 5,
      name: 'Parfum floral elegant',
      price: 180,
      originalPrice: null,
      rating: 4.8,
      reviews: 45,
      category: 'fragrance',
      image: 'perfume',
      description: 'Parfum sofisticat cu note florale de lungă durată.',
      inStock: true,
      isNew: true,
      isOnSale: false
    },
    {
      id: 6,
      name: 'Balsam de buze hidratant',
      price: 18,
      originalPrice: 22,
      rating: 4.5,
      reviews: 234,
      category: 'skin',
      image: 'lips',
      description: 'Balsam de buze intens hidratant cu SPF 15.',
      inStock: false,
      isNew: false,
      isOnSale: true
    }
  ];

  const getProductIcon = (imageType) => {
    const iconClass = "w-12 h-12 lg:w-16 lg:h-16 text-beauty-pink";
    switch (imageType) {
      case 'shampoo':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H5V21C5 21.6 5.4 22 6 22H18C18.6 22 19 21.6 19 21V9H21Z"/>
          </svg>
        );
      case 'serum':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/>
          </svg>
        );
      case 'makeup':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C13.1 2 14 2.9 14 4V6H15V8H9V6H10V4C10 2.9 10.9 2 12 2ZM4 10H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V10ZM6 10V20H18V10H6Z"/>
          </svg>
        );
      case 'nail':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C12.5 2 13 2.5 13 3V4H14V6H10V4H11V3C11 2.5 11.5 2 12 2ZM8 6H16V22H8V6ZM4 8H20V20C20 20.6 19.6 21 19 21H5C4.4 21 4 20.6 4 20V8Z"/>
          </svg>
        );
      case 'perfume':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C9.5 2 7.5 3.5 6.5 5.5C6 6.5 6 7.5 6 8.5V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V8.5C18 7.5 18 6.5 17.5 5.5C16.5 3.5 14.5 2 12 2ZM12 4C13.7 4 15 5.3 15 7V8H9V7C9 5.3 10.3 4 12 4Z"/>
          </svg>
        );
      case 'lips':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.7 2 6 4.7 6 8C6 9.2 6.3 10.4 6.8 11.4C7.4 12.5 8.2 13.3 8.2 13.3C8.6 13.8 9.2 14 9.8 14C10.4 14 11 13.8 11.4 13.3L12 12.7L12.6 13.3C13 13.8 13.6 14 14.2 14C14.8 14 15.4 13.8 15.8 13.3C15.8 13.3 16.6 12.5 17.2 11.4C17.7 10.4 18 9.2 18 8C18 4.7 15.3 2 12 2Z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
          </svg>
        );
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const nextSlide = () => {
    if (currentIndex < sortedProducts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchEnd = (endEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const deltaX = startX - endTouch.clientX;
      
      if (Math.abs(deltaX) > 50) { // Minimum swipe distance
        if (deltaX > 0) {
          nextSlide(); // Swipe left - next product
        } else {
          prevSlide(); // Swipe right - previous product
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    // Use capture to ensure we catch the event
    document.addEventListener('touchend', handleTouchEnd, { once: true, capture: true });
  };

  const handleRefresh = () => {
    // Simulate refresh
    window.location.reload();
  };

  return (
    <section id="products" className="relative section-padding bg-white pb-20 lg:pb-16">
      {/* Mobile Pull-to-Refresh Indicator */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/20 flex items-center justify-center">
        <div className="text-sm text-gray-600 font-medium">
          Trage în jos pentru actualizare
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden pt-16 mb-6">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-4">
            <ShoppingCart className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Produse premium</span>
          </div>
          <h2 className="text-2xl font-elegant font-bold text-gray-900 mb-2">
            Magazinul nostru de
            <span className="block gradient-text">Frumusețe</span>
          </h2>
          <p className="text-gray-600 text-sm px-4">
            Descoperă gama noastră completă de produse premium
          </p>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Desktop Section Header */}
        <div className="hidden lg:block text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <ShoppingCart className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Produse premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Magazinul nostru de
            <span className="block gradient-text">Frumusețe</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă gama noastră completă de produse de frumusețe premium, selectate cu grijă
            pentru a îți oferi rezultate excepționale acasă.
          </p>
        </div>

        {/* Mobile Search and Filter Bar */}
        <div className="lg:hidden bg-gray-50 rounded-2xl p-4 mb-6 mx-4">
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300 text-sm"
              />
            </div>
            
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="p-3 bg-beauty-pink text-white rounded-lg hover:bg-beauty-pink-dark transition-colors duration-300"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Search and Filters */}
        <div className="hidden lg:block bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
              />
            </div>

            {/* Desktop Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
              >
                <option value="name">Sortare după nume</option>
                <option value="price-low">Preț crescător</option>
                <option value="price-high">Preț descrescător</option>
                <option value="rating">Cele mai apreciate</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors duration-300`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors duration-300`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Product Carousel */}
        <div className="lg:hidden relative">
          <div 
            className="overflow-hidden rounded-2xl mx-4"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sortedProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0 px-2">
                  <div className="card-beauty bg-white">
                    {/* Product Image */}
                    <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center h-48 mb-4">
                      <div className="flex items-center justify-center">
                        {getProductIcon(product.image)}
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product.isNew && (
                          <span className="bg-beauty-pink text-white text-xs px-2 py-1 rounded-full">NOU</span>
                        )}
                        {product.isOnSale && (
                          <span className="bg-beauty-pink-dark text-white text-xs px-2 py-1 rounded-full">REDUCERE</span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-beauty-pink" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-beauty-peach fill-current" />
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-beauty-pink">{product.price} lei</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">{product.originalPrice} lei</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {categories.find(cat => cat.id === product.category)?.name}
                        </span>
                      </div>

                      <button 
                        disabled={!product.inStock}
                        className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                          product.inStock 
                            ? 'btn-primary hover:scale-105 active:scale-95' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{product.inStock ? 'Adaugă în coș' : 'Indisponibil'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {sortedProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-beauty-pink' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= sortedProducts.length - 1}
              className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Products Grid/List */}
        <div className={`hidden lg:block ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-6'} gap-6`}>
          {sortedProducts.map((product) => (
            <div 
              key={product.id}
              className={`card-beauty group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
            >
              {/* Product Image */}
              <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'} relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center mb-4 ${viewMode === 'list' ? 'mb-0 mr-4' : ''}`}>
                <div className="flex items-center justify-center">
                  {getProductIcon(product.image)}
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-beauty-pink text-white text-xs px-2 py-1 rounded-full">NOU</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-beauty-pink-dark text-white text-xs px-2 py-1 rounded-full">REDUCERE</span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">INDISPONIBIL</span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-beauty-pink" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-beauty-peach fill-current" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-beauty-pink transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-beauty-pink">{product.price} lei</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice} lei</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {categories.find(cat => cat.id === product.category)?.name}
                  </div>
                </div>

                <button 
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                    product.inStock 
                      ? 'btn-primary hover:scale-105' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.inStock ? 'Adaugă în coș' : 'Produs indisponibil'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Încarcă mai multe produse
          </button>
        </div>
      </div>

      {/* Mobile Filter Slide-out Panel */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-transform duration-300">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Filtrează produsele</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Categorie</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-beauty-pink text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Sortare</h4>
                <div className="space-y-2">
                  {[
                    { value: 'name', label: 'Sortare după nume' },
                    { value: 'price-low', label: 'Preț crescător' },
                    { value: 'price-high', label: 'Preț descrescător' },
                    { value: 'rating', label: 'Cele mai apreciate' }
                  ].map(sort => (
                    <button
                      key={sort.value}
                      onClick={() => setSortBy(sort.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                        sortBy === sort.value
                          ? 'bg-beauty-pink text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSortBy('name');
                    setIsFilterOpen(false);
                  }}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  Resetează
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 bg-beauty-pink text-white rounded-lg hover:bg-beauty-pink-dark transition-colors duration-300 font-medium"
                >
                  Aplică filtrele
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsSectionMobile;