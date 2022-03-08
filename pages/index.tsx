import type { NextPage } from "next";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import TwitterHandler from "@/components/TwitterHandler";

const Home: NextPage = () => {
	const { data: session } = useSession();

	return (
		<div css={styles.container}>
			<h1 css={styles.heading}>CENNZnet faucet</h1>
			<TwitterHandler />
			<div>
				{!!session?.validAccount ? (
					<div>Account is valid</div>
				) : (
					<div>
						Please sign in to an account that is over 30 days old, and with at
						least 15 followers & 1 tweet
					</div>
				)}
			</div>
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
