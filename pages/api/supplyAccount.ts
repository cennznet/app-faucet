import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	CENNZNET_NIKAU_API_URL,
	CENNZNET_RATA_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
	TRANSFER_AMOUNT,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils";
import { CENNZnetNetwork } from "@/libs/types";
import { REDIS_URL } from "@/libs/constants";

const client = new Redis(REDIS_URL);

async function fetchClaimStatus(
	address: string,
	network: string,
	assetId: string
): Promise<boolean> {
	const resp: string | null = await client.get(
		`${address}-${network}-${assetId}`
	);
	return !!resp;
}

async function setNewClaim(address: string, network: string, assetId: string) {
	await client.set(`${address}-${network}-${assetId}`, "true", "EX", 86400);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, network, assetId } = JSON.parse(req.body);
	const CENNZnetNetwork: CENNZnetNetwork = network;

	if (!assetId)
		return res
			.status(400)
			.json({ success: false, error: "assetId param not provided" });
	if (!address)
		return res
			.status(400)
			.json({ success: false, error: "address param not provided" });
	if (!network)
		return res
			.status(400)
			.json({ success: false, error: "network param not provided" });

	const session = await getSession({ req });
	if (!session?.validAccount)
		return res
			.status(401)
			.json({ success: false, error: "Invalid Twitter account" });

	const claimed = await fetchClaimStatus(address, network, assetId);
	if (claimed)
		return res.status(400).send({ error: "Already claimed in 24h window" });

	try {
		let networkUrl: string;
		if (CENNZnetNetwork === "Nikau") networkUrl = CENNZNET_NIKAU_API_URL;
		else if (CENNZnetNetwork === "Rata") networkUrl = CENNZNET_RATA_API_URL;

		const api = await Api.create({ provider: networkUrl.toLowerCase() });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);

		await endowedAccounts.init();
		await endowedAccounts.send(
			endowedAccounts.api.tx.genericAsset.transfer(
				assetId,
				address,
				TRANSFER_AMOUNT
			)
		);

		await setNewClaim(address, network, assetId);
		await api.disconnect();

		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
