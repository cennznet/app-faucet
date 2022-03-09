import { FC, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import FaucetButton from "@/components/FaucetButton";
import { NETWORKS } from "@/libs/constants";
import { Divider } from "@mui/material";
import FaucetAccountInput from "@/components/FaucetAccountInput";
import TokenPicker from "@/components/TokenPicker";
import { supportedTokens } from "@/libs/utils/supportedTokens";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [network, setNetwork] = useState<string>(NETWORKS[0]);
	const [address, setAddress] = useState<string>("");

	return (
		<div css={styles.faucetWrapper}>
			<div css={styles.faucetContainer}>
				<div css={styles.headingContainer}>
					<p css={styles.heading} style={{ fontWeight: "bold" }}>
						Request Tokens
					</p>
					<TokenPicker tokens={supportedTokens} />
				</div>
				<Divider />
				<p css={styles.subHeading}>Enter your CENNZnet Address:</p>
				<FaucetAccountInput setAddress={setAddress} address={address} />
				<div css={styles.networkContainer}>
					<p css={styles.subHeading}>Select a network:</p>
					<select
						css={styles.select}
						onChange={(e) => setNetwork(e.target.value)}
					>
						{NETWORKS.map((network: string, i: number) => (
							<option key={i}>{network}</option>
						))}
					</select>
				</div>
				<FaucetButton session={session} address={address} network={network} />
			</div>
		</div>
	);
};

export default Faucet;

export const styles = {
	faucetWrapper: css`
		border: 1px solid dimgray;
		border-radius: 5px;
		height: auto;
		width: 617px;
		padding: 15px 35px;
		@media (max-width: 500px) {
			width: 375px;
		}
	`,
	headingContainer: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px;
	`,
	faucetContainer: css`
		width: 100%;
		margin: 0 auto;
	`,
	heading: css`
		font-size: 24px;
		margin-bottom: 10px;
		letter-spacing: 0.5px;
	`,
	subHeading: css`
		font-size: 16px;
		margin-bottom: 10px;
		letter-spacing: 0.5px;
	`,

	addressWrapper: css`
		display: inline-flex;
		width: 100%;
		align-content: center;
	`,
	accountIdenticon: css`
		align-self: center;
		margin-right: 5px;
	`,
	input: css`
		flex-grow: 1;
		height: 50px;
		font-size: 18px;
	`,
	networkContainer: css`
		width: 100%;
		display: inline-flex;
		align-content: center;
		margin: 20px auto 20px;
		height: 60px;
	`,
	select: css`
		height: 40px;
		font-size: 16px;
		margin-left: 10px;
		flex-grow: 1;
		margin-top: 15px;
	`,
	arrows: css`
		cursor: pointer;
		font-size: 30px;
		color: #1da1f2;
	`,
	networkText: css`
		font-size: 15px;
		align-self: center;
		margin-left: 15px;
	`,
};
