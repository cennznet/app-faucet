import { FC } from "react";
import { css } from "@emotion/react";
import TwitterHandler from "@/components/TwitterHandler";
import Faucet from "@/components/Faucet";
import FaucetDetails from "@/components/FaucetDetails";

const Home: FC = () => {
	return (
		<div css={styles.container}>
			<h1 css={styles.heading}>CENNZnet faucet</h1>
			<TwitterHandler />
			<Faucet />
			<br />
			<FaucetDetails />
		</div>
	);
};

export default Home;

export const styles = {
	heading: css`
		text-align: center;
	`,
	container: css`
		width: 50%;
		margin: 0 auto;
	`,
};
