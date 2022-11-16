import Container from '@components/ui/container'
import Layout from '@components/layout/layout-three'
import { GetStaticProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { API_ENDPOINTS } from '@framework/utils/api-endpoints'
import { fetchFlashSaleProducts } from '@framework/product/get-all-flash-sale-products'
import { fetchCategories } from '@framework/category/get-all-categories'
import { fetchNewArrivalProducts } from '@framework/product/get-all-new-arrival-products'
import { fetchBrands } from '@framework/brand/get-all-brands'
import ProductsFeatured from '@containers/products-featured'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ROUTES } from '@utils/routes'
import { homeSevenBanner as banner } from '@framework/static/banner'
import { collectionContemporaryData as collection } from '@framework/static/collection'
import NewArrivalsProductFeedWithTabs from '@components/product/feeds/new-arrivals-product-feed-with-tabs'
import BannerCard from '@components/common/banner-card'
import CollectionBlock from '@containers/collection-block'
import TestimonialCarousel from '@containers/testimonial-carousel'

// All data file
import { bannerDataContemporary } from '@framework/static/banner'
import SaleBannerGrid from '@containers/sale-banner-grid'
import TrendingProductFeedWithTabs from '@components/product/feeds/trending-product-feed-with-tabs'
import Subscription from '@components/common/subscription'
import Instagram from '@components/common/instagram'
import RecentProductFeed from '@components/product/feeds/recent-product-feed'
import {
  contemporaryBanner1,
  contemporaryBanner2,
} from '@framework/static/banner'
import BrandTimerBlock from '@containers/brand-timer-block'
import DownloadApps from '@components/common/download-apps'

export default function Home() {
  return (
    <>
      <Container className='py-3'>
      <NewArrivalsProductFeedWithTabs />
      </Container>
      <Container className='border-b-2 border[#E6E6E6]'>
        <SaleBannerGrid
          data={bannerDataContemporary}
          className='mb-12 md:mb-14 xl:mb-16'
        />
        <BrandTimerBlock
          sectionHeading='text-top-brands-deal'
          className='mb-12 md:mb-14 xl:mb-16'
        />
        <ProductsFeatured
          limit={3}
          variant='modern'
          sectionHeading='text-featured-products'
        />
        <BannerCard
          key={`banner--key${banner.id}`}
          banner={contemporaryBanner1}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className='mb-12 md:mb-14 xl:mb-16 pb-0.5 md:pb-0 lg:pb-1 xl:pb-0 md:-mt-2.5'
        />
        <TrendingProductFeedWithTabs />
        <BannerCard
          key={`banner--key1${banner.id}`}
          banner={contemporaryBanner2}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className='mb-12 md:mb-14 xl:mb-16 pb-0.5 md:pb-0 lg:pb-1 xl:pb-0 md:-mt-2.5'
        />

        <CollectionBlock
          variant='trendy'
          data={collection}
          sectionHeading='text-trending-collection'
        />
        <RecentProductFeed />
        <DownloadApps
          className='bg-app-pattern mb-12 md:mb-14 xl:mb-16'
          variant='modern'
        />
        <TestimonialCarousel
          sectionHeading='text-testimonial'
          type='list'
          className='relative mb-12 md:mb-14 xl:mb-16'
        />
        <Instagram className='mb-4 md:mb-5 xl:mb-16' variant='rounded' />
        <Subscription className='bg-opacity-0 px-5 sm:px-16 xl:px-0 mb-12 md:mb-14 xl:mb-16 !py-0 !md:py-0 !lg:py-0' />
      </Container>
    </>
  )
}

Home.Layout = Layout
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
    fetchFlashSaleProducts
  )
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { limit: 10 }],
    fetchCategories
  )
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
    fetchNewArrivalProducts
  )
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.BRANDS, { limit: 0 }],
    fetchBrands
  )

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  }
}
