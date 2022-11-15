import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchFeaturedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FEATURED_PRODUCTS);
  return data as Product[];
};

const fetchAncientFeaturedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FEATURED_PRODUCTS_ANCIENT);
  return data as Product[];
};

export const useFeaturedProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<Product[], Error>([API_ENDPOINTS.FEATURED_PRODUCTS, options], fetchAncientFeaturedProducts);
  }

  return useQuery<Product[], Error>([API_ENDPOINTS.FEATURED_PRODUCTS, options], fetchFeaturedProducts);
};
