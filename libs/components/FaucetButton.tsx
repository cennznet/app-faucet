import { useEffect, useMemo, useState, VFC } from "react";
import { css } from "@emotion/react";
import NewWindow from "react-new-window";
import { useSession } from "next-auth/react";
import { Theme } from "@mui/material";
import { useFaucet } from "@/libs/providers/FaucetProvider";
import { isCorrectApiProvider } from "@/libs/utils";
import { useCENNZApi } from "@/libs/providers/CENNZApiProvider";

const FaucetButton: VFC = () => {
	const { api } = useCENNZApi();
	const { network } = useFaucet();
	const { data: session } = useSession();
	const [popup, setPopup] = useState<boolean>(false);
	const [warned, setWarned] = useState<boolean>(false);

	const disabled = useMemo(
		() => !isCorrectApiProvider(api, network),
		[api, network]
	);

	useEffect(() => {
		if (!session || warned) return;

		if (!session.validAccount) {
			alert(
				`Please ensure ${
					session.user.name ?? "your Twitter account"
				} has at least 1 tweet, 15 followers, and is older than 1 month.`
			);
			setWarned(true);
		}
	}, [session, warned]);

	if (session?.validAccount) {
		return (
			<button
				css={styles.root(disabled)}
				type="submit"
				disabled={disabled}
			>
				{disabled ? "NETWORK SWITCHING" : "SEND TOKENS"}
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
			<button css={styles.root} type="button" onClick={() => setPopup(true)}>
				SIGN IN WITH TWITTER
			</button>
		</>
	);
};

export default FaucetButton;

const styles = {
	root:
		(disabled?: boolean) =>
		({ palette, transitions }: Theme) =>
			css`
				cursor: ${disabled ? "not-allowed" : "pointer"};
				text-align: center;
				border-radius: 4px;
				background-color: white;
				color: ${disabled ? palette.text.disabled : palette.primary.main};
				font-weight: bold;
				border: 1px solid ${palette.primary.main};
				transition: background-color ${transitions.duration.short}ms;
				display: block;
				margin: 0 auto;
				padding: 1em 1.5em;

				span {
					display: inline-flex;
				}

				img {
					height: 2em;
					margin: 0.65em 0.2em;
				}

				&:hover {
					background-color: ${disabled ? "white" : palette.primary.main};
					color: ${disabled ? palette.text.disabled : "white"};
				}
			`,
};
