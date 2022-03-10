import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	CENNZNET_LOCAL_API_URL,
	CENNZNET_NIKAU_API_URL,
	CENNZNET_RATA_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
	SUPPORTED_ASSETS,
	TRANSFER_AMOUNT,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils";
import { CENNZNET_NETWORK } from "@/libs/types";
import { status, claim } from "@/pages/api/claim";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, network, assetId } = JSON.parse(req.body);
	const CENNZnetNetwork: CENNZNET_NETWORK = network;

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
	if (CENNZnetNetwork !== "local") {
		if (!session?.validAccount)
			return res
				.status(401)
				.json({ success: false, error: "Invalid Twitter account" });

		const claimed = await status(address, network, assetId);
		if (claimed)
			return res.status(400).send({ error: "Already claimed in 24h window" });
	}

	try {
		let networkUrl: string;
		if (CENNZnetNetwork === "nikau") networkUrl = CENNZNET_NIKAU_API_URL;
		else if (CENNZnetNetwork === "rata") networkUrl = CENNZNET_RATA_API_URL;
		else if (CENNZnetNetwork === "local") networkUrl = CENNZNET_LOCAL_API_URL;
		const api = await Api.create({ provider: networkUrl });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);
		await endowedAccounts.init();
		for (const assetId in SUPPORTED_ASSETS) {
			await endowedAccounts.send(
				endowedAccounts.api.tx.genericAsset.transfer(
					assetId,
					address,
					TRANSFER_AMOUNT
				)
			);
		}
		if (CENNZnetNetwork !== "local") await claim(address, network, assetId);
		await api.disconnect();
		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
