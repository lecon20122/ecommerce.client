import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import PageHeader from "@components/ui/page-header";
import CheckoutForm from "@components/checkout/checkout-form";
import CheckoutCard from "@components/checkout/checkout-card";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { getAuthSession } from "@utils/get-server-session";
import CheckoutAddresses from '../components/checkout/checkout-addresses';

export default function CheckoutPage() {
	const { t } = useTranslation();


	return (
		<>
			{/* <PageHeader pageHeader="text-page-checkout" /> */}
			<Container>
				<div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
					<div className="md:w-full lg:w-3/5 flex  h-full flex-col -mt-1.5">
						<CheckoutAddresses t={t} />
					</div>
					<div className="md:w-full lg:w-2/5 md:ms-7 lg:ms-10 xl:ms-14 flex flex-col h-full -mt-1.5">
						<CheckoutCard />
					</div>
				</div>
				<Subscription />
			</Container>
		</>
	);
}

CheckoutPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getAuthSession(ctx)

	if (!session) {
		return {
			redirect: { destination: "/404", permanent: false },
			props: {
				...(await serverSideTranslations(ctx.locale!, [
					"common",
					"forms",
					"menu",
					"footer",
				])),
			}
		}
	}
	return {
		props: {
			...(await serverSideTranslations(ctx.locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
			session: session
		},
	};
};
