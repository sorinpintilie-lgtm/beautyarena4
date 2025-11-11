import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Calendar, Heart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                <span className="absolute -top-1 -right-1 bg-beauty-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
                <span className="absolute -top-1 -right-1 bg-beauty-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Wishlist */}
            <Link to="/wishlist" className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300 relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-beauty-purple text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Cart */}
            <button
              onClick={onCartClick}
              className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-beauty-rose text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-beauty-pink transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200/20">
            <nav className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                item.path.startsWith('/#') ? (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-gray-700 hover:text-beauty-pink transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`transition-colors duration-300 font-medium py-2 ${
                      isActive(item.path)
                        ? 'text-beauty-pink'
                        : 'text-gray-700 hover:text-beauty-pink'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {!isAuthenticated && (
                <button className="text-left text-gray-700 hover:text-beauty-pink transition-colors duration-300 font-medium py-2">
                  Autentificare
                </button>
              )}

              <button className="btn-primary flex items-center justify-center space-x-2 mt-4">
                <Calendar className="w-4 h-4" />
                <span>Programează programare</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;