import BannerCard from '@components/common/banner-card'
import Carousel from '@components/ui/carousel/carousel'
import { ROUTES } from '@utils/routes'
import { SwiperSlide } from 'swiper/react'
import cn from 'classnames'
import { CategoryBanner, CategoryImages } from '../framework/basic-rest/types';
import useWindowSize from 'react-use/lib/useWindowSize'

interface Props {
  data: CategoryImages
  className?: string
  buttonGroupClassName?: string
  variant?: 'box' | 'fullWidth'
  variantRounded?: 'rounded' | 'default'
  prevNextButtons?: 'none' | ''
}

function getImage(deviceWidth: number, imgObj: CategoryImages) {
  return deviceWidth < 480 ? imgObj.mobile_banners : imgObj.banners;
}

//  2xl:mb-[75px]
export function HeroSlider({
  className = 'mb-12 md:mb-14 xl:mb-[60px]',
  variant = 'box',
  variantRounded = 'rounded',
  buttonGroupClassName = '',
  data,
  prevNextButtons = '',
}: Props) {

  const { width } = useWindowSize();
  const selectedImage = getImage(width, data);

  
  return (
    <div
      className={cn(
        'relative mb-5 md:mb-8',
        {
          'mx-auto max-w-[1920px]': variant === 'fullWidth',
        },
        className
      )}
    >
      <Carousel
        autoplay={{
          delay: 5000,
        }}
        className={`mx-0 ${variant === 'fullWidth' ? 'carousel-full-width' : ''
          }`}
        paginationPosition='left'
        prevButtonClasses={`start-6 md:start-8 xl:start-12 2xl:start-16 ${prevNextButtons === 'none' && 'hidden'
          }`}
        nextButtonClasses={`end-6 md:end-8 xl:end-12 2xl:end-16 ${prevNextButtons === 'none' && 'hidden'
          }`}
        buttonGroupClassName={buttonGroupClassName}
        nextActivateId='hero-slider-next'
        prevActivateId='hero-slider-prev'
        pagination={{
          clickable: true,
        }}
      >
        {selectedImage?.map((banner: CategoryBanner) => (
          <SwiperSlide
            className='carouselItem'
            key={`banner--key-${banner?.id}`}
          >
            <BannerCard
              banner={banner}
              href={`${ROUTES.COLLECTIONS}/${banner.name}`}
              variant={variantRounded}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default HeroSlider
