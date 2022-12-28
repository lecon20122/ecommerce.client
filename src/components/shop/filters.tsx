import { BrandFilter } from "./brand-filter";
import { FilteredItem } from "./filtered-item";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "next-i18next";
import { useFiltersQuery } from "@framework/filters/get-filters-by-category";
import { SizeFilter } from "./size-filter";
import CategoryFilter from "./category-filter";

interface Props {
	mainCategorySlug: any,
}

export default function ShopFilters({ mainCategorySlug }: Props) {
	const router = useRouter();
	const { pathname, query } = router;

	const { data, isLoading, isError, error } = useFiltersQuery({ category: mainCategorySlug })
	console.log(data);

	const { t } = useTranslation("common");

	if (isLoading) {
		return (
			<h3>Loading..</h3>
		)
	}

	return (
		<div className="pt-1">
			<div className="block border-b border-gray-300 pb-7 mb-7">
				<div className="flex items-center justify-between mb-2.5">
					<h2 className="font-semibold text-heading text-xl md:text-2xl">
						{t("text-filters")}
					</h2>
					<button
						className="flex-shrink text-xs mt-0.5 transition duration-150 ease-in focus:outline-none hover:text-heading"
						aria-label="Clear All"
						onClick={() => {
							router.push({ pathname: pathname, query: { mainCategory: mainCategorySlug } });
						}}
					>
						{t("text-clear-all")}
					</button>
				</div>
				<div className="flex flex-wrap -m-1.5 pt-2">
					{!isEmpty(query) &&
						Object.values(query)
							.join(",")
							.split(",")
							.map((v, idx) => (
								<FilteredItem
									itemKey={
										Object.keys(query).find((k) => query[k]?.includes(v))!
									}
									itemValue={v}
									key={idx}
								/>
							))}
				</div>
			</div>

			<CategoryFilter subCategories={data?.sub_categories} />
			<ColorFilter colors={data?.filters.filter((item) => item.variation_type.type.en === 'color')} />
			<SizeFilter size={data?.filters.filter((item) => item.variation_type.type.en === 'size')} />
			<BrandFilter brands={data?.stores} />
			<PriceFilter />
		</div>
	);
};
