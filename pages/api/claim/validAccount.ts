import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";
import { NextApiRequest, NextApiResponse } from "next";

const client = new Redis(REDIS_URL);

export async function setValidAccount(id: string) {
	await client.set(id, true);
}

export async function fetchValidAccount(id: string) {
	return await client.get(id);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { twitterId } = JSON.parse(req.body);

	if (!twitterId) {
		return res.status(400).json({ error: "twitter id not provided" });
	}

	const valid = await fetchValidAccount(twitterId);
	return res.status(200).json({ success: valid });
}
