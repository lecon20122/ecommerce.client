import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export interface City {
    id:             number;
    name:           string;
    governorate_id: number;
    created_at:     null;
    updated_at:     null;
    districts:      District[];
}

export interface District {
    id:         number;
    name:       string;
    city_id:    number;
    created_at: null;
    updated_at: null;
}



export const fetchCities = async () => {
    const { data } = await http.get(API_ENDPOINTS.GET_CITIES);
    return data;
};
export const useCitiesQuery = () => {
    return useQuery<City[], Error>(
        [API_ENDPOINTS.GET_CITIES],
        fetchCities,
    );
};
