import { useState } from "react";
import VendorCard from "@components/common/vendor-card";
import { useShopsQuery } from "@framework/shop/get-shops";
import Alert from "@components/ui/alert";
import { BsGridFill, BsList } from "react-icons/bs";
import { useTranslation } from "next-i18next";

const ShopsPageContent: React.FC = () => {
	const [gridView, setGridView] = useState(Boolean(false));
	const { t } = useTranslation("common");
	const { data, error } = useShopsQuery({
		limit: 9,
	});

	const listViewHandel = () => {
		setTimeout(() => {
			setGridView(false);
		}, 300);
	};

	const gridViewHandel = () => {
		setTimeout(() => {
			setGridView(true);
		}, 300);
	};

	if (error) return <Alert message={error?.message} />;

	return (
		<div className="border-t border-gray-300 pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
			<div className="w-full xl:max-w-[1170px] mx-auto">
				<div className="flex items-center justify-between mb-6 xl:mb-8">
					<h2 className="font-bold text-heading text-lg md:text-xl lg:text-2xl xl:text-3xl">
						{t("text-super-shop")}
					</h2>
					<div className="flex-shrink-0 flex items-center ms-2">
						<button
							aria-label="list"
							className={`text-2xl relative top-[1px] transition-all ${
								gridView === false ? "text-heading" : "text-body"
							}`}
							onClick={listViewHandel}
						>
							<BsList className="" />
						</button>
						<button
							aria-label="grid"
							className={`text-lg transition-all ms-1.5 ${
								gridView === true ? "text-heading" : "text-body"
							}`}
							onClick={gridViewHandel}
						>
							<BsGridFill />
						</button>
					</div>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
					{data?.shop?.data?.map((item) => (
						<VendorCard
							key={item.id}
							shop={item}
							variant={gridView === true ? "grid" : "list"}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopsPageContent;
