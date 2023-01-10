import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { VariationTypeValue } from '../types';

export const fetchVariationColorValues = async () => {
    const { data } = await http.get(API_ENDPOINTS.STORE_VARIATION_GET_COLOR_VALUES);
    return data;
};
export const useGetColorTypeValues = () => {
    return useQuery<VariationTypeValue[], Error>(
        [API_ENDPOINTS.STORE_VARIATION_GET_COLOR_VALUES],
        () => fetchVariationColorValues(),
        {
            retry: false,
        }
    );
};
