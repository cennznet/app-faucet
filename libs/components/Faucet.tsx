import { FC, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { SelectChangeEvent, Theme } from "@mui/material";
import { CENNZnetNetwork, CENNZnetToken, TxStatus } from "@/libs/types";
import { SUPPORTED_TOKENS } from "@/libs/constants";
import {
	addCENNZTokenToMetaMask,
	ensureEthereumChain,
	supplyAccount,
} from "@/libs/utils";
import {
	FaucetAccountInput,
	FaucetButton,
	FaucetProgress,
	NetworkSelect,
	SignOut,
	TokenSelect,
} from "@/libs/components";
import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import useBalance from "@/libs/hooks/useBalance";
import { useCENNZApi } from "@/libs/providers/CENNZApiProvider";
import Copy from "@/libs/components/Copy";

const Faucet: FC = () => {
	const { data: session } = useSession();
	const { address, addressType, network, setNetwork } = useFaucet();
	const { api } = useCENNZApi();
	const { extension } = useMetaMaskExtension();
	const [token, setToken] = useState<CENNZnetToken>(SUPPORTED_TOKENS[0]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [response, setResponse] = useState<TxStatus>();

	const fetchBalance = useBalance();

	const onNetworkChange = useCallback(
		async (event: SelectChangeEvent) => {
			const selectedNetwork = event.target.value as CENNZnetNetwork;
			setNetwork(selectedNetwork);
		},
		[setNetwork]
	);

	const onTokenChange = (event: SelectChangeEvent) => {
		const value = event.target.value;
		setToken(SUPPORTED_TOKENS.find((token) => token.symbol === value));
	};

	const onFormSubmit = useCallback(
		async (event) => {
			if (!token || !address || !network || !api) return;
			event.preventDefault();

			if (extension && addressType === "Ethereum") {
				await ensureEthereumChain(extension, network);
			}

			setResponse({
				message: (
					<div>
						Retrieving <span css={styles.token}>{token.symbol}</span> from the
						Faucet
					</div>
				),
				status: "in-progress",
			});
			setIsOpen(true);

			const supplyResponse = await supplyAccount(
				address,
				addressType,
				network,
				token.assetId
			);

			if (supplyResponse.success) {
				const balance = await fetchBalance(token);

				return setResponse({
					message: (
						<>
							<div>
								<span css={styles.token}>{token.symbol}</span> sent
								successfully!
							</div>
							<div>
								New balance: <strong>{balance}</strong>{" "}
								<span css={styles.token}>{token.symbol}</span>
							</div>
						</>
					),
					status: "success",
				});
			}

			setResponse({
				message: `Error: ${supplyResponse.error}`,
				status: "fail",
			});
		},
		[address, addressType, extension, network, token, fetchBalance, api]
	);

	return (
		<form css={styles.root} onSubmit={onFormSubmit}>
			<Copy>
				{!!extension && (
					<p>
						Click{" "}
						<span
							css={styles.toolTipTrigger}
							onClick={() =>
								ensureEthereumChain(extension, network).then(
									addCENNZTokenToMetaMask
								)
							}
						>
							here
						</span>{" "}
						to add <em>CENNZ</em> token to MetaMask before using the faucet with
						an Ethereum address.
					</p>
				)}
			</Copy>

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
						<FaucetAccountInput />
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

	token: ({ palette }: Theme) => css`
		font-family: monospace;
		display: inline-block;
		font-weight: bold;
		padding: 0.2em 0.35em;
		border: 1px solid ${palette.secondary.main};
		border-radius: 4px;
		margin: 0;
		color: ${palette.primary.main};
		font-style: normal;
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
