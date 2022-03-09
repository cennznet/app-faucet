import { FC, useEffect } from "react";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { CENNZnetToken } from "@/libs/types";

interface TokenPickerProps {
	tokens: CENNZnetToken[];
	setToken?: Function;
}

const TokenPicker: FC<TokenPickerProps> = ({ tokens, setToken }) => {
	const [tokenDropDownActive, setTokenDropDownActive] =
		useState<boolean>(false);
	const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(0);

	useEffect(() => {
		if (setToken) setToken(tokens[selectedTokenIdx]);
	}, [selectedTokenIdx]);

	return (
		<div css={styles.tokenPickerContainer}>
			<div css={styles.tokenPickerBox}>
				<div css={styles.tokenSelector}>
					<>
						<img
							css={styles.tokenSelectedImg}
							alt=""
							src={`/images/${tokens[selectedTokenIdx]?.logo}`}
							width={33}
							height={33}
						/>
						<button
							type="button"
							css={styles.tokenButton}
							onClick={() => setTokenDropDownActive(!tokenDropDownActive)}
						>
							{tokens[selectedTokenIdx]?.symbol}
							<img
								css={
									tokenDropDownActive
										? styles.tokenSelectedArrow
										: styles.tokenSelectedArrowDown
								}
								alt="arrow"
								src={"/images/arrow_up.svg"}
							/>
						</button>
					</>
					{tokenDropDownActive && (
						<ClickAwayListener
							onClickAway={() => setTokenDropDownActive(false)}
						>
							<div css={styles.tokenDropdownContainer}>
								{tokens.map((token: CENNZnetToken, i) => {
									if (token.symbol !== tokens[selectedTokenIdx].symbol) {
										return (
											<div
												key={i}
												onClick={() => {
													setSelectedTokenIdx(i);
													setTokenDropDownActive(false);
												}}
												css={styles.tokenChoiceContainer}
											>
												<img
													alt=""
													src={`/images/${token.logo}`}
													width={33}
													height={33}
												/>
												<span>{token.symbol}</span>
											</div>
										);
									}
								})}
							</div>
						</ClickAwayListener>
					)}
				</div>
			</div>
		</div>
	);
};

export default TokenPicker;

export const styles = {
	tokenPickerContainer: css`
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-start;
		margin-bottom: 17px;
		height: 94px;
	`,
	tokenPickerBox: css`
		display: flex;
		flex-direction: row;
		border: 1px solid #979797;
		width: 170px;
		height: 60px;
		justify-content: space-between;
		align-items: center;
	`,
	tokenSelector: css`
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
	tokenSelectedImg: css`
		margin-left: 13px;
	`,
	tokenSelectedArrow: css`
		margin-left: 27px;
	`,
	tokenSelectedArrowDown: css`
		margin-left: 27px;
		transform: rotate(-180deg);
	`,
	tokenButton: css`
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
	tokenDropdownContainer: css`
		position: absolute;
		top: 60px;
		right: -17px;
		background: #ffffff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		z-index: 5;
		width: 170px;
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
	tokenChoiceContainer: css`
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
};
