import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShoppingCart, Heart, Star, Grid, List } from 'lucide-react';
import { useRealProducts } from '../../hooks/useRealProducts';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProductsSection = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, loading, error } = useRealProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // DEBUG: Log product data structure
  console.log('[DEBUG ProductsSection] Total products:', products?.length || 0);
  console.log('[DEBUG ProductsSection] Sample product structure:', products?.[0] ? {
    name: products[0].name,
    images: products[0].images,
    thumbnail: products[0].thumbnail,
    localImages: products[0].localImages,
    category: products[0].category,
    price: products[0].price
  } : 'No products available');

  // Get unique categories from real products
  const categories = useMemo(() => {
    if (!products || products.length === 0) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return [
      { id: 'all', name: 'Toate produsele' },
      ...uniqueCategories.map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }))
    ];
  }, [products]);

  // Filter and sort products - THIS IS THE CORRECT LOGIC FOR HOMEPAGE
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    // Return only first 6 products for homepage
    const limitedProducts = filtered.slice(0, 6);
    console.log('[DEBUG ProductsSection] Filtered and sorted products count:', limitedProducts.length);
    console.log('[DEBUG ProductsSection] Limited products with images:', limitedProducts.map(p => ({
      name: p.name,
      hasImages: !!(p.images && p.images.length > 0),
      imageCount: p.images?.length || 0,
      hasLocalImages: !!(p.localImages && p.localImages.length > 0),
      localImageCount: p.localImages?.length || 0
    })));
    
    return limitedProducts;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const getProductIcon = (imageType) => {
    const iconClass = "w-16 h-16 text-beauty-pink";
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

  // REMOVED: Duplicate filtering logic that was causing issues

  return (
    <section id="products" className="relative section-padding bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 overflow-hidden">
        <img
          src="/images/tools-of-makeup-artist-2025-03-09-22-18-22-utc-min.jpg"
          alt="Unelte machiaj"
          className="w-full h-full object-cover rounded-bl-3xl opacity-20"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <ShoppingCart className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Produse premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Magazinul nostru de
            <span className="block text-black">frumusețe</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă gama noastră completă de produse de frumusețe premium, selectate cu grijă
            pentru a îți oferi rezultate excepționale acasă.
          </p>
        </div>

        {/* Search and Filters - Mobile optimized */}
        <div className="bg-gray-50 rounded-2xl p-3 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-beauty-peach/30 rounded-lg focus:outline-none focus:border-beauty-peach focus:ring-2 focus:ring-beauty-peach/20 transition-all duration-300 text-sm md:text-base"
                style={{
                  backgroundColor: '#F5E6D3',
                  boxShadow: '0 1px 3px 0 rgba(245, 230, 211, 0.1)'
                }}
              />
            </div>

            {/* Filters - Mobile optimized */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 items-stretch sm:items-center">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300 text-sm md:text-base flex-1 sm:flex-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300 text-sm md:text-base flex-1 sm:flex-none"
              >
                <option value="name">Sortare</option>
                <option value="price-low">Preț ↑</option>
                <option value="price-high">Preț ↓</option>
                <option value="rating">Cele mai apreciate</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 md:p-3 ${viewMode === 'grid' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors duration-300`}
                >
                  <Grid className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 md:p-3 ${viewMode === 'list' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors duration-300`}
                >
                  <List className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
            <span className="ml-3 text-gray-600">Se încarcă produsele...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <p>Eroare la încărcarea produselor: {error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Reîncarcă pagina
            </button>
          </div>
        )}

        {/* Products Grid/List */}
        {!loading && !error && (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'space-y-3 md:space-y-6'} gap-3 md:gap-6`}>
            {filteredAndSortedProducts.map((product) => {
              console.log('[DEBUG ProductsSection] Rendering product:', product.name, {
                hasImages: !!(product.images && product.images.length > 0),
                imageCount: product.images?.length || 0,
                localImageCount: product.localImages?.length || 0,
                thumbnail: product.thumbnail
              });

              // Get the best available image
              const getProductImage = () => {
                // Prefer local images first
                if (product.localImages && product.localImages.length > 0) {
                  return product.localImages[0];
                }
                // Fallback to regular images
                if (product.images && product.images.length > 0) {
                  return product.images[0];
                }
                // Fallback to thumbnail
                if (product.thumbnail) {
                  return product.thumbnail;
                }
                // No image available - use placeholder
                return null;
              };

              const productImage = getProductImage();

              return (
                <div
                  key={product.id}
                  className={`card-beauty group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  {/* Product Image - Mobile optimized */}
                  <div className={`${viewMode === 'list' ? 'w-20 h-20 flex-shrink-0' : 'w-full h-24 md:h-48'} relative bg-beauty-pink/10 rounded-lg flex items-center justify-center mb-2 md:mb-4 ${viewMode === 'list' ? 'mb-0 mr-2 md:mr-4' : ''}`}>
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          console.warn(`[DEBUG ProductsSection] Failed to load image for ${product.name}:`, productImage);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback SVG icon when no image */}
                    <div className={`${productImage ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {getProductIcon(product.image)}
                    </div>
                    
                    {/* Badges - Smaller on mobile */}
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col space-y-1">
                      {product.isNew && (
                        <span className="bg-beauty-pink text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs md:text-xs">NOU</span>
                      )}
                      {product.isOnSale && (
                        <span className="bg-beauty-pink-dark text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs md:text-xs">REDUCERE</span>
                      )}
                      {!product.inStock && (
                        <span className="bg-gray-500 text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs md:text-xs">INDISPONIBIL</span>
                      )}
                    </div>

                    {/* Wishlist Button - Smaller on mobile */}
                    <button
                      className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300"
                      onClick={() => toggleWishlist(product)}
                    >
                      <Heart className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist(product.id) ? 'text-beauty-pink fill-current' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Product Info - Mobile optimized */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-beauty-peach fill-current" />
                        <span className="text-xs md:text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-xs md:text-xs text-gray-500">({product.reviewCount || product.reviews || 0})</span>
                      </div>
                    </div>

                    <h3 className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-2 group-hover:text-beauty-pink transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* REMOVED: Product description as requested */}
                    {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p> */}

                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <span className="text-sm md:text-xl font-bold text-beauty-pink">{product.price} lei</span>
                        {product.originalPrice && (
                          <span className="text-xs md:text-sm text-gray-500 line-through">{product.originalPrice} lei</span>
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        {categories.find(cat => cat.id === product.category)?.name}
                      </div>
                    </div>

                    <button
                      disabled={!product.inStock}
                      onClick={() => addToCart(product)}
                      className={`w-full flex items-center justify-center space-x-1 md:space-x-2 py-1.5 md:py-3 rounded-lg font-medium transition-all duration-300 text-xs md:text-sm ${
                        product.inStock
                          ? 'btn-primary hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{product.inStock ? 'Adaugă în coș' : 'Produs indisponibil'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            
            {/* No products found */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="col-span-full text-center py-8 md:py-12">
                <p className="text-gray-600 text-sm md:text-lg">Nu au fost găsite produse care să corespundă criteriilor de căutare.</p>
              </div>
            )}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Încarcă mai multe produse
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;