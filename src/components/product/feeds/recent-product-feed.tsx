import ProductsBlockCarousel from '@containers/products-block-carousel'
import { useProductsQuery } from '@framework/product/get-all-products-2'

export default function RecentProductFeed() {
  const limit = 5
  const { data, isLoading, error } = useProductsQuery({
    limit: 10,
  })

  return (
    <ProductsBlockCarousel
      sectionHeading='text-recently-view-products'
      products={data?.slice(2, 7)}
      loading={isLoading}
      error={error?.message}
      uniqueKey='new-arrivals'
      type='gridTrendy'
      className='mb-12 md:mb-14 xl:mb-16'
      imgWidth={344}
      imgHeight={344}
    />
  )
}
