import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import { getSession } from "next-auth/react";
import {
	CENNZNET_NIKAU_API_URL,
	CENNZNET_RATA_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
	TRANSFER_AMOUNT,
} from "@/libs/constants";
import { cvmToCENNZAddress, EndowedAccounts } from "@/libs/utils";
import { fetchClaimStatus, setNewClaim } from "@/libs/utils/claimStatus";
import { CENNZnetNetwork } from "@/libs/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, addressType, network, assetId } = JSON.parse(req.body);
	const CENNZNetwork: CENNZnetNetwork = network;

	if (!assetId)
		return res
			.status(400)
			.json({ success: false, error: "assetId param not provided" });
	if (!address)
		return res
			.status(400)
			.json({ success: false, error: "address param not provided" });
	if (!addressType)
		return res
			.status(400)
			.json({ success: false, error: "addressType param not provided" });
	if (!network)
		return res
			.status(400)
			.json({ success: false, error: "network param not provided" });

	const session = await getSession({ req });
	if (!session?.validAccount)
		return res
			.status(401)
			.json({ success: false, error: "Invalid Twitter account" });

	const CENNZAddress =
		addressType === "CENNZnet" ? address : cvmToCENNZAddress(address);
	const claimed = await fetchClaimStatus(CENNZAddress, network, assetId);
	if (claimed)
		return res.status(400).send({ error: "Already claimed in 24h window" });

	try {
		let networkUrl: string;
		if (CENNZNetwork === "Nikau") networkUrl = CENNZNET_NIKAU_API_URL;
		else if (CENNZNetwork === "Rata") networkUrl = CENNZNET_RATA_API_URL;
		const api = await Api.create({ provider: networkUrl });
		const endowedAccounts = new EndowedAccounts(api, ENDOWED_ACCOUNT_SEEDS);

		await endowedAccounts.init();
		await endowedAccounts.send(
			endowedAccounts.api.tx.genericAsset.transfer(
				assetId,
				CENNZAddress,
				TRANSFER_AMOUNT
			)
		);

		await setNewClaim(CENNZAddress, network, assetId);
		await api.disconnect();

		return res.status(200).json({ success: true });
	} catch (e) {
		return res.status(400).json({ success: false, error: e.message });
	}
}
