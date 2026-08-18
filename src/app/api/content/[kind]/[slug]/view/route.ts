import { NextRequest, NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { content as contentTable } from "@/db/schema";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await params;
  if (kind !== "blog" && kind !== "work") {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  await getDb()
    .update(contentTable)
    .set({ views: sql`${contentTable.views} + 1` })
    .where(
      and(
        eq(contentTable.kind, kind),
        eq(contentTable.slug, slug),
        eq(contentTable.published, true),
      ),
    );

  return new NextResponse(null, { status: 204 });
}
