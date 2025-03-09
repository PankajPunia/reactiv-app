import {
  Product,
  ProductStatus,
  Variant,
} from '../../services/types/product-types';

export const getDefaultVariant = (product: Product): Variant => {
  const availableVariants = product.variants.filter(
    variant => variant.quantityAvailable > 0,
  );

  // If no variant is available, return the first variant
  if (!availableVariants.length) {
    return product.variants[0];
  }

  // If there is a variant available for sale, return it
  if (product.availableForSale) {
    const saleVariant = availableVariants.find(
      variant => variant.availableForSale,
    );
    if (saleVariant) {
      return saleVariant;
    }
  }

  // If no variant is available for sale, return the first available variant
  return availableVariants[0];
};

export const getProductStatus = (variant: Variant): ProductStatus => {
  if (variant.quantityAvailable < 1) {
    return 'Sold Out';
  }
  if (variant.availableForSale) {
    return 'Sale';
  }
  return '';
};

export const getPriceString = (variant: Variant): string => {
  const price = parseFloat(variant.price.amount);
  return `$${price.toFixed(2)} ${variant.price.currencyCode}`;
};

export const getPrice = (variant: Variant, product: Product): string => {
  const minVariantPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxVariantPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const price = parseFloat(variant.price.amount);
  const priceString = getPriceString(variant);

  if (minVariantPrice !== maxVariantPrice && price === minVariantPrice) {
    return `From ${priceString}`;
  } else {
    return priceString;
  }
};

export const getComparePrice = (variant: Variant): string => {
  const productStatus = getProductStatus(variant);
  if (productStatus === 'Sale' && variant.compareAtPrice) {
    return `$${variant.compareAtPrice.amount} ${variant.compareAtPrice.currencyCode}`;
  } else {
    return '';
  }
};

export const getProductById = (
  productId: string,
  productList?: Product[],
): Product | undefined => {
  if (!productList) {
    return undefined;
  }
  return productList.find(product => product.id === productId);
};

export const getVariantById = (
  variantId: string,
  product?: Product,
): Variant | undefined => {
  if (!product) {
    return undefined;
  }
  return product.variants.find(variant => variant.id === variantId);
};

export const getDropdownOptions = (
  product: Product,
): {value: string; label: string}[] => {
  return product.variants.map(variant => ({
    value: variant.id,
    label: variant.title,
  }));
};
