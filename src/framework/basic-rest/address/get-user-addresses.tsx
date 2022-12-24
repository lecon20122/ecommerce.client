import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export interface UserAddress {
    id: number;
    district_id: number;
    apartment_number: string;
    building: string;
    floor: string;
    nearby_landmark: string;
    street: string;
}


export const fetchAddress = async () => {
    const { data } = await http.get(API_ENDPOINTS.GET_ADDRESS);
    return data;
};
export const useAddressQuery = () => {
    return useQuery<UserAddress[], Error>(
        [API_ENDPOINTS.GET_ADDRESS],
        fetchAddress,
    );
};
