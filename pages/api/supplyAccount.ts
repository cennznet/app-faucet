import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	ENDOWED_ACCOUNT_SEEDS,
	TRANSFER_AMOUNT,
	CENNZNET_NIKAU_API_URL,
} from "@/libs/constants";
import { cvmToCENNZAddress, EndowedAccounts } from "@/libs/utils";
import { fetchClaimStatus, setNewClaim } from "@/libs/utils/claimStatus";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, assetId } = JSON.parse(req.body);

	if (!assetId)
		return res
			.status(400)
			.json({ success: false, error: "assetId param not provided" });
	if (!address)
		return res
			.status(400)
			.json({ success: false, error: "address param not provided" });

	const session = await getSession({ req });
	if (!session?.validAccount)
		return res
			.status(401)
			.json({ success: false, error: "Invalid Twitter account" });

	const claimed = await fetchClaimStatus(address, assetId);
	if (claimed)
		return res.status(400).send({ error: "Already claimed in 24h window" });

	try {
		const api = await Api.create({ provider: CENNZNET_NIKAU_API_URL });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);

		const CENNZAddress = cvmToCENNZAddress(address);

		await endowedAccounts.init();
		await endowedAccounts.send(
			endowedAccounts.api.tx.genericAsset.transfer(
				assetId,
				CENNZAddress,
				TRANSFER_AMOUNT
			)
		);

		await setNewClaim(address, assetId);
		await api.disconnect();

		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
