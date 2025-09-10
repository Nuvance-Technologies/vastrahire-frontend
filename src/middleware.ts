import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/customer/dashboard") ||
    pathname.startsWith("/lender/dashboard");

  if (token?.role === "customer") {
    if (
      pathname.startsWith("/lender") ||
      pathname === "/login" ||
      pathname === "/customer/signup"
    ) {
      return NextResponse.redirect(new URL("/customer/dashboard", req.url));
    }
  } else if (token?.role === "business") {
    if (
      pathname.startsWith("/customer") ||
      pathname === "/login" ||
      pathname === "/lender/signup"
    ) {
      return NextResponse.redirect(new URL("/lender/dashboard", req.url));
    }
  }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/customer/login",
    "/customer/signup",
    "/lender/login",
    "/lender/signup",
    "/customer/dashboard/:path*",
    "/lender/dashboard/:path*",
  ],
};
