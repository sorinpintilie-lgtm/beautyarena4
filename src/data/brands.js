export const brands = [
  {
    id: 'loreal',
    name: "L'Oréal Paris",
    slug: 'loreal-paris',
    description: 'Cosmetice de lux franceze cu tehnologie avansată și ingrediente premium pentru frumusețe profesională.',
    featured: true,
    productCount: 12,
  },
  {
    id: 'maybelline',
    name: 'Maybelline',
    slug: 'maybelline',
    description: 'Machiaj accesibil și de calitate pentru fiecare zi, inspirat de stilul New York.',
    featured: true,
    productCount: 15,
  },
  {
    id: 'nyx',
    name: 'NYX Professional Makeup',
    slug: 'nyx-professional',
    description: 'Machiaj profesional la prețuri accesibile, creat pentru artiști și pasionați.',
    featured: true,
    productCount: 18,
  },
  {
    id: 'theordinary',
    name: 'The Ordinary',
    slug: 'the-ordinary',
    description: 'Îngrijire a pielii bazată pe știință, cu ingrediente active concentrate și prețuri transparente.',
    featured: true,
    productCount: 10,
  },
  {
    id: 'cerave',
    name: 'CeraVe',
    slug: 'cerave',
    description: 'Îngrijire dermatologică recomandată de medici, cu ceramide esențiale pentru piele sănătoasă.',
    featured: true,
    productCount: 8,
  },
  {
    id: 'neutrogena',
    name: 'Neutrogena',
    slug: 'neutrogena',
    description: 'Îngrijire a pielii de încredere, dezvoltată cu dermatologi pentru rezultate vizibile.',
    featured: false,
    productCount: 9,
  },
  {
    id: 'garnier',
    name: 'Garnier',
    slug: 'garnier',
    description: 'Frumusețe naturală cu ingrediente din natură pentru păr și ten sănătos.',
    featured: true,
    productCount: 11,
  },
  {
    id: 'revlon',
    name: 'Revlon',
    slug: 'revlon',
    description: 'Cosmetice clasice americane cu tradiție și inovație în machiaj și îngrijire.',
    featured: false,
    productCount: 7,
  },
  {
    id: 'essence',
    name: 'Essence',
    slug: 'essence',
    description: 'Machiaj trendy la prețuri mici, perfect pentru experimentare și exprimare creativă.',
    featured: false,
    productCount: 14,
  },
  {
    id: 'catrice',
    name: 'Catrice',
    slug: 'catrice',
    description: 'Calitate europeană la prețuri accesibile, cu formule inovatoare și culori vibrante.',
    featured: false,
    productCount: 10,
  },
];

export const getBrandById = (id) => brands.find(brand => brand.id === id);
export const getBrandBySlug = (slug) => brands.find(brand => brand.slug === slug);
export const getFeaturedBrands = () => brands.filter(brand => brand.featured);

export default brands;