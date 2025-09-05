import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/customer/dashboard") ||
    pathname.startsWith("/lender/dashboard");

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
