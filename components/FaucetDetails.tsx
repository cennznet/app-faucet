import { FC } from "react";
import { css } from "@emotion/react";
import { Divider } from "@mui/material";

const FaucetDetails: FC = () => {
	return (
		<div css={styles.wrapper}>
			<div css={styles.container}>
				<p css={styles.heading}>Faucet Details </p>
				<Divider />
				<div css={styles.details}>
					<p css={styles.detailsHeading}>Tokens</p>
					<p>Faucet will send 2000 CENNZ & CPAY tokens.</p>
				</div>
				<div css={styles.details}>
					<p css={styles.detailsHeading}>Validation</p>
					<p>
						In order to prevent faucet botting on Nikau & Rata networks, you
						must sign in via Twitter.
					</p>
					<p>
						Your Twitter account must have at least 1 Tweet, 15 followers, and
						be older than 1 month.
					</p>
				</div>
			</div>
		</div>
	);
};

export default FaucetDetails;

export const styles = {
	wrapper: css`
		border: 1px solid dimgray;
		border-radius: 5px;
		padding-bottom: 20px;
	`,
	container: css`
		width: 90%;
		margin: 0 auto;
	`,
	heading: css`
		font-size: 19px;
		margin-bottom: 10px;
		letter-spacing: 0.5px;
		font-weight: bold;
	`,
	details: css`
		margin-bottom: 30px;

		p {
			font-size: 16px;
			margin-bottom: -5px;
		}
	`,
	detailsHeading: css`
		font-weight: bold;
		letter-spacing: 0.5px;
		margin-bottom: -10px;
	`,
};
