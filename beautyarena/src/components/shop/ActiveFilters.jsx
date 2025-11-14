import { X } from 'lucide-react';

/**
 * ActiveFilters Component
 * Displays active category filters with easy removal
 * Mobile-optimized with horizontal scrolling
 */
export default function ActiveFilters({ filters, onRemove, onClearAll }) {
  if (!filters || filters.length === 0) return null;
  
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700">
          Filtre active:
        </span>
        {filters.length > 1 && (
          <button
            onClick={onClearAll}
            className="text-sm text-beauty-pink hover:text-beauty-pink-dark font-medium transition-colors"
          >
            Șterge toate
          </button>
        )}
      </div>
      
      {/* Horizontal scrollable container for mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.slug}
            onClick={() => onRemove(filter.slug)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-beauty-pink-light text-beauty-pink-dark rounded-full text-sm font-medium hover:bg-beauty-pink/20 transition-colors whitespace-nowrap flex-shrink-0 group"
            aria-label={`Remove ${filter.name} filter`}
          >
            <span>{filter.name}</span>
            <X className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );
}