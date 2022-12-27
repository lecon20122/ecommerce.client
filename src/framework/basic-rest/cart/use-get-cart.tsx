import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { Store, Translation, Variation } from '../types';



export interface Cart {
    id: number;
    title: Translation
    variation: Variation;
    parent_variation: Variation;
    store: Store;
    quantity: number;
    price: string;
}

export const fetchCart = async () => {
    const { data } = await http.get(API_ENDPOINTS.GET_CART);
    return data;
};
export const useCartQuery = () => {
    return useQuery<Cart[], Error>(
        [API_ENDPOINTS.GET_CART],
        () => fetchCart(),
        { retry: false }
    );
};
