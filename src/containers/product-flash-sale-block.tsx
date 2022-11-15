import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-card';
import ProductCardGridLoader from '@components/ui/loaders/product-card-grid-loader';
import { useFlashSaleProductsQuery } from '@framework/product/get-all-flash-sale-products';
import Alert from '@components/ui/alert';
import dynamic from 'next/dynamic';

const Countdown = dynamic(() => import('react-countdown'), { ssr: false });

interface WrapperProps {
  sectionHeading?: string;
  className?: string;
  date?: any;
  disableSectionPadding?: boolean;
  disableSectionBorder?: boolean;
  hideCountdown?: boolean;
  TwoXlCols?: number;
  itemGap?: number;
  demoVariant?: 'ancient';
  disableBorderRadius?: boolean;
  bgGray?: boolean;
}

interface ProductsProps extends WrapperProps {
  limit?: number;
  itemVariant?: 'grid' | 'gridSlim' | 'list' | 'listSmall' | 'gridModern' | 'gridModernWide' | 'gridTrendy' | 'rounded' | 'circle';
}

function ProductFlashSaleWrapper({
  children,
  className,
  disableSectionBorder,
  disableSectionPadding,
  sectionHeading,
  hideCountdown,
  date,
}: React.PropsWithChildren<WrapperProps>) {
  return (
    <>
      <div
        className={`${className} ${!disableSectionBorder && 'border border-gray-300'} rounded-md ${
          !disableSectionPadding && 'pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7 px-4 md:px-5 lg:px-7'
        }`}
      >
        <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
          <SectionHeader sectionHeading={sectionHeading || ''} className="mb-0" />
          {!hideCountdown && <Countdown date={date} intervalDelay={1000} renderer={renderer} />}
        </div>
        {children}
      </div>
    </>
  );
}

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <span>Time Over!</span>;
  } else {
    // Render a countdown
    return (
      <div className="flex items-center space-s-1.5 md:space-s-2.5">
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {days}
          </span>
          days
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {hours}
          </span>
          hours
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {minutes}
          </span>
          mins
        </div>
        <div className="text-heading text-10px md:text-xs text-center uppercase">
          <span className="bg-heading rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1">
            {seconds}
          </span>
          secs
        </div>
      </div>
    );
  }
};

const ProductsFlashSaleBlock: React.FC<ProductsProps> = ({
  sectionHeading = 'text-flash-sale',
  className = 'mb-12 md:mb-14 xl:mb-16',
  date = '2023-03-01T01:02:03',
  disableSectionPadding = false,
  disableSectionBorder = false,
  hideCountdown = false,
  itemVariant,
  limit,
  TwoXlCols = 5,
  demoVariant,
  disableBorderRadius = false,
  bgGray,
}) => {
  const { data, isLoading, error } = useFlashSaleProductsQuery({
    limit: limit || 10,
    demoVariant,
  });

  if (isLoading) {
    return (
      <ProductFlashSaleWrapper
        sectionHeading={sectionHeading}
        className={className}
        date={date}
        disableSectionPadding={disableSectionPadding}
        disableSectionBorder={disableSectionBorder}
        hideCountdown={hideCountdown}
      >
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-${TwoXlCols} gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-4 lg:gap-y-5 xl:lg:gap-y-6 2xl:gap-y-8`}
        >
          {Array.from({ length: limit || 10 }).map((_, idx) => (
            <ProductCardGridLoader key={idx} uniqueKey={`flash-sale-${idx}`} />
          ))}
        </div>
      </ProductFlashSaleWrapper>
    );
  }
  if (error) {
    return (
      <ProductFlashSaleWrapper
        sectionHeading={sectionHeading}
        className={className}
        date={date}
        disableSectionPadding={disableSectionPadding}
        disableSectionBorder={disableSectionBorder}
        hideCountdown={hideCountdown}
      >
        <Alert message={error?.message} />
      </ProductFlashSaleWrapper>
    );
  }
  return (
    <ProductFlashSaleWrapper
      sectionHeading={sectionHeading}
      className={className}
      date={date}
      disableSectionPadding={disableSectionPadding}
      disableSectionBorder={disableSectionBorder}
      hideCountdown={hideCountdown}
    >
      <div
        className={`grid grid-cols-${demoVariant === 'ancient' ? 1 : 2} sm:grid-cols-${demoVariant === 'ancient' ? 1 : 2} md:grid-cols-${
          demoVariant === 'ancient' ? 2 : 3
        } lg:grid-cols-${demoVariant === 'ancient' ? 3 : 4} 2xl:grid-cols-${TwoXlCols} gap-x-${
          demoVariant === 'ancient' ? 2 : 3
        } md:gap-x-${demoVariant === 'ancient' ? 2 : 5} xl:gap-x-${demoVariant === 'ancient' ? 2 : 7} gap-y-${
          demoVariant === 'ancient' ? 2 : 4
        } lg:gap-y-${demoVariant === 'ancient' ? 2 : 5} xl:gap-y-${demoVariant === 'ancient' ? 2 : 6} 2xl:gap-y-${
          demoVariant === 'ancient' ? 2 : 8
        }`}
      >
        {limit ? (
          <>
            {data?.productFlashSellGridTwo?.slice(0, limit)?.map((product: any) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                imgWidth={itemVariant === 'list' ? 180 : 324}
                imgHeight={itemVariant === 'list' ? 180 : 324}
                variant={itemVariant || 'gridSlim'}
                disableBorderRadius={disableBorderRadius}
                demoVariant={demoVariant}
                bgGray={bgGray}
              />
            ))}
          </>
        ) : (
          <>
            {data?.productFlashSellGridTwo?.map((product: any) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                imgWidth={itemVariant === 'list' ? 180 : 324}
                imgHeight={itemVariant === 'list' ? 180 : 324}
                variant={itemVariant || 'gridSlim'}
                disableBorderRadius={disableBorderRadius}
                demoVariant={demoVariant}
                bgGray={bgGray}
              />
            ))}
          </>
        )}
      </div>
    </ProductFlashSaleWrapper>
  );
};

export default ProductsFlashSaleBlock;
