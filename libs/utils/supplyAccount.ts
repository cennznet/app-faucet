import { CENNZnetNetwork } from "@/libs/types";

const supplyAccount = async (
	address: string,
	addressType: string,
	network: CENNZnetNetwork,
	assetId: number
) =>
	await fetch(`/api/supplyAccount`, {
		method: "post",
		body: JSON.stringify({
			address,
			addressType,
			network,
			assetId,
		}),
	})
		.then((res) => res.json())
		.then((data) => data);

export default supplyAccount;
