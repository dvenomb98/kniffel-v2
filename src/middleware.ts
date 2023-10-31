import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { URLS } from "./lib/urls";

export async function middleware(request: NextRequest) {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});
	// Create a Supabase client configured to use cookies
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					// If the cookie is updated, update the cookies for the request and response
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name, options) {
					// If the cookie is removed, update the cookies for the request and response
					request.cookies.delete({
						name,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.delete({
						name,
						...options,
					});
				},
			},
		}
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session && request.nextUrl.pathname.startsWith(URLS.LOGIN)) {
		return NextResponse.redirect(new URL(URLS.HOMEPAGE, request.url));
	}

	if (!session && !request.nextUrl.pathname.startsWith(URLS.LOGIN)) {
		return NextResponse.redirect(new URL(URLS.LOGIN, request.url));
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
