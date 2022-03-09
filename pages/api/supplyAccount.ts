import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import Redis from "ioredis";
import { getSession } from "next-auth/react";
import {
	CENNZNET_LOCAL_API_URL,
	CENNZNET_NIKAU_API_URL,
	CENNZNET_RATA_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
	REDIS_URL,
	TRANSFER_AMOUNT,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils/EndowedAccounts";
import { CENNZNET_NETWORK } from "@/libs/types";
import { hasClaimed } from "@/pages/api/hasClaimed";

const client = new Redis(REDIS_URL);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session?.validAccount) {
		return res
			.status(401)
			.json({ success: false, error: "Invalid Twitter account!" });
	}

	const claimed = await hasClaimed(session?.username);
	if (claimed) {
		return res.status(400).send({ error: "Already claimed in 24h window" });
	}

	try {
		const body = JSON.parse(req.body);
		if (!body.assetId) throw new Error("assetId Param not provided!");
		if (!body.address) throw new Error("address Param not provided!");
		if (!body.network) throw new Error("network Param not provided!");
		const { assetId, address, network } = body;
		const cennznetNetwork: CENNZNET_NETWORK = network;
		let networkUrl: string;
		if (cennznetNetwork === "nikau") networkUrl = CENNZNET_NIKAU_API_URL;
		else if (cennznetNetwork === "rata") networkUrl = CENNZNET_RATA_API_URL;
		else if (cennznetNetwork === "local") networkUrl = CENNZNET_LOCAL_API_URL;
		const api = await Api.create({ provider: networkUrl });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);
		await endowedAccounts.init();
		const transfer = endowedAccounts.api.tx.genericAsset.transfer(
			assetId,
			address,
			TRANSFER_AMOUNT
		);
		await endowedAccounts.send(transfer);
		await client.set(session?.username, "true", "EX", 86400);
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
