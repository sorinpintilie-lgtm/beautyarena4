export const reviews = {};

const romanianUserNames = [
  'Maria', 'ioana', 'Andreea', 'alex23', 'Biia', 'Mihai', 'ninaaa', 'Roxy', 'claudiu', 'maria_98',
  'oana', 'vladutz', 'Ana-M', 'Geo', 'dany', 'Cristina', 'Nico', 'adi_bv', 'Andra', 'user771',
  'Mirela', 'iuli', 'simo', 'Paul', 'ralu', 'diana', 'Mada', 'Miky', 'Stef', 'Lorena29',
];

const fiveStarShort = [
  'bun', 'super', 'perfect', 'foarte bun', 'excelent', 'recomand', 'ok', 'isi face treaba',
  'foarte multumita', 'f bun', 'Perfect !!', 'bunn', 'superr', 'recomnd',
];

const fiveStarLong = [
  'L-am luat fara asteptari mari dar chiar e top, mi-a placut de la prima folosire.',
  'produs foarte bun, se vede diferenta rapid. il mai comand sigur.',
  'Am testat multe variante si asta chiar merita, textura placuta si rezultat bun.',
  'super ok pt mine, nu mi-a iritat deloc scalpul si parul arata mai bine.',
  'Foarte bun, tine cat trebuie si miroase placut.',
];

const fourStarComments = [
  'Bun produs, dar pretul e cam mare.',
  'ok per total, isi face treaba.',
  'mi-a placut, doar ca as fi vrut efect mai rapid.',
  'destul de bun, posibil sa mai cumpar.',
  'E bun dar pe parul meu merge doar cu cantitate mica.',
];

const threeStarComments = [
  'E ok, nimic wow.',
  'rezultat mediu la mine.',
  'merge dar am avut asteptari mai mari.',
  'nu e rau, dar nici super.',
];

const lowStarComments = [
  'nu prea mi-a mers',
  'nu e pt mine',
  'slabut sincer',
  'am incercat degeaba',
  'la mine nu a functionat',
];

const shortTitles = ['bun', 'super', 'ok', 'multumita', 'Recomand', 'Perfect', 'merge'];
const mediumTitles = ['Bun produs', 'Destul de ok', 'Merita', 'Nu e rau', 'Foarte ok'];

const hashString = (value = '') => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const createSeededRandom = (seed) => {
  let t = seed + 0x6D2B79F5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const pick = (array, random) => array[Math.floor(random() * array.length)];

const generateRating = (random) => {
  const roll = random();
  if (roll < 0.63) return 5;
  if (roll < 0.84) return 4;
  if (roll < 0.93) return 3;
  if (roll < 0.98) return 2;
  return 1;
};

const createReviewText = (rating, random) => {
  if (rating === 5) {
    const shortChance = random();
    if (shortChance < 0.62) {
      const word = pick(fiveStarShort, random);
      return {
        title: pick(shortTitles, random),
        comment: word,
      };
    }

    return {
      title: pick(mediumTitles, random),
      comment: pick(fiveStarLong, random),
    };
  }

  if (rating === 4) {
    return {
      title: pick(mediumTitles, random),
      comment: pick(fourStarComments, random),
    };
  }

  if (rating === 3) {
    return {
      title: 'E ok',
      comment: pick(threeStarComments, random),
    };
  }

  return {
    title: 'nu prea',
    comment: pick(lowStarComments, random),
  };
};

const withOccasionalTypos = (text, random) => {
  let output = text;

  if (random() < 0.18) {
    output = output.replace(/\brecomand\b/i, 'recomnd');
  }
  if (random() < 0.14) {
    output = output.replace(/\bfoarte\b/i, 'foaret');
  }
  if (random() < 0.15) {
    output = output.replace(/\bsuper\b/i, 'supre');
  }
  if (random() < 0.12) {
    output = output.replace(/^./, (first) => first.toLowerCase());
  }
  if (random() < 0.1) {
    output = output.replace(/^./, (first) => first.toUpperCase());
  }

  return output;
};

const generateSyntheticReviews = (productId, requestedCount = 0) => {
  const targetCount = Math.max(0, Math.min(Number(requestedCount) || 0, 180));
  if (targetCount === 0) return [];

  const random = createSeededRandom(hashString(productId || 'prod'));
  const now = Date.now();
  const generated = [];

  for (let index = 0; index < targetCount; index += 1) {
    const rating = generateRating(random);
    const baseText = createReviewText(rating, random);
    const userName = pick(romanianUserNames, random);
    const daysAgo = Math.floor(random() * 540) + index % 9;
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const helpfulBase = rating >= 4 ? 2 : 0;
    const helpful = Math.floor(random() * (rating >= 4 ? 40 : 14)) + helpfulBase;

    generated.push({
      id: `gen-${productId}-${index}`,
      userId: `u-${hashString(`${productId}-${index}`)}`,
      userName,
      rating,
      title: withOccasionalTypos(baseText.title, random),
      comment: withOccasionalTypos(baseText.comment, random),
      verified: random() > 0.27,
      helpful,
      createdAt,
    });
  }

  return generated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getReviewsByProductId = (productId, requestedCount = 0) => {
  const savedReviews = reviews[productId] || [];
  if (savedReviews.length > 0) {
    const target = Math.max(savedReviews.length, Number(requestedCount) || 0);
    if (savedReviews.length >= target) return savedReviews;

    const extraReviews = generateSyntheticReviews(`${productId}-extra`, target - savedReviews.length);
    return [...savedReviews, ...extraReviews].slice(0, target);
  }

  return generateSyntheticReviews(productId, requestedCount);
};

export const getAverageRating = (productId, requestedCount = 0) => {
  const productReviews = getReviewsByProductId(productId, requestedCount);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / productReviews.length).toFixed(1);
};

export const getRatingDistribution = (productId, requestedCount = 0) => {
  const productReviews = getReviewsByProductId(productId, requestedCount);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  productReviews.forEach(review => {
    distribution[review.rating]++;
  });

  return distribution;
};

export default reviews;
