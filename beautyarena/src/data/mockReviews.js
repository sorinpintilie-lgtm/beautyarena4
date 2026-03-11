export const reviews = {};

const romanianUserNames = [
  'Maria', 'ioana', 'Andreea', 'alex23', 'Biia', 'Mihai', 'ninaaa', 'Roxy', 'claudiu', 'maria_98',
  'oana', 'vladutz', 'Ana-M', 'Geo', 'dany', 'Cristina', 'Nico', 'adi_bv', 'Andra', 'user771',
  'Mirela', 'iuli', 'simo', 'Paul', 'ralu', 'diana', 'Mada', 'Miky', 'Stef', 'Lorena29',
  'Gabi', 'gabriela90', 'Teo', 'teodora_m', 'Marius', 'marius88', 'Alina', 'alinutza', 'Luci', 'lucian24',
  'sorina', 'SorinaB', 'Catalin', 'cata_tm', 'Denisa', 'd3nisa', 'Silviu', 'silvia.ion', 'Irinuca', 'irinaa21',
  'Alexandra', 'alexx.ro', 'Robert', 'roby', 'Camelia', 'cami99', 'Flory', 'florinel', 'Petra', 'petru_m',
  'Moni', 'monica25', 'Cris', 'crissstyle', 'Larisa', 'lari', 'Vio', 'violeta_', 'Bogdan', 'bogdy',
  'Ramona', 'rami_07', 'Tavi', 'octa.v', 'Alessia', 'alina_clj', 'Naty', 'natasa', 'Doru', 'doru123',
];

const extraFirstNames = [
  'Adelina', 'Aida', 'Alesia', 'Alma', 'Amalia', 'Anisia', 'Aura', 'Bianca', 'Brindusa', 'Carla',
  'Carmen', 'Casandra', 'Cecilia', 'Coralia', 'Daria', 'Denisa', 'Dora', 'Eliza', 'Ema', 'Evelina',
  'Felicia', 'Flavia', 'Geanina', 'Giulia', 'Ilona', 'Iulia', 'Izabela', 'Karina', 'Lavinia', 'Lia',
  'Loredana', 'Luana', 'Mara', 'Marcela', 'Melania', 'Miruna', 'Nadina', 'Nicoleta', 'Olimpia', 'Paula',
  'Raisa', 'Rebeca', 'Renata', 'Sanda', 'Sara', 'Simina', 'Sorana', 'Stefania', 'Teodora', 'Timea',
];

const extraHandleSuffixes = ['_ro', '88', '.beauty', '_tm', '_clj', '23', '_x', '.shop', '_iasi', '77'];

const extraGeneratedUserNames = extraFirstNames
  .flatMap((name, index) => [
    name,
    `${name.toLowerCase()}${extraHandleSuffixes[index % extraHandleSuffixes.length]}`,
  ])
  .slice(0, 100);

romanianUserNames.push(...extraGeneratedUserNames);

const fiveStarShort = [
  'bun', 'super', 'perfect', 'foarte bun', 'excelent', 'recomand', 'ok', 'isi face treaba',
  'foarte multumita', 'f bun', 'Perfect !!', 'bunn', 'superr', 'recomnd',
  'Top', 'mi place', 'fain', 'beton', 'chiar bun', 'best', 'wow', 'topp', 'excelent!', 'merge super',
  '10/10', 'foarte ok', 'BUN', 'bun bun', 'multumita', 'misto', 'great', 'super bun', 'prea bun', 'ador',
];

const fiveStarLong = [
  'L-am luat fara asteptari mari dar chiar e top, mi-a placut de la prima folosire.',
  'produs foarte bun, se vede diferenta rapid. il mai comand sigur.',
  'Am testat multe variante si asta chiar merita, textura placuta si rezultat bun.',
  'super ok pt mine, nu mi-a iritat deloc scalpul si parul arata mai bine.',
  'Foarte bun, tine cat trebuie si miroase placut.',
  'A venit repede si produsul e exact cum ma asteptam, il folosesc aproape zilnic.',
  'mi-a placut mult, nu incarca parul si lasa un aspect curat.',
  'Am comandat a doua oara, la mine chiar functioneaza.',
  'Face ce promite, simplu. recomand.',
  'bun rau de tot, imi place si mirosul.',
  'L-am luat dupa recenzii si nu regret deloc.',
  'Pentru banii astia e foarte ok, merita.',
  'Nu ma asteptam sa fie asa bun sincer.',
  'Textura placuta, nu lipeste, super ok.',
  'Rezultat bun dupa cateva folosiri, sunt multumita.',
  'pt parul meu e excelent, mai ales la varfuri.',
  'il folosesc de o luna si vad clar diferenta.',
  'mi-a depasit asteptarile, chiar bun produs.',
  'parul arata mai ingrijit, clar mai ok ca inainte.',
  'produs bun, usor de folosit, efect vizibil.',
  'M-a convins, o sa mai iau.',
  'L-am recomandat si prietenei mele.',
  'super produs, nu lasa parul greu.',
  'chiar se simte diferenta dupa spalare.',
  'folosit corect, rezultatul e foarte bun.',
  'foarte multumit, am mai comandat unul.',
  'A rezolvat fix ce ma deranja la par.',
  'E primul care imi merge bine pe scalp sensibil.',
  'de cand il folosesc imi sta parul mai bine.',
  'Calitate buna, raport ok calitate pret.',
];

const fourStarComments = [
  'Bun produs, dar pretul e cam mare.',
  'ok per total, isi face treaba.',
  'mi-a placut, doar ca as fi vrut efect mai rapid.',
  'destul de bun, posibil sa mai cumpar.',
  'E bun dar pe parul meu merge doar cu cantitate mica.',
  'Bun, dar ambalajul putea fi mai practic.',
  'rezultat bun, insa nu chiar wow.',
  'miroase bine, efect decent.',
  'ok, dar pentru mine merge doar combinat cu alt produs.',
  'destul de bun pt uz zilnic.',
  'Bunicel, as fi vrut sa tina mai mult efectul.',
  'Face treaba, dar exista si variante mai ieftine.',
  'Per total sunt multumita, doar pretul e putin sus.',
  'ok la prima vedere, vedem pe termen lung.',
  'l-am folosit de cateva ori, pana acum e bine.',
  'E decent, ma asteptam la mai mult volum.',
  'bun, dar vine cam putin cantitativ.',
  'Mie imi place, sotiei nu prea :))',
  'Nu e rau, dar la mine efectul tine putin.',
  'calitate buna, doar livrarea a fost lenta.',
  'Produs ok, nimic de reprosat major.',
  'merge, insa trebuie pus foarte putin.',
  'Bun pentru pretul lui, recomand cu rezerva.',
  'M-a ajutat, dar nu instant.',
  'per total ok, mai testez.',
];

const threeStarComments = [
  'E ok, nimic wow.',
  'rezultat mediu la mine.',
  'merge dar am avut asteptari mai mari.',
  'nu e rau, dar nici super.',
  'Mediu, nu stiu daca il mai iau.',
  'la mine efectul e slab spre ok.',
  'merge uneori, alteori deloc.',
  'E acceptabil, dar am avut produse mai bune.',
  'nu m-a convins inca.',
  'ok, dar nu merita hype-ul.',
  'am vazut mici diferente, atat.',
  'e ceva, dar nu cat speram.',
  'rezultat modest pe par vopsit.',
  'nu e rau, dar ma asteptam la altceva.',
  'la pretul asta ma asteptam la mai mult.',
  'face cat de cat ce zice.',
  'nici bun nici rau, doar ok.',
  'miroase bine dar efectul e slab.',
  'probabil nu e potrivit pentru mine.',
];

const lowStarComments = [
  'nu prea mi-a mers',
  'nu e pt mine',
  'slabut sincer',
  'am incercat degeaba',
  'la mine nu a functionat',
  'nu recomand in cazul meu',
  'nu vad nicio diferenta',
  'mi-a incarcat parul prea tare',
  'scalpul meu nu l-a tolerat',
  'cam slab efect',
  'la mine a fost fix invers decat promite',
  'nu as mai cumpara',
  'dezamagitor sincer',
  'poate la altii merge, la mine nu',
  'nu m-a ajutat deloc',
  'efect aproape zero',
  'prea scump pentru ce ofera',
  'am incercat o luna, fara rezultat',
  'mie mi-a uscat parul',
  'nu se potriveste deloc cu parul meu',
];

const buildCombinedVariants = (starts, ends, targetCount) => {
  const variants = [];

  for (let i = 0; i < starts.length && variants.length < targetCount; i += 1) {
    for (let j = 0; j < ends.length && variants.length < targetCount; j += 1) {
      variants.push(`${starts[i]} ${ends[j]}`.trim());
    }
  }

  return variants;
};

const extraReviewTypes = {
  fiveStarShort: buildCombinedVariants(
    ['foarte bun', 'super ok', 'chiar bun', 'mega', 'perfect', 'top', 'excelent', 'best', 'bun tare', 'recomand'],
    ['pt mine', 'la banii astia', 'pe par vopsit', 'fara discutii', 'in rutina zilnica', 'fara batai de cap', 'acasa', 'la salon'],
    80,
  ),
  fiveStarLong: buildCombinedVariants(
    [
      'Il folosesc de cateva saptamani si',
      'L-am testat in weekend si',
      'Dupa mai multe incercari pot sa zic ca',
      'Nu ma asteptam sincer dar',
      'Am revenit cu comanda si',
      'Pe par decolorat chiar',
      'M-a surprins placut pentru ca',
      'In comparatie cu ce am folosit inainte',
      'A fost recomandat de stilista si',
      'Pentru mine personal',
    ],
    [
      'rezultatul e vizibil dupa primele folosiri.',
      'nu mi-a iritat scalpul deloc si asta conteaza mult.',
      'parul ramane mai moale si mai usor de aranjat.',
      'face fix ce promite pe eticheta.',
      'nu lasa parul incarcat sau lipicios.',
      'merita pretul pentru efectul obtinut.',
      'mirosul e placut si discret.',
      'a ramas produsul meu preferat din categorie.',
      'am vazut diferenta mai ales la varfuri.',
      'il recomand mai departe fara emotii.',
    ],
    90,
  ),
  fourStar: buildCombinedVariants(
    ['Produs bun', 'Per total ok', 'Destul de decent', 'Rezultat bunicel', 'Merge', 'Nu e rau', 'Imi place', 'E util', 'Bunicel', 'Calitate ok'],
    ['dar pretul e cam sus.', 'insa as fi vrut efect mai rapid.', 'dar la mine tine mai putin.', 'insa depinde de tipul de par.', 'si probabil mai comand.', 'doar ambalajul putea fi mai bun.', 'dar exista si variante mai ieftine.'],
    70,
  ),
  threeStar: buildCombinedVariants(
    ['E ok', 'Mediu', 'Nu m-a convins', 'Merge asa', 'Acceptabil', 'Nici bun nici rau', 'La mine', 'Rezultat modest'],
    ['dar nimic wow.', 'si ma asteptam la mai mult.', 'nu vad o diferenta mare.', 'probabil nu e pentru mine.', 'nu cred ca il recumpar.'],
    40,
  ),
  lowStar: buildCombinedVariants(
    ['La mine', 'Sincer', 'Din pacate', 'Nu recomand', 'Pe parul meu', 'Nu m-a ajutat'],
    ['nu a functionat deloc.', 'a fost sub asteptari.', 'nu am vazut rezultat.', 'nu merita pretul.', 'nu as mai cumpara.'],
    20,
  ),
};

fiveStarShort.push(...extraReviewTypes.fiveStarShort);
fiveStarLong.push(...extraReviewTypes.fiveStarLong);
fourStarComments.push(...extraReviewTypes.fourStar);
threeStarComments.push(...extraReviewTypes.threeStar);
lowStarComments.push(...extraReviewTypes.lowStar);

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

const topHelpfulReviewTitles = [
  'Foarte bun pe termen lung',
  'Rezultat clar dupa cateva folosiri',
  'Merita, mai ales pentru par sensibil',
  'Chiar m-a ajutat',
  'Produs foarte reusit',
  'Am revenit sa las review',
];

const topHelpfulReviewComments = [
  'L-am luat dupa ce am incercat mai multe produse similare. Dupa aproximativ doua saptamani, parul meu a devenit mai usor de aranjat, cu mai putin frizz si varfuri mai ok. Nu mi-a incarcat scalpul si asta pentru mine conteaza mult.',
  'La mine a functionat bine in combinatie cu samponul din aceeasi gama. Se vede diferenta la textura, parul nu mai arata tern si se simte mai hidratat. Nu e un miracol peste noapte, dar pe termen scurt chiar ajuta.',
  'Initial am fost sceptica, dar dupa cateva spalari am observat ca parul ramane mai moale si mai disciplinat. L-am recomandat si surorii mele. Pentru tipul meu de par este una dintre variantele care chiar dau rezultate.',
  'Am scalp sensibil si de obicei reactionez repede la produse noi. Cu acesta nu am avut iritatii, iar lungimile au inceput sa arate mai bine. Mi se pare un produs corect ca pret si efect.',
  'Folosesc produsul de peste o luna. Cel mai mult mi-a placut ca nu lasa parul greu, iar dupa uscare arata mai neted. Pentru mine a contat si faptul ca se aplica usor si nu trebuie cantitate mare.',
  'L-am folosit constant in ultima perioada si rezultatul este vizibil: mai putine fire rebele, aspect mai curat si par mai placut la atingere. Nu spun ca face minuni, dar clar isi face treaba foarte bine.',
];

const createTopHelpfulReviews = (productId, random, maxCount, now) => {
  const desiredCount = Math.min(maxCount, random() < 0.5 ? 2 : 3);
  const list = [];

  for (let index = 0; index < desiredCount; index += 1) {
    list.push({
      id: `top-${productId}-${index}`,
      userId: `tu-${hashString(`${productId}-top-${index}`)}`,
      userName: pick(romanianUserNames, random),
      rating: random() < 0.78 ? 5 : 4,
      title: withOccasionalTypos(pick(topHelpfulReviewTitles, random), random),
      comment: withOccasionalTypos(pick(topHelpfulReviewComments, random), random),
      verified: true,
      helpful: 120 + Math.floor(random() * 180),
      createdAt: new Date(now - index * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    });
  }

  return list;
};

const generateSyntheticReviews = (productId, requestedCount = 0) => {
  const targetCount = Math.max(0, Math.min(Number(requestedCount) || 0, 180));
  if (targetCount === 0) return [];

  const random = createSeededRandom(hashString(productId || 'prod'));
  const now = Date.now();
  const topHelpful = createTopHelpfulReviews(productId, random, targetCount, now);
  const generated = [...topHelpful];

  for (let index = generated.length; index < targetCount; index += 1) {
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
