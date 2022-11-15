import Container from '@components/ui/container';
import { Product } from '@framework/types';
import ProductCard from '@components/product/product-card';
import Alert from '@components/ui/alert';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';

import { useNewArrivalProductsQuery } from '@framework/product/get-all-new-arrival-products';

interface Props {
  imgWidth?: number;
  imgHeight?: number;
}

const BuyDesignerAncient: React.FC<Props> = ({ imgWidth, imgHeight }) => {
  const {
    data: products,
    isLoading,
    error,
  }: any = useNewArrivalProductsQuery({
    limit: 10,
  });
  return (
    // <div className="pt-6 pb-5 md:pt-12 md:pb-7 bg-black mb-10 md:mb-12 xl:mb-14 2xl:mb-20">
    <div className="pt-6 pb-5 md:pt-12 md:pb-7 bg-black mb-7 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-[75px]">
      <Container>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row md:items-center xl:items-center 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:space-x-3">
          <div className="2xl:w-[650px] mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-[24px] leading-[1.6] md:text-[24px] lg:text-[30px] 2xl:text-[38px] 3xl:text-[48px] font-bold mb-3 md:mb-4 lg:mb-4 xl:mb-4 2xl:mb-4 text-white">
              Buy Designer <br /> Dress For Anything
            </h2>
            <div className="mb-6 md:mb-8 lg:mb-10 xl:mb-10 text-base md:text-base lg:text-base xl:text-base 2xl:text-lg  3xl:text-lg text-white pe-4 md:leading-8 lg:leading-8 xl:leading-8 2xl:leading-8 3xl:leading-8 leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam.
            </div>
            <button className="bg-white text-black text-sm font-semibold leading-[28px] px-6 py-3 lg:px-8 xl:px-8 2xl:px-8 lg:py-4 xl:py-4 duration-300 hover:bg-white/80">
              Go to collection
            </button>
          </div>
          <div className="2xl-w-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 sm:gap-2 md:gap-2">
            {error ? (
              <Alert message={error.toString()} />
            ) : (
              <>
                {isLoading && !products?.length ? (
                  <ProductFeedLoader limit={3} uniqueKey={'hire-designer'} />
                ) : (
                  products
                    ?.slice(0, 3)
                    ?.map((product: Product) => (
                      <ProductCard
                        showCategory={true}
                        showRating={true}
                        hideProductDescription={true}
                        key={`product--key${product.id}`}
                        product={product}
                        imgWidth={imgWidth}
                        imgHeight={imgHeight}
                        variant={'grid'}
                        bgTransparent={true}
                        disableBorderRadius={true}
                      />
                    ))
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BuyDesignerAncient;
