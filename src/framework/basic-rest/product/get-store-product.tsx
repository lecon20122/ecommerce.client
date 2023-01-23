import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct } from '../types';

export const fetchStoreProductDetails = async (id: number) => {
    const { data } = await http.get(API_ENDPOINTS.STORE_PRODUCT_DETAILS + '/' + id);
    return data;
};
export const useGetStoreProductDetails = (id: number) => {
    return useQuery<ApiProduct, Error>(
        [API_ENDPOINTS.STORE_PRODUCT_DETAILS],
        () => fetchStoreProductDetails(id),
        {
            retry: false,
            staleTime: 1,
            cacheTime: 0,
        }
    );
};
