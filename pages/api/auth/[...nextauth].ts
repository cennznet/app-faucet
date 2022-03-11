import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { NEXTAUTH_SECRET, TWITTER_ID, TWITTER_SECRET } from "@/libs/constants";
import {
	setTwitterHandle,
	fetchTwitterHandle,
} from "@/pages/api/auth/twitterHandle";

export default NextAuth({
	secret: NEXTAUTH_SECRET,
	providers: [
		Twitter({
			clientId: TWITTER_ID,
			clientSecret: TWITTER_SECRET,
			version: "2.0",
			userinfo: {
				url: "https://api.twitter.com/2/users/me",
				params: { "user.fields": ["created_at", "public_metrics"] },
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.twitterId = token.sub;
			const response = await fetchTwitterHandle(token.sub);
			if (!!response) session.validAccount = true;
			return session;
		},
		async signIn({ profile }) {
			const {
				public_metrics: { follower_count, tweet_count },
				id: twitterId,
				username,
				created_at,
			}: any = profile.data;

			const validAccount = await fetchTwitterHandle(twitterId);
			if (!!validAccount) return true;

			const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
			const timeDiffInMs = Date.now() - new Date(created_at).getTime();

			if (
				follower_count >= 15 &&
				tweet_count >= 1 &&
				timeDiffInMs >= thirtyDaysInMs
			) {
				console.log("setting");
				await setTwitterHandle(twitterId, username);
			}

			return true;
		},
	},
});
