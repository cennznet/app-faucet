import { useEffect, VFC } from "react";
import { css } from "@emotion/react";
import { signIn, useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

const SignInPage: VFC = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status !== "loading" && !session) void signIn("twitter");
		if (status === "authenticated" && session) window.close();
	}, [session, status]);

	return (
		<div css={styles.root}>
			<div css={styles.container}>
				<p>Connecting to twitter...</p>
				<CircularProgress size="3.5em" color="inherit" />
			</div>
		</div>
	);
};

export default SignInPage;

const styles = {
	root: css`
		margin-top: 200px;
		text-align: center;
		width: 800px;
	`,

	container: css`
		color: #1da1f2;

		p {
			margin-bottom: 2em;
			font-size: 20px;
			text-transform: uppercase;
			font-weight: bold;
			text-shadow: 1px 1px rgba(0, 0, 0, 0.15);
		}
	`,
};
