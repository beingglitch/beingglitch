"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { getDb } from "@/db";
import { featureFlags } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-guard";

export async function toggleFlag(key: string, next: boolean) {
  await requireAdmin();
  await getDb()
    .update(featureFlags)
    .set({ enabled: next, updatedAt: new Date() })
    .where(eq(featureFlags.key, key));
  updateTag("feature-flags");
}
