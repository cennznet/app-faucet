import { CENNZnetNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";

export default async function addCENNZnetToMetaMask(network: CENNZnetNetwork) {
	await global.ethereum.request({
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
