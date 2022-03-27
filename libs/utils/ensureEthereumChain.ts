import { MetaMaskInpageProvider } from "@metamask/providers";

export default async function ensureEthereumChain(
	extension: MetaMaskInpageProvider
): Promise<void> {
	const ethChainId = await extension.request({ method: "eth_chainId" });

	if (ethChainId === "0x2a")
		return;

	await extension.request({
		method: "wallet_switchEthereumChain",
		params: [{ chainId: "0x2a" }],
	});
}
