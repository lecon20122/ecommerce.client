import Container from '@components/ui/container'
import Layout from '@components/layout/layout-three'
import { GetStaticProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import NewArrivalsProductFeedWithTabs from '@components/product/feeds/new-arrivals-product-feed-with-tabs'



export default function Home() {

  return (
    <Layout>
      <Container className='py-3'>
        <NewArrivalsProductFeedWithTabs />
      </Container>
      {/* <Container className='border-b-2 border[#E6E6E6]'>
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
      </Container> */}
    </Layout>
  )
}

// Home.Layout = Layout
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient()
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
