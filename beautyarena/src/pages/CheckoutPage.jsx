import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, MapPin, Phone, Mail, User, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping info
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'România',
    // Shipping method
    shippingMethod: 'standard',
    // Payment
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});

  const shippingMethods = [
    { id: 'standard', name: 'Curier standard', duration: '3-5 zile lucrătoare', price: 15 },
    { id: 'express', name: 'Curier express', duration: '1-2 zile lucrătoare', price: 30 },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Card bancar', icon: CreditCard },
    { id: 'cash', name: 'Ramburs', icon: Truck },
  ];

  const selectedShipping = shippingMethods.find(m => m.id === formData.shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const total = cartSubtotal + shippingCost;

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Numele este obligatoriu';
      if (!formData.email.trim()) newErrors.email = 'Email-ul este obligatoriu';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Telefonul este obligatoriu';
      if (!formData.address.trim()) newErrors.address = 'Adresa este obligatorie';
      if (!formData.city.trim()) newErrors.city = 'Orașul este obligatoriu';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Codul poștal este obligatoriu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Simulate order placement
      clearCart();
      navigate('/confirmare-comanda');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coșul tău este gol</h2>
          <p className="text-gray-600 mb-6">Adaugă produse pentru a continua</p>
          <Link to="/shop" className="btn-primary">
            Mergi la magazin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-beauty-pink transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Înapoi
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-elegant font-bold text-gray-900 mb-4">
            Finalizare comandă
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${s <= step ? 'text-beauty-pink' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    s < step ? 'bg-beauty-pink text-white' :
                    s === step ? 'bg-beauty-pink text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {s < step ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">
                    {s === 1 && 'Livrare'}
                    {s === 2 && 'Metodă livrare'}
                    {s === 3 && 'Plată'}
                  </span>
                </div>
                {s < 3 && <div className="flex-1 h-0.5 bg-gray-200"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Informații de livrare
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nume complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.fullName ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="Ion Popescu"
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
                          placeholder="ion@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
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
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresă *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                          errors.address ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Strada Exemplu, Nr. 123, Ap. 4"
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Oraș *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                          errors.city ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="București"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cod poștal *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                          errors.postalCode ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="012345"
                      />
                      {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Țară *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors"
                        placeholder="România"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Continuă la metodă de livrare
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Metodă de livrare
                  </h2>

                  <div className="space-y-3">
                    {shippingMethods.map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.shippingMethod === method.id
                            ? 'border-beauty-pink bg-beauty-pink/5'
                            : 'border-gray-200 hover:border-beauty-pink/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleInputChange}
                            className="text-beauty-pink focus:ring-beauty-pink"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.duration}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-beauty-pink">
                          {method.price} lei
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-beauty-pink text-beauty-pink rounded-lg font-medium hover:bg-beauty-pink hover:text-gray-900 transition-all duration-300"
                    >
                      Înapoi
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Continuă la plată
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Metodă de plată
                  </h2>

                  <div className="space-y-3">
                    {paymentMethods.map(method => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? 'border-beauty-pink bg-beauty-pink/5'
                              : 'border-gray-200 hover:border-beauty-pink/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="text-beauty-pink focus:ring-beauty-pink"
                          />
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900">{method.name}</span>
                        </label>
                      );
                    })}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                      <p>Vei fi redirecționat către procesatorul de plăți securizat pentru a finaliza tranzacția.</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-beauty-pink text-beauty-pink rounded-lg font-medium hover:bg-beauty-pink hover:text-gray-900 transition-all duration-300"
                    >
                      Înapoi
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-beauty-pink to-beauty-pink-dark text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Plasează comanda
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sumar comandă
              </h3>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-beauty-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-2xl">🎨</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Cantitate: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-beauty-pink">
                        {(item.price * item.quantity).toFixed(2)} lei
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{cartSubtotal.toFixed(2)} lei</span>
                </div>
                
                {step >= 2 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livrare</span>
                    <span className="font-medium text-gray-900">{shippingCost.toFixed(2)} lei</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-beauty-pink">{total.toFixed(2)} lei</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Plată securizată SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;