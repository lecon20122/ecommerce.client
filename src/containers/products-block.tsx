import React from 'react';
import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductFeedLoader from '@components/ui/loaders/product-feed-loader';
import { Product } from '@framework/types';
import Alert from '@components/ui/alert';
import cn from 'classnames';

interface ProductsProps {
  sectionHeading?: any;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  variant?: 'circle' | 'rounded' | 'listSmall' | 'grid' | 'gridSlim' | 'list' | 'gridModern' | 'gridModernWide' | 'gridTrendy' | undefined;
  limit?: number;
  imgWidth?: number | string;
  imgHeight?: number | string;
  hideProductDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  demoVariant?: 'ancient';
  disableBorderRadius?: boolean;
}

const ProductsBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-9 md:mb-10 xl:mb-12',
  products,
  loading,
  error,
  uniqueKey,
  variant = 'grid',
  limit = 10,
  imgWidth,
  imgHeight,
  hideProductDescription = false,
  showCategory = false,
  showRating = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  return (
    <div className={className}>
      {sectionHeading && <SectionHeader sectionHeading={sectionHeading} categorySlug={categorySlug} />}

      {error ? (
        <Alert message={error} />
      ) : (
        <div
          className={cn(
            `grid gap-x-${demoVariant === 'ancient' ? 2 : 3} md:gap-x-${demoVariant === 'ancient' ? 2 : 5} xl:gap-x-${
              demoVariant === 'ancient' ? 2 : 7
            } gap-y-${demoVariant === 'ancient' ? 2 : 3} xl:gap-y-${demoVariant === 'ancient' ? 2 : 5} 2xl:gap-y-${
              demoVariant === 'ancient' ? 3 : 8
            } bg-white`,
            {
              'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5': variant === 'grid',
              'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4': variant === 'gridModernWide',
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5': variant === 'gridModern',
            }
          )}
        >
          {loading && !products?.length ? (
            <ProductFeedLoader limit={limit} uniqueKey={uniqueKey} />
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                showCategory={showCategory}
                showRating={showRating}
                hideProductDescription={hideProductDescription}
                key={`product--key${product.id}`}
                product={product}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
                demoVariant="ancient"
                disableBorderRadius={disableBorderRadius}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsBlock;
