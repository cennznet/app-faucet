import { FC } from "react";
import { css } from "@emotion/react";
import { Session } from "next-auth";
import { NETWORKS } from "@/libs/constants";

const FaucetButton: FC<{
	session: Session;
	address: string;
	network: string;
}> = ({ session, address, network }) => {
	const faucet = async () => {
		//TODO: send address to faucet api
		switch (network) {
			default:
			case NETWORKS[0]:
				console.log("send tokens to nikau");
				break;
			case NETWORKS[1]:
				console.log("send tokens to rata");
				break;
			case NETWORKS[2]:
				console.log("send tokens to local node");
				break;
		}
	};

	if (session?.validAccount) {
		if (address) {
			return (
				<div css={styles.faucetButton} onClick={faucet}>
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
