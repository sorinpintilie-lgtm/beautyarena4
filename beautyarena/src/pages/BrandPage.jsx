import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import brands, { getBrandBySlug } from '../data/brands';
import products, { getProductsByBrand } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const BrandPage = () => {
  const { slug } = useParams();
  const brand = getBrandBySlug(slug);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [sortBy, setSortBy] = useState('name');

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Brand negăsit</h2>
          <Link to="/shop" className="btn-primary">
            Înapoi la magazin
          </Link>
        </div>
      </div>
    );
  }

  const brandProducts = useMemo(() => {
    let filtered = getProductsByBrand(brand.id);
    
    filtered.sort((a, b) => {
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

    return filtered;
  }, [brand.id, sortBy]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/shop"
          className="flex items-center gap-2 text-gray-600 hover:text-beauty-pink transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Înapoi la magazin
        </Link>

        {/* Brand Header */}
        <div className="bg-beauty-pink/10 rounded-2xl p-8 md:p-12 mb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-elegant font-bold text-gray-900 mb-4">
              {brand.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {brand.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-beauty-pink" />
                <span>{brandProducts.length} produse disponibile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Toate produsele {brand.name}
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
          >
            <option value="name">Sortare după nume</option>
            <option value="price-low">Preț crescător</option>
            <option value="price-high">Preț descrescător</option>
            <option value="rating">Cele mai apreciate</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="card-beauty group block"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-beauty-pink/10 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-beauty-pink text-white text-xs px-2 py-1 rounded-full">Nou</span>
                  )}
                  {product.discount > 0 && (
                    <span className="bg-beauty-pink-dark text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button 
                  onClick={(e) => handleToggleWishlist(e, product)}
                  className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group/wishlist"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      isInWishlist(product.id) 
                        ? 'fill-beauty-pink text-beauty-pink'
                        : 'text-gray-600 group-hover/wishlist:text-beauty-pink'
                    }`} 
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{product.subcategory}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-beauty-peach fill-current" />
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-beauty-pink transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-beauty-pink">
                    {product.price.toFixed(2)} lei
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} lei
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 text-sm py-2 rounded-lg font-medium transition-all duration-300 ${
                    product.inStock
                      ? 'btn-primary hover:scale-105'
                      : 'btn-disabled'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;