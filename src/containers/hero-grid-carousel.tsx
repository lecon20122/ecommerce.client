import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";
import BannerCard from "@components/common/banner-card";
import { homeHeroGridSlider as banners } from "@framework/static/banner";

interface HeroGridProps {
	className?: string;
}

const breakpoints = {
	"1720": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"1366": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"1025": {
		slidesPerView: 3,
	},
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const HeroGridCarousel: React.FC<HeroGridProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	return (
		<div className={`heightFull ${className}`}>
			<Carousel
				autoplay={{
					delay: 4000,
				}}
				breakpoints={breakpoints}
				buttonGroupClassName="hidden"
				scrollbar={{ draggable: true, hide: false }}
				className="hero-grid-carousel"
			>
				{banners?.map((banner) => (
					<SwiperSlide key={`hero-banner-grid--key-${banner.id}`}>
						<BannerCard
							banner={banner}
							href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
							effectActive={true}
						/>
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};

export default HeroGridCarousel;
