import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct } from '../types';

export const fetchStoreProductDetails = async (slug: string) => {
    const { data } = await http.get(API_ENDPOINTS.STORE_PRODUCT_DETAILS, { params: { slug: slug } });
    return data;
};
export const useGetStoreProductDetails = (slug: string) => {
    return useQuery<ApiProduct, Error>(
        [API_ENDPOINTS.STORE_PRODUCT_DETAILS],
        () => fetchStoreProductDetails(slug),
        {
            retry: false,
        }
    );
};
