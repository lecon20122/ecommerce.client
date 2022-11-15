import SectionHeader from '@components/common/section-header'
import Carousel from '@components/ui/carousel/carousel'
import { SwiperSlide } from 'swiper/react'
import CardRoundedLoader from '@components/ui/loaders/card-rounded-loader'
import { useBrandsQuery } from '@framework/brand/get-all-brands'
import Alert from '@components/ui/alert'
import { Brand } from '@framework/types'
import Countdown from 'react-countdown'
import { useTranslation } from 'next-i18next'
import Link from '@components/ui/link'

interface BrandProps {
  sectionHeading: string
  className?: string
  date?: any
}

const breakpoints = {
  '1720': {
    slidesPerView: 8,
    spaceBetween: 28,
  },
  '1400': {
    slidesPerView: 7,
    spaceBetween: 28,
  },
  '1025': {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  '500': {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 12,
  },
}

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <span>Time Over!</span>
  } else {
    // Render a countdown
    return (
      <div className='hidden sm:flex items-center space-s-1.5 md:space-s-2.5'>
        <div className='text-white text-10px md:text-xs text-center uppercase'>
          <span className='rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1'>
            {days}
          </span>
          days
        </div>
        <div className='text-white text-10px md:text-xs text-center uppercase'>
          <span className='rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1'>
            {hours}
          </span>
          hours
        </div>
        <div className='text-white text-10px md:text-xs text-center uppercase'>
          <span className='rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1'>
            {minutes}
          </span>
          mins
        </div>
        <div className='text-white text-10px md:text-xs text-center uppercase'>
          <span className='rounded-md text-white text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mb-1'>
            {seconds}
          </span>
          secs
        </div>
      </div>
    )
  }
}

const BrandTimerBlock: React.FC<BrandProps> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16',
  sectionHeading,
  date = '2023-03-01T01:02:03',
}) => {
  const { t } = useTranslation('common')
  const { data, isLoading, error } = useBrandsQuery({
    limit: 8,
  })
  const brands = data?.brandsTimer
  return (
    <div className={`bg-[#004743] p-5 sm:p-11 rounded-[10px] ${className}`}>
      <div className='flex justify-between items-center flex-wrap mb-5 md:mb-6'>
        <SectionHeader
          sectionHeading={t(sectionHeading)}
          textClassName='!text-white'
        />
        <Countdown date={date} intervalDelay={1000} renderer={renderer} />
      </div>

      <p className='text-white mt-[-30px] !mb-11 text-sm md:text-lg leading-6 md:leading-7'>
        {t('text-upto')}
        <span className='font-bold ms-2'>{t('text-60%-discount')}</span>
      </p>

      {error ? (
        <Alert message={error?.message} />
      ) : (
        <Carousel
          breakpoints={breakpoints}
          className='mt-[-20px] sm:mt-[-10px]'
          autoplay={{
            delay: 4000,
          }}
          navigation={false}
        >
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => (
                <SwiperSlide key={idx}>
                  <CardRoundedLoader uniqueKey={`category-${idx}`} />
                </SwiperSlide>
              ))
            : brands?.map((brand: Brand) => (
                <SwiperSlide key={`brand--key${brand.id}`}>
                  <Link href={`/search?q=${brand.slug}`}>
                    <img src={brand?.image?.original} className='w-[196px]' />
                  </Link>
                </SwiperSlide>
              ))}
        </Carousel>
      )}
    </div>
  )
}

export default BrandTimerBlock
