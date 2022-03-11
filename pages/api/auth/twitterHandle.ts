import Redis from "ioredis";
import { REDIS_URL } from "@/libs/constants";
import { NextApiRequest, NextApiResponse } from "next";

const client = new Redis(REDIS_URL);

export async function setTwitterHandle(id: string, twitterHandle: string) {
	await client.set(`twitter-handle-${id}`, twitterHandle);
}

export async function fetchTwitterHandle(id: string) {
	return await client.get(`twitter-handle-${id}`);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { twitterId } = JSON.parse(req.body);

	if (!twitterId) {
		return res.status(400).json({ error: "twitter id not provided" });
	}

	const twitterHandle = await fetchTwitterHandle(twitterId);
	return res.status(200).json({ success: twitterHandle });
}
