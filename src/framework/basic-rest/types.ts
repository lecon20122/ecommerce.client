import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string | any;
  status?: string;
  limit?: number;
  demoVariant?: 'ancient';
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
// export type Category = {
//   id: number | string;
//   name: string;
//   slug: string;
//   details?: string;
//   image?: Attachment;
//   icon?: string;
//   products?: Product[];
//   productCount?: number;
// };
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sale_price?: number;
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category?: Category;
  tag?: Tag[];
  meta?: any[];
  description?: string;
  variations?: object;
  [key: string]: unknown;
  isNewArrival?: boolean;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};


// -------------MINE---------------------------//

export interface Filter {
  color: VariationTypeValue[];
  size: VariationTypeValue[];
  stores: string[];
  sub_categories: Category[]
}

export interface Variation {
  id: number;
  children: Variation[],
  parent_id: number | undefined;
  store_id: number;
  variation_type: VariationType;
  variation_type_value: VariationTypeValue;
  price: string;
  type: null;
  title: string;
  product_id: number;
  order: number;
  deleted_at: null;
  media: Media[];
  color: null;
  stock_count: null;
  small_image : VariationSmallImage,
}

export interface ApiProduct {
  id: number;
  title: Translation;
  price: number;
  slug: string;
  store_id: number;
  variations: Variation[];
  deleted_at: null;
}


export interface Translation {
  en: string;
  ar: string;
}

export interface VariationType {
  id: number;
  type: Translation;
  is_mediable: boolean;
  is_stockable: boolean;
}
export interface VariationTypeValue {
  id: number;
  value: Translation;
  slug: string;
  hex_value: string;
  variation_type_id: number;
  variation_type: VariationType;
}

export interface Category {
  id: number;
  parent_id: number;
  title: Translation;
  slug: string;
  is_active: boolean;
  primary_color: string;
  secondary_color: string;
  children: CategoryChild[];
  images: CategoryImages;
}

export interface CategoryBanner {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}
export interface VariationSmallImage {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}
export interface CategoryThumbnail {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
}

export interface CategoryImages {
  banners: CategoryBanner[];
  mobile_banners: CategoryBanner[];
}

export interface CategoryChild {
  id: number;
  parent_id: number;
  title: Translation;
  slug: string;
  is_active: boolean;
  primary_color: string;
  secondary_color: string;
  thumbnail: CategoryThumbnail;
}

export interface Media {
  id: number;
  name: string;
  file_name: string;
  mime_type: string;
  original: string;
  thumbnail: string;
  big: string;
  small: string;
}

export interface PaginatedData<T> {
  data: T[];
  links: Links;
  meta: Meta;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}

export interface Store {
  id:          number;
  name:        string;
  description: null;
}