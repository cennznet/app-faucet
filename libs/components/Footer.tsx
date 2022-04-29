import { VFC } from "react";
import { version } from "@/package.json";
import { COMMIT_SHA } from "@/libs/constants";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";

console.log("Footer", process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA);

const Footer: VFC<{}> = () => {
	const shortenCommitSha = COMMIT_SHA ? COMMIT_SHA.substring(0, 10) : "";

	return (
		<div css={styles.root}>
			<pre>
				v{version}
				{shortenCommitSha ? ` @ ${shortenCommitSha}` : ""}
			</pre>
		</div>
	);
};

export default Footer;

const styles = {
	root: ({ palette }: Theme) => css`
		position: fixed;
		left: 1em;
		bottom: 1em;
		z-index: 10;
		font-size: 0.75em;
		color: ${palette.grey["800"]};
	`,
};