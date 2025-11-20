import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, ArrowRight, Clock, MapPin, Phone, Edit2, X, CheckCircle, XCircle, Loader } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, cancelBooking } from '../services/bookingService';
import toast from 'react-hot-toast';

const AccountPage = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/autentificare', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user?.uid) {
      fetchBookings();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const result = await getUserBookings(user.uid);
      if (result.success) {
        setBookings(result.bookings);
      } else {
        toast.error('Eroare la încărcarea programărilor');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Eroare la încărcarea programărilor');
    } finally {
      setLoadingBookings(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setCancellingBooking(bookingId);
    try {
      const result = await cancelBooking(bookingId);
      if (result.success) {
        toast.success('Programare anulată cu succes');
        fetchBookings(); // Refresh bookings
      } else {
        toast.error('Eroare la anularea programării');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Eroare la anularea programării');
    } finally {
      setCancellingBooking(null);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        toast.success('Profil actualizat cu succes');
        setEditingProfile(false);
      } else {
        toast.error(result.error || 'Eroare la actualizarea profilului');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Eroare la actualizarea profilului');
    }
  };

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

            {/* Profile Info */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase">
                  Informații profil
                </h3>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-beauty-pink border border-beauty-pink rounded-full hover:bg-beauty-pink hover:text-white transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  {editingProfile ? 'Anulează' : 'Editează'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Email
                  </label>
                  <p className="text-sm text-gray-900 break-all">{user.email}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Nume complet
                  </label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
                      placeholder="Numele tău complet"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.name || 'Nu este setat'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Telefon
                  </label>
                  {editingProfile ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
                      placeholder="+40 712 345 678"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.phone || 'Nu este setat'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
                    Adresă
                  </label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink"
                      placeholder="Adresa ta"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.address || 'Nu este setată'}</p>
                  )}
                </div>
              </div>

              {editingProfile && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-transform transform hover:scale-105"
                    style={{ background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)' }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Salvează
                  </button>
                  <button
                    onClick={() => {
                      setEditingProfile(false);
                      setProfileData({
                        name: user.name || '',
                        phone: user.phone || '',
                        address: user.address || ''
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Anulează
                  </button>
                </div>
              )}
            </div>

            {/* Bookings Section */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/80">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-beauty-pink" />
                <p className="text-sm font-semibold text-gray-700 uppercase">
                  Programările mele
                </p>
              </div>

              {loadingBookings ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-6 h-6 animate-spin text-beauty-pink" />
                  <span className="ml-2 text-sm text-gray-600">Se încarcă programările...</span>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-3">Nu ai nicio programare încă</p>
                  <Link
                    to="/programare"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-transform transform hover:scale-105"
                    style={{ background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)' }}
                  >
                    <Calendar className="w-4 h-4" />
                    Programează-te acum
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-beauty-pink" />
                            <span className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString('ro-RO', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })} la {booking.startTime}
                            </span>
                          </div>

                          <div className="space-y-1 mb-3">
                            {booking.services.map((service, index) => (
                              <p key={index} className="text-sm text-gray-700">
                                • {service.name} ({service.duration} min)
                              </p>
                            ))}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {booking.specialistName}
                            </span>
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Confirmată
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={cancellingBooking === booking.id}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {cancellingBooking === booking.id ? (
                            <Loader className="w-3 h-3 animate-spin" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                          Anulează
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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