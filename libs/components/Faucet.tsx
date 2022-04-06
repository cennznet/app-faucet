import { FC, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { SelectChangeEvent, Theme, Tooltip } from "@mui/material";
import { CENNZnetNetwork, CENNZnetToken, TxStatus } from "@/libs/types";
import { SUPPORTED_TOKENS, TRANSFER_AMOUNT } from "@/libs/constants";
import { supplyAccount } from "@/libs/utils";
import {
	FaucetAccountInput,
	FaucetButton,
	FaucetProgress,
	NetworkSelect,
	TokenSelect,
	SignOut,
} from "@/libs/components";
import { CENNZ_LOGO } from "@/assets/vectors";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const [token, setToken] = useState<CENNZnetToken>(SUPPORTED_TOKENS[0]);
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
		setToken(SUPPORTED_TOKENS.find((token) => token.symbol === value));
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
			<div css={styles.headingContainer}>
				<img src={CENNZ_LOGO} css={styles.logoImage} alt="CENNZnet Logo" />

				<p css={styles.description}>
					Bootstrap your wallet with <em>2000</em> of <em>CENNZ</em> and{" "}
					<em>CPAY</em> across all of our testnet networks. One claim per day
					per token,{" "}
					<Tooltip
						disableFocusListener
						PopperProps={
							{
								sx: styles.toolTip,
							} as any
						}
						title={
							"Account must have at least 1 tweet, 15 followers, and older than 1 month"
						}
						arrow
						placement="bottom"
					>
						<span css={styles.toolTipTrigger}>
							a legitimate Twitter account
						</span>
					</Tooltip>{" "}
					is required.
				</p>
			</div>

			<div css={styles.selects}>
				<TokenSelect
					selectedToken={token.symbol}
					onTokenChange={onTokenChange}
				/>
				<NetworkSelect
					selectedNetwork={network}
					onNetworkChange={onNetworkChange}
				/>
			</div>

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
	);
};

export default Faucet;

const styles = {
	faucetWrapper: css`
		background-color: white;
		box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		width: 40em;
		padding: 2em;
	`,

	headingContainer: ({ palette }: Theme) => css`
		border-bottom: 1px solid ${palette.divider};
		margin: 0 -2em;
		padding: 0 2em 1.5em;
		margin-bottom: 1.5em;
		display: flex;
		align-items: flex-start;
	`,

	logoImage: css`
		margin-top: 0.5em;
		width: 6em;
	`,

	description: ({ palette }: Theme) => css`
		font-size: 1.2em;
		margin: 0 0 0 2em;

		em {
			font-family: monospace;
			display: inline-block;
			font-size: 0.75em;
			font-weight: bold;
			padding: 0.2em 0.35em;
			border: 1px solid ${palette.secondary.main};
			border-radius: 4px;
			margin: 0;
			color: ${palette.primary.main};
			font-style: normal;
		}
	`,

	heading: css`
		font-size: 24px;
		margin-bottom: 0.5em;
		letter-spacing: 0.5px;
	`,

	selects: css`
		display: flex;
		margin: 1em 0 1em;

		> div {
			flex: 1;
		}

		> div:first-child {
			margin-right: 1em;
		}

		/* @media (max-width: 500px) {
			display: block;
		} */
	`,
	divider: css`
		width: 100%;
		display: block;
		margin: 2em -2em;

		/* @media (max-width: 500px) {
			width: 23em;
		} */
	`,

	toolTipTrigger: ({ palette, transitions }: Theme) => css`
		color: ${palette.primary.main};
		cursor: pointer;
		display: inline-block;
		border-bottom: 2px solid transparent;
		transition: border-bottom-color ${transitions.duration.short}ms;

		&:hover {
			border-bottom-color: ${palette.primary.main};
		}
	`,

	toolTip: css`
		/* max-width: 200px; */
	`,
};
