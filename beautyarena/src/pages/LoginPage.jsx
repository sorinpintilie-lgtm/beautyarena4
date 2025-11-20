import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/contul-meu', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      // Clear form on success - navigation will happen via useEffect when isAuthenticated changes
      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <SEO
        title="Autentificare - Salon Beauty Arena"
        description="Autentifică-te în contul tău Salon Beauty Arena pentru a salva preferințe și programări."
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-beauty-pink-light/20 to-white pt-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-beauty-pink/10 mb-3">
                <User className="w-6 h-6 text-beauty-pink" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-elegant font-bold text-gray-900 mb-1">
                Autentificare
              </h1>
              <p className="text-sm text-gray-600">
                Creează-ți un cont simplu (local) pentru a salva programările preferate.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="email@exemplu.ro"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parolă
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors text-sm"
                    placeholder="Alege o parolă"
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
                  <span>Se conectează...</span>
                ) : (
                  <>
                    <span>Intră în cont</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                Nu ai încă un cont?{' '}
                <Link
                  to="/inregistrare"
                  className="font-medium text-beauty-pink hover:text-beauty-pink-dark"
                >
                  Creează-ți cont acum
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

export default LoginPage;