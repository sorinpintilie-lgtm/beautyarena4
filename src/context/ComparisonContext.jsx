import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useLocalStorage('beautyarena-comparison', []);
  const MAX_ITEMS = 4;

  // Add item to comparison
  const addToComparison = (product) => {
    setComparisonItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      
      if (exists) {
        toast.error('Produsul este deja în comparație');
        return prevItems;
      }

      if (prevItems.length >= MAX_ITEMS) {
        toast.error(`Poți compara maxim ${MAX_ITEMS} produse`);
        return prevItems;
      }

      toast.success('Adăugat la comparație');
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          brand: product.brand?.name || '',
          price: product.price,
          originalPrice: product.originalPrice,
          rating: product.rating,
          reviewCount: product.reviewCount,
          category: product.category,
          subcategory: product.subcategory,
          specifications: product.specifications,
          image: product.thumbnail || product.images?.[0],
          slug: product.slug,
          inStock: product.inStock,
        }
      ];
    });
  };

  // Remove item from comparison
  const removeFromComparison = (productId) => {
    setComparisonItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
    toast.success('Eliminat din comparație');
  };

  // Toggle item in comparison
  const toggleComparison = (product) => {
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  // Check if item is in comparison
  const isInComparison = (productId) => {
    return comparisonItems.some(item => item.id === productId);
  };

  // Clear entire comparison
  const clearComparison = () => {
    setComparisonItems([]);
    toast.success('Comparație golită');
  };

  const value = {
    comparisonItems,
    comparisonCount: comparisonItems.length,
    maxItems: MAX_ITEMS,
    addToComparison,
    removeFromComparison,
    toggleComparison,
    isInComparison,
    clearComparison,
  };

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
};

export default ComparisonContext;