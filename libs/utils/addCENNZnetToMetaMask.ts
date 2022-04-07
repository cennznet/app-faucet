import { CENNZNetNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";

export default async function addCENNZnetToMetaMask(network: CENNZNetNetwork) {
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
