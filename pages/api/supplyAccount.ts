import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	CENNZNET_PUBLIC_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils/EndowedAccounts";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const session = await getSession({ req });
		if (!session.validAccount) {
			res
				.status(401)
				.json({ success: false, error: "Invalid Twitter Account" });
		}
		const body = req.body;
		if (!body.assetId) throw new Error("assetId Param not provided!");
		if (!body.address) throw new Error("address Param not provided!");
		const { assetId, address } = body;
		const transferAmount = 2000000; //200 cennz
		const api = await Api.create({ provider: CENNZNET_PUBLIC_API_URL });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);
		await endowedAccounts.init();
		const transfer = endowedAccounts.api.tx.genericAsset.transfer(
			assetId,
			address,
			transferAmount
		);
		await endowedAccounts.send(transfer);
		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ success: false, error: e.message });
	}
}
