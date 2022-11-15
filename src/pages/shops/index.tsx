import Layout from "@components/layout/layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "@components/ui/container";
import Subscription from "@components/common/subscription";
import ShopsPageContent from "@components/shops/shops-page-content";

export default function ShopsPage() {
	return (
		<>
			<ShopsPageContent />
			<Container>
				<Subscription />
			</Container>
		</>
	);
}

ShopsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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
