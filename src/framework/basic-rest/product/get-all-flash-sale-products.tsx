import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchFlashSaleProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

const fetchAncientFlashSaleProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT);
  return data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  if (options.demoVariant === 'ancient') {
    return useQuery<any, Error>([API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options], fetchAncientFlashSaleProducts);
  }

  return useQuery<any, Error>([API_ENDPOINTS.FLASH_SALE_PRODUCTS, options], fetchFlashSaleProducts);
};
