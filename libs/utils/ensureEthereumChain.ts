import { MetaMaskInpageProvider } from "@metamask/providers";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === "0xbb8") return;

	await extension.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: "0xbb8" }],
	});
}
