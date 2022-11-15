import Container from '@components/ui/container';
import Layout from '@components/layout/layout-two';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchFlashSaleProducts } from '@framework/product/get-all-flash-sale-products';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchNewArrivalProducts } from '@framework/product/get-all-new-arrival-products';
import { fetchBrands } from '@framework/brand/get-all-brands';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CategoryBlockIcon from '@containers/category-block-icon';
import { ROUTES } from '@utils/routes';
import ProductsFlashSaleCarousel from '@containers/product-flash-sale-carousel';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import BannerCard from '@components/common/banner-card';
import SaleBannerWithProducts from '@containers/sale-banner-with-products';
import TestimonialCarousel from '@containers/testimonial-carousel';
import SubscriptionWithBg from '@components/common/subscription-with-bg';
import CollectionBlock from '@containers/collection-block';
import ProductsTopBlock from '@containers/products-top-block';
import { collectionModernData as collection } from '@framework/static/collection';
import { homeEightCoupons as banner } from '@framework/static/banner';
import { homeEightWinterBanner as bannerWinter } from '@framework/static/banner';
import { bannerDataFour, bannerDataFourMobile } from '@framework/static/banner';
import BannerBlock from '@containers/banner-block';
import BrandBlock from '@containers/brand-block';
import HeroWithCategory from '@containers/hero-with-category';
import Instagram from '@components/common/instagram';
import ProductsFeatured from '@containers/products-featured';
import { homeEightHeroBanner as heroBanner } from '@framework/static/banner';

export default function Home() {
  return (
    <>
      <Container>
        <HeroWithCategory
          bannerData={heroBanner}
          paginationPosition="left"
          className="hero-slider-pagination-area mb-12 md:mb-14 xl:mb-16"
        />
        <BrandBlock sectionHeading="text-top-brands" />
        <SaleBannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
          variant="center"
        />
        <ProductsFeatured variant="flat" sectionHeading="text-featured-products" limit={8} />
        <BannerBlock data={bannerDataFour} className="mb-12 md:mb-14 xl:mb-16 hidden sm:flex" />
        <BannerBlock data={bannerDataFourMobile} className="mb-12 md:mb-14 xl:mb-16 sm:hidden" />
        <CategoryBlockIcon sectionHeading="text-browse-categories" variant="circle" />
        <NewArrivalsProductFeed />
        <BannerCard
          banner={bannerWinter}
          href={`${ROUTES.COLLECTIONS}/${bannerWinter.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <ProductsFlashSaleCarousel />
        <ProductsTopBlock sectionHeading="text-top-products" />
        <CollectionBlock variant="modern" data={collection} />
        <BannerCard
          banner={banner}
          href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <TestimonialCarousel sectionHeading="text-testimonial" />
        <Instagram className="mb-12 md:mb-14 xl:mb-16" />
        <SubscriptionWithBg />
      </Container>
    </>
  );
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
    fetchFlashSaleProducts
  );
  await queryClient.prefetchQuery([API_ENDPOINTS.CATEGORIES, { limit: 10 }], fetchCategories);
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
    fetchNewArrivalProducts
  );
  await queryClient.prefetchQuery([API_ENDPOINTS.BRANDS, { limit: 0 }], fetchBrands);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, ['common', 'forms', 'menu', 'footer'])),
    },
    revalidate: 60,
  };
};
