import { FC } from "react";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";

const TokenPicker: FC<{}> = ({}) => {
	const [chainDropDownActive, setChainDropDownActive] =
		useState<boolean>(false);

	return (
		<div css={styles.chainPickerBox}>
			<div css={styles.chainSelector}>
				<>
					<button
						type="button"
						css={styles.chainButton}
						onClick={() => setChainDropDownActive(!chainDropDownActive)}
					>
						Token
					</button>
				</>
				{chainDropDownActive && (
					<ClickAwayListener onClickAway={() => setChainDropDownActive(false)}>
						<div css={styles.chainDropdownContainer}></div>
					</ClickAwayListener>
				)}
			</div>
		</div>
	);
};

export default TokenPicker;

export const styles = {
	chainPickerContainer: css`
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		margin-bottom: 17px;
		height: 94px;
	`,
	chainPickerBox: css`
		display: flex;
		flex-direction: row;
		border: 1px solid #979797;
		width: 197px;
		height: 60px;
		justify-content: space-between;
		align-items: center;
	`,
	chainSelector: css`
		height: 60px;
		border: 1px solid #979797;
		border-left: none;
		border-right: none;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		&:focus-visible {
			outline: none;
		}
	`,
	chainSelectedImg: css`
		margin-left: 13px;
	`,
	chainSelectedArrow: css`
		margin-left: 27px;
	`,
	chainSelectedArrowDown: css`
		margin-left: 27px;
		transform: rotate(-180deg);
	`,
	chainButton: css`
		cursor: pointer;
		height: 60px;
		width: 100px;
		border: 1px solid #979797;
		border-left: none;
		border-right: none;
		position: relative;
		background-color: transparent;
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 125%;
		letter-spacing: 1.12428px;
		text-transform: uppercase;
		color: #020202;
		margin-left: 6px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	chainDropdownContainer: css`
		position: absolute;
		top: 60px;
		right: -44px;
		background: #ffffff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		z-index: 5;
		width: 197px;
		min-height: 47px;
		max-height: 47px;
		height: 100%;
		overflow: auto;

		span {
			padding: 12px 8px;
			margin-top: 5px;
			text-decoration: none;
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			line-height: 125%;
			display: flex;
			align-items: center;
			letter-spacing: 1.12428px;
			text-transform: uppercase;
			color: #020202;
			justify-content: center;
			align-items: center;
		}
	`,
	chainChoiceContainer: css`
		cursor: pointer;
		display: flex;
		flex-direction: row;

		img {
			margin-left: 11px;
			margin-top: 7px;
			margin-bottom: 7px;
		}

		&:hover {
			background: #e5e8ff;
		}
	`,
	bottomText: css`
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 125%;
		letter-spacing: 1.12428px;
		text-transform: uppercase;
		margin-top: 8px;
		color: #020202;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	`,
	upperText: css`
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 125%;
		letter-spacing: 1.12428px;
		text-transform: uppercase;
		color: #020202;
		margin-bottom: 6px;
		margin-top: 0px;
	`,
};
