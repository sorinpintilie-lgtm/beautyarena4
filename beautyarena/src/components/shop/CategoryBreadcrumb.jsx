import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CategoryBreadcrumb Component
 * Displays breadcrumb navigation for category hierarchy
 * Mobile-optimized with horizontal scrolling
 */
export default function CategoryBreadcrumb({ path, onNavigate }) {
  if (!path || path.length === 0) return null;

  return (
    <nav 
      className="flex items-center gap-2 text-sm overflow-x-auto pb-2 scrollbar-hide"
      aria-label="Breadcrumb"
    >
      {/* Home link */}
      <Link
        to="/shop"
        className="flex items-center gap-1 text-gray-600 hover:text-beauty-pink transition-colors whitespace-nowrap flex-shrink-0"
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate(null);
          }
        }}
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Acasă</span>
      </Link>

      {/* Breadcrumb items */}
      {path.map((item, index) => {
        const isLast = index === path.length - 1;
        
        return (
          <div key={item.slug} className="flex items-center gap-2 flex-shrink-0">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium whitespace-nowrap">
                {item.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate && onNavigate(item.slug)}
                className="text-gray-600 hover:text-beauty-pink transition-colors whitespace-nowrap"
              >
                {item.name}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
}