import ProductsBlock from '@containers/products-block';
import { usePopularProductsQuery } from '@framework/product/get-all-popular-products';

interface Props {
  demoVariant?: 'ancient';
  disableBorderRadius?: boolean;
  className?: string;
}

export default function PopularProductFeed({
  demoVariant,
  disableBorderRadius = false,
  className = 'mb-7 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-[75px]',
}: Props) {
  const { data, isLoading, error } = usePopularProductsQuery({
    limit: 10,
    demoVariant,
  });
  return (
    <>
      <ProductsBlock
        sectionHeading="text-popular-products"
        products={data}
        loading={isLoading}
        error={error?.message}
        uniqueKey="popular-products"
        demoVariant={demoVariant}
        disableBorderRadius={disableBorderRadius}
        className={className}
      />
    </>
  );
}
