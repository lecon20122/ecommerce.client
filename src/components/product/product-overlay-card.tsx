import Image from 'next/image';
import { useUI } from '@contexts/ui.context';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import Text from '@components/ui/text';
import cn from 'classnames';

interface ProductProps {
  product: Product;
  index: number;
  imgLoading?: 'eager' | 'lazy';
  variant?: 'left' | 'center' | 'combined' | 'flat' | 'modern';
  disableBorderRadius?: boolean;
}

const ProductOverlayCard: React.FC<ProductProps> = ({
  product,
  index,
  variant = 'left',
  imgLoading = 'lazy',
  disableBorderRadius = false,
}) => {
  let size = 260;
  let classes;

  if (variant === 'left' && index === 0) {
    classes = 'row-span-full lg:row-span-2 col-span-full lg:col-span-2';
    size = 620;
  } else if (variant === 'center' && index === 1) {
    classes = 'row-span-full lg:row-span-2 col-span-full lg:col-span-2';
    size = 620;
  } else if (variant === 'combined') {
    if (index === 0) {
      classes = 'col-span-2 lg:row-span-2 col-span-full lg:col-span-2';
      size = 620;
    } else if (index === 2) {
      classes = `col-span-2 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-3`;
      size = 620;
    } else {
      classes = 'col-span-2 lg:col-span-1';
    }
  } else if (variant === 'modern') {
    classes = 'sm:row-span-2';
    size = 620;
  } else {
    classes = 'col-span-2 lg:col-span-1';
  }

  const { openModal, setModalView, setModalData } = useUI();
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.price,
    baseAmount: product.price,
    currencyCode: 'USD',
  });
  function handlePopupView() {
    setModalData({ data: product });
    setModalView('PRODUCT_VIEW');
    return openModal();
  }

  return (
    <div
      onClick={handlePopupView}
      className={`${classes} cursor-pointer group flex flex-col bg-gray-200 ${
        !disableBorderRadius && 'rounded-md'
      } relative items-center justify-between overflow-hidden`}
    >
      <div
        className={cn('flex justify-center items-center p-4 h-full 3xl:min-h-[330px]', {
          '!p-0': variant === 'modern',
        })}
        title={product?.name}
      >
        <Image
          src={product?.image?.original ?? '/assets/placeholder/products/product-featured.png'}
          width={size}
          height={size}
          objectFit="contain"
          loading={imgLoading}
          alt={product?.name || 'Product Image'}
          className="transition duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>

      {variant === 'modern' && (
        <span
          className={cn(
            'absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 bg-[#B26788] text-white text-10px md:text-sm leading-5 inline-block px-2 xl:px-3 pt-0.5 pb-1',
            {
              '!py-0.5': variant === 'modern',
              'rounded-md ': !disableBorderRadius,
            }
          )}
        >
          Featured
        </span>
      )}

      {discount && (
        <span
          className={cn(
            'absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 bg-heading text-white text-10px md:text-sm leading-5 rounded-md inline-block px-2 xl:px-3 pt-0.5 pb-1',
            {
              'text-[#22C55E] bg-transparent !start-auto right-3.5 md:right-5 3xl:right-7 font-bold': variant === 'modern',
            }
          )}
        >
          {discount} {variant === 'modern' && ' off'}
        </span>
      )}

      <div
        className="flex flex-col md:flex-row lg:flex-col 2xl:flex-row md:justify-between md:items-center lg:items-start 2xl:items-center w-full px-4 md:px-5 3xl:px-7 pb-4 md:pb-5 3xl:pb-7"
        title={product?.name}
      >
        <div className="md:pe-2 lg:pe-0 2xl:pe-2 overflow-hidden">
          <h2 className="text-heading font-semibold text-sm md:text-base xl:text-lg mb-1 truncate">{product?.name}</h2>

          {variant !== 'modern' ? (
            <p className="text-body text-xs xl:text-sm leading-normal xl:leading-relaxed truncate max-w-[250px]">{product?.description}</p>
          ) : (
            <Text className="pb-0.5 truncate">35 Brands, 1000+ Products</Text>
          )}
        </div>

        {variant !== 'modern' && (
          <div className="flex-shrink-0 flex flex-row-reverse md:flex-col lg:flex-row-reverse 2xl:flex-col items-center md:items-end lg:items-start 2xl:items-end justify-end md:text-end lg:text-start xl:text-end mt-2 md:-mt-0.5 lg:mt-2 2xl:-mt-0.5">
            {discount && <del className="text-sm md:text-base lg:text-sm xl:text-base 3xl:text-lg">{basePrice}</del>}
            <div className="text-heading font-segoe font-semibold text-base md:text-xl lg:text-base xl:text-xl 3xl:text-2xl 3xl:mt-0.5 pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
              {price}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOverlayCard;
