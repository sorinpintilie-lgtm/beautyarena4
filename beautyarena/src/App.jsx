import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ComparisonProvider } from './context/ComparisonContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomNavigation from './components/layout/BottomNavigation';
import CartDrawer from './components/cart/CartDrawer';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPageReal'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));
const CarouselTest = lazy(() => import('./components/common/CarouselTest'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beauty-pink"></div>
  </div>
);

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <div className="min-h-screen flex flex-col">
                  <Header onCartClick={() => setIsCartOpen(true)} />
                  <main className="flex-grow">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/shop/:category" element={<ShopPage />} />
                        <Route path="/product/:slug" element={<ProductDetailPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/brand/:slug" element={<BrandPage />} />
                        <Route path="/compare" element={<ComparisonPage />} />
                        <Route path="/servicii" element={<ServicesPage />} />
                        <Route path="/despre" element={<AboutPage />} />
                        <Route path="/programare" element={<BookingPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/confirmare-comanda" element={<OrderConfirmationPage />} />
                        <Route path="/carousel-test" element={<CarouselTest />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                  
                  {/* Bottom Navigation for Mobile */}
                  <BottomNavigation 
                    onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    onCartClick={() => setIsCartOpen(true)}
                  />
                  
                  {/* Toast notifications */}
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: '#fff',
                        color: '#1e293b',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      },
                      success: {
                        iconTheme: {
                          primary: '#ff69b4',
                          secondary: '#fff',
                        },
                      },
                    }}
                  />

                  {/* Cart Drawer - Rendered at app level */}
                  <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
