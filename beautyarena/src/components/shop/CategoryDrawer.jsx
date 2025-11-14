import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';

/**
 * CategoryDrawer Component - Redesigned
 * Simple navigation-style drawer that slides from left
 * Click category name to filter, click arrow to expand subcategories
 * Single selection only, instant filtering (no Apply button)
 */
export default function CategoryDrawer({ 
  isOpen, 
  onClose, 
  categoryTree, 
  activeFilter = null, // Single active filter
  onFilterChange,
  className = ''
}) {
  const [currentLevel, setCurrentLevel] = useState([]);
  const [navigationStack, setNavigationStack] = useState([]);

  // Initialize with top level categories
  useEffect(() => {
    if (categoryTree) {
      setCurrentLevel(Object.values(categoryTree));
      setNavigationStack([{ name: 'Toate categoriile', categories: Object.values(categoryTree) }]);
    }
  }, [categoryTree]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCategoryClick = (category) => {
    // Filter by this category immediately
    if (onFilterChange) {
      onFilterChange(category.slug);
    }
    onClose();
  };

  const handleExpandCategory = (category, e) => {
    e.stopPropagation();
    
    if (Object.keys(category.children).length > 0) {
      // Navigate into subcategories
      setCurrentLevel(Object.values(category.children));
      setNavigationStack([...navigationStack, { 
        name: category.name, 
        categories: Object.values(category.children) 
      }]);
    }
  };

  const handleBack = () => {
    if (navigationStack.length > 1) {
      const newStack = navigationStack.slice(0, -1);
      setNavigationStack(newStack);
      setCurrentLevel(newStack[newStack.length - 1].categories);
    }
  };

  const handleReset = () => {
    if (onFilterChange) {
      onFilterChange(null);
    }
    onClose();
  };

  if (!categoryTree) {
    return null;
  }

  const currentTitle = navigationStack[navigationStack.length - 1]?.name || 'Categorii';
  const canGoBack = navigationStack.length > 1;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer - Slides from LEFT */}
      <div 
        className={`
          fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col shadow-2xl
          ${className}
        `}
        role="dialog"
        aria-label="Category navigation"
        aria-modal="true"
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
                  aria-label="Go back"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-900">
                {currentTitle}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Category List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Reset/All Products Option */}
          {navigationStack.length === 1 && (
            <button
              onClick={handleReset}
              className={`
                w-full flex items-center justify-between px-6 py-4 text-left
                transition-all duration-200
                ${!activeFilter
                  ? 'bg-beauty-pink text-white font-medium shadow-sm'
                  : 'text-gray-800 hover:bg-beauty-pink-light hover:text-beauty-pink-dark'
                }
                border-b border-gray-200
              `}
            >
              <span className="text-base">Toate produsele</span>
              {!activeFilter && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </button>
          )}

          {/* Category Items */}
          {currentLevel.map((category) => {
            const hasChildren = Object.keys(category.children).length > 0;
            const isActive = activeFilter === category.slug;

            return (
              <div
                key={category.slug}
                className={`
                  flex items-center justify-between px-6 py-4
                  transition-all duration-200
                  ${isActive
                    ? 'bg-beauty-pink text-white font-medium shadow-sm'
                    : 'text-gray-800 hover:bg-beauty-pink-light hover:text-beauty-pink-dark'
                  }
                  border-b border-gray-200
                `}
              >
                {/* Category Name - Click to filter */}
                <button
                  onClick={() => handleCategoryClick(category)}
                  className="flex-1 text-left text-base py-2 hover:translate-x-1 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className={`text-sm ml-2 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      ({category.count})
                    </span>
                  </div>
                </button>

                {/* Arrow - Click to expand */}
                {hasChildren && (
                  <button
                    onClick={(e) => handleExpandCategory(category, e)}
                    className={`p-2 rounded-full transition-colors ml-2 ${
                      isActive ? 'hover:bg-white/20' : 'hover:bg-gray-200'
                    }`}
                    aria-label={`Expand ${category.name}`}
                  >
                    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </button>
                )}

                {/* Active Indicator */}
                {isActive && !hasChildren && (
                  <div className="w-2 h-2 rounded-full bg-white ml-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}