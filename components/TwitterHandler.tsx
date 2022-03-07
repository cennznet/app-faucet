import { FC } from "react";
import { css } from "@emotion/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const imageDimension = 20;

const TwitterHandler: FC = () => {
	const { data: session } = useSession();

	return (
		<div>
			{!!session?.user.name && (
				<p css={styles.username}>Signed in as {session.user.name}</p>
			)}
			<button css={styles.buttonContainer}>
				{!!session ? (
					<div css={styles.authButton} onClick={async () => await signOut()}>
						<Image
							src={"/twitter.svg"}
							width={imageDimension}
							height={imageDimension}
							alt="twitter-logo"
							css={styles.logo(imageDimension)}
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
							width={imageDimension}
							height={imageDimension}
							alt="twitter-logo"
							css={styles.logo(imageDimension)}
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
		font-size: 14px;
		position: absolute;
		top: 8px;
		right: 150px;
		font-weight: bold;
	`,
	buttonContainer: css`
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
	logo: (imageDimension: number) => css`
		padding-left: 15px;
		margin-left: 50px;
	`,
};
