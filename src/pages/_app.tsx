import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
import { SessionProvider } from 'next-auth/react';

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import { getDirection } from "@utils/get-direction";
import SocialMediaPreview from '../components/common/social-media-preview';

function handleExitComplete() {
	if (typeof window !== "undefined") {
		window.scrollTo({ top: 0 });
	}
}


function Noop({ children }: { children: React.ReactNode }) { return (<>{children}</>) }

const CustomApp = ({ Component, pageProps }: AppProps) => {

	const queryClientRef = useRef<any>();

	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
	}
	const router = useRouter();

	const dir = getDirection(router.locale);

	useEffect(() => {
		document.documentElement.dir = dir;
	}, [dir]);

	const Layout = (Component as any).Layout || Noop;
	return (
		<AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
			<SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
				<QueryClientProvider client={queryClientRef.current}>
					<Hydrate state={pageProps.dehydratedState}>
						<ManagedUIContext>
							<Layout pageProps={pageProps}>
								<DefaultSeo />
								{/* <SocialMediaPreview/> */}
								<Component {...pageProps} key={router.route} />
								<ToastContainer />
							</Layout>
							<ManagedModal />
							<ManagedDrawer />
						</ManagedUIContext>
					</Hydrate>
					{/* <ReactQueryDevtools position="bottom-right" /> */}
				</QueryClientProvider>
			</SessionProvider>
		</AnimatePresence>
	);
};

export default appWithTranslation(CustomApp);
