import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { NEXTAUTH_SECRET, TWITTER_ID, TWITTER_SECRET } from "@/libs/constants";

export default NextAuth({
	secret: NEXTAUTH_SECRET,
	providers: [
		TwitterProvider({
			clientId: TWITTER_ID,
			clientSecret: TWITTER_SECRET,
			version: "2.0",
		}),
	],
});
