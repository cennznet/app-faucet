import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

export async function fetchClaimStatus(
	address: string,
	assetId: string
): Promise<boolean> {
	const resp: string | null = await client.get(
		`${address}-${assetId}`
	);
	return !!resp;
}

export async function setNewClaim(
	address: string,
	assetId: string
) {
	await client.set(`${address}-${assetId}`, "true", "EX", 86400);
}
