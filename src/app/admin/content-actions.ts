"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { content as contentTable } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import type { ContentKind } from "@/utils/content";

function listPath(kind: ContentKind) {
  return kind === "blog" ? "/admin/posts" : "/admin/projects";
}

function readForm(formData: FormData) {
  const images = String(formData.get("images") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    slug: String(formData.get("slug") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    subtitle: String(formData.get("subtitle") || "").trim() || null,
    summary: String(formData.get("summary") || "").trim(),
    content: String(formData.get("content") || ""),
    image: String(formData.get("image") || "").trim() || null,
    images,
    tag: String(formData.get("tag") || "").trim() || null,
    link: String(formData.get("link") || "").trim() || null,
  };
}

export async function createContent(kind: ContentKind, formData: FormData) {
  await requireAdmin();
  const fields = readForm(formData);
  const published = formData.get("published") === "on";

  await getDb()
    .insert(contentTable)
    .values({
      kind,
      ...fields,
      published,
      publishedAt: published ? new Date() : null,
    });

  updateTag(kind);
  updateTag(`${kind}-list`);
  redirect(listPath(kind));
}

export async function updateContent(id: number, kind: ContentKind, formData: FormData) {
  await requireAdmin();
  const fields = readForm(formData);
  const published = formData.get("published") === "on";

  const [existing] = await getDb()
    .select({ published: contentTable.published, slug: contentTable.slug })
    .from(contentTable)
    .where(eq(contentTable.id, id));

  await getDb()
    .update(contentTable)
    .set({
      ...fields,
      published,
      publishedAt: published && !existing?.published ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(contentTable.id, id));

  updateTag(kind);
  updateTag(`${kind}-list`);
  if (existing?.slug) updateTag(`${kind}-${existing.slug}`);
  if (fields.slug !== existing?.slug) updateTag(`${kind}-${fields.slug}`);
  redirect(listPath(kind));
}

export async function deleteContent(id: number, kind: ContentKind, slug: string) {
  await requireAdmin();
  await getDb().delete(contentTable).where(eq(contentTable.id, id));
  updateTag(kind);
  updateTag(`${kind}-list`);
  updateTag(`${kind}-${slug}`);
}

export async function togglePublish(id: number, kind: ContentKind, slug: string, next: boolean) {
  await requireAdmin();
  const [existing] = await getDb()
    .select({ publishedAt: contentTable.publishedAt })
    .from(contentTable)
    .where(eq(contentTable.id, id));

  await getDb()
    .update(contentTable)
    .set({
      published: next,
      publishedAt: next && !existing?.publishedAt ? new Date() : existing?.publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(contentTable.id, id));

  updateTag(kind);
  updateTag(`${kind}-list`);
  updateTag(`${kind}-${slug}`);
}
