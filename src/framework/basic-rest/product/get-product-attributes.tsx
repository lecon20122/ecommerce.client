import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct, Translation } from '../types';

export interface ProductAttribute {
    id: number,
    attribute: Translation
    is_filterable: boolean
}

export const fetchProductAttributes = async () => {
    const { data } = await http.get(API_ENDPOINTS.STORE_PRODUCT_ATTRIBUTES);
    return data;
};
export const useGetProductAttributes = () => {
    return useQuery<ProductAttribute[], Error>(
        [API_ENDPOINTS.STORE_PRODUCT_ATTRIBUTES],
        fetchProductAttributes,
        {
            retry: false,
        }
    );
};
