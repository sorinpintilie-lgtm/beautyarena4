import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-beauty-pink" />
            <h2 className="text-lg font-semibold text-gray-900">
              Coșul tău ({cartCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">Coșul tău este gol</p>
              <p className="text-sm text-gray-500 mb-4">
                Adaugă produse pentru a continua cumpărăturile
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="btn-primary"
              >
                Descoperă produsele
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl">🎨</div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                      {item.name}
                    </h3>
                    {item.brand && (
                      <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-bold text-beauty-pink">
                          {(item.price * item.quantity).toFixed(2)} lei
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-500">
                            {item.price.toFixed(2)} lei/buc
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    className="p-2 hover:bg-white rounded transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-beauty-rose" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                {cartSubtotal.toFixed(2)} lei
              </span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-gray-500 text-center">
              Taxele de livrare vor fi calculate la checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Finalizează comanda
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                onClick={onClose}
                className="w-full btn-secondary flex items-center justify-center"
              >
                Continuă cumpărăturile
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;