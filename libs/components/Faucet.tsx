import { FC, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { Divider, SelectChangeEvent } from "@mui/material";
import { CENNZnetNetwork, CENNZnetToken, TxStatus } from "@/types";
import { supplyAccount, supportedTokens } from "@/libs/utils";
import {
	FaucetAccountInput,
	FaucetButton,
	FaucetProgress,
	NetworkSelect,
	TokenSelect,
	SignOut,
} from "@/libs/components";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [token, setToken] = useState<CENNZnetToken>(supportedTokens[0]);
	const [network, setNetwork] = useState<CENNZnetNetwork>("Nikau");
	const [address, setAddress] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [response, setResponse] = useState<TxStatus>();

	const onNetworkChange = (event: SelectChangeEvent) => {
		const value = event.target.value as CENNZnetNetwork;
		setNetwork(value);
	};

	const onTokenChange = (event: SelectChangeEvent) => {
		const value = event.target.value;
		setToken(supportedTokens.find((token) => token.symbol === value));
	};

	const fetchSupplyResponse = async () => {
		if (!address || !network) return;
		setResponse({
			message: `Retrieving ${token.symbol} from the Faucet`,
			status: "in-progress",
		});
		setIsOpen(true);
		const supplyResponse = await supplyAccount(address, network, token.assetId);

		if (supplyResponse.success) {
			setResponse({
				message: `${token.symbol} sent successfully!`,
				status: "success",
			});
			return;
		}
		setResponse({ message: `Error: ${supplyResponse.error}`, status: "fail" });
	};

	return (
		<div css={styles.faucetWrapper}>
			<div css={styles.faucetContainer}>
				<div css={styles.headingContainer}>
					<p css={styles.heading} style={{ fontWeight: "bold" }}>
						Request Tokens
					</p>
					<TokenSelect
						selectedToken={token.symbol}
						onTokenChange={onTokenChange}
					/>
					<NetworkSelect
						selectedNetwork={network}
						onNetworkChange={onNetworkChange}
					/>
				</div>
				<Divider />
				<br />
				<FaucetAccountInput setAddress={setAddress} address={address} />
				<FaucetButton
					address={address}
					network={network}
					supplyAccount={fetchSupplyResponse}
				/>
				{!!session && <SignOut twitterHandle={session.user.name} />}
				<FaucetProgress
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					txStatus={{ status: response?.status, message: response?.message }}
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
		position: relative;
	`,
	heading: css`
		font-size: 24px;
		margin-bottom: 10px;
		letter-spacing: 0.5px;
	`,
};
