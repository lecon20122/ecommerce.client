import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import InternalServerError from "@components/500/internal-server-error";

export default function ErrorPage500() {
	return <InternalServerError />;
}

ErrorPage500.Layout = Layout;

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
