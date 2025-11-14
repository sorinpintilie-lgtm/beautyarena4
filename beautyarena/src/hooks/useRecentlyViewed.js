import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('beautyarena-recently-viewed', []);

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prevItems => {
      // Remove if already exists
      const filtered = prevItems.filter(item => item.id !== product.id);
      
      // Add to beginning
      const updated = [
        {
          id: product.id,
          name: product.name,
          brand: product.brand?.name || '',
          price: product.price,
          originalPrice: product.originalPrice,
          rating: product.rating,
          image: product.thumbnail || product.images?.[0],
          slug: product.slug,
          viewedAt: new Date().toISOString(),
        },
        ...filtered
      ];

      // Keep only MAX_ITEMS
      return updated.slice(0, MAX_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};

export default useRecentlyViewed;