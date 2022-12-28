import cn from "classnames";
import { Variation } from '../../framework/basic-rest/types';
import { useRouter } from 'next/router';
import { useState } from "react";
import { getDirection } from "@utils/get-direction";
import { useTranslation } from 'next-i18next';
import { variationColorFactory } from "@utils/variation-color-factory";
import { useEffect } from 'react';

interface Props {
	className?: string;
	variations: Variation[] | undefined
	currentVariation: Variation | undefined
	active: number | undefined;
	onClickCurrentColor: any;
	setCurrentBuyableVariation?: any,
	setIsSizeSelected?: any,
	isSizePropSelected: boolean
}

export const ProductAttributes: React.FC<Props> = ({
	className = "mb-4",
	variations,
	active,
	onClickCurrentColor,
	currentVariation,
	setCurrentBuyableVariation,
	isSizePropSelected,
	setIsSizeSelected
}) => {
	const { locale } = useRouter();
	const dir = getDirection(locale)
	const { t } = useTranslation("common");
	const [currentStockAbleVariation, setCurrentStockAbleVariation] = useState<Variation | undefined>();

	useEffect(() => {
		if (variations && variations[0].children[0].variation_type.type.en === 'size' && variations[0].children.length === 1) {
			console.log('f');
			setIsSizeSelected(false)
			setCurrentBuyableVariation(variations[0].children[0])
			setCurrentStockAbleVariation(variations[0].children[0])

		}
	}, [])

	const handleSizeOnClick = (variation: Variation) => {
		setIsSizeSelected(false)
		setCurrentBuyableVariation(variation)
	}

	return (
		<div className={className}>

			{/* <h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				'hello'
			</h3> */}
			<ul className="colors flex flex-wrap -me-3 space-x-2">
				{variations?.length > 1 && <h1 className={`items-center self-center ${dir === 'ltr' ? 'mr-5' : 'ml-5'} text-xl`}>{t('text-color')}</h1>}
				{variations?.length > 1 && variations?.map((variation) => {
					return (
						<li
							key={`${variation.variation_type_value.value.en}-${variation.id}`}
							className={cn(
								"cursor-pointer rounded border border-gray-100 w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
								{
									"border-black": variation.id === active,
								},

							)}
							onClick={() => onClickCurrentColor(variation)}
						>

							{variation.variation_type.type.en === "color" ? (
								<span
									className={`h-full w-full rounded block ${variation.variation_type_value.hex_value === '#FFFFFF' ? 'border border-black' : ''}`}
									style={variationColorFactory(variation)}
								/>
							) : (
								<span></span>
							)}
						</li>
					)
				})}
			</ul>
			<ul className="flex flex-wrap  items-center">
				<h1 className={`items-center self-center ${dir === 'ltr' ? 'mr-7' : 'ml-7'} text-xl`}>{t('text-size')}:</h1>
				{currentVariation?.children?.map((variation) => {
					return (
						<li
							key={`${variation.variation_type_value.value.en}-${variation.id}`}
							className={cn(
								"cursor-pointer rounded border border-gray-100 p-1 text-heading font-semibold transition duration-200 ease-in-out hover:border-black",
								{
									"border-black": variation?.id === currentStockAbleVariation?.id,
								},

							)}
							onClick={() => setCurrentStockAbleVariation(variation)}
						>
							{variation.variation_type.type.en === "size" ? (

								<span
									onClick={() => handleSizeOnClick(variation)}
									className="h-full w-full rounded flex items-center justify-center"
								>
									{variation.variation_type_value.value.en}
								</span>

							) : (
								<span></span>
							)}
						</li>
					)
				})}
				{isSizePropSelected && <span className="text-red-400 self-center mb-3">*please select size</span>}
			</ul>
		</div>
	);
};
