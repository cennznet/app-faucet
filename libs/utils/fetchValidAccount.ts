const fetchValidAccount = async (twitterId: string) =>
	await fetch(`/api/claim/validAccount`, {
		method: "post",
		body: JSON.stringify({ twitterId }),
	})
		.then((res) => res.json())
		.then((data) => data);

export default fetchValidAccount;
