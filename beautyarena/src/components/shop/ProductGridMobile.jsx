import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, Zap } from 'lucide-react';

const ProductGridMobile = ({ products, categories }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState(new Set());

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

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

  return (
    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Mobile Product Grid - Optimized for Touch */}
      <div className="lg:hidden">
        {/* Mobile Grid View - 2 columns */}
        <div className="grid grid-cols-2 gap-3 px-4">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="card-beauty bg-white overflow-hidden group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideInUp 0.5s ease-out forwards'
              }}
            >
              {/* Product Image - Mobile Optimized */}
              <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center h-32 mb-3">
                <div className="flex items-center justify-center">
                  {getProductIcon(product.image)}
                </div>
                
                {/* Mobile Badges - Compact */}
                <div className="absolute top-1 left-1 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-beauty-pink text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">NOU</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-beauty-pink-dark text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">-25%</span>
                  )}
                </div>

                {/* Mobile Action Buttons */}
                <div className="absolute top-1 right-1 flex flex-col gap-1">
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-1.5 rounded-full transition-all duration-300 active:scale-95 ${
                      wishlist.has(product.id) 
                        ? 'bg-beauty-pink text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className="w-3 h-3" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors duration-300 active:scale-95">
                    <Eye className="w-3 h-3 text-gray-600" />
                  </button>
                </div>

                {/* Quick Add Button - Mobile */}
                <button className="absolute bottom-1 right-1 p-1.5 bg-beauty-pink text-white rounded-full hover:bg-beauty-pink-dark transition-colors duration-300 active:scale-95 opacity-0 group-hover:opacity-100">
                  <ShoppingCart className="w-3 h-3" />
                </button>
              </div>

              {/* Product Info - Mobile Optimized */}
              <div className="space-y-2">
                {/* Rating - Compact */}
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-beauty-peach fill-current" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Product Name - Mobile Text */}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                
                {/* Category Badge */}
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {categories.find(cat => cat.id === product.category)?.name}
                </span>

                {/* Price - Mobile Optimized */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-beauty-pink">{product.price}</span>
                    <span className="text-xs text-gray-500">lei</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? 'În stoc' : 'Indisponibil'}
                  </span>
                  
                  {product.inStock && (
                    <div className="flex items-center gap-1 text-xs text-orange-600">
                      <Zap className="w-3 h-3" />
                      <span>Rapid</span>
                    </div>
                  )}
                </div>

                {/* Mobile Add to Cart Button */}
                <button 
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center space-x-1 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                    product.inStock 
                      ? 'bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white hover:from-beauty-pink-dark hover:to-beauty-pink active:scale-95'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>{product.inStock ? 'Adaugă în coș' : 'Indisponibil'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile List View Alternative */}
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Vezi ca listă</span>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="text-sm text-beauty-pink font-medium"
            >
              Schimbă vizualizarea
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid - Existing Implementation */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="card-beauty group cursor-pointer"
            >
              {/* Desktop implementation would go here */}
              <div className="w-full h-48 relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center mb-4">
                <div className="flex items-center justify-center">
                  {getProductIcon(product.image)}
                </div>
                
                {/* Desktop badges and buttons */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {product.isNew && (
                    <span className="bg-beauty-pink text-white text-xs px-2 py-1 rounded-full">NOU</span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-beauty-pink-dark text-white text-xs px-2 py-1 rounded-full">REDUCERE</span>
                  )}
                </div>

                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-300">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-beauty-pink" />
                </button>
              </div>

              {/* Desktop product info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-beauty-peach fill-current" />
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-beauty-pink">{product.price} lei</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice} lei</span>
                    )}
                  </div>
                </div>

                <button className="w-full btn-primary">
                  Adaugă în coș
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridMobile;