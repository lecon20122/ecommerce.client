import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct } from '../types';

export const fetchProduct = async (id: number) => {
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}`, { params: { id: id } });
	return data;
};
export const useProductQuery = (id: number, onSuccess: (data: ApiProduct) => void) => {
	return useQuery<ApiProduct, Error>(
		[API_ENDPOINTS.PRODUCT, id],
		() => fetchProduct(id),
		{
			onSuccess: (data) => onSuccess(data)
		}
	);
};
