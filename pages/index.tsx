import { FC } from "react";
import { css } from "@emotion/react";
import Faucet from "@/components/Faucet";
import FaucetDetails from "@/components/FaucetDetails";

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
		img {
			margin-right: 10px;
		}
	`,
	heading: css`
		color: #1130ff;
		text-align: center;
		@media (max-width: 500px) {
			font-size: 22px;
		}
	`,
	container: css`
		//background-color: white;
		width: 50%;
		margin: 35px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`,
};
