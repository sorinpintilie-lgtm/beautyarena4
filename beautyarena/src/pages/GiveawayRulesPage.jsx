import React from 'react';
import SEO from '../components/common/SEO';

const GiveawayRulesPage = () => {
  const pdfPath = '/giveaway-regulament.pdf';

  return (
    <>
      <SEO
        title="Regulament Giveaway Valentine's Day - Salon Beauty Arena"
        description="Consultă regulamentul oficial al campaniei Giveaway Valentine's Day organizată de Salon Beauty Arena."
        keywords="regulament giveaway, valentine's day, beauty arena, campanie promotionala"
      />

      <div className="min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-elegant font-bold text-gray-900 mb-4 text-center">
            Regulament Giveaway Valentine's Day
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Mai jos este afișat regulamentul oficial al campaniei. Dacă documentul nu se încarcă, îl poți deschide direct.
          </p>

          <div className="mb-4 text-center">
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-beauty-pink px-4 py-2 text-black font-medium hover:bg-beauty-pink-dark transition-colors"
            >
              Deschide regulamentul în tab nou
            </a>
          </div>

          <div className="w-full h-[75vh] border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <object data={pdfPath} type="application/pdf" className="w-full h-full">
              <iframe
                src={pdfPath}
                title="Regulament Giveaway Valentine's Day"
                className="w-full h-full"
              />
            </object>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiveawayRulesPage;
