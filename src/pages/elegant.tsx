import Container from "@components/ui/container";
import HeroSlider from "@containers/hero-slider";
import Layout from "@components/layout/layout-two";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { fetchFlashSaleProducts } from "@framework/product/get-all-flash-sale-products";
import { fetchCategories } from "@framework/category/get-all-categories";
import { fetchNewArrivalProducts } from "@framework/product/get-all-new-arrival-products";
import { fetchBrands } from "@framework/brand/get-all-brands";
import ProductsFeatured from "@containers/products-featured";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CategoryBlockIcon from "@containers/category-block-icon";
import { ROUTES } from "@utils/routes";
import { homeSevenBanner as banner } from "@framework/static/banner";
import { collectionModernData as collection } from "@framework/static/collection";
import ProductsFlashSaleCarousel from "@containers/product-flash-sale-carousel";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import BannerCard from "@components/common/banner-card";
import CollectionBlock from "@containers/collection-block";
import BrandGridBlock from "@containers/brand-grid-block";
import TestimonialCarousel from "@containers/testimonial-carousel";
import SubscriptionWithBg from "@components/common/subscription-with-bg";
import BannerBlock from "@containers/banner-block";
import ExclusiveBlock from "@containers/exclusive-block";

// All data file
import { bannerDataThree } from "@framework/static/banner";
import ProductsTopBlock from "@containers/products-top-block";
import { homeElegantHeroSlider as banners } from "@framework/static/banner";

export default function Home() {
	return (
		<>
			<HeroSlider data={banners} variantRounded="default" variant="fullWidth" />
			<Container>
				<BannerBlock
					data={bannerDataThree}
					className="mb-12 md:mb-14 xl:mb-16"
				/>
				<CategoryBlockIcon
					sectionHeading="text-browse-categories"
					variant="modern"
				/>
				<ProductsFeatured
					limit={4}
					variant="combined"
					sectionHeading="text-featured-products"
				/>
				<ProductsFlashSaleCarousel />
				<BannerCard
					key={`banner--key${banner.id}`}
					banner={banner}
					href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
					className="mb-12 md:mb-14 xl:mb-16 pb-0.5 md:pb-0 lg:pb-1 xl:pb-0 md:-mt-2.5"
				/>
				<BrandGridBlock
					sectionHeading="text-top-brands"
					limit={12}
					variant="6column"
				/>
				<ProductsTopBlock sectionHeading="text-top-products" />
				<ExclusiveBlock variant="modern" />
				<NewArrivalsProductFeed />
				<TestimonialCarousel sectionHeading="text-testimonial" />
				<CollectionBlock variant="modern" data={collection} />
				<SubscriptionWithBg />
			</Container>
		</>
	);
}

Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		[API_ENDPOINTS.FLASH_SALE_PRODUCTS, { limit: 10 }],
		fetchFlashSaleProducts
	);
	await queryClient.prefetchQuery(
		[API_ENDPOINTS.CATEGORIES, { limit: 10 }],
		fetchCategories
	);
	await queryClient.prefetchQuery(
		[API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, { limit: 10 }],
		fetchNewArrivalProducts
	);
	await queryClient.prefetchQuery(
		[API_ENDPOINTS.BRANDS, { limit: 0 }],
		fetchBrands
	);

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
		revalidate: 60,
	};
};
