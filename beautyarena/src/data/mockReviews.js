export const reviews = {
  'loreal-revitalift-serum': [
    {
      id: 'rev-1',
      userId: 'user-1',
      userName: 'Maria Popescu',
      rating: 5,
      title: 'Excelent pentru riduri',
      comment: 'Folosesc acest ser de 3 luni și văd o diferență mare în aspectul ridurilor. Pielea este mai netedă și mai hidratată. Recomand cu căldură!',
      verified: true,
      helpful: 24,
      createdAt: '2024-10-15',
    },
    {
      id: 'rev-2',
      userId: 'user-2',
      userName: 'Ana Ionescu',
      rating: 4,
      title: 'Bun produs',
      comment: 'Produsul este bun, se absoarbe repede și nu lasă pielea unsuroasă. Singura problemă este prețul puțin ridicat.',
      verified: true,
      helpful: 12,
      createdAt: '2024-11-01',
    },
  ],
  'maybelline-sky-high-mascara': [
    {
      id: 'rev-3',
      userId: 'user-3',
      userName: 'Elena Dumitrescu',
      rating: 5,
      title: 'Cel mai bun rimel!',
      comment: 'Genele mele arată incredibil! Lungime și volum fără clumping. Nu se scurge și ține toată ziua. Merită fiecare ban!',
      verified: true,
      helpful: 45,
      createdAt: '2024-10-20',
    },
  ],
  'theordinary-niacinamide-serum': [
    {
      id: 'rev-4',
      userId: 'user-4',
      userName: 'Ioana Popa',
      rating: 5,
      title: 'Salvator pentru ten gras',
      comment: 'Acest ser mi-a schimbat complet tenul. Porii sunt mai mici, producția de sebum este controlată și imperfecțiunile s-au redus vizibil.',
      verified: true,
      helpful: 67,
      createdAt: '2024-09-10',
    },
  ],
};

export const getReviewsByProductId = (productId) => reviews[productId] || [];

export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / productReviews.length).toFixed(1);
};

export const getRatingDistribution = (productId) => {
  const productReviews = getReviewsByProductId(productId);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  productReviews.forEach(review => {
    distribution[review.rating]++;
  });

  return distribution;
};

export default reviews;