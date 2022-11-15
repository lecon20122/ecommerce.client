import TestimonialCard from '@components/common/testimonial-card';
import SectionHeader from '@components/common/section-header';
import Carousel from '@components/ui/carousel/carousel';
import { testimonials } from '@framework/static/testimonials';
import { testimonialsTwo } from '@framework/static/testimonials-two';
import { SwiperSlide } from 'swiper/react';

interface TestimonialsProps {
  sectionHeading: string;
  className?: string;
  type?: 'rounded' | 'circle' | 'list';
  disableBoarderRadius?: boolean;
  reduceCardSpacing?: boolean;
  demoVariant?: 'ancient';
}

const breakpoints = {
  '1720': {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  '1366': {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  '1025': {
    slidesPerView: 3,
    spaceBetween: 0,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

const TestimonialCarousel: React.FC<TestimonialsProps> = ({
  sectionHeading,
  className = 'mb-10 md:mb-12 xl:mb-14 md:pb-1 xl:pb-0',
  type,
  disableBoarderRadius = false,
  reduceCardSpacing = false,
  demoVariant,
}) => {
  return (
    <div className={`heightFull ${className} ${demoVariant === 'ancient' && 'ancient-testimonial'}`}>
      <SectionHeader sectionHeading={sectionHeading} />
      <Carousel
        autoplay={{
          delay: 4000,
        }}
        breakpoints={breakpoints}
        className={`testimonial-carousel ${reduceCardSpacing && 'reduce-child-padding'}`}
        scrollbar={{ draggable: true, hide: false }}
        {...(type === 'list'
          ? {
              buttonGroupClassName: '!w-auto !top-0 !end-6 carousel-control',
              type: 'list',
              buttonSize: 'small',
              isFraction: true,
              paginationFractionId: 'testimonialPaginationFraction',
              pagination: {
                el: '#testimonialPaginationFraction',
                type: 'fraction',
                formatFractionCurrent: function (number: number) {
                  return number;
                },
              },
              prevActivateId: 'prev',
              nextActivateId: 'next',
            }
          : {
              buttonGroupClassName: 'hidden',
            })}
      >
        {(demoVariant === 'ancient' ? testimonialsTwo : testimonials)?.map((testimonial, id) => (
          <SwiperSlide key={`testimonial--key-${id}`}>
            <TestimonialCard demoVariant={demoVariant} item={testimonial} type="modern" disableBoarderRadius={disableBoarderRadius} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
