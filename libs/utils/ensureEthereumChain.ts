import { MetaMaskInpageProvider } from "@metamask/providers";
import { CENNZnetNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider,
	network: CENNZnetNetwork
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === NETWORKS[network].chainId) return;

	try {
		await extension.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: NETWORKS[network].chainId }]
		});
	} catch (error) {
		if (error.code === 4902) {
			await extension.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						chainId: NETWORKS[network].chainId,
						blockExplorerUrls: ["https://uncoverexplorer.com"],
						chainName: NETWORKS[network].chainName,
						nativeCurrency: {
							name: "CPAY",
							symbol: "CPAY",
							decimals: 18
						},
						rpcUrls: [NETWORKS[network].rpcUrl]
					}
				]
			});
		}
	}
}
