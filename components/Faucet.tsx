import { FC, useState } from "react";
import { css } from "@emotion/react";
import { CircularProgress, Divider } from "@mui/material";
import { NETWORKS } from "@/libs/constants";
import { supplyAccount } from "@/libs/utils";
import FaucetButton from "@/components/FaucetButton";
import FaucetAccountInput from "@/components/FaucetAccountInput";
import TokenPicker from "@/components/TokenPicker";
import { supportedTokens } from "@/libs/utils/supportedTokens";
import { CENNZnetToken } from "@/libs/types";

const Faucet: FC = () => {
	const [token, setToken] = useState<CENNZnetToken>(supportedTokens[0]);
	const [network, setNetwork] = useState<string>(NETWORKS[0]);
	const [address, setAddress] = useState<string>("");
	const [response, setResponse] = useState<string>();
	const [fetchingResponse, setFetchingResponse] = useState<boolean>(false);

	const fetchSupplyResponse = async () => {
		if (!address || !network) return;

		setFetchingResponse(true);
		const supplyResponse = await supplyAccount(address, network, token.assetId);

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
				<div css={styles.headingContainer}>
					<p css={styles.heading} style={{ fontWeight: "bold" }}>
						Request Tokens
					</p>
					<TokenPicker tokens={supportedTokens} setToken={setToken} />
				</div>
				<Divider />
				<p css={styles.subHeading}>Enter your CENNZnet Address</p>
				<FaucetAccountInput setAddress={setAddress} address={address} />
				<div css={styles.networkContainer}>
					<p css={styles.subHeading}>Select a Network</p>
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
					<p css={styles.subHeading}>Response: </p>
					{fetchingResponse ? (
						<div css={styles.circularProgress}>
							<CircularProgress size={25} color="primary" />
						</div>
					) : (
						<p css={styles.response}>{response}</p>
					)}
				</div>
				<FaucetButton
					address={address}
					network={network}
					supplyAccount={fetchSupplyResponse}
				/>
			</div>
		</div>
	);
};

export default Faucet;

export const styles = {
	faucetWrapper: css`
		background-color: white;
		box-shadow: 4px 8px 8px rgb(17 48 255 / 10%);
		border-radius: 5px;
		height: auto;
		width: 636px;
		padding: 15px 35px;
		@media (max-width: 500px) {
			width: 375px;
		}
	`,
	headingContainer: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 5px 0 22px;
		height: 60px;
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
		letter-spacing: 0.5px;
		font-weight: bold;
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
		align-content: center;
		margin: 20px auto 20px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`,
	select: css`
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 40px;
		font-size: 16px;
		margin-left: 10px;
		flex-grow: 1;
		border: 1px solid #979797;
		padding: 0 15px;
		background: url("/images/arrow_down.svg") 90% center no-repeat;
		max-width: 175px;
		font-weight: bold;
		&:focus-visible {
			outline: none;
		}
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
		width: 100%;
		align-content: center;
		margin: 20px auto 20px;
		height: 60px;
		display: flex;
	`,
	circularProgress: css`
		margin: 15px 0 0 15px;
	`,
	response: css`
		font-size: 15px;
		margin-left: 10px;
		padding-top: 1.5px;
	`,
};
