import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Acasă', href: '#home' },
    { name: 'Servicii', href: '#services' },
    { name: 'Produse', href: '#products' },
    { name: 'Despre noi', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { name: 'Coafură', href: '#services' },
    { name: 'Îngrijire unghii', href: '#services' },
    { name: 'Îngrijire ten', href: '#services' },
    { name: 'Machiaj', href: '#services' },
    { name: 'Programează', href: '#booking' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-br from-beauty-navy via-beauty-navy to-gray-900 text-white">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-elegant font-bold gradient-text">
              BeautyArena
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Destinația ta principală pentru frumusețe și bunăstare. Îmbunătățim frumusețea ta naturală cu serviciile noastre de expert și produsele premium.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-beauty-pink transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legături rapide</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-beauty-pink transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Serviciile noastre</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-beauty-pink transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Informații contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-beauty-pink mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Strada Frumuseții 123, Orașul Glamour, CJ 400000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-beauty-pink flex-shrink-0" />
                <span className="text-gray-300">+40 264 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-beauty-pink flex-shrink-0" />
                <span className="text-gray-300">info@beautyarena.ro</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-beauty-pink mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Lun - Vin: 9:00 - 20:00</div>
                  <div>Sâm - Dum: 10:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-xl font-semibold text-white mb-2">Rămâi frumoasă</h4>
              <p className="text-gray-300">Abonează-te la newsletter-ul nostru pentru sfaturi de frumusețe și oferte exclusive</p>
            </div>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Introdu email-ul tău"
                className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-beauty-pink transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-beauty-pink to-beauty-rose rounded-r-lg sm:rounded-l-none rounded-l-lg font-medium hover:from-beauty-rose hover:to-beauty-pink transition-all duration-300 mt-2 sm:mt-0">
                Abonează-te
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {currentYear} BeautyArena. Toate drepturile rezervate. | Politica de confidențialitate | Termeni și condiții
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;