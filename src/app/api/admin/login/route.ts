import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { ADMIN_COOKIE_NAME, createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  if (password !== correctPassword) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const token = await createAdminSession();
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      sameSite: "strict",
      path: "/",
    }),
  );

  return response;
}
