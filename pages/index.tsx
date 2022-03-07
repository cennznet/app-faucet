import type { NextPage } from "next";
import TwitterHandler from "@/components/TwitterHandler";

const Home: NextPage = () => {
	return (
		<div>
			<div>Cennznet faucet</div>
			<TwitterHandler />
		</div>
	);
};

export default Home;
