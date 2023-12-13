import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const hybridRoutes = ["/login", "/register", "/", "/categories", "/about",
	"/contact"];
const strictRoutes = ["/login", "/register"];

const protectedRoutes = ["/course", "/blogs", "/payments"];

const rolesRedirect: Record<string, unknown> = {
	admin: `${process.env.FRONTEND_URL}/admin/`,
	user: `${process.env.FRONTEND_URL}/`,
	super_admin: `${process.env.FRONTEND_URL}/super_admin/`,
};
export async function middleware(request: NextRequest) {


	const token = await getToken({ req: request });
	const role = token?.role as string;
	console.log(token, "token middleware");
	const { pathname } = request.nextUrl;

	if (token) {
		if (strictRoutes.includes(pathname)) {
			return NextResponse.redirect(`${process.env.FRONTEND_URL}`);
		}
	}

	if (!token) {

		if (hybridRoutes.includes(pathname)) {
			return NextResponse.next();
		}
		if (protectedRoutes.some(route => pathname?.startsWith(route))) {
			return NextResponse.redirect(`${process.env.FRONTEND_URL}/login?redirect=${pathname}`);
		}

		// redirect(`/login?redirect=${pathname}`);
		// return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
	}

	if (
		(role === "admin" && pathname?.startsWith("/admin")) ||
		(role === "super_admin" && pathname?.startsWith("/super_admin")) ||
		(role === "user" && !pathname?.startsWith("/super_admin") && !pathname?.startsWith("/admin"))
	) {
		return NextResponse.next();
	}

	if ((role === "admin" && !pathname?.startsWith("/admin")) || (role === "super_admin" && !pathname?.startsWith("/super_admin"))) {
		return NextResponse.redirect(rolesRedirect[role] as string);
	}

	if (pathname === "/" && role && role in rolesRedirect) {
		return NextResponse.redirect(rolesRedirect[role] as string);
	}

	// NextResponse.rewrite(request.
	// NextResponse.redirect(`${process.env.FRONTEND_URL}/`);
	return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);

}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		//hybrid routes
		"/",
		"/login",
		"/register",
		"/about",
		"/contact",

		// "/admin",
		"/course/:page*",
		"/blogs/:page*",
		//admin routes
		"/admin/:page*",
		"/user/:page*",

		//super_admin routes
		"/super_admin/:page*",
	],
};


