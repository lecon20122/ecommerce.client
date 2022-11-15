import BannerCard from "@components/common/banner-card";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
import { useOnSellingProductsQuery } from "@framework/product/get-all-on-selling-products";
import { saleBannerWithProducts as banner } from "@framework/static/banner";
import Alert from "@components/ui/alert";
import { ROUTES } from "@utils/routes";
import { Product } from "@framework/types";

interface ProductsProps {
	sectionHeading: string;
	categorySlug?: string;
	className?: string;
	variant?: "default" | "center";
}

const SaleBannerWithProducts: React.FC<ProductsProps> = ({
	sectionHeading,
	categorySlug,
	variant = "default",
	className = "mb-12 md:mb-14 xl:mb-16",
}) => {
	const { data, isLoading, error } = useOnSellingProductsQuery({
		limit: 10,
	});

	return (
		<div className={className}>
			<SectionHeader
				sectionHeading={sectionHeading}
				categorySlug={categorySlug}
			/>
			{error ? (
				<Alert message={error?.message} />
			) : (
				<div className="grid grid-cols-1 2xl:grid-rows-2 md:grid-cols-2 2xl:grid-cols-4 gap-3 md:gap-6 lg:gap-5 xl:gap-7">
					<BannerCard
						banner={banner[0]}
						href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
						effectActive={true}
						className="md:col-span-full 2xl:col-span-2 2xl:row-span-2 order-2"
					/>
					{isLoading
						? Array.from({ length: 4 }).map((_, idx) => (
								<ProductCardListSmallLoader
									key={idx}
									uniqueKey={`on-selling-${idx}`}
								/>
						  ))
						: data?.slice(0, 4)?.map((product: Product, index: number) => (
								<div
									key={`product--key${product.id}`}
									className={`${
										variant === "center" && index === 0
											? "2xl:order-0"
											: "2xl:order-2"
									}`}
								>
									<ProductCard
										product={product}
										imgWidth={176}
										imgHeight={176}
										variant="listSmall"
									/>
								</div>
						  ))}
				</div>
			)}
		</div>
	);
};

export default SaleBannerWithProducts;
