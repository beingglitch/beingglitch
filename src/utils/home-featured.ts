import "server-only";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { homeFeatured } from "@/db/schema";

export const getHomeFeatured = unstable_cache(
  async () => {
    const [row] = await getDb().select().from(homeFeatured).where(eq(homeFeatured.id, 1));
    return row ?? { display: false, label: "", description: "", href: null };
  },
  ["home-featured"],
  { tags: ["home-featured"] },
);

export async function getHomeFeaturedAdmin() {
  const [row] = await getDb().select().from(homeFeatured).where(eq(homeFeatured.id, 1));
  return row;
}
