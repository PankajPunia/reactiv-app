export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  handle: string;
  productType: string;
  tags: string[];
  vendor: string;
  priceRange: PriceRange;
  compareAtPriceRange: PriceRange;
  images: Image[];
  options: Option[];
  requiresSellingPlan: boolean;
  onlineStoreUrl: string;
  media: Media[];
  variants: Variant[];
  metafields: any[];
  collections: string[];
}

export interface PriceRange {
  maxVariantPrice: Price;
  minVariantPrice: Price;
}

export interface Price {
  amount: string;
  currencyCode: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Option {
  id: string;
  name: string;
  values: string[];
}

export interface Media {
  mediaContentType: string;
  image: MediaImage;
}

export interface MediaImage extends Image {
  altText: any;
  width: number;
  height: number;
}

export interface Variant {
  id: string;
  title: string;
  quantityAvailable: number;
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  price: Price;
  compareAtPrice: Price;
  sku: string;
  selectedOptions: SelectedOption[];
  image: Image;
  product: Pick<Product, 'id' | 'handle' | 'options'>;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export type ProductStatus = 'Sale' | 'Sold Out' | '';