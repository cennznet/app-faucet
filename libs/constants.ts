export const NETWORKS = ["Nikau", "Rata", "Local Node"];

export const PLACEHOLDER_ADDRESS =
	"5FbMzsoEpd2mt8eyKpKUxwJ5S9W7nJVJkCer2Jk7tvSpB1vF";

export const NEXTAUTH_SECRET: string = String(
	process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
);

export const SUPPORTED_ASSETS: string[] = String(
	process.env.NEXT_PUBLIC_SUPPORTED_ASSETS
).split(",");

export const TWITTER_ID: string = String(process.env.NEXT_PUBLIC_TWITTER_ID);

export const TWITTER_SECRET: string = String(
	process.env.NEXT_PUBLIC_TWITTER_SECRET
);

export const ENDOWED_ACCOUNT_SEEDS: string[] = String(
	process.env.NEXT_PUBLIC_ENDOWED_ACCOUNT_SEEDS
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

export const CENNZNET_LOCAL_API_URL: string = String(
	process.env.NEXT_PUBLIC_CENNZNET_LOCAL_API_URL
);

export const REDIS_URL: string = String(process.env.REDIS_URL);
