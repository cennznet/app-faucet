import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

async function hasClaimed(address: string, network: string): Promise<boolean> {
	const resp: string | null = await client.get(`${address}-${network}`);
	return !!resp;
}

export default hasClaimed;
