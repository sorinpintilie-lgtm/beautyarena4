import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/contul-meu', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Parolele nu se potrivesc');
      return;
    }

    if (formData.password.length < 6) {
      alert('Parola trebuie să aibă cel puțin 6 caractere');
      return;
    }

    setLoading(true);
    const result = await register(formData.name, formData.email, formData.password);
    setLoading(false);
    if (result.success) {
      // Clear form on success - navigation will happen via useEffect when isAuthenticated changes
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <SEO
        title="Înregistrare - Salon Beauty Arena"
        description="Creează-ți un cont la Salon Beauty Arena pentru a salva preferințe și programări."
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-beauty-pink-light/20 to-white pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-beauty-pink/10 mb-3">
                <User className="w-6 h-6 text-beauty-pink" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-elegant font-bold text-gray-900 mb-1">
                Creează cont
              </h1>
              <p className="text-sm text-gray-600">
                Alătură-te comunității Beauty Arena și beneficiază de programări ușoare.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nume complet *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="Numele tău complet"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="+40 712 345 678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parolă *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="Minim 6 caractere"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmă parola *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="Confirmă parola"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)' }}
              >
                {loading ? (
                  <span>Se creează contul...</span>
                ) : (
                  <>
                    <span>Creează cont</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                Ai deja un cont?{' '}
                <Link
                  to="/autentificare"
                  className="font-medium text-beauty-pink hover:text-beauty-pink-dark"
                >
                  Conectează-te aici
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-1 text-xs font-medium text-beauty-pink hover:text-beauty-pink-dark"
              >
                <span>Înapoi la pagina de start</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;