import type { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@cennznet/api";
import {
	CENNZNET_PUBLIC_API_URL,
	ENDOWED_ACCOUNT_SEEDS,
} from "@/libs/constants";
import { EndowedAccounts } from "@/libs/utils/EndowedAccounts";

type Data = {
	success: boolean;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const api = await Api.create({ provider: CENNZNET_PUBLIC_API_URL });
	const seeds = ENDOWED_ACCOUNT_SEEDS;
	const keyType = "sr25519";
	const endowedAccounts = new EndowedAccounts(api, seeds, keyType);
	await endowedAccounts.init();
	console.log(
		`Available accounts number: ${endowedAccounts._availableAccounts.length}`
	);
	res.status(200).json({ success: true });
}
