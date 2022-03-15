import { FC } from "react";
import { css } from "@emotion/react";
import { Select, SelectChangeEvent, MenuItem, Theme } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { supportedTokens } from "@/libs/utils";

const NetworkSelect: FC<{
	selectedToken: string;
	onTokenChange: (event: SelectChangeEvent) => void;
}> = ({ selectedToken, onTokenChange }) => {
	return (
		<div css={styles.root}>
			<Select
				css={styles.select}
				value={selectedToken}
				onChange={onTokenChange}
				MenuProps={{ sx: styles.selectDropdown as any }}
				IconComponent={ExpandMore}
				autoWidth={false}
			>
				{supportedTokens.map((token, i) => (
					<MenuItem key={i} value={token.symbol} css={styles.selectItem}>
						<img src={`images/${token.logo}`} alt={token.symbol} />
						<span>{token.symbol}</span>
					</MenuItem>
				))}
			</Select>
		</div>
	);
};

export default NetworkSelect;

export const styles = {
	root: css`
		width: auto;
		border: 1px solid black;
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		align-items: center;
		transition: border-color 0.2s;
		margin-top: 10px;

		.MuiOutlinedInput-notchedOutline {
			border: none;
		}

		.MuiSelect-select {
			display: flex;
			align-items: center;
			padding-top: 0.75em;
			padding-bottom: 0.75em;
			> img {
				width: 2em;
				height: 2em;
				object-fit: contain;
				margin-right: 0.5em;
			}

			> span {
				font-size: 0.875em;
				font-weight: bold;
				flex: 1;
			}
		}
	`,
	select: ({ palette, transitions }: Theme) => css`
		border: none;
		min-width: 135px;

		&:hover,
		& .MuiSelect-select[aria-expanded="true"] {
			color: ${palette.text.highlight};

			.MuiSvgIcon-root {
				color: ${palette.text.highlight};
			}
		}

		.MuiList-root {
			padding: 0;
		}

		.MuiSvgIcon-root {
			transition: transform ${transitions.duration.shortest}ms
				${transitions.easing.easeInOut};
		}

		.MuiSelect-iconOpen {
			color: ${palette.primary.main};
		}
	`,
	selectDropdown: ({ palette, shadows }: Theme) => css`
		.MuiPaper-root {
			border-radius: 4px;
			overflow: hidden;
			transform: translate(-1px, 5px) !important;
			box-shadow: ${shadows[1]};
			border: 1px solid ${palette.secondary.main};
		}

		.MuiMenu-list {
			padding: 0;
		}
	`,
	selectItem: css`
		display: flex;
		padding-top: 0.75em;
		padding-bottom: 0.75em;

		> img {
			width: 2em;
			height: 2em;
			object-fit: contain;
			margin-right: 0.5em;
		}

		> span {
			font-size: 0.875em;
			font-weight: bold;
			flex: 1;
		}
	`,
};
