import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { content as contentTable } from "@/db/schema";

function likeCookieName(kind: string, slug: string) {
  return `liked_${kind}_${slug}`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  if (kind !== "blog" && kind !== "work") {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const cookieName = likeCookieName(kind, slug);
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  if (cookies[cookieName]) {
    return NextResponse.json({ liked: true }, { status: 200 });
  }

  const [row] = await getDb()
    .update(contentTable)
    .set({ likes: sql`${contentTable.likes} + 1` })
    .where(and(eq(contentTable.kind, kind), eq(contentTable.slug, slug)))
    .returning({ likes: contentTable.likes });

  const response = NextResponse.json({ liked: true, likes: row?.likes ?? 0 }, { status: 200 });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize(cookieName, "1", {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    }),
  );
  return response;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  if (kind !== "blog" && kind !== "work") {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const cookieName = likeCookieName(kind, slug);
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  if (!cookies[cookieName]) {
    return NextResponse.json({ liked: false }, { status: 200 });
  }

  const [row] = await getDb()
    .update(contentTable)
    .set({ likes: sql`greatest(${contentTable.likes} - 1, 0)` })
    .where(and(eq(contentTable.kind, kind), eq(contentTable.slug, slug)))
    .returning({ likes: contentTable.likes });

  const response = NextResponse.json({ liked: false, likes: row?.likes ?? 0 }, { status: 200 });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize(cookieName, "", {
      httpOnly: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    }),
  );
  return response;
}
