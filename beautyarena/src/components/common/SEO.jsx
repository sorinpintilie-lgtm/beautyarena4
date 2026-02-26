import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://beautyarena.ro';

const toAbsoluteUrl = (value = '/') => {
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${SITE_URL}${normalizedPath}`;
};

const SEO = ({
  title = 'BeautyArena - Premium Beauty Products & Services',
  description = 'Discover premium beauty products and professional beauty services at BeautyArena. Shop from top brands like L\'Oréal, Maybelline, NYX, and more.',
  keywords = 'beauty, cosmetics, makeup, skincare, haircare, beauty products, beauty salon, professional beauty services',
  image = '/visualMarketing_logo.png',
  imageAlt = 'BeautyArena',
  url,
  canonical,
  type = 'website',
  robots = 'index, follow',
  noindex = false,
  jsonLd = null,
}) => {
  const location = useLocation();
  const currentUrl = toAbsoluteUrl(url || location.pathname);
  const canonicalUrl = toAbsoluteUrl(canonical || location.pathname);
  const resolvedImage = toAbsoluteUrl(image);
  const robotsContent = noindex ? 'noindex, nofollow' : robots;

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
    updateMetaTag('robots', robotsContent);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', resolvedImage, true);
    updateMetaTag('og:image:alt', imageAlt, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'BeautyArena', true);
    updateMetaTag('og:locale', 'ro_RO', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', resolvedImage);

    // Additional metadata
    updateMetaTag('language', 'Romanian');
    updateMetaTag('author', 'BeautyArena');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Structured data
    const existingJsonLdNodes = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
    existingJsonLdNodes.forEach((node) => node.remove());

    const payloads = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : jsonLd ? [jsonLd] : [];
    payloads.forEach((payload) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.text = JSON.stringify(payload);
      document.head.appendChild(script);
    });
  }, [title, description, keywords, resolvedImage, imageAlt, currentUrl, canonicalUrl, type, robotsContent, jsonLd]);

  return null;
};

export default SEO;
