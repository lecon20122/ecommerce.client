import ProductCard from "@components/product/product-card";
import Button from "@components/ui/button";
import type { FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
import { useTranslation } from "next-i18next";
import { ApiProduct, PaginatedData } from '../../framework/basic-rest/types';
import { InfiniteData } from "react-query";
interface ProductGridProps {
	className?: string;
	products: InfiniteData<PaginatedData<ApiProduct>> | undefined
	error: any
	isFetching: boolean,
	isFetchingNextPage: boolean,
	fetchNextPage: any,
	hasNextPage: any,
}
export const ProductGrid: FC<ProductGridProps> = ({ className = "", error, fetchNextPage, hasNextPage, isFetching: isLoading, isFetchingNextPage: loadingMore, products }) => {
	if (error) return <p>{error.message}</p>;

	const { t } = useTranslation("common");

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-1 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{isLoading && !products?.pages?.length ? (
					<ProductFeedLoader limit={20} uniqueKey="search-product" />
				) : (
					products?.pages?.map((page) => {
						return page?.data?.map((product: ApiProduct) => (
							<ProductCard
								key={`product--key${product.id}`}
								product={product}
								imgLoading="eager"
								variant="gridModern"
								disableBorderRadius = {true}
							/>
						));
					})
				)}
			</div>
			<div className="text-center pt-8 xl:pt-14">
				{hasNextPage && (
					<Button
						loading={loadingMore}
						disabled={loadingMore}
						onClick={() => fetchNextPage()}
						variant="slim"
					>
						{t("button-load-more")}
					</Button>
				)}
			</div>
		</>
	);
};
