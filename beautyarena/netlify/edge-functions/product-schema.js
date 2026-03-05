const SITE_URL = 'https://salonbeautyarena.ro';
const PRODUCTS_MAP_URL = `${SITE_URL}/data/products-map.json`;

let productsMapCache = null;

const toPriceString = (price) => {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice)) return '0.00';
  return numericPrice.toFixed(2);
};

const mapAvailability = (inStockValue) => {
  if (typeof inStockValue === 'string') {
    return inStockValue.toLowerCase() === 'instock'
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock';
  }

  return inStockValue ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';
};

const resolveBrandName = (product) => {
  if (typeof product?.brand === 'string' && product.brand.trim()) return product.brand.trim();
  if (product?.brand?.name) return product.brand.name;
  return 'BeautyArena';
};

const resolveMpn = (product) => {
  return product?.mpn || product?.manufacturerPartNumber || product?.sku || product?.id || product?.slug || 'unknown-mpn';
};

const toAbsoluteImage = (value) => {
  if (!value) return `${SITE_URL}/visualMarketing_logo.png`;
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${SITE_URL}${normalizedPath}`;
};

const resolveImages = (product) => {
  const images = product?.localImages?.length
    ? product.localImages
    : product?.images?.length
    ? product.images
    : product?.image
    ? [product.image]
    : ['/visualMarketing_logo.png'];

  return images.slice(0, 6).map(toAbsoluteImage);
};

const resolveDescription = (product) => {
  return (product?.shortDescription || product?.description || 'Produs premium disponibil în magazinul BeautyArena.')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const buildProductSchema = (product, slug) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product?.name || 'Produs BeautyArena',
  description: resolveDescription(product),
  image: resolveImages(product),
  sku: product?.sku || product?.id || slug || resolveMpn(product),
  mpn: resolveMpn(product),
  brand: {
    '@type': 'Brand',
    name: resolveBrandName(product),
  },
  offers: {
    '@type': 'Offer',
    price: toPriceString(product?.price),
    priceCurrency: 'RON',
    url: `${SITE_URL}/product/${slug}`,
    availability: mapAvailability(product?.inStock),
    itemCondition: 'https://schema.org/NewCondition',
  },
});

const loadProductsMap = async () => {
  if (productsMapCache) return productsMapCache;

  const response = await fetch(PRODUCTS_MAP_URL);
  if (!response.ok) throw new Error(`Failed to load product map: ${response.status}`);

  productsMapCache = await response.json();
  return productsMapCache;
};

const getSlugFromPath = (pathname) => {
  const match = pathname.match(/^\/product\/([^/?#]+)/i);
  if (!match) return null;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
};

export default async (request, context) => {
  const response = await context.next();

  if (request.method !== 'GET') return response;
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const url = new URL(request.url);
  const slug = getSlugFromPath(url.pathname);
  if (!slug) return response;

  try {
    const productsMap = await loadProductsMap();
    const product = productsMap?.[slug];
    if (!product) return response;

    const schema = buildProductSchema(product, slug);
    const jsonLdScript = `<script type="application/ld+json" data-product-schema-server="true">${JSON.stringify(schema)}</script>`;

    const html = await response.text();
    const injectedHtml = html.includes('</head>')
      ? html.replace('</head>', `${jsonLdScript}</head>`)
      : `${jsonLdScript}${html}`;

    return new Response(injectedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch {
    return response;
  }
};

