import { useCallback } from "react";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { Balance, cvmToCENNZAddress, fetchBalance } from "@/libs/utils";
import { CENNZnetToken } from "@/libs/types";

export default function useBalance(): (
	asset: CENNZnetToken
) => Promise<string> {
	const { address, addressType, network } = useFaucet();

	return useCallback(
		async (asset) => {
			if (!address || !addressType || !network) return;

			const balanceRaw = await fetchBalance(
				addressType === "CENNZnet" ? address : cvmToCENNZAddress(address),
				asset.assetId,
				network
			);

			const balance = Balance.fromApiBalance(balanceRaw, asset);

			return balance.toPretty();
		},
		[address, addressType, network]
	);
}
