import { FC } from "react";
import { css } from "@emotion/react";
import { CENNZnetToken } from "@/libs/types";
import { Theme } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { useMetaMaskExtension } from "../providers/MetaMaskExtensionProvider";
import { MetaMaskPrompt } from "@/libs/components";

interface Props {
	balance: string;
	token: CENNZnetToken;
}

const SuccessResponse: FC<Props> = ({ balance, token }) => {
	const { addressType } = useFaucet();
	const { extension } = useMetaMaskExtension();

	return (
		<div css={styles.root}>
			<div css={styles.copy}>
				<span css={styles.tokenSymbol}>{token.symbol}</span> sent successfully!
			</div>
			{!!balance && (
				<>
					<div css={styles.copy}>
						Your new account balance is <strong>{balance}</strong>{" "}
						<span css={styles.tokenSymbol}>{token.symbol}</span>
					</div>
					{!!extension && addressType === "Ethereum" && (
						<div css={styles.copy}>
							Can&apos;t see it in your MetaMask wallet?
							<br />
							<MetaMaskPrompt isCENNZ={token.symbol === "CENNZ"} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SuccessResponse;

const styles = {
	root: css``,

	copy: css`
		&:first-child {
			margin-bottom: 2em;
		}

		&:last-child {
			margin-bottom: 2em;
		}

		margin-bottom: 1em;
	`,

	tokenSymbol: ({ palette }: Theme) => css`
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
};
