import React from 'react';
import SEO from '../components/common/SEO';
import BookingWidget from '../components/BookingWidget';

const BookingPage = () => {
  return (
    <>
      <SEO
        title="Programare Online - Salon Beauty Arena"
        description="Programează-te online pentru serviciile noastre de frumusețe. Alege serviciile dorite, data și ora care ți se potrivesc."
        keywords="programare online, programare salon, booking frumusețe, programare coafură, programare machiaj"
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-elegant font-bold text-black mb-4">
              Programare online
            </h1>
            <p className="text-lg text-gray-600">
              Completează formularul pentru a face o programare
            </p>
          </div>

          {/* Booking Widget */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BookingWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;