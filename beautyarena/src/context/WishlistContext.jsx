import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useLocalStorage('beautyarena-wishlist', []);

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.some(item => item.id === product.id);
      
      if (exists) {
        toast.error('Produsul este deja în lista de dorințe');
        return prevItems;
      }

      toast.success('Adăugat în lista de dorințe');
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          brand: product.brand?.name || '',
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.thumbnail || product.images?.[0],
          rating: product.rating,
          inStock: product.inStock,
          slug: product.slug,
        }
      ];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
    toast.success('Eliminat din lista de dorințe');
  };

  // Toggle item in wishlist
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Lista de dorințe golită');
  };

  const value = {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export default WishlistContext;