import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@/libs/providers/ThemeProvider";
import { CssGlobal } from "@/libs/components";
import { FAVICON } from "@/assets/vectors";
import UserAgentProvider from "@/libs/providers/UserAgentProvider";
import MetaMaskExtensionProvider from "@/libs/providers/MetaMaskExtensionProvider";
import MetaMaskWalletProvider from "@/libs/providers/MetaMaskWalletProvider";
import FaucetProvider from "@/libs/providers/FaucetProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<CssBaseline />
			<ThemeProvider>
				<CssGlobal />
				<UserAgentProvider>
					<FaucetProvider>
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
					</FaucetProvider>
				</UserAgentProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}

export default MyApp;
