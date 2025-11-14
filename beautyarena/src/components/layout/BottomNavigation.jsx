import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

const BottomNavigation = ({ onMenuClick, onCartClick }) => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();

  const navItems = [
    {
      id: 'home',
      label: 'Acasă',
      icon: Home,
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      id: 'shop',
      label: 'Magazin',
      icon: ShoppingBag,
      path: '/shop',
      isActive: location.pathname.startsWith('/shop')
    },
    {
      id: 'wishlist',
      label: 'Favorite',
      icon: Heart,
      path: '/wishlist',
      isActive: location.pathname === '/wishlist',
      badge: wishlistCount
    }
  ];

  const handleItemClick = (item) => {
    // Future item click handlers can be added here
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Bottom Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-beauty border-t border-gray-200/20 px-2 py-2 safe-area-pb">
        <div className="flex items-center justify-around mx-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.isActive;
             
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex flex-col items-center justify-center p-1 min-w-[60px] flex-1 rounded-lg transition-all duration-300 hover:bg-gray-50 active:scale-95"
              >
                <div className="relative mb-1">
                  <IconComponent
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive
                        ? 'text-beauty-pink'
                        : 'text-gray-600 hover:text-beauty-pink'
                    }`}
                  />
                  
                  {/* Cart badge - only show on shop/cart items, not wishlist */}
                  {item.id === 'shop' && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-beauty-pink text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-300 text-center leading-tight ${
                  isActive
                    ? 'text-beauty-pink'
                    : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white/95 backdrop-blur-beauty"></div>
    </nav>
  );
};

export default BottomNavigation;