// "use server";
// export const getNewAccessToken = async (token: string) => {
// 	try {
// 		const res = await fetch(`http://localhost:5000/api/v1/auth/refresh-token`, {
// 			method: "POST",
// 			body: JSON.stringify({ refreshToken: token }),
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: token
// 			}
// 		});
// 		const data = await res.json();
// 		console.log("responseeeee", data);

// 		return data;
// 	} catch (error: any) {
// 		console.log("error++++", error);
// 		throw new Error(error.message);
// 	}
// };