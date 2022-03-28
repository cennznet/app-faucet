import { CENNZNetNetwork } from "@/libs/types";

const supplyAccount = async (
	address: string,
	network: CENNZNetNetwork,
	assetId: number
) =>
	await fetch(`/api/supplyAccount`, {
		method: "post",
		body: JSON.stringify({
			address,
			network,
			assetId,
		}),
	})
		.then((res) => res.json())
		.then((data) => data);

export default supplyAccount;
