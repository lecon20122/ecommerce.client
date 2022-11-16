import { QueryOptionsType, Filter } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";


const fetchFiltersByCategory = async ({ queryKey }: any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(`http://127.0.0.1:8000${API_ENDPOINTS.FILTERS}/${_params.category}`);
    return data;
};

const useFiltersQuery = (options: QueryOptionsType) => {
    return useQuery<Filter, Error>(
        [API_ENDPOINTS.FILTERS, options],
        fetchFiltersByCategory
    );
};

export { useFiltersQuery, fetchFiltersByCategory };