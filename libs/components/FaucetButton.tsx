import { FC, MouseEventHandler } from "react";
import { css } from "@emotion/react";
import { signIn, useSession } from "next-auth/react";

const FaucetButton: FC<{
	address: string;
	network: string;
	supplyAccount: MouseEventHandler<HTMLDivElement>;
}> = ({ address, supplyAccount }) => {
	const { data: session } = useSession();

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
		<div
			css={styles.faucetButton}
			onClick={async () => await signIn("twitter")}
		>
			<p>PLEASE SIGN IN WITH A VALID TWITTER ACCOUNT</p>
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
		background-color: ${palette.primary.main};
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

		&:hover {
			background-color: white;
			color: ${palette.primary.main};
			border: 1px solid ${palette.primary.main};
			transition-duration: 0.3s;
		}
	`,
};
