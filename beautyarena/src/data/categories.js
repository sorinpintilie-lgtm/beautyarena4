export const categories = [
  {
    id: 'skincare',
    name: 'Ten',
    slug: 'ten',
    description: 'Produse pentru îngrijirea și protecția tenului',
    subcategories: [
      { id: 'cleanser', name: 'Demachiant & Curățare', slug: 'demachiant-curatare' },
      { id: 'moisturizer', name: 'Hidratante', slug: 'hidratante' },
      { id: 'serum', name: 'Seruri', slug: 'seruri' },
      { id: 'mask', name: 'Măști', slug: 'masti' },
      { id: 'sunscreen', name: 'Protecție solară', slug: 'protectie-solara' },
      { id: 'eyecare', name: 'Îngrijire ochi', slug: 'ingrijire-ochi' },
    ],
  },
  {
    id: 'makeup',
    name: 'Machiaj',
    slug: 'machiaj',
    description: 'Produse de machiaj pentru față, ochi și buze',
    subcategories: [
      { id: 'foundation', name: 'Fond de ten', slug: 'fond-de-ten' },
      { id: 'concealer', name: 'Corector', slug: 'corector' },
      { id: 'powder', name: 'Pudră', slug: 'pudra' },
      { id: 'blush', name: 'Blush', slug: 'blush' },
      { id: 'eyeshadow', name: 'Fard de pleoape', slug: 'fard-pleoape' },
      { id: 'mascara', name: 'Rimel', slug: 'rimel' },
      { id: 'eyeliner', name: 'Eyeliner', slug: 'eyeliner' },
      { id: 'lipstick', name: 'Ruj', slug: 'ruj' },
      { id: 'lipgloss', name: 'Luciu de buze', slug: 'luciu-buze' },
    ],
  },
  {
    id: 'haircare',
    name: 'Produse păr',
    slug: 'produse-par',
    description: 'Produse pentru păr sănătos și strălucitor',
    subcategories: [
      { id: 'shampoo', name: 'Șampon', slug: 'sampon' },
      { id: 'conditioner', name: 'Balsam', slug: 'balsam' },
      { id: 'treatment', name: 'Tratamente', slug: 'tratamente' },
      { id: 'styling', name: 'Styling', slug: 'styling' },
      { id: 'coloring', name: 'Vopsea de păr', slug: 'vopsea-par' },
    ],
  },
  {
    id: 'nails',
    name: 'Produse unghii',
    slug: 'produse-unghii',
    description: 'Produse pentru unghii frumoase și sănătoase',
    subcategories: [
      { id: 'polish', name: 'Lac de unghii', slug: 'lac-unghii' },
      { id: 'treatment', name: 'Tratamente unghii', slug: 'tratamente-unghii' },
      { id: 'tools', name: 'Instrumente', slug: 'instrumente' },
      { id: 'remover', name: 'Soluție îndepărtare', slug: 'solutie-indepartare' },
    ],
  },
  {
    id: 'fragrance',
    name: 'Parfumuri',
    slug: 'parfumuri',
    description: 'Parfumuri și ape de toaletă',
    subcategories: [
      { id: 'perfume', name: 'Parfum', slug: 'parfum' },
      { id: 'bodymist', name: 'Body mist', slug: 'body-mist' },
      { id: 'cologne', name: 'Apă de colonie', slug: 'apa-colonie' },
    ],
  },
  {
    id: 'tools',
    name: 'Instrumente & Accesorii',
    slug: 'instrumente-accesorii',
    description: 'Pensule, bureți și alte accesorii de machiaj',
    subcategories: [
      { id: 'brushes', name: 'Pensule', slug: 'pensule' },
      { id: 'sponges', name: 'Bureți', slug: 'bureți' },
      { id: 'applicators', name: 'Aplicatoare', slug: 'aplicatoare' },
      { id: 'bags', name: 'Genți cosmetice', slug: 'genti-cosmetice' },
    ],
  },
];

export const getCategoryById = (id) => categories.find(cat => cat.id === id);
export const getCategoryBySlug = (slug) => categories.find(cat => cat.slug === slug);
export const getSubcategoryById = (categoryId, subcategoryId) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

export default categories;