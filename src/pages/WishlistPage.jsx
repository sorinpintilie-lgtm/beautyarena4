import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-elegant font-bold text-gray-900 mb-4">
            Lista mea de dorințe
          </h1>
          <p className="text-lg text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'produs salvat' : 'produse salvate'}
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Lista ta de dorințe este goală
            </h2>
            <p className="text-gray-600 mb-6">
              Salvează produsele tale preferate pentru mai târziu
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Descoperă produsele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map(product => (
              <div key={product.id} className="card-beauty group relative">
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 z-10"
                >
                  <Trash2 className="w-4 h-4 text-gray-600 hover:text-beauty-rose" />
                </button>

                {/* Product Image */}
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-6xl">🎨</div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{product.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-beauty-gold fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>

                  <Link to={`/product/${product.slug}`}>
                    <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-beauty-pink transition-colors">
                      {product.name}
                    </h3>
                  </Link>

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
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center gap-2 text-sm py-2 rounded-lg font-medium transition-all duration-300 ${
                      product.inStock
                        ? 'btn-primary hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;