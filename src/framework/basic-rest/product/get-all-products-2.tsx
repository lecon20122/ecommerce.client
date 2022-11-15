import { QueryOptionsType, Product } from '@framework/types'
import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'

export const fetchProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS_2)
  return data as Product[]
}
export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS_2, options],
    fetchProducts
  )
}
