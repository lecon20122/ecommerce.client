import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { VariationTypeValue } from '../../framework/basic-rest/types';
import { CSSProperties } from 'react';


interface Props {
	colors: VariationTypeValue[] | undefined
}

export const ColorFilter = ({ colors }: Props) => {

	const { t } = useTranslation("common");
	const router = useRouter();
	const { pathname, query, locale } = router;
	const selectedColors = query?.color ? (query.color as string).split(",") : [];
	const [formState, setFormState] = React.useState<string[]>(selectedColors);

	React.useEffect(() => {
		setFormState(selectedColors);
	}, [query?.color]);

	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		setFormState(currentFormState);
		const { color, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { color: currentFormState.join(",") }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	const variationColorFactory = (variation: VariationTypeValue): CSSProperties => {
		if (variation?.color?.url) {
			return {
				backgroundImage: `url(${variation.color.url})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}
		} else {
			return {
				backgroundColor: variation?.hex_value
			}
		}
	}

	const mappedColors = colors?.map((item: VariationTypeValue) => {
		return (
			<CheckBox
				key={item.id}
				label={
					<span className="flex items-center">
						<span
							className={`w-6 h-5 rounded-sm me-3 mt-0.5 drop-shadow-xl border-[1px] border-gray-400 hover:border-[1px] hover:border-black`}
							style={variationColorFactory(item)}
						/>
					</span>
				}
				name={item.slug}
				checked={formState.includes(item.slug)}
				value={item.slug}
				onChange={handleItemClick}
			/>
		)
	})

	return (
		<div className="block border-b border-gray-300 pb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t("text-colors")}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{mappedColors}
			</div>
		</div>
	);
};
