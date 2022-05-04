import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@/libs/providers/ThemeProvider";
import { CssGlobal, Footer } from "@/libs/components";
import { FAVICON } from "@/assets/vectors";
import UserAgentProvider from "@/libs/providers/UserAgentProvider";
import MetaMaskExtensionProvider from "@/libs/providers/MetaMaskExtensionProvider";
import FaucetProvider from "@/libs/providers/FaucetProvider";
import { useRouter } from "next/router";
import { trackPageView } from "@/libs/utils";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const { events } = useRouter();

	useEffect(() => {
		if (!events) return;

		events.on("routeChangeComplete", trackPageView);
		return () => {
			events.off("routeChangeComplete", trackPageView);
		};
	}, [events]);

	return (
		<SessionProvider session={session}>
			<CssBaseline />
			<ThemeProvider>
				<CssGlobal />
				<UserAgentProvider>
					<FaucetProvider>
						<MetaMaskExtensionProvider>
							<Head>
								<title>CENNZnet App Faucet</title>
								<meta
									name="description"
									content="Testnet token faucet powered by CENNZnet"
								/>
								<link rel="icon" href={FAVICON} />
							</Head>
							<Component {...pageProps} />
							<Footer />
						</MetaMaskExtensionProvider>
					</FaucetProvider>
				</UserAgentProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
