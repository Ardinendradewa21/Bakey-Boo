import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { insforge } from "@/lib/insforge";

function decodeJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { access_token } = await req.json();

    if (!access_token) {
      return NextResponse.json({ error: "Missing access token" }, { status: 400 });
    }

    const payload = decodeJwt(access_token);
    if (!payload || !payload.email) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    const email = payload.email;
    const role = email === "adrinindadewa2016@gmail.com" ? "ADMIN" : "USER";

    // Set HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("bakeyboo_session", JSON.stringify({ email, role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return NextResponse.json({ success: true, user: { email, role } });
  } catch (error: any) {
    console.error("Session API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("bakeyboo_session");
  return NextResponse.json({ success: true });
}
