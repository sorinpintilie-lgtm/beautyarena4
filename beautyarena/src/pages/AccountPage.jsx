import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(user?.name || '');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/autentificare', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '-';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEO
        title="Contul meu - Salon Beauty Arena"
        description="Vezi detaliile contului tău la Salon Beauty Arena și gestionează-ți preferințele."
      />
      <div className="min-h-screen bg-gradient-to-b from-white via-beauty-pink-light/20 to-white pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-elegant font-bold text-gray-900">
                Contul meu
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Bine ai revenit, <span className="font-semibold">{user.name}</span>.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Deconectează-te</span>
            </button>
          </div>

          {/* Main Card */}
          <div className="bg-white/90 border border-gray-100 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 space-y-6">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-beauty-pink to-beauty-pink-dark flex items-center justify-center text-white shadow-md">
                <span className="text-lg sm:text-xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-0.5">
                  Client Salon Beauty Arena
                </p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {user.name || user.email}
                </p>
                <p className="text-xs text-gray-500">
                  Cont creat la{' '}
                  <span className="font-medium text-gray-700">
                    {createdAt}
                  </span>
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/80">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-beauty-pink" />
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    Email
                  </p>
                </div>
                <p className="text-sm text-gray-900 break-all">{user.email}</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/80">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-beauty-pink" />
                  <p className="text-xs font-semibold text-gray-700 uppercase">
                    Nume afișat
                  </p>
                </div>
                <p className="text-sm text-gray-900">{displayName || user.name}</p>
                <p className="mt-1 text-[11px] text-gray-500">
                  În versiunea actuală demo, numele este salvat doar local în browser.
                </p>
              </div>
            </div>

            {/* Upcoming features */}
            <div className="border border-dashed border-beauty-pink/40 rounded-xl p-4 bg-beauty-pink/5">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-beauty-pink" />
                <p className="text-xs font-semibold text-gray-700 uppercase">
                  În curând în contul tău
                </p>
              </div>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                <li>Istoric programări și reprogramări rapide</li>
                <li>Preferințe personale pentru servicii și specialiști</li>
                <li>Recomandări de produse pe baza serviciilor alese</li>
              </ul>
            </div>

            {/* Shortcuts */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
              <Link
                to="/servicii"
                className="flex-1 inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:border-beauty-pink hover:bg-beauty-pink/5 transition-colors"
              >
                <span>Vezi lista completă de servicii</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/programare"
                className="flex-1 inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white shadow-sm transition-transform transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)' }}
              >
                <span>Programează-te acum</span>
                <Calendar className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;