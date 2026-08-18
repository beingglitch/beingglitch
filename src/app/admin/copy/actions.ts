"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { getDb } from "@/db";
import { siteCopy } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

export async function updateSiteCopy(formData: FormData) {
  await requireAdmin();

  const homeHeadline = String(formData.get("homeHeadline") || "");
  const homeSubline = String(formData.get("homeSubline") || "");
  const aboutIntro = String(formData.get("aboutIntro") || "");

  await getDb()
    .update(siteCopy)
    .set({ homeHeadline, homeSubline, aboutIntro, updatedAt: new Date() })
    .where(eq(siteCopy.id, 1));

  updateTag("site-copy");
}
