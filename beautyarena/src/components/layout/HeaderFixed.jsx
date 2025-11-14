import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Heart, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Header = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Acasă', path: '/' },
    { name: 'Magazin', path: '/shop' },
    { name: 'Servicii', path: '/#services' },
    { name: 'Despre', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-beauty border-b border-gray-200/20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl lg:text-2xl font-elegant font-bold gradient-text">
              BeautyArena
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.path}
                  className="text-gray-700 hover:text-beauty-pink transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition-colors duration-300 font-medium ${
                    isActive(item.path)
                      ? 'text-beauty-pink'
                      : 'text-gray-700 hover:text-beauty-pink'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300 relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-beauty-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-beauty-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <button className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300">
                <User className="w-5 h-5" />
              </button>
            ) : (
              <button className="text-gray-700 hover:text-beauty-pink transition-colors duration-300 font-medium text-sm">
                Autentificare
              </button>
            )}

            {/* Book Appointment */}
            <button className="btn-primary flex items-center space-x-2 text-sm px-4 py-2">
              <Calendar className="w-4 h-4" />
              <span>Programează</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 pb-4 border-t border-gray-200/20 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <nav className="flex flex-col space-y-1 pt-6">
              {navItems.map((item, index) => (
                item.path.startsWith('/#') ? (
                  <a
                    key={item.name}
                    href={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-beauty-pink hover:bg-beauty-pink/5 transition-all duration-300 rounded-lg mx-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="mr-3 text-beauty-pink">
                      {item.name === 'Acasă' && '🏠'}
                      {item.name === 'Magazin' && '🛍️'}
                      {item.name === 'Servicii' && '✨'}
                      {item.name === 'Despre' && '💄'}
                      {item.name === 'Contact' && '📞'}
                    </span>
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 font-medium ${
                      isActive(item.path)
                        ? 'text-beauty-pink bg-beauty-pink/10 border-l-4 border-beauty-pink'
                        : 'text-gray-700 hover:text-beauty-pink hover:bg-beauty-pink/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    <span className="mr-3 text-beauty-pink">
                      {item.name === 'Acasă' && '🏠'}
                      {item.name === 'Magazin' && '🛍️'}
                      {item.name === 'Servicii' && '✨'}
                      {item.name === 'Despre' && '💄'}
                      {item.name === 'Contact' && '📞'}
                    </span>
                    {item.name}
                  </Link>
                )
              ))}
              
              {!isAuthenticated && (
                <button
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-beauty-pink hover:bg-beauty-pink/5 transition-all duration-300 rounded-lg mx-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${navItems.length * 50}ms`,
                    animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <span className="mr-3 text-beauty-pink">👤</span>
                  Autentificare
                </button>
              )}

              <div className="px-2 mt-4">
                <button
                  className="btn-primary w-full flex items-center justify-center space-x-2 py-3"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // Handle booking action
                    const element = document.getElementById('services');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    animationDelay: `${(navItems.length + 1) * 50}ms`,
                    animation: isMenuOpen ? 'slideInUp 0.4s ease-out forwards' : 'none'
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Programează programare</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;