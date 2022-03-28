import { useState, VFC } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { METAMASK } from "@/assets";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import AccountIdenticon from "@/libs/components/AccountIdenticon";

const MetaMaskAccount: VFC = () => {
	const { selectedAccount } = useMetaMaskWallet();
	const [CENNZAddress, setCENNZAddress] = useState<string>();

	return (
		<div css={styles.addressInputContainer}>
			{selectedAccount && !CENNZAddress && (
				<Jazzicon
					diameter={28}
					seed={jsNumberForAddress(selectedAccount.address as string)}
				/>
			)}
			{CENNZAddress && (
				<AccountIdenticon theme="beachball" size={28} value={CENNZAddress} />
			)}
			{!selectedAccount && (
				<Image src={METAMASK} width={28} height={28} alt="metamask-logo" />
			)}
			<input
				type="text"
				placeholder={"Connect Metamask"}
				value={selectedAccount?.address ?? CENNZAddress ?? ""}
				onChange={(event) => setCENNZAddress(event.target.value)}
			/>
		</div>
	);
};

export default MetaMaskAccount;

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
			font-size: 16px;
			line-height: 124%;
			&:focus-visible {
				outline: none;
			}
		}
	`,
};
