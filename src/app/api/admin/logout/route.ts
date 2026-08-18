import { NextResponse } from "next/server";
import * as cookie from "cookie";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    }),
  );

  return response;
}
