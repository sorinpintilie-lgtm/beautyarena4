import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react';
import products from '../data/products';
import categories from '../data/categories';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import PriceRangeSlider from '../components/shop/PriceRangeSlider';
import Pagination from '../components/shop/Pagination';
import SEO from '../components/common/SEO';

const ShopPage = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Handle URL category parameter
  useEffect(() => {
    if (category) {
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData && !selectedCategories.includes(categoryData.id)) {
        setSelectedCategories([categoryData.id]);
      }
    }
  }, [category, selectedCategories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !showInStockOnly || product.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    // Sort
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
  }, [searchTerm, selectedCategories, priceRange, minRating, showInStockOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, priceRange, minRating, showInStockOnly]);

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
    <>
      <SEO 
        title="Shop - Premium Beauty Products | BeautyArena"
        description="Browse our collection of 50+ premium beauty products. Filter by category, price, and rating. Free shipping on orders over 200 lei."
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
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
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
                  className={`p-3 ${viewMode === 'grid' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-beauty-pink text-white' : 'text-gray-600'} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtre
                </h3>

                {/* Category Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="font-medium mb-3">Categorii</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCategories([...selectedCategories, category.id]);
                            } else {
                              setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                            }
                          }}
                          className="rounded text-beauty-pink focus:ring-beauty-pink"
                        />
                        <span className="ml-2 text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="pb-6 border-b border-gray-200">
                  <h4 className="font-medium mb-3">Interval preț</h4>
                  <PriceRangeSlider
                    min={0}
                    max={500}
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
                              <Star className="w-4 h-4 text-beauty-gold fill-current" />
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
                {(selectedCategories.length > 0 || minRating > 0 || showInStockOnly || priceRange[0] > 0 || priceRange[1] < 500) && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setPriceRange([0, 500]);
                      setMinRating(0);
                      setShowInStockOnly(false);
                    }}
                    className="w-full text-sm text-beauty-pink hover:text-beauty-rose transition-colors font-medium"
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
                      setSelectedCategories([]);
                      setPriceRange([0, 500]);
                      setMinRating(0);
                      setShowInStockOnly(false);
                    }}
                    className="btn-secondary"
                  >
                    Resetează toate filtrele
                  </button>
                </div>
              ) : (
                <>
                  <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                    {paginatedProducts.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="card-beauty group block"
                      >
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-6xl">🎨</div>
                          
                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.isNew && (
                              <span className="bg-beauty-purple text-white text-xs px-2 py-1 rounded-full">Nou</span>
                            )}
                            {product.discount > 0 && (
                              <span className="bg-beauty-rose text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>
                            )}
                            {!product.inStock && (
                              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">Stoc epuizat</span>
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
                                  ? 'fill-beauty-rose text-beauty-rose' 
                                  : 'text-gray-600 group-hover/wishlist:text-beauty-rose'
                              }`} 
                            />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{product.brand?.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-beauty-gold fill-current" />
                              <span className="text-xs text-gray-600">{product.rating}</span>
                              <span className="text-xs text-gray-400">({product.reviewCount})</span>
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
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <ShoppingCart className="w-4 h-4" />
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