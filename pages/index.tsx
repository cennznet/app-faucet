import { FC } from "react";
import { css } from "@emotion/react";
import { Faucet, FaucetDetails, PageHeader } from "@/libs/components";
import { CENNZ_BACKGROUND } from "@/assets/vectors";

const Home: FC = () => {
	return (
		<div css={styles.background}>
			<div css={styles.container}>
				<PageHeader />
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
	container: css`
		width: 50%;
		margin: 1em auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	`,
};
