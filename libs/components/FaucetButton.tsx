import { VFC, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { signIn, useSession } from "next-auth/react";
import { Theme } from "@mui/material";

const FaucetButton: VFC = () => {
	const { data: session } = useSession();
	const [warned, setWarned] = useState<boolean>(false);

	useEffect(() => {
		if (!session || warned) return;

		if (session.validAccount) {
			alert(
				`Please ensure ${
					session.user.name ?? "your Twitter account"
				} has at least 1 tweet, 15 followers, and is older than 1 month.`
			);
			setWarned(true);
		}
	}, [session, warned]);

	return (
		<>
			{session?.validAccount && (
				<button css={styles.root} type="submit">
					SEND TOKENS
				</button>
			)}

			{!session?.validAccount && (
				<button
					css={styles.root}
					type="button"
					onClick={() => signIn("twitter")}
				>
					SIGN IN WITH TWITTER
				</button>
			)}
		</>
	);
};

export default FaucetButton;

const styles = {
	root: ({ palette, transitions }: Theme) => css`
		cursor: pointer;
		text-align: center;
		border-radius: 4px;
		background-color: ${palette.primary.main};
		color: white;
		font-weight: bold;
		border: 1px solid ${palette.primary.main};
		transition: background-color ${transitions.duration.short}ms;
		margin: 0 auto;
		display: block;
		padding: 1em 1.5em;

		&:hover {
			background-color: white;
			color: ${palette.primary.main};
		}
	`,
};
