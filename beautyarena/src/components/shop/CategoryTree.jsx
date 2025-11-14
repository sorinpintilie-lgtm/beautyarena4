import { useState, useEffect } from 'react';
import CategoryItem from './CategoryItem';

/**
 * CategoryTree Component
 * Recursive tree renderer for hierarchical categories
 * Handles expand/collapse state and filtering
 */
export default function CategoryTree({ 
  tree, 
  activeFilters = [], 
  expandedCategories = new Set(),
  searchQuery = '',
  level = 0,
  onSelect,
  onToggle
}) {
  const [filteredTree, setFilteredTree] = useState(tree);

  // Filter tree based on search query
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredTree(tree);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {};

    const filterRecursive = (currentTree) => {
      const result = {};
      
      Object.entries(currentTree).forEach(([key, category]) => {
        const matchesSearch = category.name.toLowerCase().includes(query);
        const hasMatchingChildren = Object.keys(category.children).length > 0;
        
        if (matchesSearch || hasMatchingChildren) {
          result[key] = {
            ...category,
            children: hasMatchingChildren ? filterRecursive(category.children) : {}
          };
        }
      });
      
      return result;
    };

    setFilteredTree(filterRecursive(tree));
  }, [searchQuery, tree]);

  if (!filteredTree || Object.keys(filteredTree).length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 text-sm">
        {searchQuery ? 'Nu s-au găsit categorii' : 'Nu există categorii'}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {Object.values(filteredTree).map((category) => {
        const hasChildren = Object.keys(category.children).length > 0;
        const isExpanded = expandedCategories.has(category.slug);
        const isActive = activeFilters.includes(category.slug);

        return (
          <div key={category.slug} className="category-item-wrapper">
            <CategoryItem
              category={category}
              isActive={isActive}
              hasChildren={hasChildren}
              isExpanded={isExpanded}
              level={level}
              onSelect={onSelect}
              onToggle={onToggle}
            />

            {/* Recursive rendering of children */}
            {hasChildren && isExpanded && (
              <div 
                className="ml-2 mt-1 animate-in slide-in-from-top-2 duration-200"
                style={{ 
                  borderLeft: '2px solid #f3f4f6',
                  marginLeft: `${level * 8 + 16}px`
                }}
              >
                <CategoryTree
                  tree={category.children}
                  activeFilters={activeFilters}
                  expandedCategories={expandedCategories}
                  searchQuery={searchQuery}
                  level={level + 1}
                  onSelect={onSelect}
                  onToggle={onToggle}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}