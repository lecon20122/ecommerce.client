import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { Variation } from '../../framework/basic-rest/types';

interface Props {
	titleLabelKey?: string,
	tableRowHeads?: React.ReactNode,
	data?: Variation[]
	dataKeys?: any[]
}

export function DataTable({ data, dataKeys, titleLabelKey, tableRowHeads }: Props) {

	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	return (
		<>
			<h2 className="text-lg font-bold text-heading mb-2">
				{/* {t("text-orders")} */}
				Variants
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<tr>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
									Image
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Variation Type Value
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Variation Type
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
									Price
								</th>
								<th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
									{t("text-actions")}
								</th>
							</tr>
						</thead>
						<tbody className="text-sm lg:text-base">
							{data?.map((item) => (
								<tr className="border-b border-gray-300 last:border-b-0">
									<td className="px-4 py-5 text-start">
										<img width={100} src={item.media[0].small}></img>
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{item.variation_type_value.value.en}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{item.variation_type.type.en}
									</td>
									<td className="text-start lg:text-center px-4 py-5 text-heading">
										{item.price}
									</td>
									<td className="text-end px-4 py-5 text-heading">
										<Link
											href="/my-account/orders/3203"
											className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
										>
											{t("button-view")}
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
						{data?.map((item) => (
							<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
								<li className="flex items-center justify-between">
									Image
									<span className="font-normal">
										<img width={100} src={item.media[0].small}></img>
									</span>
								</li>
								<li className="flex items-center justify-between">
									Variation Type Value
									<span className="font-normal">{item.variation_type_value.value.en}</span>
								</li>
								<li className="flex items-center justify-between">
									Variation Type
									<span className="font-normal">{item.variation_type.type.en}</span>
								</li>
								<li className="flex items-center justify-between">
									Price
									<span className="font-normal">{item.price}</span>
								</li>
								<li className="flex items-center justify-between">
									{t("text-actions")}
									<span className="font-normal">
										<Link
											href="/my-account/orders/3203"
											className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
										>
											{t("button-view")}
										</Link>
									</span>
								</li>
							</ul>
						))}
					</div>
				)}
			</motion.div>
		</>
	);
};
