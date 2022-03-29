import { useEffect, VFC } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { CENNZ } from "@/assets";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import AccountIdenticon from "@/libs/components/AccountIdenticon";
import useAddressValidation from "@/libs/hooks/useAddressValidation";
import { useFaucet } from "@/libs/providers/FaucetProvider";

const DestinationInput: VFC = () => {
	const { selectedAccount } = useMetaMaskWallet();
	const { address, setAddress, addressType, setAddressType } = useFaucet();
	const { inputRef } = useAddressValidation(
		address ?? selectedAccount?.address,
		addressType
	);

	useEffect(() => {
		if (!address) return setAddressType(null);

		if (address.slice(0, 2) === "0x") return setAddressType("Ethereum");
		setAddressType("CENNZnet");
	}, [address, setAddressType]);

	const displayJazzicon =
		(selectedAccount && addressType !== "CENNZnet") ||
		(address && addressType === "Ethereum");

	return (
		<div css={styles.addressInputContainer}>
			{displayJazzicon && (
				<Jazzicon
					diameter={28}
					seed={jsNumberForAddress(
						(selectedAccount?.address as string) ?? (address as string)
					)}
				/>
			)}
			{address && addressType === "CENNZnet" && (
				<AccountIdenticon theme="beachball" size={28} value={address} />
			)}
			{!selectedAccount && !address && (
				<Image src={CENNZ} width={28} height={28} alt="cennz-logo" />
			)}
			<input
				type="text"
				placeholder={"Connect MetaMask or enter CENNZnet/Ethereum address"}
				ref={inputRef}
				value={address ? address : selectedAccount?.address ?? ""}
				onChange={(event) => setAddress(event.target.value)}
			/>
		</div>
	);
};

export default DestinationInput;

export const styles = {
	addressInputContainer: css`
		background: #ffffff;
		border: 1px solid #979797;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 1em;
		height: 3.5em;
		width: 100%;
		border-radius: 4px;

		input {
			font-family: "Roboto Mono", monospace;
			margin-left: 0.7em;
			width: 100%;
			height: 100%;
			background: transparent;
			border: none;
			text-overflow: ellipsis;
			font-style: normal;
			font-size: 15px;
			line-height: 124%;

			&:focus-visible {
				outline: none;
			}
		}
	`,
};
