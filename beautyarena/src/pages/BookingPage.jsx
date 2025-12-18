import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import BookingWidget from '../components/BookingWidget';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const isUserNavigatingRef = useRef(false);

  useEffect(() => {
    // List of URLs to block from redirecting to
    const blockedUrls = [
      'https://beautyarena.simplybook.it/v2/#invoice/pay/6/return/1',
      'https://beautyarena.simplybook.it/v2/#invoice/',
      'https://beautyarena.simplybook.it/v2/#payment/',
      'https://beautyarena.simplybook.it/v2/#success/',
      'https://beautyarena.simplybook.it/v2/#confirmation/'
    ];

    // Check if a URL should be blocked
    const isBlockedUrl = (url) => {
      return blockedUrls.some(blocked => url.includes(blocked));
    };

    // Monitor iframe for navigation attempts
    const monitorIframe = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            // Check if iframe src changed
            const iframe = document.querySelector('#sbw_yhg8ww iframe');
            if (iframe && iframe.src && isBlockedUrl(iframe.src)) {
              console.log('Blocked iframe redirect to:', iframe.src);
              // Reset iframe to original URL
              iframe.src = iframe.src; // This will reload the iframe
            }
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return observer;
    };

    // Monitor location changes
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      const url = args[2];
      if (url && isBlockedUrl(url) && !isUserNavigatingRef.current) {
        console.log('Blocked pushState redirect to:', url);
        return;
      }
      return originalPushState.apply(history, args);
    };

    history.replaceState = function(...args) {
      const url = args[2];
      if (url && isBlockedUrl(url) && !isUserNavigatingRef.current) {
        console.log('Blocked replaceState redirect to:', url);
        return;
      }
      return originalReplaceState.apply(history, args);
    };

    // Monitor hash changes
    const handleHashChange = (e) => {
      if (isBlockedUrl(window.location.href) && !isUserNavigatingRef.current) {
        console.log('Blocked hash change to:', window.location.href);
        // Navigate back to /programare
        navigate('/programare', { replace: true });
      }
    };

    // Monitor beforeunload
    const handleBeforeUnload = (e) => {
      if (!isUserNavigatingRef.current) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    // Start monitoring
    const iframeObserver = monitorIframe();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Allow navigation when user explicitly clicks links or buttons
    const handleUserNavigation = () => {
      isUserNavigatingRef.current = true;
      setTimeout(() => {
        isUserNavigatingRef.current = false;
      }, 100);
    };

    // Add click listeners to capture user navigation
    document.addEventListener('click', handleUserNavigation, true);

    return () => {
      // Cleanup
      iframeObserver.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleUserNavigation, true);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [navigate]);

  return (
    <>
      <SEO
        title="Programare Online - Salon Beauty Arena"
        description="Programează-te online pentru serviciile noastre de frumusețe. Alege serviciile dorite, data și ora care ți se potrivesc."
        keywords="programare online, programare salon, booking frumusețe, programare coafură, programare machiaj"
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-elegant font-bold text-black mb-4">
              Programare online
            </h1>
            <p className="text-lg text-gray-600">
              Completează formularul pentru a face o programare
            </p>
          </div>

          {/* Booking Widget */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BookingWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;