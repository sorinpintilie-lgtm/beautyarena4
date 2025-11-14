import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react';
import { useRealProducts } from '../hooks/useRealProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productLoader } from '../utils/productLoader';
import CategoryDrawer from '../components/shop/CategoryDrawer';
import ActiveFilters from '../components/shop/ActiveFilters';
import CategoryBreadcrumb from '../components/shop/CategoryBreadcrumb';
import PriceRangeSlider from '../components/shop/PriceRangeSlider';
import Pagination from '../components/shop/Pagination';
import SEO from '../components/common/SEO';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ShopPage = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products, loading, error } = useRealProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Category system state
  const [categoryTree, setCategoryTree] = useState(null);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [breadcrumbPath, setBreadcrumbPath] = useState([]);
  
  // Calculate dynamic price range based on real products
  const priceStats = useMemo(() => {
    if (!products || products.length === 0) return { min: 0, max: 500 };
    const prices = products.map(p => p.price || 0).filter(price => price > 0);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(null); // Single active category
  const [priceRange, setPriceRange] = useState([priceStats.min, priceStats.max]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Load category tree on mount
  useEffect(() => {
    productLoader.loadCategoryTree().then(setCategoryTree);
  }, []);

  // Sync category filter with URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    setActiveCategory(categoryParam || null);
  }, [searchParams]);

  // Update breadcrumb when category filter changes
  useEffect(() => {
    if (activeCategory && categoryTree) {
      productLoader.getCategoryPath(activeCategory).then(setBreadcrumbPath);
    } else {
      setBreadcrumbPath([]);
    }
  }, [activeCategory, categoryTree]);

  // Handle category filter change (single selection)
  const handleCategoryFilterChange = (categorySlug) => {
    setActiveCategory(categorySlug);
    if (categorySlug) {
      setSearchParams({ category: categorySlug });
    } else {
      setSearchParams({});
    }
  };

  // Get category name for active filter display
  const activeCategoryFilter = useMemo(() => {
    if (!categoryTree || !activeCategory) return null;
    
    const findCategory = (tree, targetSlug) => {
      for (const category of Object.values(tree)) {
        if (category.slug === targetSlug) {
          return { slug: category.slug, name: category.name };
        }
        if (Object.keys(category.children).length > 0) {
          const found = findCategory(category.children, targetSlug);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findCategory(categoryTree, activeCategory);
  }, [activeCategory, categoryTree]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
       
      // New hierarchical category filtering (single selection)
      const matchesHierarchicalCategory = !activeCategory ||
        (product.categoryPaths && product.categoryPaths.some(path =>
          path.levels.some(level => {
            const levelSlug = level.toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
            return levelSlug === activeCategory;
          })
        ));
       
      // Legacy category filtering (removed - only hierarchical filtering remains)
       
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = !showInStockOnly || product.inStock;
         
      return matchesSearch && matchesHierarchicalCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Debug first few products
    if (filtered.length > 0 && filtered[0].images) {
      console.log('Sample product images:', {
        name: filtered[0].name,
        images: filtered[0].images,
        localImages: filtered[0].localImages
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'most-sold':
          // Sort by review count as proxy for sales popularity
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        case 'name':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

    return filtered;
  }, [products, searchTerm, activeCategory, priceRange, minRating, showInStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory, priceRange, minRating, showInStockOnly]);

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

  // Show loading state
  if (loading) {
    return (
      <>
        <SEO
          title="Shop - Loading... | BeautyArena"
          description="Browse our collection of premium beauty products."
          keywords="shop beauty products, buy cosmetics online, makeup shop, skincare products, haircare products, beauty products"
        />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Se încarcă produsele...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <SEO
          title="Shop - Error | BeautyArena"
          description="Browse our collection of premium beauty products."
          keywords="shop beauty products, buy cosmetics online, makeup shop, skincare products, haircare products, beauty products"
        />
        <div className="min-h-screen bg-gray-50 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-xl font-semibold text-red-800 mb-2">Eroare la încărcarea produselor</h2>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Reîncarcă pagina
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Shop - Premium Beauty Products | BeautyArena"
        description="Browse our collection of 173+ premium beauty products. Filter by category, price, and rating. Free shipping on orders over 200 lei."
        keywords="shop beauty products, buy cosmetics online, makeup shop, skincare products, haircare products, beauty products"
      />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-elegant font-bold text-gray-900 mb-4">
              Magazin produse
            </h1>
            <p className="text-lg text-gray-600">
              Descoperă {filteredProducts.length} produse de frumusețe premium
            </p>
            
            {/* Category Breadcrumb */}
            {breadcrumbPath.length > 0 && (
              <div className="mt-4">
                <CategoryBreadcrumb
                  path={breadcrumbPath}
                  onNavigate={(slug) => {
                    handleCategoryFilterChange(slug);
                  }}
                />
              </div>
            )}
          </div>

          {/* Active Category Filter */}
          {activeCategoryFilter && (
            <ActiveFilters
              filters={[activeCategoryFilter]}
              onRemove={() => handleCategoryFilterChange(null)}
              onClearAll={() => handleCategoryFilterChange(null)}
            />
          )}

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Category Button - Desktop */}
              <button
                onClick={() => setIsCategoryDrawerOpen(true)}
                className="px-4 py-3 border-2 border-beauty-pink text-beauty-pink rounded-lg hover:bg-beauty-pink hover:text-gray-900 transition-all font-medium flex items-center justify-center gap-2"
              >
                <Filter className="w-5 h-5" />
                <span>CATEGORII</span>
                {activeCategory && (
                  <span className="bg-beauty-pink text-white px-2 py-0.5 rounded-full text-xs">
                    1
                  </span>
                )}
              </button>

              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Caută produse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full min-w-[200px] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink appearance-none bg-white pr-10 cursor-pointer transition-all font-medium"
                >
                  <option value="name">Sortare alfabetică (A - Z)</option>
                  <option value="price-low">Preț: Crescător</option>
                  <option value="price-high">Preț: Descrescător</option>
                  <option value="rating">Cele mai apreciate</option>
                  <option value="most-sold">Cele mai vândute</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* View Mode */}
              <div className="relative">
                <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50 relative">
                  {/* Active indicator */}
                  <div
                    className={`absolute top-1 bottom-1 bg-beauty-pink rounded-md transition-all duration-300 ease-in-out ${
                      viewMode === 'grid'
                        ? 'left-1 w-[calc(50%-0.25rem)]'
                        : 'left-1/2 w-[calc(50%-0.25rem)]'
                    }`}
                  />
                  
                  <button
                    onClick={() => setViewMode('grid')}
                    title="Vizualizare grilă - Afișează produsele în coloane"
                    className="relative z-10 flex items-center gap-2 px-4 py-3 transition-all duration-200 flex-1"
                  >
                    <Grid className={`w-5 h-5 transition-colors ${
                      viewMode === 'grid' ? 'text-white' : 'text-gray-600'
                    }`} />
                    <span className={`hidden sm:inline font-medium text-sm transition-colors ${
                      viewMode === 'grid' ? 'text-white' : 'text-gray-600'
                    }`}>
                      Grilă
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setViewMode('list')}
                    title="Vizualizare listă - Afișează produsele pe o singură coloană"
                    className="relative z-10 flex items-center gap-2 px-4 py-3 transition-all duration-200 flex-1"
                  >
                    <List className={`w-5 h-5 transition-colors ${
                      viewMode === 'list' ? 'text-white' : 'text-gray-600'
                    }`} />
                    <span className={`hidden sm:inline font-medium text-sm transition-colors ${
                      viewMode === 'list' ? 'text-white' : 'text-gray-600'
                    }`}>
                      Listă
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Mobile Category Filter Button */}
            <button
              onClick={() => setIsCategoryDrawerOpen(true)}
              className="lg:hidden fixed bottom-20 right-4 z-30 bg-beauty-pink text-white px-4 py-3 rounded-full shadow-lg hover:bg-beauty-pink-dark transition-all hover:scale-110 flex items-center gap-2"
              aria-label="Open category filters"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm font-medium uppercase">CATEGORII</span>
            </button>

            {/* Category Drawer */}
            <CategoryDrawer
              isOpen={isCategoryDrawerOpen}
              onClose={() => setIsCategoryDrawerOpen(false)}
              categoryTree={categoryTree}
              activeFilter={activeCategory}
              onFilterChange={handleCategoryFilterChange}
            />

            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtre
                </h3>

                {/* Price Range Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="font-medium mb-3">Interval preț</h4>
                  <PriceRangeSlider
                    min={priceStats.min}
                    max={priceStats.max}
                    value={priceRange}
                    onChange={setPriceRange}
                  />
                </div>

                {/* Rating Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="font-medium mb-3">Rating minim</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map(rating => (
                      <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="text-beauty-pink focus:ring-beauty-pink"
                        />
                        <div className="ml-2 flex items-center gap-1">
                          {rating > 0 ? (
                            <>
                              <Star className="w-4 h-4 text-beauty-peach fill-current" />
                              <span className="text-sm">{rating}+ stele</span>
                            </>
                          ) : (
                            <span className="text-sm">Toate produsele</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <label className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={(e) => setShowInStockOnly(e.target.checked)}
                      className="rounded text-beauty-pink focus:ring-beauty-pink"
                    />
                    <span className="ml-2 text-sm font-medium">Doar produse în stoc</span>
                  </label>
                </div>

                {/* Clear Filters */}
                {(activeCategory || minRating > 0 || showInStockOnly || priceRange[0] !== priceStats.min || priceRange[1] !== priceStats.max) && (
                  <button
                    onClick={() => {
                      setActiveCategory(null);
                      setPriceRange([priceStats.min, priceStats.max]);
                      setMinRating(0);
                      setShowInStockOnly(false);
                      setSearchParams({});
                    }}
                    className="w-full text-sm text-beauty-pink hover:text-beauty-pink-dark transition-colors font-medium"
                  >
                    Resetează toate filtrele
                  </button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-600 text-lg mb-4">Nu am găsit produse care să corespundă criteriilor tale.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory(null);
                      setPriceRange([priceStats.min, priceStats.max]);
                      setMinRating(0);
                      setShowInStockOnly(false);
                      setSearchParams({});
                    }}
                    className="btn-secondary"
                  >
                    Resetează toate filtrele
                  </button>
                </div>
              ) : (
                <>
                  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-3 md:gap-6`}>
                    {paginatedProducts.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="card-beauty group block"
                      >
                        {/* Product Image - Mobile optimized */}
                        <div className="relative aspect-square bg-beauty-pink/10 rounded-lg mb-2 md:mb-4 overflow-hidden">
                          {product.localImages && product.localImages.length > 0 ? (
                            <img
                              src={product.localImages[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                console.error(`Failed to load image: ${product.localImages[0]}`);
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : product.images && product.images.length > 0 && product.images[0] && product.images[0].startsWith('http') ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                console.error(`Failed to load external image: ${product.images[0]}`);
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <div className="text-3xl md:text-6xl text-gray-400">🎨</div>
                            </div>
                          )}
                          
                          {/* Fallback placeholder */}
                          <div
                            className="hidden w-full h-full items-center justify-center bg-gray-100"
                            style={{ display: 'none' }}
                          >
                            <div className="text-3xl md:text-6xl text-gray-400">🎨</div>
                          </div>
                          
                          {/* Badges - Smaller on mobile */}
                          <div className="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col gap-1">
                            {product.isNew && (
                              <span className="bg-beauty-pink text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs">Nou</span>
                            )}
                            {product.discount > 0 && (
                              <span className="bg-beauty-pink-dark text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs">-{product.discount}%</span>
                            )}
                            {!product.inStock && (
                              <span className="bg-gray-500 text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded-full text-xs">Stoc epuizat</span>
                            )}
                          </div>

                          {/* Wishlist Button - Smaller on mobile */}
                          <button
                            onClick={(e) => handleToggleWishlist(e, product)}
                            className="absolute top-1 right-1 md:top-2 md:right-2 p-1 md:p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group/wishlist"
                          >
                            <Heart
                              className={`w-3 h-3 md:w-4 md:h-4 transition-colors ${
                                isInWishlist(product.id)
                                  ? 'fill-beauty-pink text-beauty-pink'
                                  : 'text-gray-600 group-hover/wishlist:text-beauty-pink'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Product Info - Mobile optimized */}
                        <div className="space-y-1 md:space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{product.brand?.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-beauty-peach fill-current" />
                              <span className="text-xs text-gray-600">{product.rating}</span>
                              <span className="text-xs text-gray-400">({product.reviewCount})</span>
                            </div>
                          </div>

                          <h3 className="text-xs md:text-sm font-semibold line-clamp-2 group-hover:text-beauty-pink transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-1 md:gap-2">
                            <span className="text-sm md:text-lg font-bold text-beauty-pink">
                              {product.price.toFixed(2)} lei
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs md:text-sm text-gray-500 line-through">
                                {product.originalPrice.toFixed(2)} lei
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                            className={`w-full flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm py-1.5 md:py-2 rounded-lg font-medium transition-all duration-300 ${
                              product.inStock
                                ? 'btn-primary hover:scale-105'
                                : 'btn-disabled'
                            }`}
                          >
                            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                            {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      onItemsPerPageChange={(value) => {
                        setItemsPerPage(value);
                        setCurrentPage(1);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;