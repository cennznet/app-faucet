import isCENNZAddress from "@/libs/utils/isCENNZAddress";
import isEthereumAddress from "@/libs/utils/isEthereumAddress";
import { MutableRefObject, useEffect, useRef } from "react";

interface AddressValidationHook {
	inputRef: MutableRefObject<HTMLInputElement>;
}

export default function useAddressValidation(
	address: string,
	addressType: string
): AddressValidationHook {
	const inputRef = useRef<HTMLInputElement>();

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;
		const isValid =
			addressType === "Ethereum"
				? isEthereumAddress(address)
				: isCENNZAddress(address);

		input.setCustomValidity(!isValid ? `Invalid ${addressType} address` : "");
	}, [addressType, address]);

	return { inputRef };
}
