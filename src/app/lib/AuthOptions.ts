import GithubProvider from "next-auth/providers/github";
// import { jwtHelpers } from "@/helpers/jwtHelpers";
// import { getNewAccessToken } from "@/services/getNewAccessToken";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,

		}),

		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID,
		// 	clientSecret: process.env.GOOGLE_SECRET,
		// }),
		// ...add more providers here
	],
	pages: {
		signIn: "/login"
	}
};
