import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
import { ApiProduct } from '../types';

export const fetchProduct = async (_slug: string) => {
	const { data } = await http.get(`${API_ENDPOINTS.PRODUCT}`, { params: { slug: _slug } });
	return data;
};
export const useProductQuery = (slug: string, onSuccess: (data: ApiProduct) => void) => {
	return useQuery<ApiProduct, Error>(
		[API_ENDPOINTS.PRODUCT, slug],
		() => fetchProduct(slug),
		{
			onSuccess: (data) => onSuccess(data)
		}
	);
};
