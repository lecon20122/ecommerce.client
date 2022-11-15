import { QueryOptionsType, Brand } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BRANDS);
  return data;
};
const fetchAncientBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BRANDS_ANCIENT);
  return data;
};

export const useBrandsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<{ brands: Brand[]; brandsGrid: Brand[]; brandsTimer: Brand[] }, Error>(
      [API_ENDPOINTS.BRANDS_ANCIENT, options],
      fetchAncientBrands
    );
  }

  return useQuery<{ brands: Brand[]; brandsGrid: Brand[]; brandsTimer: Brand[] }, Error>([API_ENDPOINTS.BRANDS, options], fetchBrands);
};
