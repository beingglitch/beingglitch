import "server-only";
import { desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { galleryImages } from "@/db/schema";

export const getGalleryImages = unstable_cache(
  async () => getDb().select().from(galleryImages).orderBy(desc(galleryImages.takenAt)),
  ["gallery-images"],
  { tags: ["gallery"] },
);

export async function getAllGalleryImagesAdmin() {
  return getDb().select().from(galleryImages).orderBy(desc(galleryImages.takenAt));
}
