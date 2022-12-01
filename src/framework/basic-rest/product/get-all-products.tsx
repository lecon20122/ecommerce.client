import { QueryOptionsType } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useInfiniteQuery } from "react-query";
import { PaginatedData, ApiProduct } from '../types';


const fetchProducts = async ({ pageParam, queryKey }: any): Promise<PaginatedData<ApiProduct>> => {
	const [_key, _params] = queryKey;
	
	const { data } = await http.get(`${API_ENDPOINTS.API_FILTERED_PRODUCTS}${pageParam === undefined ? '' : pageParam}`, { params: _params });
	return data
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedData<ApiProduct>, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ meta }, pages) => {
				if (pages.length < meta.last_page) {
					return `/?query=&page=${pages.length + 1}`
				} else {
					return undefined
				}
			},
		},
	);
};

export { useProductsQuery, fetchProducts };
