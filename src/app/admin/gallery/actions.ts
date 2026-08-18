"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { getDb } from "@/db";
import { galleryImages } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

export async function addGalleryImage(formData: FormData) {
  await requireAdmin();
  const url = String(formData.get("url") || "").trim();
  const caption = String(formData.get("caption") || "").trim() || null;
  const orientation = String(formData.get("orientation") || "horizontal");
  const takenAtRaw = String(formData.get("takenAt") || "");
  const takenAt = takenAtRaw ? new Date(takenAtRaw) : new Date();

  if (!url) throw new Error("Image URL is required");

  await getDb().insert(galleryImages).values({ url, caption, orientation, takenAt });
  updateTag("gallery");
}

export async function deleteGalleryImage(id: number) {
  await requireAdmin();
  await getDb().delete(galleryImages).where(eq(galleryImages.id, id));
  updateTag("gallery");
}
