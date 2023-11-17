
import { jwtHelpers } from "@/helpers/jwt/jwtHelpers";
import { getNewAccessToken } from "@/services/getNewAccessToken";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getoAuth, storeUserInfo } from "@/services/auth.service";
import { getBaseUrl } from "@/helpers/config/envConfig";


import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({

			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			profile(profile, tokens) {
				// console.log("LAST TRY", profile);
				// console.log("LAST TOKEN", tokens);
				// Make a fetch request to send credentials and fetch additional data
				const sendCredentialsAndFetchData = async () => {
					try {
						// Example: Send credentials to your server
						const credentialsRes = await fetch(`http://localhost:5010/api/v1/auth/oauth`, {
							method: "POST",
							body: JSON.stringify({ email: profile?.email, provider: true }),
							headers: { "Content-Type": "application/json" },
						});


						const { data } = await credentialsRes.json();
						console.log("AMARRRR DATAA", data);




						// Customize the GitHub authorization process here
						// const customData = {
						// 	// Add your custom data here
						// 	someKey: "someValue",
						// 	// Add additional data from the fetch requests
						// 	credentialsData,

						// };

						// Return the customized profile data
						return {
							...profile,

						};
					} catch (error) {
						console.error("Error fetching data:", error);
						return null;
					}
				};

				return sendCredentialsAndFetchData();
			},
		}),
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_ID as string,
		// 	clientSecret: process.env.GOOGLE_SECRET as string,

		// }),
		GoogleProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			// Add custom properties here
			// ...

			// Profile callback for additional customization

		}),

		CredentialsProvider({
			id: "msp-tutoring-signin",
			name: "Credentials",
			type: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Your email.....",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				console.log(req);

				// console.log(credentials);
				try {
					const res = await fetch(`http://localhost:5010/api/v1/auth/signin`, {
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" },
					});
					const { data } = await res.json();
					const verifiedToken: any = jwtHelpers.verifyToken(
						data?.accessToken,
						process.env.JWT_SECRET!
					);
					// console.log("varified token", verifiedToken);
					// console.log("auth option", data);
					if (res.ok && data) {
						console.log("data", data);

						return {
							...data,
							...verifiedToken,
						};
					}
				} catch (error: any) {
					// console.log(error);
					throw new Error(error.message);
				}
			},
		}),



		CredentialsProvider({
			id: "msp-tutoring-signup",
			name: "Credentials",
			type: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Your email.....",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as Record<string, string>;


				try {
					const res = await fetch(`http://localhost:5010/api/v1/auth/signup`, {
						method: "POST",
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" },
					});
					const { data } = await res.json();
					const verifiedToken: any = jwtHelpers.verifyToken(
						data?.accessToken,
						process.env.JWT_SECRET!
					);
					// console.log("varified token", verifiedToken);
					// console.log("auth option", res);
					if (res.ok && data) {
						// console.log("data", data);
						return {
							...data,
							...verifiedToken,
						};
					}
				} catch (error: any) {
					// console.log(error);
					throw new Error(error.message);
				}
			},
		}),

	],
	callbacks: {

		// async signIn(user,) {
		// 	// Use the custom hook to send the session data
		// 	const { email } = user;
		// 	console.log(user?.email);
		// 	console.log(user?.user);
		// 	console.log(user?.user?.email);


		// 	try {
		// 		// const res = await fetch(`http://localhost:5010/api/v1/auth/oauth`, {
		// 		// 	method: "POST",
		// 		// 	body: JSON.stringify({ email: user?.user?.email, provider: true }),
		// 		// 	headers: { "Content-Type": "application/json" },
		// 		// });
		// 		// const response = await getoAuth(user?.user?.email as string);

		// 		// console.log("resssssssssssssssssssssssssssssssssss", response);



		// 		// const { data } = await res.json();
		// 		// storeUserInfo({ accessToken: data?.accessToken });
		// 		// // console.log({ accessToken: data?.accessToken });
		// 		// // console.log(localStorage);

		// 		// localStorage.setItem(
		// 		// 	"accessToken",
		// 		// 	JSON.stringify({
		// 		// 		accessToken: data?.accessToken,
		// 		// 	}),
		// 		// );

		// 		return true; // Allow the user to be signed in
		// 	} catch (error) {
		// 		console.error('Error in signIn callback:', error);
		// 		return false; // Prevent the user from being signed in
		// 	}
		// },

		async jwt({ token, user }) {
			// console.log(token, "token auth option++++");
			// console.log(user, "user auth option+++++");

			return {
				...token,
				...user,
			};
		},
		async session({ session, token }: { session: any; token: any; }) {
			// console.log(session, "session auth option");
			// console.log(token, "token auth option inside session");
			const verifiedToken = jwtHelpers.verifyToken(
				token?.accessToken,
				process.env.JWT_SECRET!
			);
			// console.log(verifiedToken);

			// if (!verifiedToken) {
			// 	// console.log("token expired so new token generated");
			// 	const { data } = await getNewAccessToken(token?.accessToken);
			// 	token.accessToken = data?.accessToken;
			// }
			return {
				...session,
				...token,
			};
		},
	},
	// session: {
	// 	strategy: "jwt",
	// 	maxAge: 24 * 60 * 60,
	// },
	// jwt: {
	// 	secret: process.env.NEXTAUTH_SECRET,
	// },
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
		error: "/",
		signOut: "/login",
	},
};
