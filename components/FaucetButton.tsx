import { FC, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";

const FaucetButton: FC<{
	address: string;
	network: string;
	supplyAccount: MouseEventHandler<HTMLDivElement>;
}> = ({ address, network, supplyAccount }) => {
	const { data: session } = useSession();

	if (session?.validAccount || network === "Local Node") {
		if (address) {
			return (
				<div css={styles.faucetButton} onClick={supplyAccount}>
					<p>SEND TOKENS</p>
				</div>
			);
		}

		return (
			<div css={styles.faucetButton}>
				<p>PLEASE ENTER A CENNZnet ADDRESS</p>
			</div>
		);
	}

	return (
		<div css={styles.faucetButton}>
			<p>PLEASE SIGN IN WITH A VALID TWITTER ACCOUNT</p>
		</div>
	);
};

export default FaucetButton;

export const styles = {
	faucetButton: css`
		cursor: pointer;
		width: 100%;
		height: 40px;
		margin: 15px 0;
		text-align: center;
		border-radius: 5px;
		background-color: #1da1f2;
		color: white;
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
	`,
};
