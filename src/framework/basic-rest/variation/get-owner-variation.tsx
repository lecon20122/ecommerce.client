import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { Variation } from '../types';

export const fetchStoreVariationDetails = async (id: number) => {
    const { data } = await http.get(`${API_ENDPOINTS.STORE_VARIATION}/${id}`);
    return data;
};
export const useGetStoreVariationDetails = (id: number) => {
    return useQuery<Variation, Error>(
        [API_ENDPOINTS.STORE_VARIATION, id],
        () => fetchStoreVariationDetails(id),
        {
            retry: false,
        }
    );
};
