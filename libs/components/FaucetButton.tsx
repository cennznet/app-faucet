import { useEffect, useState, VFC } from "react";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { Theme } from "@mui/material";

const FaucetButton: VFC = () => {
	const { data: session } = useSession();
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
			<button css={styles.root(false)} type="submit">
				SEND TOKENS
			</button>
		);
	}

	return (
		<button
			css={styles.root(false)}
			type="button"
			onClick={() => window.open("/sign-in")}
		>
			SIGN IN WITH TWITTER
		</button>
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
