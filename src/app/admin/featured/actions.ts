"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { getDb } from "@/db";
import { homeFeatured } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

export async function updateFeatured(formData: FormData) {
  await requireAdmin();

  const display = formData.get("display") === "on";
  const label = String(formData.get("label") || "").trim();
  const description = String(formData.get("description") || "").trim() || null;
  const href = String(formData.get("href") || "").trim() || null;

  await getDb()
    .update(homeFeatured)
    .set({ display, label, description, href, updatedAt: new Date() })
    .where(eq(homeFeatured.id, 1));

  updateTag("home-featured");
}
