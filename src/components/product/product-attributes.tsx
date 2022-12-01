import cn from "classnames";
import { Variation } from '../../framework/basic-rest/types';
import { useRouter } from 'next/router';
import { useState } from "react";
import { getDirection } from "@utils/get-direction";
import { useTranslation } from 'next-i18next';
interface Props {
	className?: string;
	variations: Variation[] | undefined
	currentVariation: Variation | undefined
	active: number | undefined;
	onClick: any;
}

export const ProductAttributes: React.FC<Props> = ({
	className = "mb-4",
	variations,
	active,
	onClick,
	currentVariation
}) => {
	const { locale } = useRouter();
	const dir = getDirection(locale)
	const { t } = useTranslation("common");
	const [currentStockAbleVariation, setCurrentStockAbleVariation] = useState<Variation | undefined>();

	return (
		<div className={className}>
			{/* <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				{title}
			</h3> */}
			<ul className="colors flex flex-wrap -me-3 space-x-2">
				<h1 className={`items-center self-center ${dir === 'ltr' ? 'mr-5' : 'ml-5'} text-xl`}>{t('text-color')}</h1>
				{variations?.map((variation) => {
					return (
						<li
							key={`${variation.variation_type_value.value.en}-${variation.id}`}
							className={cn(
								"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
								{
									"border-black": variation.id === active,
								},

							)}
							onClick={() => onClick(variation)}
						>

							{variation.variation_type.type.en === "color" ? (
								<span
									className={`h-full w-full rounded block ${variation.variation_type_value.hex_value === '#FFFFFF' ? 'border border-black' : ''}`}
									style={{ backgroundColor: variation.variation_type_value.hex_value }}
								/>
							) : (
								<span></span>
							)}
						</li>
					)
				})}
			</ul>
			<ul className="colors flex flex-wrap -me-3 space-x-2">
				<h1 className={`items-center self-center ${dir === 'ltr' ? 'mr-5' : 'ml-5'} text-xl`}>{t('text-size')}:</h1>
				{currentVariation?.children?.map((variation) => {
					
					return (
						<li
							key={`${variation.variation_type_value.value.en}-${variation.id}`}
							className={cn(
								"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
								{
									"border-black": variation?.id === currentStockAbleVariation?.id,
								},

							)}
							onClick={() => setCurrentStockAbleVariation(variation)}
						>
							{variation.variation_type.type.en === "size" ? (

								<span
									className="h-full w-full rounded flex items-center justify-center text-lg"
								>
									{variation.variation_type_value.value.en}
								</span>
							) : (
								<span></span>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	);
};
