import { useEffect, useState, VFC } from "react";
import { css } from "@emotion/react";
import NewWindow from "react-new-window";
import { useSession } from "next-auth/react";
import { Theme } from "@mui/material";

const FaucetButton: VFC = () => {
	const { data: session } = useSession();
	const [popup, setPopup] = useState<boolean>(false);
	const [warned, setWarned] = useState<boolean>(false);

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
			<button css={styles.root} type="submit">
				SEND TOKENS
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
	root: ({ palette, transitions }: Theme) =>
		css`
			cursor: pointer;
			text-align: center;
			border-radius: 4px;
			background-color: white;
			color: ${palette.primary.main};
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
				background-color: ${palette.primary.main};
				color: white;
			}
		`,
};
