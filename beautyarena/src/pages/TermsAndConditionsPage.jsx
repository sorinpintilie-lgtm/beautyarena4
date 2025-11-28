import React from 'react';
import SEO from '../components/common/SEO';

const TermsAndConditionsPage = () => {
  return (
    <>
      <SEO
        title="Termeni și condiții - Salon Beauty Arena"
        description="Citește termenii și condițiile de utilizare a site-ului și magazinului online Salon Beauty Arena: condiții generale, comenzi, plăți, livrare, retururi și răspundere."
        keywords="termeni si conditii, conditii utilizare site, politici magazin online, Beauty Arena"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Termeni și condiții
          </h1>

          <p className="text-gray-700 mb-4">
            Prezenta pagină stabilește termenii și condițiile generale de utilizare a site-ului Salon Beauty
            Arena, precum și condițiile aplicabile comenzilor plasate prin magazinul online. Te rugăm să citești
            cu atenție aceste informații înainte de a utiliza site-ul sau de a plasa o comandă.
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Definiții și părți contractante</h2>
            <p className="text-gray-700 mb-2">
              <strong>Site</strong> - pagina de internet disponibilă la adresa <strong>beautyarena.ro</strong> și
              subdomeniile acesteia.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Vânzător / Furnizor</strong> - Salon Beauty Arena, cu sediul în București, Bd. Basarabia, Nr. 96,
              Sector 2.
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Client / Utilizator</strong> - orice persoană fizică sau juridică ce accesează site-ul sau
              plasează o comandă prin intermediul acestuia.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Acceptarea termenilor</h2>
            <p className="text-gray-700 mb-2">
              Prin utilizarea site-ului și / sau plasarea unei comenzi, declari că ai citit, înțeles și acceptat
              prezentele termeni și condiții. Ne rezervăm dreptul de a actualiza sau modifica acești termeni în
              orice moment, versiunea actualizată fiind disponibilă pe site.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Comenzi și contractul de vânzare</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Comenzile pot fi plasate online, prin intermediul site-ului, prin adăugarea produselor în coș și
                parcurgerea pașilor de finalizare a comenzii.
              </li>
              <li>
                Contractul de vânzare la distanță se consideră încheiat în momentul confirmării comenzii de către
                noi (de exemplu, prin email sau în contul de client).
              </li>
              <li>
                Ne rezervăm dreptul de a refuza o comandă în caz de eroare evidentă de preț sau stoc, suspiciune de
                fraudă sau date incomplete.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Prețuri și plăți</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Toate prețurile afișate pe site sunt exprimate în lei (RON) și includ TVA, cu excepția cazului în
                care se specifică altfel.
              </li>
              <li>
                Costurile de livrare sunt afișate separat, înainte de finalizarea comenzii.
              </li>
              <li>
                Plata se poate realiza prin metodele disponibile pe site (de exemplu, plata online, ramburs etc.).
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Livrare</h2>
            <p className="text-gray-700 mb-2">
              Condițiile detaliate privind livrarea produselor (timp de livrare, costuri, condiții speciale) sunt
              prezentate în <strong>Politica de livrare</strong> disponibilă pe site.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Dreptul de retragere și returul produselor</h2>
            <p className="text-gray-700 mb-2">
              În conformitate cu legislația în vigoare privind protecția consumatorilor, ai dreptul de a te retrage
              din contractul la distanță, în anumite condiții și termene. Informațiile detaliate privind procedura
              de retur și excepțiile aplicabile sunt prezentate într-o politică dedicată sau în cadrul acestei
              secțiuni, după caz.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Răspundere</h2>
            <p className="text-gray-700 mb-2">
              Facem eforturi permanente pentru a asigura acuratețea informațiilor prezentate pe site (descrieri
              produse, imagini, prețuri etc.), însă pot apărea erori sau omisiuni. Ne rezervăm dreptul de a corecta
              astfel de erori fără o notificare prealabilă.
            </p>
            <p className="text-gray-700 mb-2">
              Nu ne asumăm răspunderea pentru disfuncționalități ale site-ului cauzate de factori externi (erori
              ale furnizorilor de servicii de internet, probleme tehnice independente de noi etc.).
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Proprietate intelectuală</h2>
            <p className="text-gray-700 mb-2">
              Conținutul site-ului (texte, imagini, elemente grafice, logo-uri etc.) este protejat de legislația
              privind drepturile de autor și nu poate fi utilizat, copiat sau distribuit fără acordul prealabil scris
              al Salon Beauty Arena sau al titularilor de drept.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Protecția datelor personale</h2>
            <p className="text-gray-700 mb-2">
              Informații detaliate privind modul în care prelucrăm datele tale cu caracter personal sunt disponibile
              în <strong>Politica de confidențialitate</strong> publicată pe site.
            </p>
          </section>

          <section className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Legea aplicabilă și soluționarea litigiilor</h2>
            <p className="text-gray-700 mb-2">
              Prezentele termeni și condiții sunt guvernate de legislația română. Orice litigiu apărut între
              Salon Beauty Arena și clienți se va soluționa pe cale amiabilă, iar în caz de nereușită, litigiul va fi
              deferit instanțelor competente.
            </p>
            <p className="text-gray-700 mb-2">
              Ai, de asemenea, posibilitatea de a apela la mecanisme alternative de soluționare a litigiilor cu
              consumatorii, conform informațiilor publicate de Autoritatea Națională pentru Protecția
              Consumatorilor (ANPC).
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;