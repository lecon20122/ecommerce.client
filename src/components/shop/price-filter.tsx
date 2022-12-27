import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
const priceFilterItems = [
	{
		id: "1",
		name: "Under 50 EGP",
		slug: "0-50",
	},
	{
		id: "2",
		name: "50 to 100 EGP",
		slug: "50-100",
	},
	{
		id: "3",
		name: "100 to 150 EGP",
		slug: "100-150",
	},
	{
		id: "4",
		name: "150 to 200 EGP",
		slug: "150-200",
	},
	{
		id: "5",
		name: "200 to 300 EGP",
		slug: "200-300",
	},
	{
		id: "6",
		name: "300 to 500 EGP",
		slug: "300-500",
	},
	{
		id: "7",
		name: "500 to 1000 EGP",
		slug: "500-1000",
	},
	{
		id: "8",
		name: "1000 EGP & above",
		slug: "1000-",
	},
];
export const PriceFilter = () => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { price: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = priceFilterItems;

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-price")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
