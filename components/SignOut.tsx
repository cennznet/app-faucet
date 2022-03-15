import { FC } from "react";
import { css } from "@emotion/react";
import { signOut } from "next-auth/react";

const SignOut: FC<{ twitterHandle: string }> = ({ twitterHandle }) => {
	return (
		<div css={styles.root}>
			<span onClick={async () => await signOut({ redirect: false })}>
				Sign out @{twitterHandle}
			</span>
		</div>
	);
};

export default SignOut;

const styles = {
	root: css`
		margin: 10px auto;
		width: auto;
		font-size: 14px;
		text-align: center;

		span {
			cursor: pointer;
			font-style: italic;
			text-decoration: underline;
			opacity: 0.7;
		}
	`,
};