import {  Category } from '@framework/types'
import http from '@framework/utils/http'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { useQuery } from 'react-query'

export const fetchStoreDashboardCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey
  const data = await http.get(API_ENDPOINTS.STORE_CATEGORIES)
  return data.data
}
export const useStoreCategoriesQuery = () => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.STORE_CATEGORIES],
    fetchStoreDashboardCategories
  )
}
