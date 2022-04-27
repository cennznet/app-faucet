import { CENNZ_IPFS } from "@/libs/constants";

export default async function addCENNZTokenToMetamask() {
	await global.ethereum.request({
		method: "wallet_watchAsset",
		params: {
			type: "ERC20",
			options: {
				address: "0xcCccccCc00003E80000000000000000000000000",
				symbol: "CENNZ",
				decimals: 4,
				image: CENNZ_IPFS,
			},
		},
	});
}
