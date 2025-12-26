import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtectedRoute = pathname.startsWith("/pages/achievements") || 
                           pathname.startsWith("/api/achievements") ||
                           pathname.startsWith("/api/auth/profile");

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/pages/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && token) {
    try {
      const payload = verifyToken(token);
      if (!payload) {
        const loginUrl = new URL("/pages/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("token");
        return response;
      }
      const response = NextResponse.next();
      response.headers.set("x-user-id", payload.userId);
      return response;
    } catch {
      const loginUrl = new URL("/pages/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token");
      return response;
    }
  }

  if (token && (pathname === "/pages/login" || pathname === "/pages/signup")) {
    return NextResponse.redirect(new URL("/pages/achievements", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

