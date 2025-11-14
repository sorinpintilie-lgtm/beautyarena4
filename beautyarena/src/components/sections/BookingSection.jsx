import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';

const BookingSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    specialist: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const services = [
    { id: 'coafura', name: 'Coafură profesională', duration: '90 min', price: '120 lei', icon: 'hair' },
    { id: 'tratament-facial', name: 'Tratament facial', duration: '75 min', price: '150 lei', icon: 'facial' },
    { id: 'manichiura', name: 'Manichiură premium', duration: '60 min', price: '80 lei', icon: 'nails' },
    { id: 'machiaj', name: 'Machiaj profesional', duration: '45 min', price: '100 lei', icon: 'makeup' },
    { id: 'relaxare', name: 'Relaxare și wellness', duration: '90 min', price: '180 lei', icon: 'wellness' },
    { id: 'pachet-complet', name: 'Pachet complet frumusețe', duration: '180 min', price: '350 lei', icon: 'complete' }
  ];

  const specialists = [
    { id: 'elena', name: 'Elena Popescu', specialty: 'Coafură & Machiaj', experience: '15+ ani' },
    { id: 'maria', name: 'Maria Ionescu', specialty: 'Tratamente faciale', experience: '10+ ani' },
    { id: 'ana', name: 'Ana Marinescu', specialty: 'Manichiură & Nail art', experience: '8+ ani' },
    { id: 'disponibil', name: 'Orice specialist disponibil', specialty: 'În funcție de serviciu', experience: '' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  // Get next 14 days (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (0) and past times of today
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getServiceIcon = (iconType) => {
    const iconClass = "w-8 h-8";
    switch (iconType) {
      case 'hair':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4V8H10V4C10 2.9 10.9 2 12 2Z"/></svg>;
      case 'facial':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.7 2 6 4.7 6 8S8.7 14 12 14 18 11.3 18 8 15.3 2 12 2Z"/></svg>;
      case 'nails':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C12.5 2 13 2.5 13 3V4H14V6H10V4H11V3C11 2.5 11.5 2 12 2Z"/></svg>;
      case 'makeup':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4V6H15V8H9V6H10V4C10 2.9 10.9 2 12 2Z"/></svg>;
      case 'wellness':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2Z"/></svg>;
      case 'complete':
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/></svg>;
      default:
        return <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2Z"/></svg>;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">Alege serviciul</h3>
              <p className="text-gray-600">Selectează serviciul de care ai nevoie</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleInputChange('service', service)}
                  className={`card-beauty cursor-pointer transition-all duration-300 ${
                    bookingData.service.id === service.id ? 'ring-2 ring-beauty-pink bg-beauty-pink/5' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-beauty-pink/20 rounded-full flex items-center justify-center text-beauty-pink">
                      {getServiceIcon(service.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </span>
                        <span className="text-beauty-pink font-medium">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">Alege specialistul</h3>
              <p className="text-gray-600">Selectează specialistul preferat</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialists.map((specialist) => (
                <div
                  key={specialist.id}
                  onClick={() => handleInputChange('specialist', specialist)}
                  className={`card-beauty cursor-pointer transition-all duration-300 ${
                    bookingData.specialist.id === specialist.id ? 'ring-2 ring-beauty-pink bg-beauty-pink/5' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-beauty-pink to-beauty-pink-dark rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{specialist.name}</h4>
                    <p className="text-beauty-pink text-sm mb-1">{specialist.specialty}</p>
                    {specialist.experience && (
                      <p className="text-gray-600 text-xs">{specialist.experience}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">Alege data și ora</h3>
              <p className="text-gray-600">Selectează disponibilitatea dorită</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-beauty-pink" />
                  Data
                </h4>
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                  {getAvailableDates().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleInputChange('date', formatDateForInput(date))}
                      className={`text-left p-3 rounded-lg border transition-all duration-300 ${
                        bookingData.date === formatDateForInput(date)
                          ? 'border-beauty-pink bg-beauty-pink/10 text-beauty-pink'
                          : 'border-gray-200 hover:border-beauty-pink/50'
                      }`}
                    >
                      <div className="font-medium">{formatDate(date)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-beauty-pink" />
                  Ora
                </h4>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleInputChange('time', time)}
                      className={`p-2 rounded-lg border text-sm transition-all duration-300 ${
                        bookingData.time === time
                          ? 'border-beauty-pink bg-beauty-pink text-white'
                          : 'border-gray-200 hover:border-beauty-pink/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">Informații contact</h3>
              <p className="text-gray-600">Completează datele pentru confirmarea programării</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Numele complet
                </label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                  placeholder="Introdu numele tău complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Numărul de telefon
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                  placeholder="07xx xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Adresa de email
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                  placeholder="email@exemplu.ro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observații (opțional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                  placeholder="Spune-ne dacă ai preferințe speciale..."
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Rezumatul programării</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Serviciul:</span>
                  <span className="font-medium">{bookingData.service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialistul:</span>
                  <span className="font-medium">{bookingData.specialist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium">{bookingData.date && new Date(bookingData.date).toLocaleDateString('ro-RO')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ora:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durata:</span>
                  <span className="font-medium">{bookingData.service.duration}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Prețul total:</span>
                  <span className="text-beauty-pink">{bookingData.service.price}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return bookingData.service !== '';
      case 2: return bookingData.specialist !== '';
      case 3: return bookingData.date !== '' && bookingData.time !== '';
      case 4: return bookingData.name !== '' && bookingData.phone !== '' && bookingData.email !== '';
      default: return false;
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', bookingData);
    alert('Programarea ta a fost trimisă cu succes! Vei primi o confirmare pe email.');
    // Reset form
    setCurrentStep(1);
    setBookingData({
      service: '',
      specialist: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      notes: ''
    });
  };

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-beauty-pink/5 to-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-peach/10 rounded-full border border-beauty-peach/20 mb-6">
            <Calendar className="w-4 h-4 text-beauty-peach mr-2" />
            <span className="text-sm font-medium text-beauty-peach">Programează-te</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
            Rezervă-ți 
            <span className="block gradient-text">Programarea perfectă</span>
          </h2>
          <p className="text-lg text-gray-600">
            Urmează pașii simpli pentru a-ți programa vizita la BeautyArena
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step 
                  ? 'bg-beauty-pink text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  currentStep > step ? 'bg-beauty-pink' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="card-beauty">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isStepValid()
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continuă
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isStepValid()
                    ? 'btn-primary'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmă programarea
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Ai nevoie de ajutor? Sună-ne la <span className="font-semibold text-beauty-pink">+40 264 123 456</span></p>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;