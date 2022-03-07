import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const {
	NEXT_PUBLIC_NEXTAUTH_SECRET,
	NEXT_PUBLIC_TWITTER_ID,
	NEXT_PUBLIC_TWITTER_SECRET,
}: any = process.env;

export default NextAuth({
	secret: NEXT_PUBLIC_NEXTAUTH_SECRET,
	providers: [
		TwitterProvider({
			clientId: NEXT_PUBLIC_TWITTER_ID,
			clientSecret: NEXT_PUBLIC_TWITTER_SECRET,
			version: "2.0",
		}),
	],
});
