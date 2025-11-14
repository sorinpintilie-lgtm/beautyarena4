import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import PromotionalCarousel from '../components/sections/PromotionalCarousel';
import PromotionalBanner from '../components/sections/PromotionalBanner';
import ShopAndServicesSection from '../components/sections/ShopAndServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import Newsletter from '../components/sections/Newsletter';

const HomePage = () => {
  return (
    <>
      <SEO
        title="BeautyArena - Produse Premium de Frumusețe și Servicii Profesionale"
        description="Descoperă produse premium de frumusețe de la brand-uri de top și servicii profesionale de frumusețe. Cumpără de la L'Oréal, Maybelline, NYX, The Ordinary și multe altele la BeautyArena."
        keywords="produse frumusețe, cosmetice, machiaj, îngrijire ten, îngrijire păr, salon frumusețe, servicii profesionale frumusețe, L'Oréal, Maybelline, NYX"
      />
      <HeroSection />
      <PromotionalCarousel />
      <PromotionalBanner />
      <ShopAndServicesSection />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
};

export default HomePage;