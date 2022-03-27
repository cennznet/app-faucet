import { FC, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { signIn, useSession } from "next-auth/react";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";
import { METAMASK } from "@/assets/vectors";

const FaucetButton: FC<{
	supplyAccount: MouseEventHandler<HTMLDivElement>;
}> = ({ supplyAccount }) => {
	const { data: session } = useSession();
	const { connectWallet, selectedAccount } = useMetaMaskWallet();

	if (selectedAccount) {
		if (session?.validAccount) {
			return (
				<div css={styles.faucetButton} onClick={supplyAccount}>
					<p>SEND TOKENS</p>
				</div>
			);
		}

		return (
			<div
				css={styles.faucetButton}
				onClick={async () => await signIn("twitter")}
			>
				<p>PLEASE SIGN IN WITH A VALID TWITTER ACCOUNT</p>
			</div>
		);
	}

	return (
		<div
			css={styles.metamaskButton}
			onClick={async () => await connectWallet?.()}
		>
			<img src={METAMASK} alt="MetaMask Logo" css={styles.brandLogo} />
			<p>CONNECT METAMASK</p>
		</div>
	);
};

export default FaucetButton;

export const styles = {
	faucetButton: ({ palette }) => css`
		cursor: pointer;
		width: 100%;
		height: 40px;
		margin: 15px 0;
		text-align: center;
		border-radius: 4px;
		background-color: white;
		color: ${palette.primary.main};
		border: 1px solid ${palette.primary.main};
		letter-spacing: 0.5px;
		justify-content: center;
		align-items: center;
		display: flex;
		font-weight: bold;

		p {
			font-size: 14px;
			@media (max-width: 500px) {
				font-size: 10px;
			}
		}

		&:hover {
			background-color: ${palette.primary.main};
			color: white;
			transition-duration: 0.3s;
		}
	`,

	metamaskButton: css`
		cursor: pointer;
		width: 100%;
		height: 40px;
		margin: 15px 0;
		text-align: center;
		border-radius: 4px;
		border: 1px solid #e2761b;
		color: #e2761b;
		letter-spacing: 0.5px;
		justify-content: center;
		align-items: center;
		display: flex;
		font-weight: bold;

		p {
			font-size: 14px;
			@media (max-width: 500px) {
				font-size: 10px;
			}
		}

		&:hover {
			background-color: #e2761b;
			color: white;
			transition-duration: 0.3s;
		}
	`,

	brandLogo: css`
		width: 28px;
		margin-right: 0.5em;
	`,
};
