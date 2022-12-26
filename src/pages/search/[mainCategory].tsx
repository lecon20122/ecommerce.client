import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import Subscription from '@components/common/subscription';
import ShopDiscount from '@components/shop/discount';
import StickyBox from 'react-sticky-box';
import { ProductGrid } from '@components/product/product-grid';
import SearchTopBar from '@components/shop/top-bar';
import ActiveLink from '@components/ui/active-link';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import ShopFilters from '../../components/shop/filters';
import { useProductsQuery } from '@framework/product/get-all-products';
import { useRouter } from 'next/router';




export default function Shop({ params }: any) {
  const { t } = useTranslation('common');
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 50, ...query });

  return (
    <>
      {/* <ShopDiscount /> */}
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
                    <a>{t('breadcrumb-home')}</a>
                  </ActiveLink>
                  <ActiveLink href={ROUTES.SEARCH} activeClassName="font-semibold text-heading">
                    <a className="capitalize">{t('breadcrumb-search')}</a>
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters mainCategorySlug={params.mainCategory} />
            </StickyBox>
          </div>

          <div className="w-full lg:-ms-9">
            {/* <SearchTopBar itemsCount={data?.pages[0].data.length} /> */}
            <ProductGrid products={data} fetchNextPage={fetchNextPage} error={error} hasNextPage={hasNextPage} isFetching={isLoading} isFetchingNextPage={loadingMore} />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
}

Shop.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'forms', 'menu', 'footer'])),
      params,
    },
  };
};
