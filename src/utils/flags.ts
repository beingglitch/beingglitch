import "server-only";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { featureFlags } from "@/db/schema";
import { routes as staticRoutesFallback } from "@/resources";

export const getRoutes = unstable_cache(
  async (): Promise<Record<string, boolean>> => {
    const rows = await getDb().select().from(featureFlags);
    if (rows.length === 0) return staticRoutesFallback;
    return Object.fromEntries(rows.map((r) => [r.key, r.enabled]));
  },
  ["feature-flags"],
  { tags: ["feature-flags"] },
);

export async function getAllFlags() {
  return getDb().select().from(featureFlags).orderBy(featureFlags.key);
}
