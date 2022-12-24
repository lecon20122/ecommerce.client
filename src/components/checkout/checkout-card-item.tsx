import usePrice from "@framework/product/use-price";
import { Cart } from "@framework/cart/use-get-cart";

export const CheckoutItem: React.FC<{ item: Cart }> = ({ item }) => {
	const { price } = usePrice({
		amount: item.quantity * parseInt(item.price),
		currencyCode: "EGP",
	});
	return (
		<div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
			<div className="flex border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
				<img
					src={item.parent_variation.small_image.url ?? "/assets/placeholder/order-product.svg"}
					width="64"
					height="64"
					className="object-cover"
				/>
			</div>
			<h6 className="text-sm ps-3 font-regular text-heading">
				{/* {generateCartItemName(item.title.en ?? '', item.parent_variation.variation_type_value.value)} */}
				{/* the title */}
			</h6>
			<div className="flex ms-auto text-heading text-sm ps-2 flex-shrink-0">
				{price}
			</div>
		</div>
	);
};
