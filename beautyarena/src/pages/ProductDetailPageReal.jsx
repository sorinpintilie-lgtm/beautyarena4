import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, Check, ZoomIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { useProductBySlug, useRealProducts } from '../hooks/useRealProducts';
import { DescriptionModifier } from '../utils/descriptionModifier';
import { injectProductSchema, clearInjectedProductSchema } from '../utils/productSchema';
import SEO from '../components/common/SEO';
import ProductReviews from '../components/product/ProductReviews';
import SkeletonCard from '../components/common/SkeletonCard';

const SITE_URL = 'https://salonbeautyarena.ro';

const slugifyCategoryLevel = (value = '') => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .trim();

const getPrimaryProductImage = (item) => {
  if (item?.localImages && item.localImages.length > 0) return item.localImages[0];
  if (item?.images && item.images.length > 0) return item.images[0];
  return '/placeholder-image.jpg';
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProductBySlug(slug);
  const { products: allProducts, loading: relatedProductsLoading } = useRealProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const productPath = `/product/${product?.slug || slug || ''}`;

  // Modify descriptions to avoid copyright - must be called before any early returns
  const modifiedDescription = useMemo(() => {
    return DescriptionModifier.modifyDescription(product?.description || '');
  }, [product?.description]);

  const relatedProducts = useMemo(() => {
    if (!product || !allProducts || allProducts.length === 0) return [];

    const currentCategoryPathSlugs = new Set(
      (product.categoryPaths || []).flatMap((path) =>
        (path.levels || []).map(slugifyCategoryLevel).filter(Boolean)
      )
    );

    const currentTags = new Set((product.tags || []).map((tag) => String(tag).toLowerCase()));

    const scoredCandidates = allProducts
      .filter((candidate) => candidate.id !== product.id && candidate.slug !== product.slug)
      .map((candidate) => {
        let score = 0;

        if (candidate.brand?.id && candidate.brand.id === product.brand?.id) score += 4;
        if (candidate.subcategory && candidate.subcategory === product.subcategory) score += 3;
        if (candidate.category && candidate.category === product.category) score += 2;

        const candidatePathSlugs = new Set(
          (candidate.categoryPaths || []).flatMap((path) =>
            (path.levels || []).map(slugifyCategoryLevel).filter(Boolean)
          )
        );

        const hasSharedPath = [...candidatePathSlugs].some((slugValue) => currentCategoryPathSlugs.has(slugValue));
        if (hasSharedPath) score += 3;

        const candidateTags = new Set((candidate.tags || []).map((tag) => String(tag).toLowerCase()));
        const sharedTagCount = [...candidateTags].filter((tag) => currentTags.has(tag)).length;
        score += Math.min(sharedTagCount, 2);

        if (product.price > 0 && candidate.price > 0) {
          const relativePriceDifference = Math.abs(candidate.price - product.price) / product.price;
          if (relativePriceDifference <= 0.25) score += 1;
        }

        if (candidate.inStock) score += 0.5;

        return { candidate, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return (b.candidate.reviewCount || 0) - (a.candidate.reviewCount || 0);
      })
      .slice(0, 4)
      .map(({ candidate }) => candidate);

    if (scoredCandidates.length > 0) return scoredCandidates;

    return allProducts
      .filter((candidate) => candidate.id !== product.id && candidate.slug !== product.slug)
      .slice(0, 4);
  }, [allProducts, product]);

  // Track product view
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      setQuantity(1);
      setActiveTab('description');
      setActiveImageIndex(0);
    }
  }, [product, addToRecentlyViewed]);

  const schemaPayload = useMemo(() => {
    if (!product) return null;

    return {
      ...product,
      url: `${SITE_URL}${productPath}`,
    };
  }, [product, productPath]);

  useEffect(() => {
    if (!schemaPayload) return undefined;

    injectProductSchema(schemaPayload, SITE_URL);

    return () => {
      clearInjectedProductSchema();
    };
  }, [schemaPayload]);

  // Handle loading state
  if (loading) {
    return (
      <>
        <SEO
          title="Se încarcă produsul | BeautyArena"
          description="Se încarcă pagina produsului din magazinul BeautyArena."
          noindex={true}
        />
        <div className="min-h-screen bg-white pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <SkeletonCard className="aspect-square" />
              <div className="space-y-4">
                <SkeletonCard height="h-4" />
                <SkeletonCard height="h-8" />
                <SkeletonCard height="h-4" />
                <SkeletonCard height="h-6" />
                <SkeletonCard height="h-16" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Handle error state
  if (error || !product) {
    return (
      <>
        <SEO
          title="Produs negăsit | BeautyArena"
          description="Produsul căutat nu există sau nu mai este disponibil pe BeautyArena."
          noindex={true}
        />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Produs negăsit</h2>
            <p className="text-gray-600 mb-4">
              {error || 'Produsul căutat nu există sau nu este disponibil momentan.'}
            </p>
            <Link to="/shop" className="btn-primary">
              Înapoi la magazin
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Get all available images (local images take priority)
  const allImages = product.localImages && product.localImages.length > 0
    ? product.localImages
    : product.images && product.images.length > 0
    ? product.images
    : [];

  const productTitle = `${product.name} | ${product.brand?.name || 'BeautyArena'} | BeautyArena`;
  const productDescription = (product.shortDescription || product.description || 'Produs premium disponibil în magazinul BeautyArena.')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
  const productKeywords = [
    product.name,
    product.brand?.name,
    product.category,
    product.subcategory,
    ...(product.tags || []),
    'beautyarena',
  ]
    .filter(Boolean)
    .join(', ');
  const productImage = allImages[0] || '/visualMarketing_logo.png';

  return (
    <>
      <SEO
        title={productTitle}
        description={productDescription}
        keywords={productKeywords}
        image={productImage}
        canonical={productPath}
        type="product"
      />
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
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
              {allImages.length > 0 ? (
                <>
                  <img
                    src={allImages[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg'; // Fallback image
                    }}
                  />
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  >
                    <ZoomIn className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-9xl text-gray-300">🎨</div>
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-beauty-pink text-white text-sm px-3 py-1 rounded-full font-medium">
                    Nou
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-beauty-pink-dark text-white text-sm px-3 py-1 rounded-full font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === index
                        ? 'border-beauty-pink ring-2 ring-beauty-pink/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
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
                        ? 'text-beauty-peach fill-current'
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
                  <span className="bg-beauty-pink-dark text-white text-sm px-3 py-1 rounded-full font-medium">
                    Economisești {(product.originalPrice - product.price).toFixed(2)} lei
                  </span>
                </>
              )}
            </div>

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
                    : 'btn-disabled text-base'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                  isInWishlist(product.id)
                    ? 'border-beauty-pink bg-beauty-pink/10'
                    : 'border-gray-200 hover:border-beauty-pink'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist(product.id)
                      ? 'fill-beauty-pink text-beauty-pink'
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
              <div className="text-gray-700 leading-relaxed space-y-4">
                {modifiedDescription ? (
                  <div dangerouslySetInnerHTML={{ __html: modifiedDescription }} />
                ) : (
                  <p>Descrierea produsului nu este disponibilă momentan.</p>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{spec.key}</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    Specificațiile produsului nu sunt disponibile momentan.
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews productId={product.id} />
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-elegant font-bold text-gray-900 mb-8">
            Produse similare
          </h2>

          {relatedProductsLoading && relatedProducts.length === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={`related-loading-${index}`} className="aspect-square" />
              ))}
            </div>
          )}

          {!relatedProductsLoading && relatedProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nu am găsit produse similare momentan.
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="card-beauty group block"
                >
                  <div className="aspect-square bg-beauty-pink/10 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={getPrimaryProductImage(relatedProduct)}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">{relatedProduct.brand?.name}</p>
                    <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-beauty-pink transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-beauty-peach fill-current" />
                      <span className="text-xs">{relatedProduct.rating}</span>
                      <span className="text-xs text-gray-400">({relatedProduct.reviewCount || 0})</span>
                    </div>
                    <p className="text-sm md:text-lg font-bold text-beauty-pink">
                      {(relatedProduct.price || 0).toFixed(2)} lei
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

        {/* Image Modal */}
        {showImageModal && allImages.length > 0 && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                ✕
              </button>
              <img
                src={allImages[activeImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
