const supplyAccount = async (address: string, assetId: number) =>
	await fetch(`/api/supplyAccount`, {
		method: "post",
		body: JSON.stringify({
			address,
			assetId,
		}),
	})
		.then((res) => res.json())
		.then((data) => data);

export default supplyAccount;
