import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Check, ChevronLeft, ChevronRight, Scissors, Sparkles, Star, Palette, Heart, Zap } from 'lucide-react';
import SEO from '../components/common/SEO';

const BookingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: [],
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const services = [
    { id: 1, icon: Scissors, name: 'Coafură profesională', duration: 90, price: 80 },
    { id: 2, icon: Sparkles, name: 'Îngrijire unghii', duration: 60, price: 60 },
    { id: 3, icon: Star, name: 'Îngrijire ten', duration: 75, price: 120 },
    { id: 4, icon: Palette, name: 'Machiaj profesional', duration: 45, price: 100 },
    { id: 5, icon: Heart, name: 'Relaxare și wellness', duration: 90, price: 150 },
    { id: 6, icon: Zap, name: 'Tratamente speciale', duration: 120, price: 200 }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const steps = [
    { number: 1, title: 'Servicii', description: 'Alege serviciile' },
    { number: 2, title: 'Data & Ora', description: 'Selectează data' },
    { number: 3, title: 'Informații', description: 'Detaliile tale' },
    { number: 4, title: 'Confirmare', description: 'Verifică datele' }
  ];

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const calculateTotal = () => {
    const selectedServicesList = services.filter(s => formData.selectedServices.includes(s.id));
    const totalDuration = selectedServicesList.reduce((sum, s) => sum + s.duration, 0);
    const totalPrice = selectedServicesList.reduce((sum, s) => sum + s.price, 0);
    return { totalDuration, totalPrice };
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1 && formData.selectedServices.length === 0) {
      newErrors.services = 'Selectează cel puțin un serviciu';
    }
    
    if (step === 2) {
      if (!formData.date) newErrors.date = 'Selectează o dată';
      if (!formData.time) newErrors.time = 'Selectează o oră';
    }
    
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = 'Numele este obligatoriu';
      if (!formData.email.trim()) newErrors.email = 'Email-ul este obligatoriu';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Telefonul este obligatoriu';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // In a real app, this would send data to backend
      alert('Programarea ta a fost confirmată! Vei primi un email de confirmare în curând.');
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const { totalDuration, totalPrice } = calculateTotal();
  const selectedServicesList = services.filter(s => formData.selectedServices.includes(s.id));

  return (
    <>
      <SEO
        title="Programare Online - BeautyArena"
        description="Programează-te online pentru serviciile noastre de frumusețe. Alege serviciile dorite, data și ora care ți se potrivesc."
        keywords="programare online, programare salon, booking frumusețe, programare coafură, programare machiaj"
      />

      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-beauty-pink transition-colors mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Înapoi
            </button>
            <h1 className="text-4xl font-elegant font-bold text-black mb-4">
              Programare online
            </h1>
            <p className="text-lg text-gray-600">
              Completează formularul pentru a-ți rezerva programarea
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors"
                      style={{
                        backgroundColor: (currentStep > step.number || currentStep === step.number) ? '#FFAB9D' : '#E5E7EB',
                        color: (currentStep > step.number || currentStep === step.number) ? 'white' : '#6B7280'
                      }}
                    >
                      {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                    </div>
                    <div className="text-center mt-2">
                      <p
                        className="text-sm font-medium"
                        style={{
                          color: currentStep >= step.number ? '#FFAB9D' : '#9CA3AF'
                        }}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="flex-1 h-1 mx-2 transition-colors"
                      style={{
                        backgroundColor: currentStep > step.number ? '#FFAB9D' : '#E5E7EB'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Step 1: Select Services */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Selectează serviciile dorite
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Poți selecta mai multe servicii pentru aceeași programare
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => {
                        const IconComponent = service.icon;
                        const isSelected = formData.selectedServices.includes(service.id);
                        
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`text-left p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-beauty-pink bg-beauty-pink/5'
                                : 'border-gray-200 hover:border-beauty-pink/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{
                                  backgroundColor: isSelected ? '#FFAB9D' : '#F3F4F6',
                                  color: isSelected ? 'white' : '#6B7280'
                                }}
                              >
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {service.duration} min
                                  </span>
                                  <span className="font-semibold text-beauty-pink">
                                    {service.price} lei
                                  </span>
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5 text-beauty-pink flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    
                    {errors.services && (
                      <p className="text-red-500 text-sm mt-2">{errors.services}</p>
                    )}
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Selectează data și ora
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data programării *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                          errors.date ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ora programării *
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, time }))}
                            className="px-4 py-3 rounded-lg border-2 font-medium transition-all"
                            style={{
                              borderColor: formData.time === time ? '#FFAB9D' : '#E5E7EB',
                              backgroundColor: formData.time === time ? '#FFAB9D' : 'transparent',
                              color: formData.time === time ? 'white' : '#374151'
                            }}
                            onMouseEnter={(e) => {
                              if (formData.time !== time) {
                                e.currentTarget.style.borderColor = '#FFAB9D';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (formData.time !== time) {
                                e.currentTarget.style.borderColor = '#E5E7EB';
                              }
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Information */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Informațiile tale
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nume complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.name ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="Ion Popescu"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="ion@exemplu.ro"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="+40 712 345 678"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesaj (opțional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors"
                          placeholder="Mențiuni speciale sau preferințe..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Confirmă programarea
                    </h2>
                    
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Servicii selectate:</h3>
                        <ul className="space-y-2">
                          {selectedServicesList.map(service => (
                            <li key={service.id} className="flex items-center justify-between text-gray-700">
                              <span>{service.name}</span>
                              <span className="font-medium">{service.price} lei</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Data și ora:</h3>
                        <p className="text-gray-700">
                          {new Date(formData.date).toLocaleDateString('ro-RO', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })} la ora {formData.time}
                        </p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Informații contact:</h3>
                        <div className="space-y-1 text-gray-700">
                          <p><strong>Nume:</strong> {formData.name}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Telefon:</strong> {formData.phone}</p>
                          {formData.message && (
                            <p><strong>Mesaj:</strong> {formData.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-beauty-pink/10 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Vei primi un email de confirmare la adresa <strong>{formData.email}</strong> cu detaliile programării tale.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-beauty-pink text-beauty-pink rounded-lg font-medium hover:bg-beauty-pink hover:text-gray-900 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Înapoi
                    </button>
                  )}
                  {currentStep < 4 ? (
                    <button
                      onClick={handleNext}
                      style={{
                        background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)',
                        color: 'white'
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Continuă
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      style={{
                        background: 'linear-gradient(to right, #FFAB9D, #FF8B7A)',
                        color: 'white'
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Check className="w-5 h-5" />
                      Confirmă programarea
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sumar programare
                </h3>
                
                {formData.selectedServices.length > 0 ? (
                  <>
                    <div className="space-y-3 mb-4">
                      {selectedServicesList.map(service => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-gray-700">{service.name}</span>
                          <span className="font-medium text-gray-900">{service.price} lei</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Durată totală:</span>
                        <span className="font-medium text-gray-900">{totalDuration} min</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-beauty-pink">{totalPrice} lei</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Niciun serviciu selectat încă
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;