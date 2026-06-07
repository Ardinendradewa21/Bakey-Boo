import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/profile", "/checkout", "/cart"];
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register", "/admin-login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = req.cookies.get("bakeyboo_session");
  let session: { email: string; role: string } | null = null;

  if (sessionCookie?.value) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (e) {
      console.error("Failed to parse session cookie", e);
    }
  }

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // 1. Blokir non-admin masuk ke /admin
  if (isAdminRoute) {
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  // 2. Redirect ke login jika belum auth di halaman protected
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  // 3. Redirect ke home atau admin dashboard jika sudah login tapi akses halaman auth
  if (isAuthRoute && session) {
    if (session.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
