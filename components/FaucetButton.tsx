import { FC, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { Session } from "next-auth";

const FaucetButton: FC<{
	session: Session;
	address: string;
	supplyAccount: MouseEventHandler<HTMLDivElement>;
}> = ({ session, address, supplyAccount }) => {
	if (session?.validAccount) {
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
		<div css={styles.faucetButton} onClick={supplyAccount}>
			<p>PLEASE SIGN IN WITH A VALID TWITTER ACCOUNT</p>
		</div>
	);
};

export default FaucetButton;

export const styles = {
	faucetButton: css`
		cursor: pointer;
		width: 100%;
		height: 30px;
		margin: 0 auto;
		text-align: center;
		border-radius: 5px;
		background-color: #1da1f2;
		color: white;
		letter-spacing: 0.5px;

		p {
			font-size: 14px;
			padding-top: 5px;
		}
	`,
};
