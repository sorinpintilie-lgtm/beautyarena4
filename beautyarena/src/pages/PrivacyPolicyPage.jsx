import React from 'react';
import SEO from '../components/common/SEO';

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEO
        title="Politica de confidențialitate - Salon Beauty Arena"
        description="Află cum colectează, utilizează și protejează Salon Beauty Arena datele tale cu caracter personal, în conformitate cu legislația aplicabilă privind protecția datelor (GDPR)."
        keywords="politica de confidentialitate, protectia datelor, GDPR, date personale, Beauty Arena"
      />

      <div className="min-h-screen bg-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-6 text-center">
            Politica de confidențialitate
          </h1>

          <p className="text-gray-700 mb-4">
            Salon Beauty Arena respectă confidențialitatea datelor tale și se angajează să protejeze informațiile
            personale pe care le prelucrează. Prezenta politică explică modul în care colectăm, utilizăm,
            stocăm și protejăm datele tale cu caracter personal, în conformitate cu legislația în vigoare,
            inclusiv Regulamentul (UE) 2016/679 (GDPR).
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Operatorul de date</h2>
            <p className="text-gray-700 mb-2">
              Operatorul responsabil de prelucrarea datelor tale este <strong>Salon Beauty Arena</strong>,
              cu sediul în București, Bd. Basarabia, Nr. 96, Sector 2.
            </p>
            <p className="text-gray-700 mb-2">
              Ne poți contacta pentru orice aspect legat de protecția datelor la adresa de email{' '}
              <strong>info@beautyarena.ro</strong> sau la numărul de telefon <strong>0722 402 559</strong>.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Categorii de date colectate</h2>
            <p className="text-gray-700 mb-2">În funcție de interacțiunea ta cu site-ul, putem colecta următoarele categorii de date:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Date de identificare: nume, prenume.</li>
              <li>Date de contact: adresă de email, număr de telefon, adresă de livrare.</li>
              <li>Date de comandă și facturare: produse comandate, metode de plată (fără a stoca date complete de card).</li>
              <li>Date tehnice: adresă IP, tipul de browser, informații despre dispozitiv (colectate prin cookie-uri sau tehnologii similare).</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Scopurile prelucrării datelor</h2>
            <p className="text-gray-700 mb-2">Prelucrăm datele tale în următoarele scopuri:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Pentru gestionarea și livrarea comenzilor plasate în magazinul online.</li>
              <li>Pentru crearea și administrarea contului tău de client.</li>
              <li>Pentru oferirea de suport clienți și gestionarea solicitărilor tale.</li>
              <li>Pentru comunicări comerciale (newsletter), numai dacă ți-ai exprimat consimțământul.</li>
              <li>Pentru îmbunătățirea serviciilor și experienței pe site.</li>
              <li>Pentru îndeplinirea obligațiilor legale (ex. facturare, arhivare).</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Temeiul legal al prelucrării</h2>
            <p className="text-gray-700 mb-2">Prelucrăm datele tale în baza unuia sau mai multor dintre următoarele temeiuri legale:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Executarea unui contract (de exemplu, pentru a procesa și livra comanda ta).</li>
              <li>Consimțământul tău (de exemplu, pentru comunicări de marketing).</li>
              <li>Obligații legale (de exemplu, obligații fiscale și contabile).</li>
              <li>Interesul nostru legitim (de exemplu, pentru îmbunătățirea serviciilor).</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Durata de stocare a datelor</h2>
            <p className="text-gray-700 mb-2">
              Datele tale sunt păstrate doar atât timp cât este necesar pentru îndeplinirea scopurilor pentru care
              au fost colectate sau cât timp suntem obligați prin lege să le păstrăm (ex. documente contabile).
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Dezvăluirea datelor către terți</h2>
            <p className="text-gray-700 mb-2">
              În anumite situații, putem transmite datele tale către parteneri de încredere, strict în scopurile
              menționate în această politică, precum:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Furnizori de servicii de curierat.</li>
              <li>Furnizori de servicii IT, găzduire și mentenanță a site-ului.</li>
              <li>Furnizori de servicii de plată securizată.</li>
              <li>Autorități publice, atunci când există obligații legale.</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Ne asigurăm că partenerii noștri oferă suficiente garanții privind protecția datelor tale.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Drepturile tale</h2>
            <p className="text-gray-700 mb-2">
              În conformitate cu legislația aplicabilă, beneficiezi de următoarele drepturi cu privire la datele tale
              personale:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Dreptul de acces la date;</li>
              <li>Dreptul la rectificare;</li>
              <li>Dreptul la ștergerea datelor („dreptul de a fi uitat”);</li>
              <li>Dreptul la restricționarea prelucrării;</li>
              <li>Dreptul la portabilitatea datelor;</li>
              <li>Dreptul de opoziție la prelucrare;</li>
              <li>Dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrare automată.</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Pentru exercitarea acestor drepturi, ne poți contacta la <strong>info@beautyarena.ro</strong>.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Cookie-uri și tehnologii similare</h2>
            <p className="text-gray-700 mb-2">
              Site-ul nostru poate utiliza cookie-uri și tehnologii similare pentru a îmbunătăți funcționarea,
              pentru analiză și pentru personalizarea conținutului. Informații detaliate despre modul în care
              utilizăm cookie-urile vor fi prezentate într-o politică dedicată, disponibilă pe site.
            </p>
          </section>

          <section className="mt-6 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Actualizări ale politicii</h2>
            <p className="text-gray-700 mb-2">
              Ne rezervăm dreptul de a actualiza prezenta politică de confidențialitate ori de câte ori este
              necesar. Versiunea actualizată va fi publicată pe această pagină, cu menționarea datei ultimei
              modificări.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;