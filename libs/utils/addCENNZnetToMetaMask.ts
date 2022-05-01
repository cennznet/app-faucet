import { NETWORKS } from "@/libs/constants";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { CENNZnetNetwork } from "@/libs/types";

export default async function addCENNZnetToMetaMask(
	extension: MetaMaskInpageProvider,
	network: CENNZnetNetwork
) {
	try {
		await extension.request({
			method: "wallet_switchEthereumChain",
			params: [{ chainId: NETWORKS[network].chainId }],
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
							decimals: 18,
						},
						rpcUrls: [NETWORKS[network].rpcUrl],
					},
				],
			});
		}
	}
}
