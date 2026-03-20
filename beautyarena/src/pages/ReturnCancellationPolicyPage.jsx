import React from 'react';
import SEO from '../components/common/SEO';

const ReturnCancellationPolicyPage = () => {
  return (
    <>
      <SEO
        title="Retur / Anulare - Salon Beauty Arena"
        description="Informații despre termenul estimativ de retur, modul de retur al produselor și condițiile de anulare pentru serviciile comercializate de Salon Beauty Arena."
        keywords="retur, anulare, termen retur, mod retur, politica retur, Beauty Arena"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Retur / Anulare
          </h1>

          <p className="text-gray-700 mb-4">
            Această secțiune conține informații privind termenul estimativ de retur și modul de retur pentru
            produsele și/sau serviciile comercializate de Salon Beauty Arena.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Termen estimativ de retur</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Pentru produsele fizice, poți solicita returul în termen de <strong>14 zile calendaristice</strong>
                de la primirea coletului, conform legislației aplicabile.
              </li>
              <li>
                După recepția și verificarea produsului returnat, procesarea returului se face, de regulă, în
                <strong> 3-14 zile lucrătoare</strong>, în funcție de metoda de plată.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Mod de retur al produselor</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Trimite o solicitare de retur la <strong>info@beautyarena.ro</strong> sau telefonic la
                <strong> 0722 402 559</strong>, menționând numărul comenzii.
              </li>
              <li>
                Produsele returnate trebuie ambalate corespunzător, în starea în care au fost primite, împreună
                cu documentele aferente (după caz).
              </li>
              <li>
                Returul se efectuează prin curier, la adresa comunicată de echipa noastră în răspunsul de
                confirmare a solicitării.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Anularea serviciilor comercializate</h2>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Contact pentru retur / anulare</h2>
            <p className="text-gray-700 mb-2">
              Pentru asistență privind returul sau anularea unei comenzi, ne poți contacta la
              <strong> info@beautyarena.ro</strong> sau la <strong>0722 402 559</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReturnCancellationPolicyPage;
