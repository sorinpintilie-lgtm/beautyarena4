import React from 'react';
import SEO from '../components/common/SEO';

const DeliveryPolicyPage = () => {
  const contactEmail = 'contact@salonbeautyarena.ro';
  const contactPhone = '0722 402 559';

  return (
    <>
      <SEO
        title="Politica de livrare - Salon Beauty Arena"
        description="Politica de livrare Salon Beauty Arena: arie de acoperire, costuri, termen estimativ de livrare, modalitate de livrare pentru produse și servicii, recepție și comenzi nelivrate."
        keywords="politica de livrare, termen livrare, mod livrare, cost livrare, Beauty Arena"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Politica de livrare
          </h1>

          <p className="text-gray-700 mb-4">
            Prezenta politică se aplică tuturor comenzilor plasate pe site-ul Salon Beauty Arena pentru
            produsele și/sau serviciile comercializate online.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Aria de livrare și modalitatea de livrare</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Livrăm, în mod uzual, pe teritoriul <strong>României</strong>, prin servicii de curierat rapid.
              </li>
              <li>
                Pentru <strong>produse fizice</strong>, comanda este predată curierului după confirmare și
                procesare.
              </li>
              <li>
                Pentru <strong>servicii/vouchere electronice</strong>, livrarea se face digital (email și/sau
                telefon), conform tipului de serviciu achiziționat.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Costul livrării</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Costul de livrare este afișat în pagina de checkout, înainte de plasarea comenzii.
              </li>
              <li>
                În anumite campanii promoționale, livrarea poate fi gratuită, în condițiile afișate pe site.
              </li>
              <li>
                Pentru localități cu kilometri suplimentari, curierul poate aplica taxe adiționale, comunicate
                separat de operatorul de curierat.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Procesarea comenzii</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Comenzile sunt procesate, de regulă, în <strong>1-2 zile lucrătoare</strong> de la confirmare.
              </li>
              <li>
                Comenzile plasate în weekend sau în zile libere legale se procesează în următoarea zi lucrătoare.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Termen estimativ de livrare produse</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Termenul estimativ de tranzit este de <strong>1-3 zile lucrătoare</strong> de la predarea
                coletului către curier.
              </li>
              <li>
                În perioade cu volum ridicat (campanii, sărbători), pot apărea întârzieri independente de noi.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Livrare pentru servicii / produse digitale</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Pentru vouchere, confirmări sau alte servicii digitale, termenul estimativ de livrare este de
                <strong> 24-48 ore</strong> de la confirmarea plății/comenzii.
              </li>
              <li>
                Livrarea se face electronic, la datele de contact furnizate în comandă.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Recepția coletului</h2>
            <p className="text-gray-700 mb-2">
              La livrare, te rugăm să verifici integritatea ambalajului. Dacă observi deteriorări vizibile,
              recomandăm refuzul coletului și solicitarea unui proces-verbal de la curier.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Comenzi nelivrate / retur la expeditor</h2>
            <p className="text-gray-700 mb-2">
              În cazul în care coletul nu poate fi livrat (date incorecte, imposibilitate de contact, refuz de
              primire), acesta poate fi returnat la expeditor. Reexpedierea poate implica costuri suplimentare.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Limitări și întârzieri</h2>
            <p className="text-gray-700 mb-2">
              Termenele de livrare sunt estimative și pot fi influențate de factori externi (condiții meteo,
              blocaje logistice, perioade aglomerate). În astfel de situații, te vom informa cât mai rapid.
            </p>
          </section>

          <section className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Contact livrare</h2>
            <p className="text-gray-700 mb-2">
              Pentru întrebări privind livrarea, ne poți contacta la{' '}
              <a href={`mailto:${contactEmail}`} className="text-beauty-pink hover:underline font-medium">
                {contactEmail}
              </a>{' '}
              sau la{' '}
              <a href="tel:0722402559" className="text-beauty-pink hover:underline font-medium">
                {contactPhone}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default DeliveryPolicyPage;
