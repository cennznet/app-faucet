import Redis from "ioredis";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

export async function hasClaimed(username: string): Promise<boolean> {
	// Check if key exists
	const resp: string | null = await client.get(username);
	// If exists, return true, else return false
	return resp ? true : false;
}

const request = async (req: NextApiRequest, res: NextApiResponse) => {
	// Collect session (force any for extra twitter params)
	const session: any = await getSession({ req });

	if (!session) {
		res.status(401).send({ error: "Not authenticated" });
	}

	try {
		const claimed: boolean = await hasClaimed(session.username);
		res.status(200).send({ claimed });
	} catch {
		res.status(500).send({ error: "Error checking claim status" });
	}
};

export default request;
