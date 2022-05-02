import { useCallback } from "react";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { Balance, cvmToCENNZAddress } from "@/libs/utils";
import { CENNZnetToken } from "@/libs/types";

export default function useBalance(): (
	asset: CENNZnetToken
) => Promise<string> {
	const { address, addressType } = useFaucet();

	return useCallback(
		async (asset) => {
			if (!address || !addressType) return;

			const balance = await fetch("https://nikau.centrality.me/public", {
				method: "POST",
				body: JSON.stringify({
					id: 1,
					jsonrpc: "2.0",
					method: "genericAsset_getBalance",
					params: [
						addressType === "CENNZnet" ? address : cvmToCENNZAddress(address),
						asset.assetId,
					],
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((response) =>
					Balance.fromApiBalance(response?.result.available, asset)
				)
				.catch((error) =>
					console.log("error fetching balance:", error.message)
				);

			return (balance as Balance).toPretty();
		},
		[address, addressType]
	);
}
