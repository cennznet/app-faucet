import { FC, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { SelectChangeEvent, Theme, Tooltip } from "@mui/material";
import { CENNZnetNetwork, CENNZnetToken, TxStatus } from "@/libs/types";
import { SUPPORTED_TOKENS } from "@/libs/constants";
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

	const onFormSubmit = useCallback(
		async (event) => {
			if (!address || !network) return;
			event.preventDefault();

			setResponse({
				message: `Retrieving ${token.symbol} from the Faucet`,
				status: "in-progress",
			});
			setIsOpen(true);
			const supplyResponse = await supplyAccount(
				address,
				network,
				token.assetId
			);

			if (supplyResponse.success) {
				setResponse({
					message: `${token.symbol} sent successfully!`,
					status: "success",
				});
				return;
			}
			setResponse({
				message: `Error: ${supplyResponse.error}`,
				status: "fail",
			});
		},
		[address, network, token.assetId, token.symbol]
	);

	return (
		<form css={styles.root} onSubmit={onFormSubmit}>
			<div css={styles.header}>
				<img src={CENNZ_LOGO} css={styles.logoImage} alt="CENNZnet Logo" />

				<div css={styles.description}>
					<p>
						Bootstrap your wallet with <strong>2000</strong> <em>CENNZ</em> and{" "}
						<em>CPAY</em> across our testnet networks.
					</p>
					<p>
						One claim per day per token is allowed. <br />
						<Tooltip
							disableFocusListener
							title={
								"Account must have at least 1 tweet, 15 followers, and be older than 1 month"
							}
							arrow
							placement="bottom"
						>
							<span css={styles.toolTipTrigger}>
								A legitimate Twitter account
							</span>
						</Tooltip>{" "}
						is required.
					</p>
				</div>
			</div>

			<div css={styles.body}>
				<div css={styles.formRow}>
					<div css={styles.formField}>
						<label>Token</label>
						<TokenSelect
							selectedToken={token.symbol}
							onTokenChange={onTokenChange}
						/>
					</div>

					<div css={styles.formField}>
						<label>Network</label>
						<NetworkSelect
							selectedNetwork={network}
							onNetworkChange={onNetworkChange}
						/>
					</div>
				</div>

				<div css={styles.formRow}>
					<div css={styles.formField}>
						<label>Address</label>
						<FaucetAccountInput setAddress={setAddress} address={address} />
					</div>
				</div>
			</div>

			<div css={styles.footer}>
				<FaucetButton />
			</div>

			{session?.validAccount && <SignOut twitterHandle={session.user.name} />}

			<FaucetProgress
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				txStatus={{ status: response?.status, message: response?.message }}
			/>
		</form>
	);
};

export default Faucet;

const styles = {
	root: css`
		background-color: white;
		box-shadow: 4px 8px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		width: 40em;
		padding: 2em;
		position: relative;
		overflow: hidden;
	`,

	header: css`
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

		p {
			margin-top: 0;
			margin-bottom: 1em;

			&:last-child {
				margin-bottom: 0;
			}
		}

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

	body: ({ palette }: Theme) => css`
		border-bottom: 1px solid ${palette.divider};
		margin: 2em -2em;
		padding: 0 2em 2em;
	`,

	formRow: css`
		display: flex;

		> div:first-child:not(:last-child) {
			margin-right: 1em;
		}
	`,

	formField: ({ palette }: Theme) => css`
		flex: 1;
		margin-bottom: 1.5em;

		&:last-child {
			margin-bottom: 0;
		}

		label {
			display: block;
			text-transform: uppercase;
			color: ${palette.primary.main};
			font-weight: bold;
			margin-bottom: 0.5em;
		}
	`,

	footer: css``,

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
};
