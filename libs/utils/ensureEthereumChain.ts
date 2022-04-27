import { MetaMaskInpageProvider } from "@metamask/providers";
import { CENNZnetNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider,
	network: CENNZnetNetwork
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === NETWORKS[network].chainId) return;

	await extension.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: NETWORKS[network].chainId }],
	});
}
