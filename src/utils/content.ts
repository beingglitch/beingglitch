import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { content as contentTable } from "@/db/schema";

export type ContentKind = "blog" | "work";

type ContentRow = typeof contentTable.$inferSelect;

// Matches the shape the old fs-based `getPosts()` returned, so downstream
// components (Posts.tsx, Post/Project cards, [slug] pages) need no reshaping.
export type ContentItem = {
  slug: string;
  content: string;
  metadata: {
    title: string;
    subtitle?: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: ContentRow["team"];
    link?: string;
  };
};

function toContentItem(row: ContentRow): ContentItem {
  return {
    slug: row.slug,
    content: row.content,
    metadata: {
      title: row.title,
      subtitle: row.subtitle || undefined,
      // unstable_cache serializes Date objects to strings across its cache boundary,
      // so this may already be a string by the time it gets here — normalize either way.
      publishedAt: new Date(row.publishedAt ?? row.createdAt).toISOString(),
      summary: row.summary,
      image: row.image || undefined,
      images: row.images,
      tag: row.tag || undefined,
      team: row.team,
      link: row.link || undefined,
    },
  };
}

export async function getPublishedContent(kind: ContentKind): Promise<ContentItem[]> {
  const rows = await unstable_cache(
    async () =>
      getDb()
        .select()
        .from(contentTable)
        .where(and(eq(contentTable.kind, kind), eq(contentTable.published, true)))
        .orderBy(desc(contentTable.publishedAt)),
    [`${kind}-published-list`],
    { tags: [kind, `${kind}-list`] },
  )();

  return rows.map(toContentItem);
}

export async function getPublishedContentBySlug(
  kind: ContentKind,
  slug: string,
): Promise<{ item: ContentItem; views: number; likes: number } | null> {
  const rows = await unstable_cache(
    async () =>
      getDb()
        .select()
        .from(contentTable)
        .where(
          and(
            eq(contentTable.kind, kind),
            eq(contentTable.slug, slug),
            eq(contentTable.published, true),
          ),
        )
        .limit(1),
    [`${kind}-${slug}`],
    { tags: [kind, `${kind}-${slug}`] },
  )();

  const row = rows[0];
  if (!row) return null;
  return { item: toContentItem(row), views: row.views, likes: row.likes };
}

// Admin-only: includes drafts, no cache (always fresh in the admin UI).
export async function getAllContent(kind: ContentKind) {
  return getDb()
    .select()
    .from(contentTable)
    .where(eq(contentTable.kind, kind))
    .orderBy(desc(contentTable.createdAt));
}

export async function getContentById(id: number) {
  const rows = await getDb().select().from(contentTable).where(eq(contentTable.id, id)).limit(1);
  return rows[0] ?? null;
}
