import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
const hybridRoutes = ["/login", "/register", "/", "/categories"];
// const publicRoutes = ["/", "/categories"];

const protectedRoutes = ["/course", "/blogs"];

const rolesRedirect: Record<string, unknown> = {
	admin: `${process.env.FRONTEND_URL}/admin/`,
	user: `${process.env.FRONTEND_URL}/`,
	super_user: `${process.env.FRONTEND_URL}/super_user/`,
};
export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	const role = token?.role as string;
	console.log(token, "token middleware");
	const { pathname } = request.nextUrl;

	if (!token) {
		console.log("REAL PATH NAME", pathname);

		if (hybridRoutes.includes(pathname)) {

			console.log("pppppppppppp--", role);
			console.log("xxxxxxxxxxx--", pathname);
			return NextResponse.next();

		}
		if (protectedRoutes.some(route => pathname.startsWith(route))) {
			console.log("11111111111111------", pathname);
			return NextResponse.redirect(`${process.env.FRONTEND_URL}/login?redirect=${pathname}`);
		}

		// redirect(`/login?redirect=${pathname}`);

		// return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
	}




	console.log(role, "role middleware");
	if (

		(role === "admin" && pathname.startsWith("/admin")) ||
		(role === "super_admin" && pathname.startsWith("/super_admin")) ||
		(role === "user" && !pathname.startsWith("/super_admin") && !pathname.startsWith("/admin"))
	) {

		console.log("333333333333333333333333333", pathname);
		return NextResponse.next();
	}

	if (pathname === "/" && role && role in rolesRedirect) {
		console.log("44444444444444", role);

		return NextResponse.redirect(rolesRedirect[role] as string);
	}


	console.log("55555555555555555", pathname, role);
	// NextResponse.rewrite(request.
	// NextResponse.redirect(`${process.env.FRONTEND_URL}/`);
	return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);

	//so d
	// return NextResponse.redirect("http://localhost:3000");
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		//hybrid routes
		"/",
		"/login",
		"/register",
		// "/admin",
		"/course/:page*",
		"/blogs/:page*",
		//admin routes
		"/admin/:page*",
		//super_admin routes
		"/super_admin/:page*",
	],
};


