import { FC, useEffect } from "react";
import { css } from "@emotion/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const TwitterHandler: FC = () => {
	const { data: session } = useSession();

	useEffect(() => {
		if (!session) return;

		window.onunload = async () => await signOut();
	}, [session]);

	return (
		<div>
			{!!session?.username && (
				<div css={styles.username}>
					<p>@{session.username}</p>
				</div>
			)}
			<button css={styles.buttonContainer}>
				{!!session ? (
					<div css={styles.authButton} onClick={async () => await signOut()}>
						<Image
							src={"/twitter.svg"}
							width={20}
							height={20}
							alt="twitter-logo"
							css={styles.logo}
						/>
						<p>Sign out</p>
					</div>
				) : (
					<div
						css={styles.authButton}
						onClick={async () => await signIn("twitter")}
					>
						<Image
							src={"/twitter.svg"}
							width={20}
							height={20}
							alt="twitter-logo"
							css={styles.logo}
						/>
						<p>Sign in</p>
					</div>
				)}
			</button>
		</div>
	);
};

export default TwitterHandler;

export const styles = {
	username: css`
		position: absolute;
		top: 40px;
		right: 10px;
		width: 120px;
		text-align: center;

		p {
			font-size: 14px;
			font-weight: bold;
			overflow: scroll;
		}
	`,
	buttonContainer: css`
		cursor: pointer;
		position: absolute;
		top: 15px;
		right: 10px;
		border: 1px solid dimgray;
		border-radius: 5px;
		display: flex;
		width: 120px;
		box-sizing: border-box;
	`,
	authButton: css`
		display: inline-flex;
		height: 30px;
		font-size: 12px;
		letter-spacing: 0.3px;
		padding: 5px 5px;
		margin: 0 auto;

		p {
			margin-left: 5px;
			margin-top: 2px;
			text-transform: uppercase;
			line-height: 125%;
			font-weight: bold;
		}
	`,
	logo: css`
		padding-left: 15px;
		margin-left: 50px;
	`,
};
