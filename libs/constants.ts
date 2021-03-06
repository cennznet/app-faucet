import { CENNZnetToken, MetamaskNetworks } from "@/libs/types";

export const SUPPORTED_TOKENS: CENNZnetToken[] = [
	{
		symbol: "CENNZ",
		assetId: 16000,
		logo: "cennz.svg",
		decimals: 4,
	},
	{
		symbol: "CPAY",
		assetId: 16001,
		logo: "cpay.svg",
		decimals: 4,
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

export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID;

export const NETWORKS: MetamaskNetworks = {
	Nikau: {
		blockExplorerUrl: "https://nikau.uncoverexplorer.com",
		chainId: "0xbb9",
		chainName: "CENNZnet Nikau",
		rpcUrl: "https://nikau.centrality.me/public",
	},
	Rata: {
		blockExplorerUrl: "https://rata.uncoverexplorer.com",
		chainId: "0xbb8",
		chainName: "CENNZnet Rata",
		rpcUrl: "https://rata.centrality.me/public",
	},
};

export const CPAY_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmehPHqUocYho8FLC2Hs9EgU4vgm698br6RwMEddw1m9VD";

export const CENNZ_IPFS: string =
	"https://gateway.pinata.cloud/ipfs/QmfDkgrhCFfVJErVVDuU7UYasYsooXMEXFhBzLMNm6pgey";

export const APP_VERSION: string = process.env.APP_VERSION;

export const COMMIT_SHA: string = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
