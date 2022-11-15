import Carousel from "@components/ui/carousel/carousel";
import ProductCard from "@components/product/product-card";
import SectionHeader from "@components/common/section-header";
import ProductCardGridLoader from "@components/ui/loaders/product-card-grid-loader";
import { useFlashSaleProductsQuery } from "@framework/product/get-all-flash-sale-products";
import Alert from "@components/ui/alert";
import { SwiperSlide } from "swiper/react";

interface ProductsProps {
	sectionHeading?: string;
	className?: string;
	date?: any;
}

const breakpoints = {
	"1500": {
		slidesPerView: 5,
		spaceBetween: 28,
	},
	"1025": {
		slidesPerView: 4,
		spaceBetween: 20,
	},
	"768": {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	"480": {
		slidesPerView: 3,
		spaceBetween: 12,
	},
	"0": {
		slidesPerView: 2,
		spaceBetween: 12,
	},
};

const ProductsFlashSaleCarousel: React.FC<ProductsProps> = ({
	sectionHeading = "text-flash-sale",
	className = "mb-10 md:mb-12 xl:mb-14",
}) => {
	const { data, isLoading, error } = useFlashSaleProductsQuery({
		limit: 10,
	});
	return (
		<div className={`${className} 2xl:pt-2`}>
			<div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
				<SectionHeader sectionHeading={sectionHeading} className="mb-0" />
			</div>
			{error ? (
				<Alert message={error?.message} />
			) : (
				<Carousel
					autoplay={{
						delay: 3500,
					}}
					breakpoints={breakpoints}
					buttonGroupClassName="-mt-10 md:-mt-12 xl:-mt-14"
				>
					{isLoading && data?.productFlashSellGridTwo?.length
						? Array.from({ length: 10 }).map((_, idx) => (
								<ProductCardGridLoader
									key={idx}
									uniqueKey={`flash-sale-${idx}`}
								/>
						  ))
						: data?.productFlashSellGridTwo?.map((product: any) => (
								<SwiperSlide key={`product--key-${product.id}`}>
									<ProductCard
										product={product}
										imgWidth={335}
										imgHeight={335}
										variant="gridSlim"
									/>
								</SwiperSlide>
						  ))}
				</Carousel>
			)}
		</div>
	);
};

export default ProductsFlashSaleCarousel;
