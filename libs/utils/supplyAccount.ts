const supplyAccount = async (address: string, network: string) =>
	await fetch(`/api/supplyAccount`, {
		method: "post",
		body: JSON.stringify({
			assetId: 16000,
			address,
			network: network === "Local Node" ? "local" : network.toLowerCase(),
		}),
	})
		.then((res) => res.json())
		.then((data) => data);

export default supplyAccount;
