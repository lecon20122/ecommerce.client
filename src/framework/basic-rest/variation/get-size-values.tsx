import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { VariationTypeValue } from '../types';

export const fetchVariationSizeValues = async () => {
    const { data } = await http.get(API_ENDPOINTS.STORE_VARIATION_GET_SIZE_VALUES);
    return data;
};
export const useGetSizeTypeValues = () => {
    return useQuery<VariationTypeValue[], Error>(
        [API_ENDPOINTS.STORE_VARIATION_GET_SIZE_VALUES],
        () => fetchVariationSizeValues(),
        {
            retry: false,
        }
    );
};
