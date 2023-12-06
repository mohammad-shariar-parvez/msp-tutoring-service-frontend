import { getNewAccessTokenfromBD } from './../../services/auth.service';

import { jwtHelpers } from "@/helpers/jwt/jwtHelpers";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getBaseUrl } from "@/helpers/config/envConfig";

import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import next from 'next';

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({

			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			profile(profile, tokens) {
				// console.log("profile", profile);
				// Make a fetch request to send credentials and fetch additional data
				const sendCredentialsAndFetchData = async () => {
					try {
						// Example: Send credentials to your server
						// const res = await fetch(`http://localhost:5010/api/v1/auth/oauth`, {
						// 	method: "POST",
						// 	body: JSON.stringify({ email: profile?.email, provider: true }),
						// 	headers: { "Content-Type": "application/json" },
						// });
						const res = await axiosInstance({
							url: `${getBaseUrl()}/auth/oauth`,
							method: "POST",
							data: JSON.stringify({ email: profile?.email, provider: true }),
							headers: { "Content-Type": "application/json" },
						});
						const data = res.data;
						// console.log(data);

						// console.log("AMARRRR DATAA", data.accessToken);
						const verifiedToken: any = jwtHelpers.verifyToken(
							data?.accessToken,
							process.env.JWT_SECRET!
						);

						if (data) {
							console.log("data", profile);
							return {

								...profile,
								...data,
								...verifiedToken,
							};
						}


					} catch (error: any) {
						// console.log(error);
						throw new Error(error.message);
					}
				};

				return sendCredentialsAndFetchData();
			},
		}),
		GoogleProvider({

			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
			profile(profile, tokens) {
				// console.log(profile);

				// Make a fetch request to send credentials and fetch additional data
				const sendCredentialsAndFetchData = async () => {
					try {

						const res = await axiosInstance({
							url: `${getBaseUrl()}/auth/oauth`,
							method: "POST",
							data: JSON.stringify({ email: profile?.email, provider: true }),
							headers: { "Content-Type": "application/json" },

						});
						const data = res.data;
						// console.log(data);

						// console.log("AMARRRR DATAA", data.accessToken);
						const verifiedToken: any = jwtHelpers.verifyToken(
							data?.accessToken,
							process.env.JWT_SECRET!
						);

						if (data) {
							// console.log("data", data);
							// console.log("profile", profile);

							return {
								id: profile.sub,
								...profile,
								...data,
								...verifiedToken,
							};
						}


						// return {
						// 	...profile,
						// 	...data,
						// 	...verifiedToken
						// };
					} catch (error: any) {
						// console.log(error);
						throw new Error(error.message);
					}
				};

				return sendCredentialsAndFetchData();
			},
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
				// console.log(credentials);

				// console.log(credentials);
				try {
					const res = await axiosInstance({
						url: `${getBaseUrl()}/auth/signin`,
						method: "POST",
						data: JSON.stringify({ email: credentials?.email, password: credentials?.password, provider: true }),
						headers: { "Content-Type": "application/json" },

					});
					// console.log("yoo yoo res", res);

					const data = res.data;
					// console.log(data);

					// const { data } = await res.json();
					const verifiedToken: any = jwtHelpers.verifyToken(
						data?.accessToken,
						process.env.JWT_SECRET!
					);
					// console.log("varified token", verifiedToken);
					// console.log("data", data);

					if (data) {
						return {
							...data,
							...verifiedToken,
						};
					}
				} catch (error: any) {

					// console.log("LOGIN ERROR_______", error.response.data);
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
					// const res = await fetch(`${getBaseUrl()}/auth/signup`, {
					// 	method: "POST",
					// 	body: JSON.stringify({ email, password }),
					// 	headers: { "Content-Type": "application/json" },
					// });
					const res = await axiosInstance({
						url: `${getBaseUrl()}/auth/signup`,
						method: "POST",
						data: JSON.stringify({ email: credentials?.email, password: credentials?.password, provider: true }),
						headers: { "Content-Type": "application/json" },

					});
					const data = res.data;
					// const { data } = await res.json();
					const verifiedToken: any = jwtHelpers.verifyToken(
						data?.accessToken,
						process.env.JWT_SECRET!
					);
					// console.log("varified token", verifiedToken);
					// console.log("auth option", res);
					// console.log("varified token", verifiedToken);
					// console.log("data", data);
					if (data) {
						// console.log("data", data);
						return {
							...data,
							...verifiedToken,
						};
					}
				} catch (error: any) {
					console.log(error);
					throw new Error(error.message);
				}
			},
		}),

	],
	callbacks: {

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
			console.log("varified token", verifiedToken);

			if (!verifiedToken) {
				console.log("token expired so new token generated");
				// console.log("token expired so new -", token?.accessToken);
				// const { data } = await getNewAccessToken(token?.accessToken);
				// console.log("refresh", data);

				const response = await getNewAccessTokenfromBD(token?.refreshToken);
				const accessToken = response?.data?.accessToken;

				console.log("accesstoken", accessToken);



				token.accessToken = accessToken;
				// token.accessToken = data?.accessToken;
			}
			return {
				...session,
				...token,
			};
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 12 * 30 * 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
		error: "/",
		signOut: "/login",
	},
};
