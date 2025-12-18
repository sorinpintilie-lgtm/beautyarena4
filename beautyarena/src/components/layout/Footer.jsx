import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Acasă', href: '/' },
    { name: 'Servicii', href: '/servicii' },
    { name: 'Magazin', href: '/shop' },
    { name: 'Despre noi', href: '/#about' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Coafură', href: '/servicii' },
    { name: 'Îngrijire unghii', href: '/servicii' },
    { name: 'Îngrijire ten', href: '/servicii' },
    { name: 'Machiaj', href: '/servicii' },
    { name: 'Programează-te', href: '/programare' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-elegant font-bold text-beauty-pink">
              Salon Beauty Arena
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

          {/* Quick Links + Services in 2 columns with divider */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-start border border-gray-800/60 rounded-xl p-4">
              {/* Quick Links */}
              <div className="space-y-3 pr-0 sm:pr-4">
                <h4 className="text-lg font-semibold text-white">Legături rapide</h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => {
                    const isHashLink = link.href.startsWith('/#');
                    
                    return (
                      <li key={link.name}>
                        {isHashLink ? (
                          <a
                            href={link.href}
                            className="text-gray-300 hover:text-beauty-pink transition-colors duration-300 text-sm"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="text-gray-300 hover:text-beauty-pink transition-colors duration-300 text-sm"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-3 border-l border-gray-800/60 pl-4">
                <h4 className="text-lg font-semibold text-white">Serviciile noastre</h4>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.name}>
                      <Link
                        to={service.href}
                        className="text-gray-300 hover:text-beauty-pink transition-colors duration-300 text-sm"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Informații contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-beauty-pink mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">București, Bd. Basarabia, Nr. 96, Sector 2</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-beauty-pink flex-shrink-0" />
                <a
                  href="tel:0722402559"
                  className="text-gray-300 hover:text-beauty-pink transition-colors"
                >
                  0722 402 559
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-beauty-pink flex-shrink-0" />
                <span className="text-gray-300">contact@salonbeautyarena.ro</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-beauty-pink mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Luni - Vineri: 9:00 - 21:00</div>
                  <div>Sâmbătă: 9:00 - 17:00</div>
                  <div>Duminică: închis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Newsletter</h4>
              <p className="text-gray-300">Abonează-te la newsletter-ul nostru pentru sfaturi de frumusețe și oferte exclusive</p>
            </div>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="Introdu email-ul tău"
                className="flex-1 px-4 py-3 rounded-l-lg sm:rounded-r-none rounded-r-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-beauty-pink transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-beauty-pink rounded-r-lg sm:rounded-l-none rounded-l-lg font-medium hover:bg-beauty-pink-dark transition-all duration-300 mt-2 sm:mt-0">
                Abonează-te
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left text-gray-400 text-sm">
              <p>
                © {currentYear} Salon Beauty Arena. Toate drepturile rezervate.
              </p>
              <p className="mt-1 space-x-2">
                <Link
                  to="/politica-de-livrare"
                  className="hover:text-beauty-pink transition-colors"
                >
                  Politica de livrare
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  to="/politica-de-confidentialitate"
                  className="hover:text-beauty-pink transition-colors"
                >
                  Politica de confidențialitate
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  to="/termeni-si-conditii"
                  className="hover:text-beauty-pink transition-colors"
                >
                  Termeni și condiții
                </Link>
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-gray-400 flex items-center justify-center md:justify-end">
                Powered by{' '}
                <a
                  href="https://visualmarketing.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                  aria-label="Visualmarketing website"
                >
                  <img
                    src="/visualMarketing_logo.png"
                    alt="Visualmarketing"
                    className="h-6 ml-2"
                  />
                </a>
              </p>
              <div className="flex items-center justify-center md:justify-end gap-3">
                <a
                  href="https://reclamatiisal.anpc.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                  aria-label="SOL ANPC"
                >
                  <img
                    src="/sol-400x100fill.avif"
                    alt="SOL ANPC"
                    className="h-8 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://anpc.ro/?ref=footer_3_6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                  aria-label="ANPC"
                >
                  <img
                    src="/anpc-400x100fill.avif"
                    alt="ANPC"
                    className="h-8 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;