import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

async function claim(address: string, network: string, assetId: string) {
	await client.set(`${address}-${network}-${assetId}`, "true", "EX", 86400);
}

export default claim;
