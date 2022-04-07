import { FC } from "react";
import { css } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { TxStatus } from "@/libs/types";

const FaucetProgress: FC<{
	isOpen: boolean;
	txStatus: TxStatus;
	setIsOpen: Function;
}> = ({ isOpen, txStatus, setIsOpen }) => {
	return (
		<div css={styles.root(isOpen)}>
			{!!txStatus && (
				<div css={styles.contentContainer}>
					{txStatus.status === "in-progress" && (
						<CircularProgress css={styles.status} size="3em" />
					)}
					{txStatus.status === "success" && (
						<CheckCircleOutlinedIcon
							css={[styles.status, styles.statusSuccess]}
						/>
					)}
					{txStatus.status === "fail" && (
						<ErrorOutlineOutlinedIcon
							css={[styles.status, styles.statusFail]}
						/>
					)}

					<div css={styles.title}>
						{txStatus.status === "in-progress" && "Faucet Is In Progress"}
						{txStatus.status === "success" && "Faucet Tx Completed"}
						{txStatus.status === "fail" && "Faucet Tx Failed"}
					</div>
					<div css={styles.message}>{txStatus.message}</div>
					{txStatus.status !== "in-progress" && (
						<button
							css={styles.button}
							onClick={() => setIsOpen(false)}
							type="button"
						>
							Dismiss
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default FaucetProgress;

const styles = {
	root: (show: boolean) =>
		css`
			position: absolute;
			inset: 0;
			background-color: rgba(255, 255, 255, 0.9);
			z-index: 100;
			opacity: ${show ? 1 : 0};
			pointer-events: ${show ? "all" : "none"};
			transition: opacity 250ms;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(2px);
			padding: 5em;
			text-align: center;
			font-size: 14px;
			width: 100%;
			height: 100%;
		`,
	status: css`
		margin-bottom: 1.5em;
	`,
	statusSuccess: css`
		width: 4em;
		height: 4em;
		font-size: 14px;
		color: green;
	`,
	statusFail: css`
		width: 4em;
		height: 4em;
		font-size: 14px;
		color: red;
	`,
	contentContainer: css`
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	`,
	title: ({ palette }) => css`
		font-weight: bold;
		font-size: 20px;
		line-height: 1;
		text-align: center;
		text-transform: uppercase;
		color: ${palette.primary.main};
	`,
	message: css`
		margin-top: 1em;
		line-height: 1.5;
		pre {
			font-weight: bold;
		}
	`,
	button: ({ palette }) => css`
		margin-top: 2em;
		text-align: center;
		border-radius: 4px;
		border: transparent;
		background-color: ${palette.primary.main};
		color: white;
		letter-spacing: 0.5px;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 100px;
		cursor: pointer;
		display: flex;
		font-weight: bold;
	`,
};
