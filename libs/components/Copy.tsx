import { FC } from "react";
import { css } from "@emotion/react";
import { CENNZ_LOGO } from "@/assets/vectors";
import { Theme, Tooltip } from "@mui/material";

const Copy: FC = ({ children }) => {
	return (
		<div css={styles.header}>
			<img src={CENNZ_LOGO} css={styles.logoImage} alt="CENNZnet Logo" />
			<div css={styles.description}>
				<p>
					Bootstrap your wallet with <strong>2000</strong> <em>CENNZ</em> and{" "}
					<em>CPAY</em> across our testnet networks.
				</p>
				<p>
					One claim per day per token is allowed. <br />
					<Tooltip
						disableFocusListener
						title={
							"Account must have at least 1 tweet, 15 followers, and be older than 1 month"
						}
						arrow
						placement="bottom"
					>
						<span css={styles.toolTipTrigger}>
							A legitimate Twitter account
						</span>
					</Tooltip>{" "}
					is required.
				</p>
				{children}
			</div>
		</div>
	);
};

export default Copy;

const styles = {
	header: css`
		display: flex;
		align-items: flex-start;
	`,

	logoImage: css`
		margin-top: 0.5em;
		width: 6em;
	`,

	description: ({ palette }: Theme) => css`
		font-size: 1.2em;
		margin: 0 0 0 2em;

		p {
			margin-top: 0;
			margin-bottom: 1em;

			&:last-child {
				margin-bottom: 0;
			}
		}

		em {
			font-family: monospace;
			display: inline-block;
			font-size: 0.75em;
			font-weight: bold;
			padding: 0.2em 0.35em;
			border: 1px solid ${palette.secondary.main};
			border-radius: 4px;
			margin: 0;
			color: ${palette.primary.main};
			font-style: normal;
		}
	`,

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
};
