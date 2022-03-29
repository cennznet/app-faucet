import { CENNZnetToken, MetamaskNetworks } from "@/libs/types";

export const SUPPORTED_TOKENS: CENNZnetToken[] = [
	{
		symbol: "CENNZ",
		assetId: 16000,
		logo: "cennz.svg",
	},
	{
		symbol: "CPAY",
		assetId: 16001,
		logo: "cpay.svg",
	},
];

export const NEXTAUTH_SECRET: string = String(process.env.NEXTAUTH_SECRET);

export const TWITTER_ID: string = String(process.env.TWITTER_ID);

export const TWITTER_SECRET: string = String(process.env.TWITTER_SECRET);

export const ENDOWED_ACCOUNT_SEEDS: string[] = String(
	process.env.ENDOWED_ACCOUNT_SEEDS
).split(",");

export const TRANSFER_AMOUNT: number = Number(
	process.env.NEXT_PUBLIC_TRANSFER_AMOUNT
);

export const CENNZNET_NIKAU_API_URL: string = String(
	process.env.NEXT_PUBLIC_CENNZNET_NIKAU_API_URL
);

export const CENNZNET_RATA_API_URL: string = String(
	process.env.NEXT_PUBLIC_CENNZNET_RATA_API_URL
);

export const REDIS_URL: string = String(process.env.REDIS_URL);

export const NETWORKS: MetamaskNetworks = {
	nikau: {
		chainId: "0xbb9",
		chainName: "CENNZnet Nikau",
		rpcUrl: "https://nikau.centrality.me/public",
	},
	rata: {
		chainId: "0xbba",
		chainName: "CENNZnet Rata",
		rpcUrl: "https://rata.centrality.me/public",
	},
};

export const CPAY_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmehPHqUocYho8FLC2Hs9EgU4vgm698br6RwMEddw1m9VD";

export const CENNZ_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmfDkgrhCFfVJErVVDuU7UYasYsooXMEXFhBzLMNm6pgey";
