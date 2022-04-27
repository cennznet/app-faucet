import { useCallback } from "react";
import { useCENNZApi } from "@/libs/providers/CENNZApiProvider";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { Balance, cvmToCENNZAddress } from "@/libs/utils";
import { Codec } from "@cennznet/types";
import { CENNZnetToken } from "@/libs/types";

export default function useBalance(): (
	asset: CENNZnetToken
) => Promise<string> {
	const { api } = useCENNZApi();
	const { address, addressType } = useFaucet();

	return useCallback(
		async (asset) => {
			if (!api || !address || !addressType) return;

			let balanceRaw: Codec;
			if (addressType === "CENNZnet")
				balanceRaw = await api.query.genericAsset.freeBalance(
					asset.assetId,
					address
				);

			if (addressType === "Ethereum")
				balanceRaw = await api.query.genericAsset.freeBalance(
					asset.assetId,
					cvmToCENNZAddress(address)
				);

			const balance = new Balance(balanceRaw.toString(), asset);
			return balance.toPretty();
		},
		[api, address, addressType]
	);
}
