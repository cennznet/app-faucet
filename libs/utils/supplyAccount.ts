const supplyAccount = async (
	address: string,
	network: string,
	assetId: number
) =>
	await fetch(`/api/supplyAccount`, {
		method: "post",
		body: JSON.stringify({
			address,
			network: network.toLowerCase(),
			assetId,
		}),
	})
		.then((res) => res.json())
		.then((data) => data);

export default supplyAccount;
