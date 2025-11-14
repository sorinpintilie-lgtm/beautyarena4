import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import products from '../../data/products';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('beautyarena-recent-searches', []);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Search suggestions
  const suggestions = query.length >= 2
    ? products
        .filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand?.name.toLowerCase().includes(query.toLowerCase()) ||
          p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  // Popular searches
  const popularSearches = ['Ser vitamina C', 'Rimel', 'Fond de ten', 'Hidratant', 'Lac unghii'];

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 5);
    });

    // Navigate to shop with search
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`);
    setQuery('');
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          placeholder="Caută produse, branduri..."
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {/* Suggestions */}
          {query.length >= 2 && suggestions.length > 0 && (
            <div className="p-2">
              <p className="text-xs font-medium text-gray-500 px-3 py-2">Sugestii</p>
              {suggestions.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl">🎨</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500">{product.brand?.name}</p>
                  </div>
                  <p className="text-sm font-semibold text-beauty-pink">
                    {product.price.toFixed(2)} lei
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {query.length < 2 && recentSearches.length > 0 && (
            <div className="p-2 border-t border-gray-100">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs font-medium text-gray-500">Căutări recente</p>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-beauty-pink hover:text-beauty-pink-dark"
                >
                  Șterge
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {query.length < 2 && (
            <div className="p-2 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 px-3 py-2">Căutări populare</p>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <TrendingUp className="w-4 h-4 text-beauty-pink" />
                  <span className="text-sm text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {query.length >= 2 && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-600">Nu am găsit rezultate pentru "{query}"</p>
              <button
                onClick={() => handleSearch(query)}
                className="mt-4 text-sm text-beauty-pink hover:text-beauty-pink-dark"
              >
                Caută în toate produsele
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;