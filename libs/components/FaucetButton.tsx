import { FC } from "react";
import { css } from "@emotion/react";
import { signIn, useSession } from "next-auth/react";
import { Theme } from "@mui/material";

const FaucetButton: FC = () => {
	const { data: session } = useSession();

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
