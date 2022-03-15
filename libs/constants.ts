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
