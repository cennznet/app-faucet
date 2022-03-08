import { FC, useState } from "react";
import { css } from "@emotion/react";
import AccountIdenticon from "@/components/AccountIdenticon";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useSession } from "next-auth/react";
import FaucetButton from "@/components/FaucetButton";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [localNetwork, setLocalNetwork] = useState<Boolean>(false);
	const [address, setAddress] = useState<string>("");

	return (
		<div css={styles.faucetWrapper}>
			<div css={styles.faucetContainer}>
				<p css={styles.heading}>
					Enter your CENNZnet Address to receive testnet tokens:
				</p>
				<div css={styles.addressWrapper}>
					<AccountIdenticon
						css={styles.accountIdenticon}
						theme="beachball"
						size={28}
						value={
							address
								? address
								: "5FbMzsoEpd2mt8eyKpKUxwJ5S9W7nJVJkCer2Jk7tvSpB1vF"
						}
					/>
					<input
						css={styles.input}
						type="text"
						placeholder="5FbMzsoEpd2mt8eyKpKUxwJ5S9W7nJVJkCer2Jk7tvSpB1vF"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						disabled={!!session?.validAccount}
					/>
				</div>
				<div css={styles.networks}>
					<CompareArrowsIcon
						css={styles.arrows}
						onClick={() => setLocalNetwork(!localNetwork)}
					/>
					<p css={styles.networkText}>
						{localNetwork
							? "Send tokens to local node"
							: "Send tokens to Nikau & Rata networks"}
					</p>
				</div>
				<FaucetButton session={session} address={address} />
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
		font-size: 20px;
		margin-bottom: 10px;
	`,
	addressWrapper: css`
		display: inline-flex;
		width: 90%;
		align-content: center;
	`,
	accountIdenticon: css`
		align-self: center;
		margin-right: 5px;
	`,
	input: css`
		width: 100%;
		height: 50px;
		font-size: 18px;
	`,
	networks: css`
		margin-top: 20px;
		display: inline-flex;
		height: 30px;
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
