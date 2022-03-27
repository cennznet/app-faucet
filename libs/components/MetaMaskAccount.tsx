import { VFC } from "react";
import Image from "next/image";
import { css } from "@emotion/react";
import { AccountIdenticon } from "@/libs/components";
import { METAMASK } from "@/assets/vectors";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";

const MetaMaskAccount: VFC = () => {
	const { selectedAccount } = useMetaMaskWallet();

	return (
		<div css={styles.addressInputContainer}>
			{selectedAccount && (
				<AccountIdenticon
					theme="beachball"
					size={28}
					value={selectedAccount.address}
				/>
			)}
			{!selectedAccount && (
				<Image src={METAMASK} width={28} height={28} alt="metamask-logo" />
			)}
			<input
				type="text"
				disabled
				placeholder={"Connect Metamask"}
				value={selectedAccount?.address ?? ""}
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
			margin-left: 0.7em;
			width: 100%;
			height: 100%;
			background: transparent;
			border: none;
			text-overflow: ellipsis;
			font-style: normal;
			font-weight: bold;
			font-size: 16px;
			line-height: 124%;
			&:focus-visible {
				outline: none;
			}
		}
	`,
};
