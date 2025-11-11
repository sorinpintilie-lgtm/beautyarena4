import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = 'BeautyArena - Premium Beauty Products & Services',
  description = 'Discover premium beauty products and professional beauty services at BeautyArena. Shop from top brands like L\'Oréal, Maybelline, NYX, and more.',
  keywords = 'beauty, cosmetics, makeup, skincare, haircare, beauty products, beauty salon, professional beauty services',
  image = '/og-image.jpg',
  url
}) => {
  const location = useLocation();
  const currentUrl = url || `https://beautyarena.ro${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Romanian');
    updateMetaTag('author', 'BeautyArena');

  }, [title, description, keywords, image, currentUrl]);

  return null;
};

export default SEO;