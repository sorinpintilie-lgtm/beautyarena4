import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('beautyarena-cart', []);

  // Calculate cart totals
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartTotal = cartSubtotal; // Can add shipping, tax, etc. later

  // Add item to cart
  const addToCart = (product, quantity = 1, variantId = null) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.productId === product.id && item.variantId === variantId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Cantitate actualizată în coș');
        return updatedItems;
      } else {
        // New item, add to cart
        toast.success('Produs adăugat în coș');
        return [
          ...prevItems,
          {
            productId: product.id,
            variantId,
            name: product.name,
            brand: product.brand?.name || '',
            price: product.price,
            image: product.thumbnail || product.images?.[0],
            quantity,
            inStock: product.inStock,
          }
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, variantId = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.productId === productId && item.variantId === variantId)
      )
    );
    toast.success('Produs eliminat din coș');
  };

  // Update item quantity
  const updateQuantity = (productId, quantity, variantId = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success('Coș golit');
  };

  // Check if item is in cart
  const isInCart = (productId, variantId = null) => {
    return cartItems.some(
      item => item.productId === productId && item.variantId === variantId
    );
  };

  // Get item quantity
  const getItemQuantity = (productId, variantId = null) => {
    const item = cartItems.find(
      item => item.productId === productId && item.variantId === variantId
    );
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;