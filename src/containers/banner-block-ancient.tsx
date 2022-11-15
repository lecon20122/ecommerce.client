import BannerCard from '@components/common/banner-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import { ancientBanner1, ancientBanner2 } from '@framework/static/banner';
import { useWindowSize } from '@utils/use-window-size';
import { ROUTES } from '@utils/routes';

interface BannerProps {
  className?: string;
  largeFirst?: boolean;
  dataVariant?: 'one' | 'two';
  demoVariant?: 'ancient';
  spaceBetween?: number;
  disableBorderRadius?: boolean;
}

const BannerBlockAncient: React.FC<BannerProps> = ({
  className = 'mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0',
  largeFirst = false,
  dataVariant = 'one',
  demoVariant,
  spaceBetween,
  disableBorderRadius = false,
}) => {
  const { width } = useWindowSize();

  const breakpoints = {
    '768': {
      slidesPerView: 2,
      spaceBetween: spaceBetween || 28,
    },
    '480': {
      slidesPerView: 1,
      spaceBetween: spaceBetween || 20,
    },
    '0': {
      slidesPerView: 1,
      spaceBetween: spaceBetween || 12,
    },
  };

  return (
    <div className={`${className}`}>
      {width < 768 ? (
        <div>
          <Carousel breakpoints={breakpoints}>
            {(dataVariant === 'one' ? ancientBanner1 : ancientBanner2)?.map((banner: any) => (
              <SwiperSlide key={`banner--key${banner.id}`}>
                <BannerCard banner={banner} href={`${ROUTES.COLLECTIONS}/${banner.slug}`} className={`h-full`} />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div
          className={`md:grid md:grid-cols-${largeFirst ? 3 : 2} md:gap-${demoVariant === 'ancient' ? 2 : 5} xl:gap-${
            demoVariant === 'ancient' ? 1.5 : 7
          } relative`}
        >
          {(dataVariant === 'one' ? ancientBanner1 : ancientBanner2).map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
              className={banner.type === 'large' || (largeFirst && banner.id === (1 || '1')) ? 'col-span-2' : 'col-span-1'}
              effectActive={true}
              disableBorderRadius={disableBorderRadius}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerBlockAncient;
