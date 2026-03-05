const SITE_URL = 'https://salonbeautyarena.ro';

const toAbsoluteUrl = (value = '/', origin = SITE_URL) => {
  if (!value) return origin;
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${origin}${normalizedPath}`;
};

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

const resolveProductUrl = (product, origin = SITE_URL) => {
  if (product?.url) return toAbsoluteUrl(product.url, origin);

  const slugOrId = product?.slug || product?.id || product?.sku || '';
  return toAbsoluteUrl(`/product/${slugOrId}`, origin);
};

const resolveImageUrls = (product, origin = SITE_URL) => {
  const images = product?.localImages?.length
    ? product.localImages
    : product?.images?.length
    ? product.images
    : product?.image
    ? [product.image]
    : ['/visualMarketing_logo.png'];

  return images.slice(0, 6).map((image) => toAbsoluteUrl(image, origin));
};

const resolveDescription = (product) => {
  return (product?.shortDescription || product?.description || 'Produs premium disponibil în magazinul BeautyArena.')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const buildProductSchema = (product, origin = SITE_URL) => {
  const productUrl = resolveProductUrl(product, origin);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.name || 'Produs BeautyArena',
    description: resolveDescription(product),
    image: resolveImageUrls(product, origin),
    sku: product?.sku || product?.id || product?.slug || resolveMpn(product),
    mpn: resolveMpn(product),
    brand: {
      '@type': 'Brand',
      name: resolveBrandName(product),
    },
    offers: {
      '@type': 'Offer',
      price: toPriceString(product?.price),
      priceCurrency: 'RON',
      url: productUrl,
      availability: mapAvailability(product?.inStock),
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
};

export const clearInjectedProductSchema = () => {
  if (typeof document === 'undefined') return;

  const existingNodes = document.head.querySelectorAll('script[data-product-schema="true"], script[data-product-schema-server="true"]');
  existingNodes.forEach((node) => node.remove());
};

export const injectProductSchema = (product, origin = SITE_URL) => {
  const schema = buildProductSchema(product, origin);

  if (typeof document === 'undefined') return schema;

  clearInjectedProductSchema();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-product-schema', 'true');
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);

  return schema;
};

