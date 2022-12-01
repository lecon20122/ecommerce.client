import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ProductSingleDetails from "@components/product/product-single-details";
import RelatedProducts from "@containers/related-products";
import Divider from "@components/ui/divider";
import Breadcrumb from "@components/common/breadcrumb";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

export default function ProductPage() {
	return (
		<>
			<Divider className="mb-0" />
			<Container clean className="mx-auto max-w-[1280px] px-4 md:px-8 2xl:px-16">
				<div className="pt-8">
					<Breadcrumb />
				</div>
				<ProductSingleDetails />
				{/* <RelatedProducts sectionHeading="text-related-products" /> */}
				<Subscription />
			</Container>
		</>
	);
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
