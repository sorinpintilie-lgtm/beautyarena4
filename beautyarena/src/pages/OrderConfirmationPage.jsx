import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Phone, ArrowRight, Clock3, AlertTriangle } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useCart } from '../context/CartContext';

const PENDING_PAYMENT_STORAGE_KEY = 'beautyarena-pending-payment-order';
const FAILED_PAYMENT_STATUSES = new Set(['payment_failed', 'payment_cancelled', 'refunded']);

const getRedirectStatusHint = (searchParams) => {
  const statusRaw = String(
    searchParams.get('status')
    || searchParams.get('action')
    || searchParams.get('result')
    || searchParams.get('order_status')
    || ''
  ).trim().toLowerCase();

  const errorCodeRaw = String(
    searchParams.get('errorCode')
    || searchParams.get('error_code')
    || searchParams.get('error.code')
    || ''
  ).trim().toLowerCase();

  const paymentStatusRaw = String(
    searchParams.get('paymentStatus')
    || searchParams.get('payment_status')
    || ''
  ).trim().toLowerCase();

  if (['paid', 'confirmed', 'approved', 'success', 'captured'].includes(statusRaw)) return 'paid';
  if (['canceled', 'cancelled', 'failed', 'declined', 'error'].includes(statusRaw)) return 'payment_failed';

  const numericStatus = Number(paymentStatusRaw || statusRaw);
  if ((numericStatus === 3 || numericStatus === 5) && (!errorCodeRaw || errorCodeRaw === '0' || errorCodeRaw === '00')) {
    return 'paid';
  }

  if (numericStatus === 12) return 'payment_cancelled';
  if (errorCodeRaw && !['0', '00'].includes(errorCodeRaw)) return 'payment_failed';

  return null;
};

const getNetopiaStatusCopy = (status) => {
  if (status === 'paid') {
    return {
      title: 'Plata a fost confirmată',
      description: 'Tranzacția a fost validată de NETOPIA. Comanda intră acum în procesare.',
      tone: 'success',
    };
  }

  if (FAILED_PAYMENT_STATUSES.has(status)) {
    return {
      title: 'Plata nu a fost finalizată',
      description: 'Tranzacția a fost anulată sau respinsă. Poți relua plata din contul tău.',
      tone: 'error',
    };
  }

  return {
    title: 'Plata este în curs de confirmare',
    description: 'Așteptăm confirmarea finală de la NETOPIA. Pagina se actualizează automat.',
    tone: 'pending',
  };
};

const logNetopiaDebug = (...args) => {
  // Intentionally verbose while debugging payment status mismatches.
  // eslint-disable-next-line no-console
  console.log('[NETOPIA CONFIRM DEBUG]', ...args);
};

const resolvePendingPaymentSnapshot = () => {
  if (typeof window === 'undefined') return null;

  try {
    return JSON.parse(localStorage.getItem(PENDING_PAYMENT_STORAGE_KEY) || 'null');
  } catch (_error) {
    return null;
  }
};

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source');
  const orderFromQuery = searchParams.get('order');
  const ntpIdFromQuery = searchParams.get('ntpID') || searchParams.get('ntp_id') || searchParams.get('paymentId');
  const pendingPaymentSnapshot = resolvePendingPaymentSnapshot();
  const ntpIdFromPendingPayment =
    pendingPaymentSnapshot?.orderNumber && orderFromQuery
      ? (pendingPaymentSnapshot.orderNumber === orderFromQuery ? pendingPaymentSnapshot.ntpID || null : null)
      : (pendingPaymentSnapshot?.ntpID || null);
  const resolvedNtpId = ntpIdFromQuery || ntpIdFromPendingPayment || null;
  const isNetopiaFlow = source === 'netopia';
  const { cartItems, clearCart } = useCart();
  const paidStateHandledRef = useRef(false);
  const [paymentStatus, setPaymentStatus] = useState(
    isNetopiaFlow ? (redirectStatusHint || 'paid') : 'paid'
  );
  const redirectStatusHint = getRedirectStatusHint(searchParams);

  // In a real app, this would come from state/props
  const orderNumber = orderFromQuery || resolvedNtpId || `BA${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    logNetopiaDebug('effect:start', {
      source,
      isNetopiaFlow,
      orderFromQuery,
      ntpIdFromQuery,
      ntpIdFromPendingPayment,
      resolvedNtpId,
      redirectStatusHint,
      currentPaymentStatus: paymentStatus,
      url: typeof window !== 'undefined' ? window.location.href : null,
    });

    if (!isNetopiaFlow) {
      logNetopiaDebug('effect:stop-non-netopia-flow');
      return undefined;
    }

    const finalRedirectStatus = redirectStatusHint || 'paid';
    setPaymentStatus(finalRedirectStatus);
    logNetopiaDebug('redirect:final-status-applied', {
      finalRedirectStatus,
      strategy: redirectStatusHint ? 'hint-from-netopia' : 'fallback-paid-on-return',
    });

    if (finalRedirectStatus === 'paid' && !paidStateHandledRef.current) {
      let pendingPayment = null;

      try {
        pendingPayment = JSON.parse(localStorage.getItem(PENDING_PAYMENT_STORAGE_KEY) || 'null');
      } catch (_error) {
        pendingPayment = null;
      }

      if (!pendingPayment || pendingPayment?.orderNumber === orderFromQuery) {
        paidStateHandledRef.current = true;
        localStorage.removeItem(PENDING_PAYMENT_STORAGE_KEY);

        if (cartItems.length > 0) {
          clearCart();
        }
      }
    }

    return undefined;
  }, [
    source,
    isNetopiaFlow,
    orderFromQuery,
    redirectStatusHint,
    paymentStatus,
    clearCart,
    cartItems.length,
  ]);

  const netopiaStatusCopy = getNetopiaStatusCopy(paymentStatus);
  const isPaid = paymentStatus === 'paid';
  const isPaymentFailed = FAILED_PAYMENT_STATUSES.has(paymentStatus);

  return (
    <>
      <SEO
        title="Confirmare comandă | BeautyArena"
        description="Comanda a fost plasată cu succes pe BeautyArena."
        noindex={true}
      />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              !isNetopiaFlow || isPaid
                ? 'bg-green-100'
                : isPaymentFailed
                  ? 'bg-red-100'
                  : 'bg-amber-100'
            }`}
          >
            {!isNetopiaFlow || isPaid ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : isPaymentFailed ? (
              <AlertTriangle className="w-12 h-12 text-red-600" />
            ) : (
              <Clock3 className="w-12 h-12 text-amber-600" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-4">
            {isNetopiaFlow
              ? netopiaStatusCopy.title
              : 'Comanda ta a fost plasată cu succes!'}
          </h1>
          <p className="text-lg text-gray-600">
            {isNetopiaFlow
              ? netopiaStatusCopy.description
              : 'Îți mulțumim pentru comandă. Vei primi un email de confirmare în curând.'}
          </p>
          {isNetopiaFlow && paymentStatus === 'payment_processing' && (
            <p className="text-sm text-amber-700 mt-3 font-medium">
              Statusul plății este încă în curs de procesare.
            </p>
          )}
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
            {isNetopiaFlow && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">Status plată</p>
                <p className="text-lg font-semibold text-gray-900">{paymentStatus}</p>
              </div>
            )}
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
                  {isNetopiaFlow && !isPaid
                    ? 'Emailul de confirmare se trimite doar după validarea plății de către NETOPIA.'
                    : 'Vei primi un email cu detaliile comenzii și factura în câteva minute.'}
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
                  {isNetopiaFlow && !isPaid
                    ? 'Comanda rămâne în așteptare până când webhook-ul confirmă plata ca fiind achitată.'
                    : 'Comanda ta va fi procesată în 1-2 zile lucrătoare.'}
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
                  {isNetopiaFlow && isPaymentFailed
                    ? 'După reluarea plății și confirmarea comenzii, vei primi detaliile de livrare.'
                    : 'Vei primi un cod de tracking când comanda va fi expediată.'}
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
            to={isNetopiaFlow && !isPaid ? '/contul-meu' : '/shop'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-beauty-pink text-white rounded-lg font-medium hover:bg-beauty-pink-dark transition-colors"
          >
            {isNetopiaFlow && !isPaid ? 'Vezi statusul comenzii' : 'Continuă cumpărăturile'}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to={isNetopiaFlow && isPaymentFailed ? '/checkout' : '/'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-beauty-pink transition-colors"
          >
            {isNetopiaFlow && isPaymentFailed ? 'Reia checkout-ul' : 'Înapoi la pagina principală'}
          </Link>
        </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
