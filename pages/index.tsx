import { FC } from "react";
import { css } from "@emotion/react";
import { Faucet, FaucetDetails } from "@/libs/components";
import { CENNZ_BACKGROUND, CENNZnetBlue } from "@/assets/vectors";

const Home: FC = () => {
	return (
		<div css={styles.background}>
			<div css={styles.container}>
				<div css={styles.headerContainer}>
					<img src={CENNZnetBlue} alt={""} />
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
		background: url(${CENNZ_BACKGROUND}) repeat center top;
		background-size: 12px;
		background-color: rgba(173, 216, 230, 0.2);
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
	heading: ({ palette }) => css`
		color: ${palette.primary.main};
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
