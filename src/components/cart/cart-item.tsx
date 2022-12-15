import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import usePrice from "@framework/product/use-price";
import { useTranslation } from "next-i18next";
import { Cart } from "@framework/cart/use-get-cart";
import { useRouter } from 'next/router';
import { useRemoveFromCartMutation } from '../../framework/basic-rest/cart/use-remove-cart-item';
import { useUpdateCartItemQuantityMutation } from '../../framework/basic-rest/cart/use-update-cart-item-quantity';


type CartItemProps = {
	item: Cart;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { t } = useTranslation("common");
	const { locale } = useRouter()

	const { addItemToCart, removeItemFromCart, clearItemFromCart } = useCart();

	const { mutate: removeCartItemMutate, isLoading: removeIsLoading } = useRemoveFromCartMutation()
	const { mutate: updateQuantityMutate, isLoading: updateIsLoading } = useUpdateCartItemQuantityMutation()


	const { price } = usePrice({
		amount: parseInt(item.price),
		currencyCode: "EGP",
	});
	const { price: totalPrice } = usePrice({
		amount: item.quantity * parseInt(item.price),
		currencyCode: "EGP",
	});

	const handleUpdateCartItemQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === '0') {
			removeCartItemMutate({ cart_id: item.id })
		} else {
			updateQuantityMutate({ cart_id: item.id, quantity: parseInt(event.target.value) })
		}
	}


	return (
		<div
			// layout
			// initial="from"
			// animate="to"
			// exit="from"
			// variants={fadeInOut(0)}
			className={`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
		// title={item?.title[locale as keyof typeof item.title]}
		>
			<div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
				<Image
					src={item?.parent_variation.small_image.url ?? "/assets/placeholder/cart-item.svg"}
					width={112}
					height={112}
					loading="eager"
					alt={item?.price}
					className="bg-gray-300 object-cover"
				/>
				{/* <div
					className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
					onClick={() => mutate({ cart_id: item.id })}
					role="button"
				>
					<IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
				</div> */}
			</div>

			<div className="flex flex-col w-full overflow-hidden">
				{/* <Link
					href={`${ROUTES.PRODUCT}/${item?.}`}
					className="truncate text-sm text-heading mb-1.5 -mt-1"
				>
					{item.parent_variation.variation_type_value.value[locale as keyof typeof item.title] + ' - ' + item?.title[locale as keyof typeof item.title]}
				</Link> */}
				<span className="text-sm text-gray-400 mb-2.5">
					{t("text-unit-price")} : &nbsp;
					{price}
				</span>

				<div className="flex items-end justify-between">
					{/* <Counter
						quantity={item.quantity}
						onIncrement={() => { }}
						onDecrement={() => removeItemFromCart(item.id)}
						variant="dark"
					/> */}
					<select defaultValue={item.quantity} onChange={(event) => handleUpdateCartItemQuantity(event)}>
						<option value="0">0 (delete)</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
					<span className="font-semibold text-sm md:text-base text-heading leading-5">
						{totalPrice}
					</span>
					<span onClick={() => removeCartItemMutate({ cart_id: item.id })} className='text-blue-500 cursor-pointer'>Delete</span>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
