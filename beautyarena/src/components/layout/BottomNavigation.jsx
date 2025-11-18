import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ShoppingBag, Calendar } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BottomNavigation = ({ onMenuClick, onCartClick }) => {
  const location = useLocation();
  const { cartCount } = useCart();
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const navItems = [
    {
      id: 'services',
      label: 'Servicii',
      icon: Sparkles,
      path: '/servicii',
      isActive: location.pathname.startsWith('/servicii'),
    },
    {
      id: 'shop',
      label: 'Magazin',
      icon: ShoppingBag,
      path: '/shop',
      isActive: location.pathname.startsWith('/shop'),
    },
    {
      id: 'booking',
      label: 'Programează-te',
      icon: Calendar,
      path: '/programare',
      isActive: location.pathname.startsWith('/programare'),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      // Hide when scrolling down, show when scrolling up
      if (currentY > 80 && diff > 5) {
        setIsHidden(true);
      } else if (diff < -5) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (item) => {
    // Future item click handlers can be added here
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        isHidden ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Bottom Navigation Bar */}
      <div
        className="px-3 py-2 safe-area-pb shadow-lg"
        style={{
          backgroundColor: '#FFB6A3',
          background: '#FFB6A3',
        }}
      >
        <div className="flex items-center justify-around mx-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.isActive;
             
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 min-w-[70px] flex-1 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-white/30 shadow-md'
                    : 'hover:bg-white/20 active:bg-white/10'
                }`}
              >
                <div className="relative mb-1.5">
                  <IconComponent
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? 'text-white drop-shadow-sm transform scale-110'
                        : 'text-white/90 hover:text-white drop-shadow-sm'
                    }`}
                  />
                  
                  {/* Cart badge - only show on shop */}
                  {item.id === 'shop' && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-beauty-pink-dark text-white text-[9px] font-bold rounded-full min-w-[18px] h-4.5 px-1.5 flex items-center justify-center shadow-md border border-white/20">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] font-semibold transition-all duration-300 text-center leading-tight drop-shadow-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-white/90'
                }`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" style={{ backgroundColor: '#FFB6A3' }}></div>
    </nav>
  );
};

export default BottomNavigation;