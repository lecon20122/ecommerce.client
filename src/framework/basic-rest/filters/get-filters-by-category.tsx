import { QueryOptionsType, Translation } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "react-query";
import { VariationType, VariationColorImage } from '../types';

export interface Filter {
    filters:        FilterElement[];
    stores:         string[];
    sub_categories: any[];
}
export interface FilterElement {
    id:                number;
    value:             Translation;
    slug:              string;
    hex_value:         string;
    variation_type_id: number;
    variation_type:    VariationType;
    color:             Color;
}

export interface Color {
    id:     number;
    name:   string;
    width:  null;
    height: null;
    url:    string;
}

const fetchFiltersByCategory = async ({ queryKey }: any) => {
    const [_key, _params] = queryKey;
    const { data } = await http.get(API_ENDPOINTS.FILTERS + '/' + _params.category);
    return data;
};

const useFiltersQuery = (options: QueryOptionsType) => {
    return useQuery<Filter, Error>(
        [API_ENDPOINTS.FILTERS, options],
        fetchFiltersByCategory,
        {
            cacheTime: 600000,
        }
    );
};

export { useFiltersQuery, fetchFiltersByCategory };