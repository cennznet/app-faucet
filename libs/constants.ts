export const CENNZNET_PUBLIC_API_URL: string = String(
	process.env.NEXT_PUBLIC_CENNZNET_API_URL
);

export const ENDOWED_ACCOUNT_SEEDS: string[] = String(
	process.env.ENDOWED_ACCOUNT_SEEDS
).split(",");
