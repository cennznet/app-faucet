import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@/libs/providers/ThemeProvider";
import { CssGlobal } from "@/libs/components";
import { FAVICON } from "@/assets/vectors";
import UserAgentProvider from "@/libs/providers/UserAgentProvider";
import MetaMaskExtensionProvider from "@/libs/providers/MetaMaskExtenstionProvider";
import MetaMaskWalletProvider from "@/libs/providers/MetaMaskWalletProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<CssBaseline />
			<ThemeProvider>
				<CssGlobal />
				<UserAgentProvider>
					<MetaMaskExtensionProvider>
						<MetaMaskWalletProvider>
							<Head>
								<title>CENNZnet App Faucet</title>
								<meta
									name="description"
									content="Testnet token faucet powered by CENNZnet"
								/>
								<link rel="icon" href={FAVICON} />
							</Head>
							<Component {...pageProps} />
						</MetaMaskWalletProvider>
					</MetaMaskExtensionProvider>
				</UserAgentProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
