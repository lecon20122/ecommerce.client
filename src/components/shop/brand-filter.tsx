import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/stores/get-all-brands";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

interface Props {
	brands: string[] | undefined
}

export const BrandFilter = ({ brands }: Props) => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query } = router;

	const selectedBrands = query?.stores ? (query.stores as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedBrands);
	React.useEffect(() => {
		setFormState(selectedBrands);
	}, [query?.stores]);

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		setFormState(currentFormState);
		const { stores, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { stores: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-brands")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{brands?.map((item: string , index) => (
					<CheckBox
						key={`${item}${index}`}
						label={item}
						name={item.toLowerCase()}
						checked={formState.includes(item)}
						value={item}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
