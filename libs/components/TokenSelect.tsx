import { FC } from "react";
import { css } from "@emotion/react";
import { Select, SelectChangeEvent, MenuItem, Theme } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SUPPORTED_TOKENS } from "@/libs/constants";
import { CENNZ, CPAY } from "@/assets/vectors";

const logos = { CENNZ, CPAY };

const NetworkSelect: FC<{
	selectedToken: string;
	onTokenChange: (event: SelectChangeEvent) => void;
}> = ({ selectedToken, onTokenChange }) => {
	return (
		<Select
			css={styles.root}
			value={selectedToken}
			onChange={onTokenChange}
			MenuProps={{ sx: styles.selectDropdown as any }}
			IconComponent={ExpandMore}
		>
			{SUPPORTED_TOKENS.map((token, i) => (
				<MenuItem key={i} value={token.symbol} css={styles.selectItem}>
					<img src={logos[token.symbol]} alt={token.symbol} />
					<span>{token.symbol}</span>
				</MenuItem>
			))}
		</Select>
	);
};

export default NetworkSelect;

const styles = {
	root: css`
		height: 48px;

		.MuiSelect-select {
			display: flex;
			align-items: center;
			padding-right: 2em !important;

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
	selectDropdown: ({ palette, shadows }: Theme) => css`
		.MuiPaper-root {
			border-radius: 4px;
			overflow: hidden;
			transform: translate(-1px, 13px) !important;
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
