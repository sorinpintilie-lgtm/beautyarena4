import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, MapPin, Phone, Mail, User, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { initializeNetopiaPayment } from '../services/paymentService';
import SEO from '../components/common/SEO';
import toast from 'react-hot-toast';

const PROMO_CODES = {
  ARENA10: {
    type: 'percent',
    value: 10,
    label: '10% reducere la toată comanda',
  },
  WELCOME25: {
    type: 'fixed',
    value: 25,
    minSubtotal: 150,
    label: '25 lei reducere la comenzi de minimum 150 lei',
  },
};

const calculatePromoDiscount = (promo, subtotal) => {
  if (!promo) return 0;

  if (promo.minSubtotal && subtotal < promo.minSubtotal) {
    return 0;
  }

  if (promo.type === 'percent') {
    return Number(((subtotal * promo.value) / 100).toFixed(2));
  }

  if (promo.type === 'fixed') {
    return Math.min(promo.value, subtotal);
  }

  return 0;
};

const getCartItemImage = (item) =>
  item.image || item.thumbnail || item.localImages?.[0] || item.images?.[0] || '/visualMarketing_logo.png';

const PENDING_PAYMENT_STORAGE_KEY = 'beautyarena-pending-payment-order';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping info
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'România',
    // Billing info
    billingSameAsShipping: true,
    billingFullName: user?.name || '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'România',
    // Shipping method
    shippingMethod: 'courier_online',
    // Payment
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const shippingMethods = [
    {
      id: 'courier_online',
      name: 'Prin curier cu plata online',
      price: 15,
      paymentMethod: 'card',
    },
    {
      id: 'courier_ramburs',
      name: 'Prin curier cu plata Ramburs (taxa ramburs 12 lei)',
      price: 27,
      paymentMethod: 'cash',
    },
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Ramburs', icon: Truck },
    { id: 'card', name: 'Card online (NETOPIA)', icon: CreditCard },
  ];

  const BASE_SHIPPING_COST = 15;
  const RAMBURS_FEE = 12; // Cash on delivery extra fee

  const shippingCost = BASE_SHIPPING_COST;
  const rambursFee = formData.paymentMethod === 'cash' ? RAMBURS_FEE : 0;
  const totalShippingCost = shippingCost + rambursFee;
  const promoDiscount = calculatePromoDiscount(appliedPromo, cartSubtotal);
  const totalBeforeDiscount = cartSubtotal + totalShippingCost;
  const total = Math.max(totalBeforeDiscount - promoDiscount, 0);

  const handleApplyPromoCode = () => {
    const normalizedCode = promoInput.trim().toUpperCase();

    if (!normalizedCode) {
      setPromoError('Introdu un cod promoțional.');
      return;
    }

    const promo = PROMO_CODES[normalizedCode];

    if (!promo) {
      setPromoError('Cod promoțional invalid.');
      return;
    }

    if (promo.minSubtotal && cartSubtotal < promo.minSubtotal) {
      setPromoError(`Acest cod este disponibil pentru comenzi de minimum ${promo.minSubtotal} lei.`);
      return;
    }

    setAppliedPromo({ code: normalizedCode, ...promo });
    setPromoError('');
    setPromoInput('');
    toast.success(`Codul ${normalizedCode} a fost aplicat.`);
  };

  const handleRemovePromoCode = () => {
    if (appliedPromo) {
      toast.success(`Codul ${appliedPromo.code} a fost eliminat.`);
    }
    setAppliedPromo(null);
    setPromoError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Numele este obligatoriu';
    if (!formData.email.trim()) newErrors.email = 'Email-ul este obligatoriu';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Telefonul este obligatoriu';
    if (!formData.address.trim()) newErrors.address = 'Adresa este obligatorie';
    if (!formData.city.trim()) newErrors.city = 'Orașul este obligatoriu';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Codul poștal este obligatoriu';

    if (!formData.billingSameAsShipping) {
      if (!formData.billingFullName.trim()) newErrors.billingFullName = 'Numele de facturare este obligatoriu';
      if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Adresa de facturare este obligatorie';
      if (!formData.billingCity.trim()) newErrors.billingCity = 'Orașul de facturare este obligatoriu';
      if (!formData.billingPostalCode.trim()) newErrors.billingPostalCode = 'Codul poștal de facturare este obligatoriu';
    }

    if (!formData.shippingMethod) newErrors.shippingMethod = 'Selectează metoda de livrare';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Selectează metoda de plată';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if user is authenticated
    if (!isAuthenticated || !user || !user.uid) {
      toast.error('Trebuie să te autentifici pentru a plasa o comandă');
      navigate('/autentificare');
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingAddress = {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };

      const billingAddress = formData.billingSameAsShipping
        ? {
            fullName: formData.fullName,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          }
        : {
            fullName: formData.billingFullName,
            address: formData.billingAddress,
            city: formData.billingCity,
            postalCode: formData.billingPostalCode,
            country: formData.billingCountry,
          };

      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress,
        billingAddress,
        shippingMethod: formData.shippingMethod,
        shippingCost: totalShippingCost,
        rambursFee: rambursFee,
        paymentMethod: formData.paymentMethod,
        promoCode: appliedPromo?.code || null,
        discount: promoDiscount,
        subtotal: cartSubtotal,
        totalBeforeDiscount,
        total: total,
        customerInfo: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        }
      };

      console.log('Creating order:', orderData);
      const orderResult = await createOrder(user.uid, orderData);

      if (orderResult.success) {
        if (formData.paymentMethod === 'card') {
          const pendingPaymentPayload = {
            orderNumber: orderResult.orderNumber,
            createdAt: new Date().toISOString(),
            amount: total,
            currency: 'RON',
          };

          localStorage.setItem(PENDING_PAYMENT_STORAGE_KEY, JSON.stringify(pendingPaymentPayload));

          try {
            await initializeNetopiaPayment({
              orderNumber: orderResult.orderNumber,
              amount: total,
              currency: 'RON',
              description: `Comandă Beauty Arena ${orderResult.orderNumber}`,
              customerInfo: orderResult.customerInfo,
              shippingAddress: orderResult.shippingAddress,
            });

            toast.success('Te redirecționăm către NETOPIA pentru finalizarea plății.');
            return;
          } catch (paymentError) {
            localStorage.removeItem(PENDING_PAYMENT_STORAGE_KEY);
            console.error('Error initializing NETOPIA payment:', paymentError);
            toast.error(paymentError.message || 'Nu am putut inițializa plata online.');
          }
        } else {
          // Send order confirmation emails for cash orders
          try {
            // Send confirmation to customer
            await fetch('/.netlify/functions/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'order_confirmation',
                data: orderResult
              })
            });

            // Send notification to store contact
            await fetch('/.netlify/functions/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'store_order_notification',
                data: orderResult
              })
            });
          } catch (emailError) {
            console.warn('Order emails failed:', emailError);
            // Don't fail the order if emails fail
          }

          // Clear cart and navigate
          clearCart();
          toast.success('Comandă plasată cu succes!');
          navigate('/contul-meu');
        }
      } else {
        toast.error('Eroare la plasarea comenzii');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Eroare la plasarea comenzii');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      if (name === 'billingSameAsShipping') {
        return {
          ...prev,
          billingSameAsShipping: inputValue,
        };
      }

      if (name === 'shippingMethod') {
        const shippingOption = shippingMethods.find((method) => method.id === value);
        return {
          ...prev,
          shippingMethod: value,
          paymentMethod: shippingOption?.paymentMethod || prev.paymentMethod,
        };
      }

      if (name === 'paymentMethod') {
        const linkedShipping =
          value === 'cash' ? 'courier_ramburs' : 'courier_online';

        return {
          ...prev,
          paymentMethod: value,
          shippingMethod: linkedShipping,
        };
      }

      return { ...prev, [name]: inputValue };
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'shippingMethod' && errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }

    if (name === 'paymentMethod' && errors.shippingMethod) {
      setErrors((prev) => ({ ...prev, shippingMethod: '' }));
    }

    if (name === 'billingSameAsShipping' && inputValue) {
      setErrors((prev) => ({
        ...prev,
        billingFullName: '',
        billingAddress: '',
        billingCity: '',
        billingPostalCode: '',
      }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEO
          title="Finalizare comandă | BeautyArena"
          description="Finalizează comanda în siguranță pe BeautyArena."
          noindex={true}
        />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coșul tău este gol</h2>
            <p className="text-gray-600 mb-6">Adaugă produse pentru a continua</p>
            <Link to="/shop" className="btn-primary">
              Mergi la magazin
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Finalizare comandă | BeautyArena"
        description="Completează datele de livrare și finalizează comanda pe BeautyArena."
        noindex={true}
      />
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
          <p className="text-gray-600 text-sm md:text-base">
            Completează toate detaliile comenzii într-un singur ecran: date personale, livrare și plată.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Date de livrare</h2>
                  <span className="text-xs font-semibold uppercase tracking-wide text-beauty-pink bg-beauty-pink/10 px-3 py-1 rounded-full">
                    Pas 1
                  </span>
                </div>

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

                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Adresă de facturare</h3>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-beauty-pink focus:ring-beauty-pink border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Adresa de facturare este la fel cu adresa de livrare
                    </span>
                  </label>

                  {!formData.billingSameAsShipping && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nume complet facturare *
                        </label>
                        <input
                          type="text"
                          name="billingFullName"
                          value={formData.billingFullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.billingFullName ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="Ion Popescu"
                        />
                        {errors.billingFullName && <p className="text-red-500 text-xs mt-1">{errors.billingFullName}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresă facturare *
                        </label>
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                            errors.billingAddress ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="Strada Exemplu, Nr. 123, Ap. 4"
                        />
                        {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Oraș facturare *
                          </label>
                          <input
                            type="text"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                              errors.billingCity ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="București"
                          />
                          {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cod poștal facturare *
                          </label>
                          <input
                            type="text"
                            name="billingPostalCode"
                            value={formData.billingPostalCode}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-beauty-pink transition-colors ${
                              errors.billingPostalCode ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="012345"
                          />
                          {errors.billingPostalCode && <p className="text-red-500 text-xs mt-1">{errors.billingPostalCode}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Țară facturare *
                          </label>
                          <input
                            type="text"
                            name="billingCountry"
                            value={formData.billingCountry}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors"
                            placeholder="România"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Metodă de livrare</h2>
                  <span className="text-xs font-semibold uppercase tracking-wide text-beauty-pink bg-beauty-pink/10 px-3 py-1 rounded-full">
                    Pas 2
                  </span>
                </div>

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
                          <p className="text-sm text-gray-600">{method.paymentMethod === 'cash' ? '27,00 lei' : '15,00 lei'}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-beauty-pink">
                        {method.paymentMethod === 'cash' ? '27,00 lei' : '15,00 lei'}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.shippingMethod && <p className="text-red-500 text-xs">{errors.shippingMethod}</p>}

                <div className="rounded-lg p-4 text-sm bg-blue-50 border border-blue-200 text-blue-700">
                  <p className="font-medium">Taxa de transport este 15,00 lei.</p>
                  <p className="text-xs mt-1">Pentru ramburs se adaugă taxa de procesare de 12,00 lei.</p>
                </div>
              </section>

              <section className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Metodă de plată</h2>
                  <span className="text-xs font-semibold uppercase tracking-wide text-beauty-pink bg-beauty-pink/10 px-3 py-1 rounded-full">
                    Pas 3
                  </span>
                </div>

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
                {errors.paymentMethod && <p className="text-red-500 text-xs">{errors.paymentMethod}</p>}

                {formData.paymentMethod === 'card' && (
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                    <p>Vei fi redirecționat către procesatorul de plăți securizat pentru a finaliza tranzacția.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FFAB9D' }}
                >
                  {isSubmitting ? 'Se procesează comanda...' : 'Plasează comanda'}
                </button>
              </section>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sumar comandă
              </h3>

              {/* Promo Code */}
              <div className="mb-6 rounded-lg border border-gray-200 p-4 bg-gray-50">
                <p className="text-sm font-medium text-gray-800 mb-2">Cod promoțional</p>

                {!appliedPromo ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          if (promoError) setPromoError('');
                        }}
                        placeholder="Ex: ARENA10"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm uppercase focus:outline-none focus:border-beauty-pink transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromoCode}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:shadow-md"
                        style={{ backgroundColor: '#FFAB9D' }}
                      >
                        Aplică
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-500">{promoError}</p>}
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                    <div>
                      <p className="text-sm font-semibold text-green-700">Cod activ: {appliedPromo.code}</p>
                      <p className="text-xs text-green-700/80">{appliedPromo.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromoCode}
                      className="text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
                    >
                      Elimină
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-beauty-pink/10 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getCartItemImage(item)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/visualMarketing_logo.png';
                        }}
                      />
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

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reducere ({appliedPromo?.code})</span>
                    <span className="font-medium text-green-600">-{promoDiscount.toFixed(2)} lei</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Livrare</span>
                  <span className="font-medium text-gray-900">{shippingCost.toFixed(2)} lei</span>
                </div>

                {rambursFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Comision ramburs</span>
                    <span className="font-medium text-gray-900">{rambursFee.toFixed(2)} lei</span>
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
    </>
  );
};

export default CheckoutPage;
