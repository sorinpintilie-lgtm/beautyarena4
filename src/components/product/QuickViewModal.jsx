import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart, Star, Plus, Minus, ExternalLink } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-[80] transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
            <h3 className="text-lg font-semibold text-gray-900">Quick view</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl flex items-center justify-center relative">
                  <div className="text-8xl">🎨</div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-beauty-purple text-white text-xs px-3 py-1 rounded-full font-medium">
                        Nou
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-beauty-rose text-white text-xs px-3 py-1 rounded-full font-medium">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                {/* Brand */}
                <div className="text-sm text-gray-500">
                  {product.brand?.name}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-elegant font-bold text-gray-900">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-beauty-gold fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} recenzii)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-beauty-pink">
                    {product.price.toFixed(2)} lei
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice.toFixed(2)} lei
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium text-sm">
                      ✓ În stoc ({product.stockQuantity} disponibile)
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium text-sm">
                      Stoc epuizat
                    </span>
                  )}
                </div>

                {/* Quantity */}
                {product.inStock && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Cantitate:</span>
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-200 font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                      product.inStock
                        ? 'btn-primary'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      isInWishlist(product.id)
                        ? 'border-beauty-rose bg-beauty-rose/10'
                        : 'border-gray-200 hover:border-beauty-rose'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isInWishlist(product.id)
                          ? 'fill-beauty-rose text-beauty-rose'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>

                {/* View Full Details */}
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 text-beauty-pink hover:text-beauty-rose transition-colors font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Vezi detalii complete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;