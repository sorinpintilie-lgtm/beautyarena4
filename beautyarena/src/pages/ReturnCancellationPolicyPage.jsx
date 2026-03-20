import React from 'react';
import SEO from '../components/common/SEO';

const ReturnCancellationPolicyPage = () => {
  const contactEmail = 'contact@salonbeautyarena.ro';
  const contactPhone = '0722 402 559';

  return (
    <>
      <SEO
        title="Retur / Anulare - Salon Beauty Arena"
        description="Politica de retur și anulare Salon Beauty Arena: termen de retur, condiții de acceptare, excepții, rambursare, anulare comandă și anulare servicii."
        keywords="politica retur, anulare comandă, termen retur, rambursare, Beauty Arena"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Retur / Anulare
          </h1>

          <p className="text-gray-700 mb-4">
            Prezenta politică stabilește condițiile de retur pentru produsele comandate online și regulile de
            anulare pentru comenzi și servicii.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Termen legal de retur</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Pentru produsele fizice comandate la distanță, poți solicita returul în termen de
                <strong> 14 zile calendaristice</strong> de la primirea coletului.
              </li>
              <li>
                Termenul este respectat dacă notificarea de retragere este trimisă în interiorul celor 14 zile.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Condiții de acceptare a returului</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Produsele returnate trebuie să fie în aceeași stare în care au fost livrate, fără deteriorări
                provocate de utilizare necorespunzătoare.
              </li>
              <li>
                Produsul se returnează, pe cât posibil, în ambalajul original și cu toate accesoriile/documentele
                primite.
              </li>
              <li>
                În cazul în care produsul prezintă urme de utilizare care diminuează valoarea comercială,
                rambursarea poate fi ajustată proporțional.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Produse care nu pot fi returnate</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Produse sigilate care nu pot fi returnate din motive de igienă/protecția sănătății, după
                desigilare.
              </li>
              <li>
                Produse realizate/personalizate la cererea clientului.
              </li>
              <li>
                Alte categorii exceptate de legislația aplicabilă comerțului la distanță.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Cum inițiezi returul (mod de retur)</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Trimite solicitarea de retur la{' '}
                <a href={`mailto:${contactEmail}`} className="text-beauty-pink hover:underline font-medium">
                  {contactEmail}
                </a>{' '}
                sau telefonic la{' '}
                <a href="tel:0722402559" className="text-beauty-pink hover:underline font-medium">
                  {contactPhone}
                </a>
                .
              </li>
              <li>
                Menționează numărul comenzii, produsele pe care dorești să le returnezi și motivul returului
                (opțional).
              </li>
              <li>
                După confirmare, coletul se expediază prin curier la adresa comunicată de echipa noastră.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Costul transportului de retur</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Costul returului este suportat de client, cu excepția situațiilor în care produsul este livrat
                greșit, incomplet sau defect.
              </li>
              <li>
                Dacă returul este generat de o eroare imputabilă nouă, costul de transport este suportat de Salon
                Beauty Arena.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Rambursarea contravalorii</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                După recepția și verificarea produsului returnat, rambursarea se efectuează prin aceeași metodă de
                plată folosită la comandă sau printr-o metodă agreată de comun acord.
              </li>
              <li>
                Termenul estimativ de rambursare este de <strong>3-14 zile lucrătoare</strong>, în funcție de
                procesatorul de plăți/banca emitentă.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Anularea comenzilor de produse</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Comanda poate fi anulată fără costuri suplimentare înainte de predarea coletului către curier.
              </li>
              <li>
                Dacă produsul a fost deja expediat, anularea se realizează prin procedura de retur.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Anularea serviciilor comercializate</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Anularea unei programări/serviciu se poate solicita prin telefon sau email cu minimum
                <strong> 24 de ore</strong> înainte de ora programată.
              </li>
              <li>
                În cazul serviciilor deja începute sau finalizate, anularea și rambursarea se analizează punctual,
                în funcție de natura serviciului prestat.
              </li>
            </ul>
          </section>

          <section className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Contact retur / anulare</h2>
            <p className="text-gray-700 mb-2">
              Pentru orice solicitare privind returul sau anularea, ne poți contacta la{' '}
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

export default ReturnCancellationPolicyPage;
