// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// const hybridRoutes = ["/", "/login", "/register"];
// const patientAccesibleRoutes = ["/dashboard", "my-profile", "my-appointments"];
// const rolesRedirect: Record<string, unknown> = {
// 	doctor: `${process.env.FRONTEND_URL}/doctor/dashboard`,
// 	patient: `${process.env.FRONTEND_URL}/dashboard`,
// 	admin: `${process.env.FRONTEND_URL}/admins/dashboard`,
// };
// export async function middleware(request: NextRequest) {
// 	const token = await getToken({ req: request });
// 	// console.log(token, "token middleware")
// 	const { pathname } = request.nextUrl;
// 	console.log("MIDDLEWARE");

// 	if (!token) {
// 		if (hybridRoutes.includes(pathname)) {
// 			return NextResponse.next();
// 		}
// 		return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
// 	}

// 	const role = token?.role as string;
// 	// console.log(role, "role middleware")
// 	if (
// 		(role === "admin" && pathname.startsWith("/admins")) ||
// 		(role === "doctor" && pathname.startsWith("/doctor")) ||
// 		(role === "patient" && patientAccesibleRoutes.includes(pathname))
// 	) {
// 		// console.log("next")
// 		return NextResponse.next();
// 	}

// 	if (pathname === "/" && role && role in rolesRedirect) {
// 		return NextResponse.redirect(rolesRedirect[role] as string);
// 	}

// 	// NextResponse.rewrite(request.
// 	NextResponse.rewrite("/login");
// 	//so d
// 	return NextResponse.redirect(`${process.env.FRONTEND_URL}`);
// }

// // See "Matching Paths" below to learn more
// export const config = {
// 	matcher: [
// 		//hybrid routes
// 		"/",
// 		"/login",
// 		"/register",
// 		//patient routes
// 		"/dashboard",
// 		"/my-profile",
// 		"/my-appointments",
// 		//doctor routes
// 		"/doctor/:page*",
// 		//admin routes
// 		"/admins/:page*",
// 	],
// };




export { default } from "next-auth/middleware";

export const config = { matcher: ["/course/:page",] };