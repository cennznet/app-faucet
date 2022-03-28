import { MetaMaskInpageProvider } from "@metamask/providers";
import { CENNZNetNetwork } from "@/libs/types";
import { NETWORKS } from "@/libs/constants";
import {
	addCENNZnetToMetaMask,
	addCENNZTokenToMetaMask,
} from "@/libs/utils/index";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider,
	network: CENNZNetNetwork
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === NETWORKS[network].chainId) return;
	await addCENNZnetToMetaMask(network);

	await extension.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: NETWORKS[network].chainId }],
	});

	await addCENNZTokenToMetaMask();
}
