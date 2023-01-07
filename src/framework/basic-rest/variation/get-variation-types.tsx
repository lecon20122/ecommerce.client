import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { Variation, VariationType } from '../types';

export const fetchVariationTypes = async () => {
    const { data } = await http.get(API_ENDPOINTS.STORE_VARIATION_TYPES);
    return data;
};
export const useGetVariationTypes = () => {
    return useQuery<VariationType[], Error>(
        [API_ENDPOINTS.STORE_VARIATION_TYPES],
        () => fetchVariationTypes(),
        {
            retry: false,
        }
    );
};
