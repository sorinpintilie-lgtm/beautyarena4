import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Phone, ArrowRight } from 'lucide-react';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  
  // In a real app, this would come from state/props
  const orderNumber = `BA${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
            Comanda ta a fost plasată cu succes!
          </h1>
          <p className="text-lg text-gray-600">
            Îți mulțumim pentru comandă. Vei primi un email de confirmare în curând.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Detalii comandă
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-sm text-gray-600">Număr comandă</p>
                <p className="text-lg font-semibold text-beauty-pink">#{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data comenzii</p>
                <p className="text-lg font-medium text-gray-900">{orderDate}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">Ce urmează?</h3>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-beauty-pink/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-beauty-pink" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Confirmare prin email</h4>
                <p className="text-sm text-gray-600">
                  Vei primi un email cu detaliile comenzii și factura în câteva minute.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-beauty-pink/10 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-beauty-pink" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Procesare comandă</h4>
                <p className="text-sm text-gray-600">
                  Comanda ta va fi procesată în 1-2 zile lucrătoare.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-beauty-pink/10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-beauty-pink" />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Livrare</h4>
                <p className="text-sm text-gray-600">
                  Vei primi un cod de tracking când comanda va fi expediată.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-beauty-pink/5 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Ai nevoie de ajutor?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Dacă ai întrebări despre comanda ta, nu ezita să ne contactezi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+40264123456"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-beauty-pink hover:text-beauty-pink transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Sună-ne
            </a>
            <a
              href="mailto:info@beautyarena.ro"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-beauty-pink hover:text-beauty-pink transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Trimite email
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-beauty-pink text-white rounded-lg font-medium hover:bg-beauty-pink-dark transition-colors"
          >
            Continuă cumpărăturile
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-beauty-pink transition-colors"
          >
            Înapoi la pagina principală
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;