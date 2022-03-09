import { FC, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import AccountIdenticon from "@/components/AccountIdenticon";
import FaucetButton from "@/components/FaucetButton";
import { PLACEHOLDER_ADDRESS, NETWORKS } from "@/libs/constants";
import { Divider } from "@mui/material";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [network, setNetwork] = useState<string>(NETWORKS[0]);
	const [address, setAddress] = useState<string>("");

	return (
		<div css={styles.faucetWrapper}>
			<div css={styles.faucetContainer}>
				<p css={styles.heading} style={{ fontWeight: "bold" }}>
					Request Tokens
				</p>
				<Divider />
				<p css={styles.heading}>Enter your CENNZnet Address:</p>
				<div css={styles.addressWrapper}>
					<AccountIdenticon
						css={styles.accountIdenticon}
						theme="beachball"
						size={28}
						value={address ? address : PLACEHOLDER_ADDRESS}
					/>
					<input
						css={styles.input}
						type="text"
						placeholder={PLACEHOLDER_ADDRESS}
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={!!session?.validAccount}
					/>
				</div>
				<div css={styles.networkContainer}>
					<p css={styles.heading}>Select a network:</p>
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
		padding-bottom: 20px;
	`,
	faucetContainer: css`
		width: 90%;
		margin: 0 auto;
	`,
	heading: css`
		font-size: 19px;
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
