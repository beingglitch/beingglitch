import "server-only";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { getDb } from "@/db";
import { siteCopy } from "@/db/schema";
import { getYearsOfExperience } from "@/utils/experience";

const FALLBACK = {
  homeHeadline: "The layers\nunderneath",
  homeSubline:
    "I'm Suraj Shukla, a full stack engineer working across distributed systems and robotics.\n{years}+ years building the parts most people just import, in Rust, Go, and TypeScript.",
  aboutIntro: "",
};

function withYears<T extends Record<string, string>>(row: T): T {
  const years = String(getYearsOfExperience(2022));
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key, value.replaceAll("{years}", years)]),
  ) as T;
}

export const getSiteCopy = unstable_cache(
  async () => {
    const [row] = await getDb().select().from(siteCopy).where(eq(siteCopy.id, 1));
    return withYears({
      homeHeadline: row?.homeHeadline ?? FALLBACK.homeHeadline,
      homeSubline: row?.homeSubline ?? FALLBACK.homeSubline,
      aboutIntro: row?.aboutIntro ?? FALLBACK.aboutIntro,
    });
  },
  ["site-copy"],
  { tags: ["site-copy"] },
);

export async function getSiteCopyAdmin() {
  const [row] = await getDb().select().from(siteCopy).where(eq(siteCopy.id, 1));
  return row;
}
