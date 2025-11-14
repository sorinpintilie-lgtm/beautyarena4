import React, { useEffect } from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight, CreditCard, Apple, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawerMobile = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();

  // Prevent body scroll when cart is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Mobile Bottom Sheet (lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white z-[70] rounded-t-3xl shadow-2xl transform transition-transform duration-300 max-h-[90vh] flex flex-col safe-area-pb">
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-beauty-pink/10 rounded-full">
              <ShoppingCart className="w-5 h-5 text-beauty-pink" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Coșul tău
              </h2>
              <p className="text-sm text-gray-600">
                {cartCount} {cartCount === 1 ? 'produs' : 'produse'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Coșul tău este gol</h3>
              <p className="text-gray-600 mb-6 px-4">
                Adaugă produse pentru a începe cumpărăturile
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="btn-primary px-8 py-3"
              >
                Descoperă produsele
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
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
                    
                    {/* Price */}
                    <p className="text-sm font-bold text-beauty-pink mb-3">
                      {(item.price * item.quantity).toFixed(2)} lei
                      {item.quantity > 1 && (
                        <span className="text-xs text-gray-500 font-normal ml-1">
                          ({item.price.toFixed(2)} lei/buc)
                        </span>
                      )}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-beauty-pink" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Payment Methods & Actions */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4 space-y-4 bg-white">
            {/* Payment Methods Preview */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </div>
              <div className="flex items-center gap-1">
                <Apple className="w-4 h-4" />
                <span>Apple Pay</span>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" />
                <span>Google Pay</span>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-900">Total:</span>
              <span className="text-beauty-pink">{cartSubtotal.toFixed(2)} lei</span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-gray-500 text-center">
              Taxele de livrare vor fi calculate la checkout
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white py-4 rounded-2xl font-semibold hover:from-beauty-pink-dark hover:to-beauty-pink transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <CreditCard className="w-5 h-5" />
                Finalizează comanda
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/shop"
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center active:scale-95"
              >
                Continuă cumpărăturile
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Side Drawer (hidden on mobile) */}
      <div className="hidden lg:block fixed right-0 top-0 h-full w-96 bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-beauty-pink/10 rounded-full">
              <ShoppingCart className="w-5 h-5 text-beauty-pink" />
            </div>
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

        {/* Desktop Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
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
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
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
                      <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
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
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-beauty-pink" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
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
            <div className="space-y-3">
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

export default CartDrawerMobile;