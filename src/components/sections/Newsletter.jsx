import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email.trim()) {
      setError('Email-ul este obligatoriu');
      return;
    }

    if (!validateEmail(email)) {
      setError('Te rugăm să introduci un email valid');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Te-ai abonat cu succes la newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-beauty-pink/10 via-beauty-purple/10 to-beauty-rose/10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-beauty-pink/20 rounded-full mb-6">
          <Mail className="w-8 h-8 text-beauty-pink" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
          Rămâi la curent cu noutățile
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Abonează-te la newsletter-ul nostru și primește oferte exclusive, sfaturi de frumusețe și noutăți despre produsele tale preferate.
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Introdu email-ul tău"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-beauty-pink'
                }`}
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary whitespace-nowrap ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Se trimite...
                </span>
              ) : (
                'Abonează-te'
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-beauty-pink" />
            <span>Oferte exclusive</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-beauty-pink" />
            <span>Sfaturi de frumusețe</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-beauty-pink" />
            <span>Noutăți produse</span>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="mt-6 text-xs text-gray-500">
          Ne respectăm clienții. Poți să te dezabonezi oricând. 
          <a href="#" className="text-beauty-pink hover:text-beauty-rose ml-1">
            Politica de confidențialitate
          </a>
        </p>
      </div>
    </section>
  );
};

export default Newsletter;