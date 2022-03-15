import { FC } from "react";
import { css } from "@emotion/react";
import { Faucet, FaucetDetails } from "@/libs/components";

const Home: FC = () => {
	return (
		<div css={styles.background}>
			<div css={styles.container}>
				<div css={styles.headerContainer}>
					<img src={"/images/cennznet_blue.svg"} alt={""} />
					<h1 css={styles.heading}>CENNZnet Faucet</h1>
				</div>
				<Faucet />
				<br />
				<FaucetDetails />
			</div>
		</div>
	);
};

export default Home;

export const styles = {
	background: css`
		background: url("/images/cennz_background.svg") repeat center top;
		background-size: 12px;
		background-color: #d6dbff;
		overflow: auto;
		z-index: 0;
		height: 100vh;
	`,
	headerContainer: css`
		display: flex;
		flex-direction: row;
		margin-bottom: 0.5em;
		img {
			margin-right: 10px;
			filter: drop-shadow(2px 2px rgba(0, 0, 0, 0.15));
		}

		@media (max-width: 500px) {
			width: 23em;
			margin: 0 auto;
			padding-bottom: 1em;
		}
	`,
	heading: css`
		color: #1130ff;
		text-align: center;
		text-shadow: 2px 2px rgba(0, 0, 0, 0.15);
		@media (max-width: 500px) {
			font-size: 22px;
		}
	`,
	container: css`
		width: 50%;
		margin: 35px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`,
};
