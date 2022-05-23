import { memo, ReactElement } from "react";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { useMetaMaskExtension } from "@/libs/providers/MetaMaskExtensionProvider";
import { addCENNZTokenToMetaMask, ensureEthereumChain } from "@/libs/utils";
import { Theme } from "@mui/material";
import { css } from "@emotion/react";

interface Props {
	isCENNZ: boolean;
}

function MetaMaskPrompt({ isCENNZ }: Props): ReactElement<Props> {
	const { network } = useFaucet();
	const { extension } = useMetaMaskExtension();

	if (isCENNZ)
		return (
			<>
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
				to add <span css={styles.tokenSymbol}>CENNZ</span> to your wallet.
			</>
		);

	return (
		<>
			Click{" "}
			<span
				css={styles.toolTipTrigger}
				onClick={() => ensureEthereumChain(extension, network)}
			>
				here
			</span>{" "}
			to switch to CENNZnet {network} in MetaMask.
		</>
	);
}

export default memo(MetaMaskPrompt);

const styles = {
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
