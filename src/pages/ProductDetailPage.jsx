import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, Check } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ProductReviews from '../components/product/ProductReviews';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produs negăsit</h2>
          <Link to="/shop" className="btn-primary">
            Înapoi la magazin
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-beauty-pink transition-colors">Acasă</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-beauty-pink transition-colors">Magazin</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-beauty-pink transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Înapoi
        </button>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="text-9xl">🎨</div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-beauty-purple text-white text-sm px-3 py-1 rounded-full font-medium">
                    Nou
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-beauty-rose text-white text-sm px-3 py-1 rounded-full font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="text-sm text-gray-500">
              {product.brand?.name}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-elegant font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
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
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-beauty-pink">
                {product.price.toFixed(2)} lei
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">
                    {product.originalPrice.toFixed(2)} lei
                  </span>
                  <span className="bg-beauty-rose text-white text-sm px-3 py-1 rounded-full font-medium">
                    Economisești {(product.originalPrice - product.price).toFixed(2)} lei
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">În stoc</span>
                  <span className="text-gray-500 text-sm">({product.stockQuantity} disponibile)</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Stoc epuizat</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Cantitate:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-200 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-medium transition-all duration-300 ${
                  product.inStock
                    ? 'btn-primary text-base'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border-2 rounded-lg transition-all duration-300 ${
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

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 text-beauty-pink mx-auto mb-2" />
                <p className="text-xs text-gray-600">Livrare gratuită peste 200 lei</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-beauty-pink mx-auto mb-2" />
                <p className="text-xs text-gray-600">Produse originale garantate</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-beauty-pink mx-auto mb-2" />
                <p className="text-xs text-gray-600">Retur în 14 zile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Tab Headers */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-beauty-pink'
                    : 'text-gray-600 hover:text-beauty-pink'
                }`}
              >
                {tab === 'description' && 'Descriere'}
                {tab === 'specifications' && 'Specificații'}
                {tab === 'reviews' && `Recenzii (${product.reviewCount})`}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-beauty-pink"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="text-gray-600 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{spec.key}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Recenziile vor fi disponibile în curând</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-elegant font-bold text-gray-900 mb-8">
              Produse similare
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="card-beauty group"
                >
                  <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-4xl">🎨</div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">{relatedProduct.brand?.name}</p>
                    <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-beauty-pink transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-beauty-gold fill-current" />
                      <span className="text-xs">{relatedProduct.rating}</span>
                    </div>
                    <p className="text-lg font-bold text-beauty-pink">
                      {relatedProduct.price.toFixed(2)} lei
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;