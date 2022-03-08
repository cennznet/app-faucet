import NextAuth from "next-auth";
import Twitter from "next-auth/providers/twitter";
import store from "store";
import { NEXTAUTH_SECRET, TWITTER_ID, TWITTER_SECRET } from "@/libs/constants";

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
		async session({ session }) {
			const twitterHandle = store.get("twitter-handle");
			const validAccount = store.get("valid-account");
			session.username = twitterHandle;
			session.validAccount = !!validAccount;

			return session;
		},
		async signIn({ profile }) {
			const {
				public_metrics: { follower_count, tweet_count },
				username,
				created_at,
			}: any = profile.data;

			store.set("twitter-handle", username);
			const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
			const timeDiffInMs = Date.now() - new Date(created_at).getTime();

			if (
				follower_count >= 15 &&
				tweet_count >= 1 &&
				timeDiffInMs >= thirtyDaysInMs
			) {
				store.set("valid-account", true);
			}

			return true;
		},
	},
});
