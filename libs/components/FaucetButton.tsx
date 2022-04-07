import { useState, VFC } from "react";
import { css } from "@emotion/react";
import NewWindow from "react-new-window";
import { useSession } from "next-auth/react";
import { Theme } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { useMetaMaskWallet } from "@/libs/providers/MetaMaskWalletProvider";
import { METAMASK } from "@/assets/vectors";

const FaucetButton: VFC = () => {
	const { data: session } = useSession();
	const { address } = useFaucet();
	const { connectWallet, selectedAccount } = useMetaMaskWallet();
	const [popup, setPopup] = useState<boolean>(false);

	if (session?.validAccount) {
		if (selectedAccount || address) {
			return (
				<button css={styles.root(false)} type="submit">
					SEND TOKENS
				</button>
			);
		}

		return (
			<button
				onClick={async () => await connectWallet?.()}
				type="button"
				css={styles.root(true)}
			>
				<span>
					<img src={METAMASK} alt="MetaMask Logo" />
					<p>CONNECT METAMASK</p>
				</span>
			</button>
		);
	}

	return (
		<>
			{popup && !session && (
				<NewWindow
					url="/sign-in"
					onUnload={() => setPopup(false)}
					features={{ height: 600, width: 800 }}
				/>
			)}
			<button
				css={styles.root(false)}
				type="button"
				onClick={() => setPopup(true)}
			>
				SIGN IN WITH TWITTER
			</button>
		</>
	);
};

export default FaucetButton;

const styles = {
	root:
		(metaMask?: boolean) =>
		({ palette, transitions }: Theme) =>
			css`
				cursor: pointer;
				text-align: center;
				border-radius: 4px;
				background-color: white;
				color: ${metaMask ? "#e2761b" : palette.primary.main};
				font-weight: bold;
				border: 1px solid ${metaMask ? "#e2761b" : palette.primary.main};
				transition: background-color ${transitions.duration.short}ms;
				display: block;
				margin: 0 auto;
				padding: ${metaMask ? "0.5em 0.75em" : "1em 1.5em"};

				span {
					display: inline-flex;
				}

				img {
					height: 2em;
					margin: 0.65em 0.2em;
				}

				&:hover {
					background-color: ${metaMask ? "#e2761b" : palette.primary.main};
					color: white;
				}
			`,
};
