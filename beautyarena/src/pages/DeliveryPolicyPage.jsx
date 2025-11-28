import React from 'react';
import SEO from '../components/common/SEO';

const DeliveryPolicyPage = () => {
  return (
    <>
      <SEO
        title="Politica de livrare - Salon Beauty Arena"
        description="Află detalii despre condițiile de livrare pentru produsele comandate din magazinul online Salon Beauty Arena: costuri, termene, metode de livrare și alte informații utile."
        keywords="politica de livrare, livrare comenzi, livrare produse, Beauty Arena, magazin online"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Politica de livrare
          </h1>

          <p className="text-gray-700 mb-4">
            Prezenta politică de livrare se aplică tuturor comenzilor plasate prin magazinul online al Salon
            Beauty Arena. Ne dorim ca produsele comandate să ajungă în siguranță la tine, în cel mai scurt timp
            posibil, motiv pentru care colaborăm cu servicii de curierat rapid și monitorizăm permanent
            livrările.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Metode de livrare</h2>
            <p className="text-gray-700 mb-2">
              Livrarea produselor se realizează prin firme de curierat rapid pe teritoriul României. Detaliile
              exacte (curierul utilizat, costurile, estimarea de timp) sunt afișate în pagina de finalizare a
              comenzii și pot fi actualizate periodic.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Timp de procesare și livrare</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Comenzile sunt, de regulă, procesate în <strong>1-2 zile lucrătoare</strong> de la
                confirmarea acestora.
              </li>
              <li>
                Termenul estimat de livrare este, în mod obișnuit, de <strong>1-3 zile lucrătoare</strong>
                de la predarea coletului către curier.
              </li>
              <li>
                În perioade aglomerate (sărbători, promoții, condiții meteo nefavorabile etc.), termenele de
                livrare pot suferi întârzieri independente de voința noastră.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Costul livrării</h2>
            <p className="text-gray-700 mb-2">
              Costul de livrare este afișat întotdeauna înainte de finalizarea comenzii. În anumite campanii sau
              promoții, livrarea poate fi gratuită peste o anumită valoare a comenzii sau în anumite condiții
              speciale, comunicate pe site.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Adresa de livrare</h2>
            <p className="text-gray-700 mb-2">
              Te rugăm să verifici cu atenție adresa de livrare introdusă în momentul plasării comenzii.
              Răspunderea pentru corectitudinea datelor furnizate îți aparține. În cazul în care curierul nu
              poate livra comanda din cauza unei adrese incorecte sau incomplete, este posibil să fie necesară
              reexpedierea coletului, situație în care pot apărea costuri suplimentare.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Recepția coletului</h2>
            <p className="text-gray-700 mb-2">
              La primirea coletului, te rugăm să verifici integritatea ambalajului. În cazul în care observi
              deteriorări vizibile ale coletului sau suspiciuni de manipulare necorespunzătoare, este recomandat
              să soliciți curierului întocmirea unui proces-verbal și să ne contactezi cât mai rapid pentru
              clarificări.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Comenzi nelivrate / retur la expeditor</h2>
            <p className="text-gray-700 mb-2">
              În cazul în care coletul nu poate fi livrat (destinatarul nu răspunde, adresa este incorectă,
              destinatarul refuză coletul etc.), acesta poate fi returnat la expeditor. Ne rezervăm dreptul de a
              solicita plata în avans a comenzilor ulterioare pentru clienții care au avut colete refuzate
              nejustificat.
            </p>
          </section>

          <section className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Contact</h2>
            <p className="text-gray-700 mb-2">
              Pentru orice întrebare legată de livrare, ne poți contacta la adresa de email{' '}
              <strong>info@beautyarena.ro</strong> sau la numărul de telefon{' '}
              <strong>0722 402 559</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default DeliveryPolicyPage;