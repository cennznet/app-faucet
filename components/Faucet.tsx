import { FC, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import AccountIdenticon from "@/components/AccountIdenticon";
import FaucetButton from "@/components/FaucetButton";
import { NETWORKS, PLACEHOLDER_ADDRESS } from "@/libs/constants";
import { CircularProgress, Divider } from "@mui/material";
import supplyAccount from "@/libs/utils/supplyAccount";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [network, setNetwork] = useState<string>(NETWORKS[0]);
	const [address, setAddress] = useState<string>("");
	const [response, setResponse] = useState<string>();
	const [fetchingResponse, setFetchingResponse] = useState<boolean>(false);

	const fetchSupplyResponse = async () => {
		if (!address || !network) return;

		setFetchingResponse(true);
		const supplyResponse = await supplyAccount(address, network);

		if (supplyResponse.success) {
			setResponse("Tokens sent successfully!");
			setFetchingResponse(false);
			return;
		}

		setResponse(`Error: ${supplyResponse.error}`);
		setFetchingResponse(false);
	};

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
				<div css={styles.responseContainer}>
					<p css={styles.heading}>Response: </p>
					{fetchingResponse ? (
						<div css={styles.circularProgress}>
							<CircularProgress size={25} />
						</div>
					) : (
						<p css={styles.response}>{response}</p>
					)}
				</div>
				<FaucetButton
					session={session}
					address={address}
					local={network === "Local Node"}
					supplyAccount={fetchSupplyResponse}
				/>
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
		margin: 20px 0;
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
	responseContainer: css`
		display: inline-flex;
		height: 50px;
		margin-top: -20px;
	`,
	circularProgress: css`
		margin: 20px 0 0 15px;
	`,
	response: css`
		font-size: 15px;
		margin-left: 10px;
		margin-top: 22px;
	`,
};
