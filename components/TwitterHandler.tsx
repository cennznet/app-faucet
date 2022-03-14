import { FC, useEffect } from "react";
import { css } from "@emotion/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const TwitterHandler: FC = () => {
	const { data: session } = useSession();

	useEffect(() => console.log("session", session), [session]);

	return (
		<div>
			<button css={styles.buttonContainer(!!session)}>
				{!!session ? (
					<div
						css={styles.authButton}
						onClick={async () => await signOut({ redirect: false })}
					>
						<Image
							src={"/twitter.svg"}
							width={20}
							height={20}
							alt="twitter-logo"
							css={styles.logo}
						/>
						<p css={styles.authHandle}>@{session.user.name}</p>
						<p css={styles.authText(!!session)}>Sign out</p>
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
						<p css={styles.authText(!!session)}>Sign in</p>
					</div>
				)}
			</button>
		</div>
	);
};

export default TwitterHandler;

export const styles = {
	buttonContainer: (session: boolean) => css`
		cursor: pointer;
		position: absolute;
		top: 15px;
		right: 10px;
		border-radius: 5px;
		display: flex;
		width: ${session ? "auto" : "120px"};
		box-sizing: border-box;
		margin: 20px;
		border: transparent;
		box-shadow: 4px 8px 8px rgb(17 48 255 / 10%);
		@media (max-width: 500px) {
			margin: 0;
		}
	`,
	authButton: css`
		display: inline-flex;
		height: 30px;
		font-size: 12px;
		letter-spacing: 0.3px;
		padding: 5px 5px;
		margin: 0 auto;
	`,
	authText: (session: boolean) => css`
		margin-left: 5px;
		margin-top: ${session ? "2.5px" : "2px"};
		text-transform: uppercase;
		line-height: 125%;
		font-weight: bold;
		font-size: ${session ? "11.5px" : "inherit"};
	`,
	authHandle: css`
		margin-left: 5px;
		margin-top: 2px;
		line-height: 125%;
		font-weight: bold;
	`,
	logo: css`
		padding-left: 15px;
		margin-left: 50px;
	`,
};
