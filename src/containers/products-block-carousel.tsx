import SectionHeader from '@components/common/section-header'
import Carousel from '@components/ui/carousel/carousel'
import { SwiperSlide } from 'swiper/react'
import { Product } from '@framework/types'
import ProductCard from '@components/product/product-card'

interface ProductsBlockProps {
  sectionHeading: string
  className?: string
  categorySlug?: string
  products?: Product[]
  loading: boolean
  error?: string
  uniqueKey?: string
  type?:
    | 'rounded'
    | 'circle'
    | 'gridTrendy'
    | 'grid'
    | 'gridSlim'
    | 'list'
    | 'listSmall'
  imgWidth?: number | string
  imgHeight?: number | string
}

const breakpoints = {
  '1500': {
    slidesPerView: 5,
    spaceBetween: 28,
  },
  '1280': {
    slidesPerView: 4,
    spaceBetween: 28,
  },
  '1025': {
    slidesPerView: 4,
    spaceBetween: 12,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  '480': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
}

const ProductsBlockCarousel: React.FC<ProductsBlockProps> = ({
  sectionHeading,
  className = 'mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0',
  type,
  products,
  imgWidth,
  imgHeight,
}) => {
  return (
    <div className={`heightFull relative ${className}`}>
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        breakpoints={breakpoints}
        className=''
        {...(type === 'gridTrendy'
          ? {
              buttonGroupClassName: '!w-auto !top-0 !end-6',
              type: 'list',
              buttonSize: 'small',
              isFraction: true,
              paginationFractionId: 'productsPaginationFraction',
              pagination: {
                el: '#productsPaginationFraction',
                type: 'fraction',
                formatFractionCurrent: function (number: number) {
                  return number
                },
              },
            }
          : {
              buttonGroupClassName: 'hidden',
            })}
      >
        {products?.map((product, id) => (
          <SwiperSlide key={`testimonial--key-${id}`} className='pt-2'>
            <ProductCard
              product={product}
              variant={type}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default ProductsBlockCarousel
