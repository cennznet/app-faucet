import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

async function status(
	address: string,
	network: string,
	assetId: string
): Promise<boolean> {
	const resp: string | null = await client.get(
		`${address}-${network}-${assetId}`
	);
	return !!resp;
}

export default status;
