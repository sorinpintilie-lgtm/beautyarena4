import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { getCategoryIcon } from '../../utils/categoryIcons';

/**
 * CategoryItem Component
 * Individual category item with expand/collapse and selection
 * Mobile-optimized with large touch targets (min 44px)
 */
export default function CategoryItem({ 
  category, 
  isActive, 
  hasChildren, 
  isExpanded,
  level = 0,
  onSelect, 
  onToggle 
}) {
  const Icon = getCategoryIcon(category.name);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      onToggle(category.slug);
    } else {
      onSelect(category.slug);
    }
  };

  // Calculate indentation based on level
  const indentClass = level > 0 ? `pl-${Math.min(level * 4, 12)}` : '';

  return (
    <button
      onClick={handleClick}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        w-full flex items-center gap-3 py-3 px-4 text-left
        transition-all duration-200 ease-in-out
        ${indentClass}
        ${isActive
          ? 'bg-beauty-pink-light text-beauty-pink-dark font-medium'
          : 'text-gray-700 hover:bg-gray-50'
        }
        ${isPressed ? 'scale-[0.98]' : 'scale-100'}
        active:scale-[0.98]
        min-h-[44px]
        rounded-lg
      `}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-pressed={isActive}
    >
      {/* Expand/Collapse Icon */}
      {hasChildren && (
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          )}
        </div>
      )}

      {/* Category Icon */}
      <div className={`flex-shrink-0 ${hasChildren ? '' : 'ml-5'}`}>
        <Icon
          className={`w-5 h-5 ${isActive ? 'text-beauty-pink' : 'text-gray-500'}`}
        />
      </div>

      {/* Category Name */}
      <span className="flex-1 text-sm">
        {category.name}
      </span>

      {/* Product Count */}
      <span
        className={`
          flex-shrink-0 text-xs px-2 py-0.5 rounded-full
          ${isActive
            ? 'bg-beauty-pink text-white'
            : 'bg-gray-100 text-gray-600'
          }
        `}
      >
        {category.count}
      </span>
    </button>
  );
}