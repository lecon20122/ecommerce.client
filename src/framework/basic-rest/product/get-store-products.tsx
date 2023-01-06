import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct } from '../types';

export const fetchStoreProducts = async () => {
    const { data } = await http.get(API_ENDPOINTS.STORE_PRODUCTS);
    return data;
};
export const useGetStoreProducts = () => {
    return useQuery<ApiProduct[], Error>(
        [API_ENDPOINTS.STORE_PRODUCTS],
        fetchStoreProducts,
        {
            retry: false
        }
    );
};
