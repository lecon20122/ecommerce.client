import React, { useState } from "react";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useProductQuery } from "@framework/product/get-product";
import usePrice from "@framework/product/use-price";
import { ProductAttributes } from "./product-attributes";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { Variation, ApiProduct } from '../../framework/basic-rest/types';
import { AddToCartInputProps, useAddToCartMutation } from "@framework/cart/use-add-to-cart";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { NextSeo, ProductJsonLd } from "next-seo";
import { ROUTES } from '../../utils/routes';

const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 1,
	},
	"0": {
		slidesPerView: 1,
	},
};

function ProductSingleDetails() {
	const {
		query: { slug },
		locale
	} = useRouter();

	useEffect(() => {
		const afterLoginCartVariables = Cookies.get('cart') !== undefined ? JSON.parse(Cookies.get('cart') as any) as AddToCartInputProps : null
		if (afterLoginCartVariables?.variation_id) {
			mutate(afterLoginCartVariables)
			Cookies.remove('cart')
		}
	}, [])


	const [currentVariation, setCurrentVariation] = useState<Variation | undefined>();
	const [currentBuyableVariation, setCurrentBuyableVariation] = useState<Variation | undefined>();
	const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);

	const { mutate, isLoading: cartLoading } = useAddToCartMutation()


	const onSuccess = (data: ApiProduct) => {
		setCurrentVariation(data.variations[0])
	}

	const { data, isLoading } = useProductQuery(slug as string, onSuccess);



	const { price, basePrice, discount } = usePrice(
		data && {
			amount: data.price,
			baseAmount: data.price,
			currencyCode: "EGP",
		}
	);
	if (isLoading) return <p>Loading...</p>;





	function handleAttribute(variation: Variation) {
		if (variation.variation_type.type.en === 'size') {
			setCurrentBuyableVariation(variation)
		}
		setCurrentVariation(variation)
	}

	const handleAddToCartButton = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const isSelected = currentBuyableVariation === undefined ? false : true
		if (isSelected) {
			mutate({
				variation_id: currentBuyableVariation?.id,
				price: parseInt(currentBuyableVariation?.price ?? ""),
				store_id: currentBuyableVariation?.store_id,
				variation_parent_id: currentBuyableVariation?.parent_id,
			})
		} else {
			setIsSizeSelected(true)
		}
	}

	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">
			<ProductJsonLd
				productName={data?.title.en as string}
				images={
					data?.variations[0].media[0].thumbnail as any
				}
				description={data?.title.en}
			/>
			<NextSeo
				title={data?.title.en as string}
			/>



			<div className="md:col-span-5 md:grid md:grid-cols-1 md:gap-2.5">
				<Carousel
					type="rounded"
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					// buttonGroupClassName={width > 1024 ? "" : "hidden"}
					buttonGroupClassName={"hidden"}
				>
					{currentVariation?.media?.map((item, index: number) => (
						<SwiperSlide key={`product-gallery-key-${index}`}>
							<div className="transition duration-150 ease-in">
								<img
									width={600}
									height={799}
									src={
										item?.big ??
										"/assets/placeholder/products/product-gallery.svg"
									}
									alt={`${data?.title.en}--${index}`}
									className="object-cover md:max-w-[670px] md:max-h-[799px] "
								/>
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			</div>

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-7 mb-7 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.title[locale as keyof typeof data.title]}
					</h2>
					{/* <p className="text-body text-sm lg:text-base leading-6 lg:leading-8">
						{data?.description}
					</p> */}
					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							{price}
						</div>
						{discount && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								{basePrice}
							</span>
						)}
					</div>
				</div>

				<div className="pb-3 border-b border-gray-300">
					<ProductAttributes
						active={currentVariation?.id}
						variations={data?.variations}
						currentVariation={currentVariation}
						onClickCurrentColor={handleAttribute}
						setCurrentBuyableVariation={setCurrentBuyableVariation}
						isSizePropSelected={isSizeSelected}
						setIsSizeSelected={setIsSizeSelected}
					/>
				</div>
				<div className="flex items-center space-s-4 md:pe-32 lg:pe-12 2xl:pe-32 3xl:pe-48 border-b border-gray-300 py-8">
					{/* <Counter
						quantity={quantity}
						onIncrement={() => setQuantity((prev) => prev + 1)}
						onDecrement={() =>
							setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
						}
						disableDecrement={quantity === 1}
					/> */}
					<Button
						onClick={handleAddToCartButton}
						variant="slim"
						className={'w-full md:w-6/12 xl:w-full'}
						loading={cartLoading}
					>
						<span className="py-2 3xl:px-8">Add to cart</span>
					</Button>
				</div>
				<div className="py-6">
					<ul className="text-sm space-y-5 pb-1">
						{/* <li>
							<span className="font-semibold text-heading inline-block pe-2">
								SKU:
							</span>
							{data?.sku}
						</li> */}
						{/* <li>
							<span className="font-semibold text-heading inline-block pe-2">
								Category:
							</span>
							<Link
								href="/"
								className="transition hover:underline hover:text-heading"
							>
								{data?.category?.name}
							</Link>
						</li> */}
						{/* {data?.tags && Array.isArray(data.tags) && (
							<li className="productTags">
								<span className="font-semibold text-heading inline-block pe-2">
									Tags:
								</span>
								{data.tags.map((tag) => (
									<Link
										key={tag.id}
										href={tag.slug}
										className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
									>
										{tag.name}
										<span className="text-heading">,</span>
									</Link>
								))}
							</li>
						)} */}
					</ul>
				</div>
				{/* <ProductMetaReview data={data} /> */}
			</div>
		</div>
	);
};

export default ProductSingleDetails;
